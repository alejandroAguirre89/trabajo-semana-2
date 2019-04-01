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
    res.render('index');
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

    if(respuesta == 1)
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

app.post('/cambiarEstadoCurso', (req,res) =>{

    let cursoActualizar = {
        idcurso:                req.body.curso,
        estado:                 'cerrado'
    };

    let respuesta = funciones.actualizarEstadoCurso(cursoActualizar);  

    res.render('listar-cursos', {
        respuesta: respuesta,
    });
});

app.get('/inscripcioncurso', (req,res) =>{
    res.render('inscripcion-curso', {
        respuesta: null,
    });
});

app.post('/inscripcioncurso', (req,res) =>{

    let nuevoAspirante = {
        documentoidentidad: req.body.documentoidentidad,
        correoaspirante:    req.body.correoaspirante,
        nombreaspirante:    req.body.nombreaspirante,
        telefonoaspirante:  req.body.telefonoaspirante,
        curso:              req.body.curso
    };

    let respuesta = funciones.registrarAspiranteEnCurso(nuevoAspirante);  

    res.render('inscripcion-curso', {
        respuesta: respuesta,
    });
});

app.get('/listaraspirantesinscritos', (req, res) => {
    res.render('listar-inscritos', {
        respuesta: 0
    });
});

app.post('/eliminarAspiranteCurso', (req,res) =>{

    funciones.eliminarAspiranteCurso(req.body.documentoidentidad, function (resultado)
    {
        console.log('3. mostrar inscritos apenas se haya elimando de archivo json');
        res.render('listar-inscritos', {
            respuesta: resultado
        });
    });
});

app.get('*', (req,res) =>{
    res.render('error');
});

app.listen(3000, () => {
    console.log('Escuchando puerto 3000.');
})