const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const ROUNDS = 10;

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Required field'],
      trim: true
    },
    surname: {
      type: String,
      required: [true, 'Required field'],
      trim: true
    },
    username: {
      type: String,
      unique: true,
      required: [true, 'Required field'],
      trim: true
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Required field'],
      match: [EMAIL_REGEX, 'Add a valid email'],
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'Required field'],
      minlength: [8, "invalid length"],
    },
    imageUrl: {
      type: String,
      default: 'https://cdn.iconscout.com/icon/free/png-256/free-imageUrl-370-456322.png'
    },
    position: {
      type: String, 
      trim: true
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        // Sirve para cambiar el output de los endpoints cuando hago res.json
        ret.id = ret._id;
        delete ret.__v;
        delete ret.password;
      },
    },
  }
);

userSchema.virtual('tasks', {
  ref: 'Task',
  foreignField: 'userId',
  localField: '_id',
  justOne: false
})

userSchema.methods.checkPassword = function (passwordToCompare) {
  return bcrypt.compare(passwordToCompare, this.password);
};

// Guardamos la contraseña hasheada con bcrypt
userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    bcrypt
      .hash(this.password, ROUNDS)
      .then((hash) => {
        this.password = hash;
        next();
      })
      .catch(next);
    // .catch(err => next(err))
  } else {
    next();
  }
});

// userSchema.pre("save", async function(next) {
//   if (!this.isModified("password")) return next();
//   try {
//       const hashed = await bcrypt.hash(this.password, ROUNDS);
//       this.password = hashed;
//       next();
//   } catch (error) {
//       next(error);
//   }
// });
const User = mongoose.model('User', userSchema);
module.exports = User