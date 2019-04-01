const fs = require('fs');

listaEstudiantes = [];
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

    let cursoDuplicado = listaCursos.find(nuevoCurso => nuevoCurso.idcurso == curso.idcurso);

    if(!cursoDuplicado)
    {
        listaCursos.push(nuevoCurso);
        guardarCurso();
        return true;
    }
    else
        return false;
}

module.exports = {
    crearCurso
}












