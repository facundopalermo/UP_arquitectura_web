function FigureService() {

    console.log('Inicia Servicio de Figuras');

    this._figures = [

        {id: 1, name: 'Dr Slump - Norimaki Arale - Hoyoyo Pink-Shirt Version', 
            releaseDate: '2013-08-29',
        estado: 1 },

        {id: 2, name: 'SoniComi (Super Sonico) - Sonico - 1/6 - 10th Anniversary Wedding Ver.', 
            releaseDate: '2018-06-25',
        estado: 1 },

        {id: 3, name: 'To LOVEru Darkness - Lala Satalin Deviluke - B-style - 1/4 - Bunny Ver.', 
            releaseDate: '2019-11-27',
        estado: 1 }
    ];

};

/**
 * @return {Promise<any>}
 */
 FigureService.prototype.getAll = function() {

    return new Promise((resolve) => {

        resolve(this._figures);
    });

};

/**
 * @param id
 * @return {Promise<any>}
 */
 FigureService.prototype.getById = function(id) {

    return new Promise((resolve, reject) => {

        let figure = this._figures.find(c => c.id == id);

        if(figure) {

            resolve(figure);

        } else {

            reject(id);
        }

    });
};

/**
 * @param figure
 */
 FigureService.prototype.add = function(figure) {

    this._figures.push(figure);
    
};

/**
 * @param id
 * @param figure
 */
 FigureService.prototype.updById = function(id, figure){

    let figureIndex = this._figures.findIndex(x => x.id == id);

    if(figureIndex>=0){
        this._figures[figureIndex] = figure;
    }else{
        throw 'no existe id';
    }

 }

 /**
 * @param id
 */
  FigureService.prototype.deleteById = function(id) {

    let figureIndex = this._figures.findIndex(x => x.id == id);
    if(figureIndex>=0){
        this._figures = this._figures.filter(c => c.id != id);
    }else{
        throw 'no existe el id';
    }
    
};

module.exports = new FigureService();