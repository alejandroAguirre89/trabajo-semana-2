const funciones = require('./funciones');
const hbs = require('hbs');
const path = require('path');
const express = require('express');
const app = express();
require('./helpers');

app.set('view engine', 'hbs');

const directorioPublico  = path.join(__dirname,'../public');
const directorioPartials = path.join(__dirname, '../partials');

app.use(express.static(directorioPublico));

/*Función de hbs que indica donde estan
los partials*/
hbs.registerPartials(directorioPartials);

/*Se importa el paquete que permite realizar 
peticiones de tipo post.*/ 
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.render('index', {
        estudiante: 'Erika'
    });
});

app.get('/calculos', (req,res) =>{

    console.log(req.query);
    res.render('calculos', {
        estudiante: req.query.nombre,
        nota1: parseInt(req.query.nota1),
        nota2: parseInt(req.query.nota2),
        nota3: parseInt(req.query.nota3)
    });
});





app.get('/crearcurso', (req,res) =>{
    res.render('crear-curso', {
        respuesta: true,
    });
});

app.post('/crearcurso', (req,res) =>{

    let nuevoCurso = {
        idcurso:                req.body.idcurso,
        nombrecurso:            req.body.nombrecurso,
        modalidadcurso:         req.body.modalidadcurso,
        valorcurso:             req.body.valorcurso,
        descripcioncurso:       req.body.descripcioncurso,
        intensidadhorariacurso: req.body.intensidadhorariacurso
    };

    let respuesta = funciones.crearCurso(nuevoCurso);  

    if(respuesta)
        res.render('listar-cursos', {
            respuesta: respuesta,
        });
    else
    {
        res.render('crear-curso', {
            respuesta: respuesta,
        });
    }
});

app.get('/listarcursos', (req, res) => {
    res.render('listar-cursos', {
        respuesta: false,
    });
});

app.get('*', (req,res) =>{
    res.render('error');
});

app.listen(3000, () => {
    console.log('Escuchando puerto 3000.');
})