const fs = require('fs');

listaAspirantes = [];
listaCursos = [];

/*Se agrega al arreglo listaCursos todos los cursos
presentes en el json listado-cursos.json*/
const listarCursos = () => {
    try 
    {
        listaCursos = require('../listado-cursos.json');
    } 
    catch (error) 
    {
        listaCursos = [];   
    }
}

/* crea un nuevo curso y lo agrega en el archivo json 
con los datos del arreglo listaCursos*/
const guardarCurso = () => {
    let datos = JSON.stringify(listaCursos);
    fs.writeFile('listado-cursos.json', datos, (err =>{
        if (err) throw (err);
        console.log('Curso creado con exito.');
    }))
}

/*Agrega un nuevo curso al arreglo
listarCursos y llama a la funcion guardarCurso()*/
const crearCurso = (curso) => {
    listarCursos();

    let nuevoCurso = {
        idcurso:                curso.idcurso,
        nombrecurso:            curso.nombrecurso,
        modalidadcurso:         curso.modalidadcurso,
        valorcurso:             curso.valorcurso,
        descripcioncurso:       curso.descripcioncurso,
        intensidadhorariacurso: curso.intensidadhorariacurso,
        estado:                 'disponible'
    };

    let cursoDuplicado = listaCursos.find(cur => cur.idcurso == curso.idcurso);

    if(!cursoDuplicado)
    {
        listaCursos.push(nuevoCurso);
        guardarCurso();
        return 1;
    }
    else
        return false;
}

/*Se agrega al arreglo listaAspirantes todos los aspirantes
presentes en el json listado-aspirantes.json*/
const listarApirantes = () => {
    try 
    {
        listaAspirantes = require('../listado-aspirantes.json');
    } 
    catch (error) 
    {
        listaAspirantes = [];   
    }
}

/* registra un aspirante en un curso y lo agrega en el 
archivo json con los datos del arreglo listaAspirantes*/
const guardarAspiranteEnCurso = (callback) => {
    let datos = JSON.stringify(listaAspirantes);
    
    fs.writeFile('listado-aspirantes.json', datos, (err =>{
        if (err) throw (err);
        callback (true);
    }));
}

/*Agrega un nuevo curso al arreglo
listarCursos y llama a la funcion guardarAspiranteEnCurso()*/
const registrarAspiranteEnCurso = (aspirante) => {
    listarApirantes();

    let nuevoAspirante = {
        documentoidentidad: aspirante.documentoidentidad,
        correoaspirante:    aspirante.correoaspirante,
        nombreaspirante:    aspirante.nombreaspirante,
        telefonoaspirante:  aspirante.telefonoaspirante,
        curso:              aspirante.curso
    };

    let aspiranteYaRegistradoEnCurso = listaAspirantes.find(asp => (asp.documentoidentidad == aspirante.documentoidentidad && asp.curso == aspirante.curso));

    if(!aspiranteYaRegistradoEnCurso)
    {
        listaAspirantes.push(nuevoAspirante);
        guardarAspiranteEnCurso(function (resultado)
        {
            return true;
        });
    }
    else
        return false;
}

const actualizarEstadoCurso = (curso) => {
    listarCursos();
 
    let cursoEncontrado = listaCursos.find(cur => cur.idcurso == curso.idcurso);
 
    if(!cursoEncontrado)
        console.log('curso no existe');
    else
    {
        cursoEncontrado['estado'] = curso.estado;
        guardarCurso();
        return 2;
    }
}

const eliminarAspiranteCurso = (documentoIdentidadAspirante, callback) => {
    listarApirantes();
 
    let aspiranteEliminar = listaAspirantes.findIndex(asp => asp.documentoidentidad == documentoIdentidadAspirante);
    
    if(aspiranteEliminar == -1)
    {
        console.log('Ningun aspirante tiene numero de documento '+documentoIdentidadAspirante);
        callback (0);
    }
    else
    {
        listaAspirantes.splice(aspiranteEliminar, 1);

        guardarAspiranteEnCurso(function (resultado)
        {
            callback (1);
        });
    }
}

module.exports = {
    crearCurso,
    registrarAspiranteEnCurso,
    actualizarEstadoCurso,
    eliminarAspiranteCurso
}












