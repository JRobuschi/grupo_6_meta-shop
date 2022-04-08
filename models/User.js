const { diffieHellman } = require('crypto');
const fs = require('fs');

const User = {
    fileName: './data/users.json',

    getData: function () {
        return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
    },

    generateId: function () {
        let allUsers = this.findAll();
        let lastUser = allUsers.pop();
        if (lastUser){
            return lastUser.id + 1;
        }
        return 1;
    },

    findAll: function() {
        return this.getData();

    },

    findByPk: function (id) {
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser.id ===id);
        return userFound;
    },

    findByField: function (field, text) { //busca segun el field q vos pongas y el texto q vos pongas
        let allUsers = this.findAll();   //en el caso q encuentre varios con lo mismo trae el primero
        let userFound = allUsers.find(oneUser => oneUser[field] === text);
        return userFound;
    },


    create: function (userData){ //crea usuarios
        let allUsers = this.findAll();
        let newUser = {
            id: this.generateId(),
            ...userData
        }
        allUsers.push(newUser);
        fs.writeFileSync(this.fileName, JSON.stringify(allUsers,null, ' '));
        return newUser;
    },

    delete: function (id) {
        let allUsers =this.findAll();
        let finalUsers = allUsers.filter(oneUser => oneUser.id !== id);
        fs.writeFileSync(this.fileName, JSON.stringify(finalUsers,null, ' '));
        return true;
    }    
}
//console.log(User.create({ name: 'pedro', email: 'pedro@dh.com'})); crea usuarios

module.exports = User