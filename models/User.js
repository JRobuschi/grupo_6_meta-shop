const { diffieHellman } = require('crypto');
const fs = require('fs');
//aca hay que cambiar la info para que user venga de la base de dtos
const User = {
    fileName: './data/users.json',

    getData: function () { //esta funcion trae el array de usuarios desde el jason para ser usado
        return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
    },
    //el id debe ser generado por el modelo
    generateId: function () {//genera un id de user,
        let allUsers = this.findAll();// toma todos los usuarios
        let lastUser = allUsers.pop(); //selecciona el ultimo
        if (lastUser){//si tengo un usuario en el array de users? sumale 1
            return lastUser.id + 1;
        }
        return 1; //si no hay usuarios x q el archivo esta vacio,  ponele el 1
    },

    findAll: function() { //traeme todos los usuarios
        return this.getData();

    },

    findByPk: function (id) { //buscando el usuario x pk
        let allUsers = this.findAll(); //aca estan todos los usuarios
        let userFound = allUsers.find(oneUser => oneUser.id ===id);// itera el usuarios x usuario y busca x ID, cuando lo encuentra deja de iterar y retorna el usuario
        return userFound; //aca esta.
    },

    findByField: function (field, text) { //busca segun el field q vos pongas y el texto q vos pongas, find by field carlos te trae el 1er carlos, pones mail, te trae por mail
        let allUsers = this.findAll();   //en el caso q encuentre varios con lo mismo trae el primero 
        let userFound = allUsers.find(oneUser => oneUser[field] === text);
        return userFound; //retorna el usuario encontrado
    },


    create: function (userData){ //crea usuarios //traeme a todos los usuarios
        let allUsers = this.findAll();
        let newUser = { // para pushear el nuevo usuario
            id: this.generateId(),
            ...userData //spread operator ... toooda la informacion que llega desde el objeto literal
        }
        allUsers.push(newUser);//carga los usuarios mediante fs.writefilesyn
        fs.writeFileSync(this.fileName, JSON.stringify(allUsers,null, ' '));
        return newUser; // lo q esta entre parentesis en el stringty es el array de usuarios y lo otro es para mantener el formato ya dado en el json
    },

    delete: function (id) { //es una funcion q recibe el id
        let allUsers =this.findAll(); //agarra a todos los usarios y devuelve todos los usuarios menos el que corresponda con el ID
        let finalUsers = allUsers.filter(oneUser => oneUser.id !== id);//recorre todo el array de usuarios y retorna todo usuario q sea distinto al id q te paso
        fs.writeFileSync(this.fileName, JSON.stringify(finalUsers,null, ' '));
        return true;//reescribe el archivo sin el usuario q borre
    }    //finalusers es el array sin el usuario q borramos
}
//console.log(User.create({ name: 'pedro', email: 'pedro@dh.com'})); crea usuarios

module.exports = User