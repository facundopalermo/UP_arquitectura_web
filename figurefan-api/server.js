const express    = require('express');
const bodyParser = require('body-parser');
const moment     = require('moment');

const usersService = require('./services/usersService');
const figureService = require('./services/figureService');
const collectionService = require('./services/collectionService');

const app = express()
const port = 3000

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send(
        `<html>
            <head>
                <title>FigureFan</title>
            </head>
            <body>
                Use la documentación.
            </body>
        </html>`
    );
})

app.listen(port, () => {
  console.log(`Servidor inicado en http://localhost:${port}`)
})

app.get('/users', async (req, res) => {

    let users = await usersService.getAll();

    res.json(users);

});

app.get('/users/:id', async (req, res) => {

    try {

        let user = await usersService.getById(req.params.id);

        res.json(user);

    } catch(ex) {

        res.status(404).send('El usuario no existe');

    }

});

app.post('/users', (req, res) => {

    usersService.add(req.body);

    res.status(201).send('Usuario creado');

});

app.put('/users/:id', (req, res) => {

    try {
        usersService.updById(req.params.id, req.body);
        res.status(200).send('Usuario Actualizado');
    } catch(ex) {
        res.status(404).send('Usuario suministrado no valido');
    }
    
});

app.delete('/users/:id', (req, res) => {

    try{
        usersService.deleteById(req.params.id);
        res.status(200).send('Usuario eliminado correctamente');
    } catch {
        res.status(404).send('Usuario suministrado no valido')
    }
});

app.get('/figures', async (req, res) => {

    let figures = await figureService.getAll();

    res.json(figures);

});

app.get('/figures/:id', async (req, res) => {

    try {

        let figure = await figureService.getById(req.params.id);

        res.json(figure);

    } catch(ex) {

        res.status(404).send('La figura no existe');

    }

});

app.post('/figures', async (req, res) => {

    figureService.add(req.body);

    res.status(201).send('Figura creada');

});

app.put('/figures/:id', (req, res) => {

    try {
        figureService.updById(req.params.id, req.body);
        res.status(200).send('Figura Actualizada');
    } catch(ex) {
        res.status(404).send('La figura no existe');
    }
    
});

app.delete('/figures/:id', async (req, res) => {

    let owners = await collectionService.getByFigureId(req.params.id);
    if(owners.length>0){
        res.status(428).send('La figura no puede ser eliminada mientras esté en alguna coleccion');
    }else{
        try{
            figureService.deleteById(req.params.id);
            res.status(200).send('Figura eliminada correctamente');
        } catch {
            res.status(404).send('La figura no existe')
        }
    }
});

app.get('/users/:id/collection', async (req, res) => {
    
    try {

        let user = await usersService.getById(req.params.id);
        
        let collection = await collectionService.getByUserId(req.params.id);

        res.json(collection);

    } catch(ex) {

        res.status(404).send('El usuario no existe');

    }

});

app.post('/users/:id/collection', async (req, res) => {
    
    try {

        let user = await usersService.getById(req.params.id);
        
        collectionService.add(req.body,req.params.id);

        res.status(201).send('Figura agregada a la coleccion');
    } catch(ex) {

        res.status(404).send('El usuario no existe');

    }
});

app.delete('/users/:id/collection/:figure_id', async (req, res) => {
    
    try{
        collectionService.del(req.params.id, req.params.figure_id);
        res.status(200).send('Figura eliminada correctamente de la colección');
    } catch {
        res.status(404).send('El recurso que intenta eliminar no existe');
    }
});



app.get('/figures/:id/owners', async (req, res) => {
    

    let owners = await collectionService.getByFigureId(req.params.id);

    res.json(owners);

});

