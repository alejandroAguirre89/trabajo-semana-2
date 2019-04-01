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
