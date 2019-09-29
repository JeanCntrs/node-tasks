//const argv = require('yargs').argv;

const argv = require('./config/yargs').argv;

const toDo = require('./tasks/to_do');

const colors = require('colors/safe');

let command = argv._[0];

switch (command.toLowerCase()) {
    case 'crear':
        let task = toDo.create(argv.descripcion);
        console.log(task);
        break;
        
    case 'listar':
        let tasks = toDo.getTasks();
        for (let task of tasks) {
            console.log(colors.green('===== Tarea ====='));
            console.log(task.description);
            console.log(`Estado: ${ task.completed }`);
            console.log(colors.green('================='));
        }
        break;

    case 'actualizar':
        let updated = toDo.update(argv.descripcion, argv.completado);
        console.log(updated);
        break;

    case 'eliminar':
        let remove = toDo.remove(argv.descripcion);
        console.log(remove);
        break;

    default:
        console.log('Comando no es reconocido');
        break;
}