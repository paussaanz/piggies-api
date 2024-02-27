function procesarFormulario(req, res, next) {
    const { service } = req.body; // Extrae la opción de servicio del cuerpo de la solicitud
    let tasksToAdd = [];
  
    for (let services of service) {
      switch (services) {
        case 'Communication':
            tasksToAdd.push('Tarea de Communication 1', 'Tarea de Communication 2');
          break;
          case 'Planning':
            tasksToAdd.push('Tarea de Planning 1', 'Tarea de Planning 2');
          break;
          case 'Marketing':
            tasksToAdd.push('Tarea de Marketing 1', 'Tarea de Marketing 2');
          break;
          case 'Social Media':
            tasksToAdd.push('Tarea de Social Media 1', 'Tarea de Social Media 2');
          break;
          case 'Branding':
            tasksToAdd.push('Tarea de Branding 1', 'Tarea de Branding 2');
          break;
        default:
          console.log(`Unrecognized service: ${services}`);
          break;
      }
    }
  
    req.tasksToAdd = tasksToAdd;
  
    next(); 
  }
  