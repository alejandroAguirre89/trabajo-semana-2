const hbs = require('hbs');

hbs.registerHelper('listarCursos', () =>{
    listaCursos = require('../listado-cursos');
    let texto = "<table class='table table-striped'>"+
                "<thead>"+
                "<th> Nombre </th>"+
                "<th> Descripción </th>"+
                "<th> Valor </th>"+
                "<th> Modalidad </th>"+
                "<th> Intensidad </th>"+
                "<th> Estado </th>"+
                "</thead>"+
                "</tbody>";

    listaCursos.forEach(curso => {
        texto = texto + "<tr>"+
                        "<td>"+curso.nombrecurso +"</td>" +
                        "<td>"+curso.descripcioncurso +"</td>" +
                        "<td>"+curso.valorcurso +"</td>" +
                        "<td>"+curso.modalidadcurso +"</td>" +
                        "<td>"+curso.intensidadhorariacurso +"</td>" +
                        "<td>"+curso.estado +"</td>" +
                        "</tr>";
    });

    texto = texto + "<tbody>"+
                    "</table>";

    return texto;
});

hbs.registerHelper('detalleCursos', () =>{
    listaCursos = require('../listado-cursos');
    let texto = "";

    listaCursos.forEach(curso => {

        if(curso.estado == "disponible")
        {
            texto = texto + "<div class='col-md-4'>"+
                                "<div id='accordion'>"+
                                    "<div class='card'>"+
                                        "<div class='card-header' id='headingTwo'>"+
                                            "<h5 class='mb-0'>"+
                                                "<button class='btn btn-link collapsed' data-toggle='collapse' data-target='#collapseTwo"+curso.idcurso +"'"+
                                                    "aria-expanded='false' aria-controls='collapseTwo"+curso.idcurso +"'>"+
                                                    "<strong>"+ curso.nombrecurso +"</strong>"+
                                                "</button>"+
                                            "</h5>"+
                                        "</div>"+
                                        "<div id='collapseTwo"+curso.idcurso +"' class='collapse' aria-labelledby='headingTwo' data-parent='#accordion'>"+
                                            "<div class='card-body'>"+
                                                "<ul>"+
                                                    "<li><strong>Id: </strong>"+curso.idcurso +"</li>"+
                                                    "<li><strong>Nombre: </strong>"+curso.nombrecurso +"</li>"+
                                                    "<li><strong>Modalidad: </strong>"+curso.modalidadcurso +"</li>"+
                                                    "<li><strong>Valor: </strong>"+curso.valorcurso +"</li>"+
                                                    "<li><strong>Descripción: </strong>"+curso.descripcioncurso +"</li>"+
                                                    "<li><strong>Intensidad horaria: </strong>"+curso.intensidadhorariacurso +"</li>"+
                                                    "<li><strong>Estado: </strong>"+curso.estado +"</li>"+
                                                "</ul>"+
                                            "</div>"+
                                        "</div>"+
                                    "</div>"+
                                "</div>"+
                            "</div>";
        }
    });

    return texto;
});

hbs.registerHelper('selectHtmlCursosDisponibles', () =>{
    listaCursos = require('../listado-cursos');
    let texto = "<select class='form-control' id='curso' name='curso' required>"+
                    "<option value=''>Seleccione curso...</option>";

    listaCursos.forEach(curso => {

        if(curso.estado == "disponible")
        {
            texto = texto + "<option value='"+curso.idcurso +"'>"+curso.nombrecurso +"</option>";
        }
    });

    texto = texto + "</select>";

    return texto;
});

hbs.registerHelper('validarInscripcionAspirante', (resultadoInscripcionAspirante) =>{

    if(resultadoInscripcionAspirante == true)
    {
        return "<div class='alert alert-success' role='alert'>"+
                    "<p>El aspirante se ha registrado en el curso exitosamente.</p>"+
                "</div>";
    }
    else if(resultadoInscripcionAspirante == false)
    {
        return "<div class='alert alert-warning' role='alert'>"+
                    "<p>El aspirante ya se encuentra inscrito en este curso.</p>"+
                "</div>";
    }
    else
        return "";
});

hbs.registerHelper('listarAspirantesInscritos', () =>{
    listaCursos = require('../listado-cursos');
    listaAspirantes = require('../listado-aspirantes');
    let texto = "";

    listaCursos.forEach(curso => {

        let listaAspirantesPorCurso = listaAspirantes.filter(asp => asp.curso == curso.idcurso);

        if(curso.estado == "disponible")
        {
            let textoAspirante = "";

            if(listaAspirantesPorCurso.length > 0)
            {
                textoAspirante = "<table class='table table-striped table-responsive'>"+
                                    "<thead>"+
                                    "<th> Eliminar </th>"+
                                    "<th> Documento </th>"+
                                    "<th> Nombre </th>"+
                                    "<th> Correo </th>"+
                                    "<th> Telefono </th>"+
                                    "</thead>"+
                                    "</tbody>";

                listaAspirantesPorCurso.forEach(aspirante => {
                    textoAspirante = textoAspirante + "<tr>"+
                                                            "<td>"+
                                                                "<form action='/eliminarAspiranteCurso' method='POST'>"+
                                                                    "<input type='hidden' name='documentoidentidad' value='"+aspirante.documentoidentidad+"'>"+
                                                                    "<button type='submit' class='btn btn-danger'>Eliminar</button>"+
                                                                "</form>"+
                                                            "</td>" +
                                                            "<td>"+aspirante.documentoidentidad +"</td>" +
                                                            "<td>"+aspirante.nombreaspirante +"</td>" +
                                                            "<td>"+aspirante.correoaspirante +"</td>" +
                                                            "<td>"+aspirante.telefonoaspirante +"</td>" +
                                                        "</tr>";
                });

                textoAspirante = textoAspirante + "<tbody>"+
                                                "</table>";
            }
            else
            {
                textoAspirante = textoAspirante + "<div class='alert alert-warning' role='alert'>" +
                                                        "<p>No hay aspirantes inscritos a este curso</p>" +
                                                    "</div>";   
            }

            texto = texto + "<div class='col-md-6'>"+
                                "<div id='accordion'>"+
                                    "<div class='card'>"+
                                        "<div class='card-header' id='headingTwo'>"+
                                            "<h5 class='mb-0'>"+
                                                "<button class='btn btn-link collapsed' data-toggle='collapse' data-target='#collapseTwo"+curso.idcurso +"'"+
                                                    "aria-expanded='false' aria-controls='collapseTwo"+curso.idcurso +"'>"+
                                                    "<strong>"+ curso.nombrecurso +"</strong>"+
                                                "</button>"+
                                            "</h5>"+
                                        "</div>"+
                                        "<div id='collapseTwo"+curso.idcurso +"' class='collapse' aria-labelledby='headingTwo' data-parent='#accordion'>"+
                                            "<div class='card-body'>"+
                                                textoAspirante +
                                            "</div>"+
                                        "</div>"+
                                    "</div>"+
                                "</div>"+
                            "</div>";
        }
    });

    return texto;
});

hbs.registerHelper('validarOperacionCurso', (resultadoOperacion) =>{

    if(resultadoOperacion == 1)
    {
        return "<div class='alert alert-success' role='alert'>"+
                    "<p>Curso creado exitosamente.</p>"+
                "</div>";
    }
    else if(resultadoOperacion == 2)
    {
        return "<div class='alert alert-success' role='alert'>"+
                    "<p>Curso cerrado exitosamente.</p>"+
                "</div>";
    }
    else
        return "";
});

hbs.registerHelper('validarEliminacionAspirante', (resultadoOperacion) =>{

    if(resultadoOperacion == 1)
    {
        return "<div class='alert alert-success' role='alert'>"+
                    "<p>Aspirante eliminado del curso exitosamente.</p>"+
                "</div>";
    }
    else
        return "";
});