const figureService = require('./figureService');
const usersService = require('./usersService');

function ColectionService() {

    console.log('Inicia Servicio de Colecciones');

    this._collection = [

        {user_id: 1, figure_id: 1 },

        {user_id: 1, figure_id: 2 },

        {user_id: 1, figure_id: 3 },

        {user_id: 2, figure_id: 1 },

        {user_id: 2, figure_id: 2 },

        {user_id: 3, figure_id: 2 },

        {user_id: 3, figure_id: 3 },
    ];

};

/**
 * @param user_id
 * @return {Promise<any>}
 */
 ColectionService.prototype.getByUserId = function(user_id) {

    return new Promise((resolve, reject) => {

        const user_collection = this._collection.filter(c => c.user_id == user_id);

        let collection=[];

        for(const c in user_collection){
            const vid=user_collection[c].figure_id;
            figureService.getById(vid).then(dato=>collection.push(dato));
        }

        if(collection) {

            resolve(collection);

        } else {

            reject(user_id);
        }

    });
};

/**
 * @param figure_id
 * @return {Promise<any>}
 */
 ColectionService.prototype.getByFigureId = function(figure_id) {

    return new Promise((resolve, reject) => {

        const users_owners = this._collection.filter(c => c.figure_id == figure_id);

        let users=[];

        for(const c in users_owners){
            const vid=users_owners[c].user_id;
            usersService.getById(vid).then(dato=>users.push(dato));
        }

        if(users) {

            resolve(users);

        } else {

            reject(figure_id);
        }

    });
};

/**
 * @param figure
 * @param id
 */
 ColectionService.prototype.add = function(figure, id) {

    this._collection.push({user_id: parseInt(id), figure_id: figure.figure_id});
    
};

 /**
 * @param id
 * @param figure_id
 */
  ColectionService.prototype.del = function(id,figure_id) {

    let collection = this._collection.findIndex(x => x.user_id == id && x.figure_id == figure_id);
    

    if(collection>0){
        this._collection.splice(collection,1);
    }else{
        throw 'no existe el id';
    }
    
};


module.exports = new ColectionService();