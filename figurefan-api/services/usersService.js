function UsersService() {

    console.log('Inicia Servicio de Usuarios');

    this._users = [

        {id: 1, usuario: 'fpalermo', 
            mail: 'xxx.x.xxxxxx@gmail.com',
            nombre: 'Facundo Esteban',
            apellido: 'Palermo',
            pais: 'Argentina',
        estado: 1 },

        {id: 2, usuario: 'asdfghjk', 
            mail: 'asdfghjk@gmail.com',
            nombre: 'asdfghjk',
            apellido: 'asdfghjk',
            pais: 'Argentina',
        estado: 1 },

        {id: 3, usuario: 'UP', 
            mail: 'asdfghjk@palermo.edu',
            nombre: 'Universidad',
            apellido: 'Palermo',
            pais: 'Argentina',
        estado: 1 }
    ];

};

/**
 * @return {Promise<any>}
 */
 UsersService.prototype.getAll = function() {

    return new Promise((resolve) => {

        resolve(this._users);
    });

};

/**
 * @param id
 * @return {Promise<any>}
 */
 UsersService.prototype.getById = function(id) {

    return new Promise((resolve, reject) => {

        let user = this._users.find(c => c.id == id);

        if(user) {

            resolve(user);

        } else {

            reject(id);
        }

    });
};

/**
 * @param user
 */
 UsersService.prototype.add = function(user) {

    this._users.push(user);
    
};

/**
 * @param id
 * @param user
 */
 UsersService.prototype.updById = function(id, user){

    let userIndex = this._users.findIndex(x => x.id == id);

    if(userIndex>=0){
        this._users[userIndex] = user;
    }else{
        throw 'no existe id';
    }

 }

 /**
 * @param id
 */
 UsersService.prototype.deleteById = function(id) {

    let userIndex = this._users.findIndex(x => x.id == id);
    
    if(userIndex>=0){
        this._users = this._users.filter(c => c.id != id);
    }else{
        throw 'no existe el id';
    }
    
};

module.exports = new UsersService();