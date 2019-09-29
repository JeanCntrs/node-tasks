const fs = require('fs');

let listToDo = [];

const saveToDatabase = () => {

    let data = JSON.stringify(listToDo) // Pasar a un formato JSON || Convierte un objeto a formato JSON

    fs.writeFile('database/data.json', data, (error) => {
        if (error)
            throw new Error('No se pudo grabar en data.json');
    })

}

const create = (description) => {

    loadDatabase();

    let toDo = {
        description,
        completed: false
    }

    listToDo.push(toDo);

    saveToDatabase();

    return toDo;

}

const loadDatabase = () => {

    try {

        listToDo = require('../database/data.json');

    } catch (error) {

        listToDo = [];

    }

}

const getTasks = () => {
    loadDatabase();
    return listToDo;
}

const update = (description, completed) => {

    loadDatabase();

    /* let index = listToDo.findIndex(task => {
        return task.description === description;
    }) */

    let index = listToDo.findIndex(task => task.description.toLowerCase() === description.toLowerCase()); // Si no coincide retorna -1

    console.log(index);

    if (index >= 0) {
        listToDo[index].completed = completed;
        saveToDatabase();
        return true;
    } else {
        return false;
    }

}

const remove = (description) => {

    loadDatabase();

    let newList = listToDo.filter(task => task.description !== description);

    if (listToDo.length === newList.length) {
        return false;
    } else {
        listToDo = newList;
        saveToDatabase();
        return true;
    }
    
}

module.exports = {
    create,
    getTasks,
    update,
    remove
}