const { diffieHellman } = require('crypto');
const fs = require('fs');

const User = {
    fileName: './data/users.json',

    getData: function () {
        return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
    },

    generateId: function () {//genera un id de user,
        let allUsers = this.findAll();// toma todos los usuarios
        let lastUser = allUsers.pop(); //selecciona el ultimo
        if (lastUser){//si tengo un usuario sumale 1
            return lastUser.id + 1;
        }
        return 1; //si no hay usuarios ponele el 1
    },

    findAll: function() { //traeme todos los usuarios
        return this.getData();

    },

    findByPk: function (id) { //buscando el usuario x pk
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser.id ===id);
        return userFound;
    },

    findByField: function (field, text) { //busca segun el field q vos pongas y el texto q vos pongas, find by field carlos te trae el 1er carlos
        let allUsers = this.findAll();   //en el caso q encuentre varios con lo mismo trae el primero 
        let userFound = allUsers.find(oneUser => oneUser[field] === text);
        return userFound;
    },


    create: function (userData){ //crea usuarios //traeme a todos los usuarios
        let allUsers = this.findAll();
        let newUser = {
            id: this.generateId(),
            ...userData //spread operator ... toooda la informacion que llega desde el objeto literal
        }
        allUsers.push(newUser);//carga los usuarios mediante fs.writefulesunc
        fs.writeFileSync(this.fileName, JSON.stringify(allUsers,null, ' '));
        return newUser; // lo q esta entre parentesis en el stringty es el array de usuarios y lo otro es para mantener el formato ya dado en el json
    },

    delete: function (id) {
        let allUsers =this.findAll();
        let finalUsers = allUsers.filter(oneUser => oneUser.id !== id);//recorre todo el array de usuarios y retorna todo usuario q sea distinto al id q te paso
        fs.writeFileSync(this.fileName, JSON.stringify(finalUsers,null, ' '));
        return true;//reescribe el archivo sin el usuario q borre
    }    //finalusers es el array sin el usuario q borramos
}
//console.log(User.create({ name: 'pedro', email: 'pedro@dh.com'})); crea usuarios

module.exports = User