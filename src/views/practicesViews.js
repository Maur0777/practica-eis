function listPractices() {
    var obj = getPractices();

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;

    if (typeof localStorage === "undefined" || localStorage === null) {
        var LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./scratch');
    }

    localStorage.setItem('practices', JSON.stringify(obj));

    let html = '<h2 class="display-14 text-white">Prácticas</h2>';

    html += '<div class="card">';

    html += '<div class="card-header">';
    html += '<a href="#" class="btn btn-sm btn-primary float-right" onclick="createPractice();">Ingresar Práctica</a>';
    html += '</div>';

    html += '<div class="card-body">';

    html += '<div class="table-responsive">';
    html += '<table id="tableSimple" class="table table-striped table-hover">';
    html += '<thead>';
    html += '    <tr>';
    html += '        <th>Cód.</th>';
    html += '        <th>Nombre Estudiante</th>';
    html += '        <th>Tutor</th>';
    html += '        <th>Empresa</th>';
    html += '        <th>Estado</th>';
    html += '        <th>Semestre</th>';
    html += '        <th>Tipo</th>';
    html += '        <th>Fecha Aprobación</th>';
    html += '        <th>Nro. Horas</th>';
    html += '        <th style="width:30% important;">Inicio</th>';
    html += '        <th>Fin 50%</th>';
    html += '        <th>Inicio 51%</th>';
    html += '        <th>Fin 100%</th>';
    html += '        <th>Tiempo Venc.</th>';
    html += '        <th>Reajuste</th>';
    html += '        <th>Tiempo Venc.</th>';
    html += '        <th>Aprobación Vicedecanato</th>';
    html += '        <th>Opciones</th>';
    html += '    </tr>';
    html += '</thead>';
    html += '<tbody>';

    if (obj.practices !== undefined) {

        obj.practices.forEach((item, index) => {
            html += '    <tr>';
            html += '        <td style="width:30% important;">' + item.student.codigo + '</td>';
            html += '        <td>' + item.student.nombre + '</td>';
            html += '        <td>' + item.teacher.nombre + '</td>';
            html += '        <td>' + item.company.nombre + '</td>';
            html += '        <td>' + item.estado + '</td>';
            html += '        <td>' + item.semestre + '</td>';
            html += '        <td>' + item.tipo + '</td>';
            html += '        <td>' + item.aprobacion + '</td>';
            html += '        <td>' + item.horas + '</td>';
            html += '        <td>' + item.inicio + '</td>';
            html += '        <td>' + item.f50 + '</td>';
            html += '        <td>' + item.i51 + '</td>';
            html += '        <td>' + item.f100 + '</td>';
            html += '        <td>';
            var f100D = new Date(item.f100);
            var todayD = new Date(today);

            if (f100D > todayD) {
                const diffTime = Math.abs(f100D - todayD);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                html += diffDays;
            }

            html += '        </td>';
            html += '        <td>' + item.reajuste + '</td>';
            html += '        <td>';

            if (item.reajuste != '') {
                var f100D = new Date(item.reajuste);

                if (f100D > todayD) {
                    const diffTime = Math.abs(f100D - todayD);
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    html += diffDays;
                }
            }

            html += '        </td>';
            html += '        <td>' + item.naprobacion + '</td>';
            html += '        <td>';
            html += '           <a href="#" class="btn btn-sm btn-warning" onclick="editPractice(' + index + ');">Editar</a>';
            html += '           <a href="#" class="btn btn-sm btn-danger" onclick="deletePractice(' + index + ');">Eliminar</a>';
            html += '        </td>';
            html += '    </tr>';
        });
    }

    html += '</tbody>';
    html += '</table>';
    html += '</div>';

    html += '</div>';

    html += '</div>';

    $("#contentDynamic").html(html);
    $("#tableSimple").DataTable({
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json"
        }
    });
}

function setDataReport() {
    let html = '<h2 class="display-14 text-white">Reporte</h2>';

    html += '<div class="card">';

    html += '<div class="card-header">';
    html += '</div>';

    html += '<div class="card-body">';

    html += '        <form class="row justify-content-center" onsubmit="return reportePractices();">';
    html += '           <div class="col-6 form-group">';
    html += '               <label for="desdeS">Inicio</label>';
    html += '               <input type="date" class="form-control" id="desdeS" required>';
    html += '           </div>';

    html += '           <div class="col-6 form-group">';
    html += '               <label for="hastaS">Hasta</label>';
    html += '               <input type="date" class="form-control" id="hastaS" required>';
    html += '           </div>';

    html += '           <div class="col-6 form-group">';
    html += '               <input type="submit" class="btn btn-sm btn-primary btn-block" value="Generar Reporte">';
    html += '           </div>';

    html += '       </form>';

    html += '</div>';

    html += '</div>';

    $("#contentDynamic").html(html);

}

function reportePractices() {
    var obj = getPractices();
    var desde = $("#desdeS").val();
    var hasta = $("#hastaS").val();

    let html = '<h2 class="display-14 text-white">Reporte</h2>';

    html += '<div class="card">';

    html += '<div class="card-header">';
    html += '</div>';

    html += '<div class="card-body">';

    html += '<div class="table-responsive">';
    html += '<table id="tableFull" class="table table-striped table-hover">';
    html += '<thead>';
    html += '    <tr>';
    html += '        <th>Cédula Estudiante</th>';
    html += '        <th>Nombre Estudiante</th>';
    html += '        <th>Código Estudiante</th>';
    html += '        <th>Cédula Tutor</th>';
    html += '        <th>Tutor</th>';
    html += '        <th>Empresa</th>';
    html += '        <th>Tipo Empresa</th>';
    html += '        <th>Semestre</th>';
    html += '        <th>Tipo Prácticas</th>';
    html += '        <th>Estado Prácticas</th>';
    html += '        <th style="width:30% important;">Inicio</th>';
    html += '        <th>Fecha Fin</th>';
    html += '        <th>Nro. Horas</th>';
    html += '    </tr>';
    html += '</thead>';
    html += '<tbody>';

    if (obj.practices !== undefined) {

        var desdeD = new Date(desde);
        var hastaD = new Date(hasta);

        obj.practices.forEach((item, index) => {
            var itemD = new Date(item.inicio);

            if (itemD >= desdeD && itemD <= hastaD) {
                html += '    <tr>';
                html += '        <td style="width:30% important;">' + item.student.cedula + '</td>';
                html += '        <td>' + item.student.nombre + '</td>';
                html += '        <td>' + item.student.codigo + '</td>';
                html += '        <td>' + item.teacher.cedula + '</td>';
                html += '        <td>' + item.teacher.nombre + '</td>';
                html += '        <td>' + item.company.nombre + '</td>';
                html += '        <td>' + item.company.tipo + '</td>';
                html += '        <td>' + item.semestre + '</td>';
                html += '        <td>' + item.tipo + '</td>';
                html += '        <td>' + item.estado + '</td>';
                html += '        <td>' + item.inicio + '</td>';
                html += '        <td>' + item.f100 + '</td>';
                html += '        <td>' + item.horas + '</td>';
                html += '    </tr>';
            }
        });
    }

    html += '</tbody>';
    html += '</table>';
    html += '</div>';

    html += '</div>';

    html += '</div>';

    $("#contentDynamic").html(html);
    $("#tableFull").DataTable({
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json"
        },
        dom: "Bfrtip",
        buttons: [
            'copy', 'excel', 'pdf'
        ]
    });
}

function createPractice() {
    var studentsList = getStudents();
    var teachersList = getTeachers();
    var companysList = getCompanys();

    if (typeof localStorage === "undefined" || localStorage === null) {
        var LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./scratch');
    }

    localStorage.setItem('studentsList', JSON.stringify(studentsList));
    localStorage.setItem('teachersList', JSON.stringify(teachersList));
    localStorage.setItem('companysList', JSON.stringify(companysList));

    let html = '<h2 class="display-14 text-white">Ingreso Práctica</h2>';

    html += '<div class="card">';

    html += '<div class="card-body">';

    html += '        <form class="row justify-content-center" onsubmit="return createPracticeJSON();">';

    html += '           <div class="col-6 form-group">';
    html += '               <label for="codigoS">Código</label>';
    html += '               <select class="selectpicker form-control" data-live-search="true" id="codigoS" required>';
    html += '                   <option value="" disabled selected>Seleccione</option>';

    if (studentsList.students !== undefined) {
        studentsList.students.forEach((item, index) => {
            html += '                   <option value="' + index + '">' + item.codigo + '</option>';
        });
    }

    html += '               </select>';
    html += '           </div>';

    html += '           <div class="col-6 form-group">';
    html += '               <label for="tutorS">Tutor</label>';
    html += '               <select class="selectpicker form-control" data-live-search="true" id="tutorS" required>';

    html += '                   <option value="" disabled selected>Seleccione</option>';

    if (teachersList.teachers !== undefined) {
        teachersList.teachers.forEach((item, index) => {
            html += '                   <option value="' + index + '">' + item.nombre + '</option>';
        });
    }

    html += '               </select>';
    html += '           </div>';

    html += '           <div class="col-6 form-group">';
    html += '               <label for="empresaS">Empresa</label>';
    html += '               <select class="selectpicker form-control" data-live-search="true" id="empresaS" required>';

    html += '                   <option value="" disabled selected>Seleccione</option>';

    if (companysList.companys !== undefined) {
        companysList.companys.forEach((item, index) => {
            html += '                   <option value="' + index + '">' + item.nombre + '</option>';
        });
    }

    html += '               </select>';
    html += '           </div>';

    html += '           <div class="col-6 form-group">';
    html += '               <label for="estadoS">Estado</label>';
    html += '               <select class="form-control" id="estadoS">';
    html += '                 <option>En proceso</option>';
    html += '                 <option>Finalizada</option>';
    html += '                 <option>Anulada</option>';
    html += '                 <option>Vencida</option>';
    html += '               </select>';
    html += '           </div>';

    html += '           <div class="col-6 form-group">';
    html += '               <label for="naprobacionS">Semestre</label>';
    html += '               <input type="text" class="form-control" id="semestreS" placeholder="Semestre" required>'
    html += '           </div>';

    html += '           <div class="col-6 form-group">';
    html += '               <label for="naprobacionS">Tipo de Práctica</label>';
    html += '               <input type="text" class="form-control" id="tipoS" placeholder="Tipo de Práctica" required>'
    html += '           </div>';

    html += '           <div class="col-6 form-group">';
    html += '               <label for="aprobacionS">Fecha Aprobación</label>';
    html += '               <input type="date" class="form-control" id="aprobacionS">';
    html += '           </div>';

    html += '           <div class="col-6 form-group">';
    html += '               <label for="horasS">Nro. Horas</label>';
    html += '               <input type="number" class="form-control" id="horasS" placeholder="Nro. Horas">';
    html += '           </div>';

    html += '           <div class="col-6 form-group">';
    html += '               <label for="inicioS">Inicio</label>';
    html += '               <input type="date" class="form-control" id="inicioS" required>';
    html += '           </div>';

    html += '           <div class="col-6 form-group">';
    html += '               <label for="inicioS">Fin 50%</label>';
    html += '               <input type="date" class="form-control" id="f50">';
    html += '           </div>';

    html += '           <div class="col-6 form-group">';
    html += '               <label for="inicioS">Inicio 51%</label>';
    html += '               <input type="date" class="form-control" id="i51">';
    html += '           </div>';

    html += '           <div class="col-6 form-group">';
    html += '               <label for="inicioS">Fin 100%</label>';
    html += '               <input type="date" class="form-control" id="f100" required>';
    html += '           </div>';

    html += '           <div class="col-6 form-group">';
    html += '               <label for="reajusteS">Reajuste</label>';
    html += '               <input type="date" class="form-control" id="reajusteS">';
    html += '           </div>';

    html += '           <div class="col-6 form-group">';
    html += '               <label for="naprobacionS">Aprobación Vicedecanato</label>';
    html += '               <input type="text" class="form-control" id="naprobacionS" placeholder="Aprobación Vicedecanato">'
    html += '           </div>';

    html += '           <div class="col-6 form-group">';
    html += '               <input type="submit" class="btn btn-sm btn-primary btn-block" value="Guardar">';
    html += '           </div>';

    html += '       </form>';

    html += '</div>';

    html += '</div>';

    $("#contentDynamic").html(html);
    $('.selectpicker').selectpicker();
}

function createPracticeJSON() {
    var studentsList = JSON.parse(localStorage.getItem('studentsList'));
    var teachersList = JSON.parse(localStorage.getItem('teachersList'));
    var companysList = JSON.parse(localStorage.getItem('companysList'));

    var practice = {
        student: studentsList.students[parseInt($("#codigoS").val())],
        teacher: teachersList.teachers[parseInt($("#tutorS").val())],
        company: companysList.companys[parseInt($("#empresaS").val())],
        estado: $("#estadoS").val(),
        semestre: $("#semestreS").val(),
        tipo: $("#tipoS").val(),
        aprobacion: $("#aprobacionS").val(),
        horas: $("#horasS").val(),
        inicio: $("#inicioS").val(),
        f50: $("#f50").val(),
        i51: $("#i51").val(),
        f100: $("#f100").val(),
        reajuste: $("#reajusteS").val(),
        naprobacion: $("#naprobacionS").val(),

    };

    if (storePractices(practice)) {
        listPractices();
        //Swal.fire("Guardar", "Guardado Correcto", "success");
    } else {
        Swal.fire("Error", "Error al Guardar", "warning");
    }

    return false;
}

function editPractice(n) {
    var data = localStorage.getItem('practices');
    var obj = JSON.parse(data);

    var studentsList = getStudents();
    var teachersList = getTeachers();
    var companysList = getCompanys();

    if (typeof localStorage === "undefined" || localStorage === null) {
        var LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./scratch');
    }

    localStorage.setItem('studentsList', JSON.stringify(studentsList));
    localStorage.setItem('teachersList', JSON.stringify(teachersList));
    localStorage.setItem('companysList', JSON.stringify(companysList));


    let html = '<h2 class="display-14 text-white">Editar Práctica</h2>';

    html += '<div class="card">';

    html += '<div class="card-body">';

    html += '        <form class="row justify-content-center" onsubmit="return editPracticeJSON(' + n + ');">';
    html += '           <div class="col-6 form-group">';
    html += '               <label for="codigoS">Código</label>';
    html += '               <select class="selectpicker form-control" data-live-search="true" id="codigoS" required>';
    html += '                   <option value="" disabled>Seleccione</option>';

    if (studentsList.students !== undefined) {
        studentsList.students.forEach((item, index) => {
            html += '                   <option value="' + index + ' "';

            if (obj.practices[n].student.codigo == item.codigo)
                html += 'selected';

            html += '>' + item.codigo + '</option>';
        });
    }

    html += '               </select>';
    html += '           </div>';

    html += '           <div class="col-6 form-group">';
    html += '               <label for="tutorS">Tutor</label>';
    html += '               <select class="selectpicker form-control" data-live-search="true" id="tutorS" required>';

    html += '                   <option value="" disabled>Seleccione</option>';

    if (teachersList.teachers !== undefined) {
        teachersList.teachers.forEach((item, index) => {
            html += '                   <option value="' + index + ' "';

            if (obj.practices[n].teacher.cedula == item.cedula)
                html += 'selected';

            html += '>' + item.nombre + '</option>';
        });
    }

    html += '               </select>';
    html += '           </div>';

    html += '           <div class="col-6 form-group">';
    html += '               <label for="empresaS">Empresa</label>';
    html += '               <select class="selectpicker form-control" data-live-search="true" id="empresaS" required>';

    html += '                   <option value="" disabled>Seleccione</option>';

    if (companysList.companys !== undefined) {
        companysList.companys.forEach((item, index) => {
            html += '                   <option value="' + index + ' "';

            if (obj.practices[n].company.nombre == item.nombre)
                html += 'selected';

            html += '>' + item.nombre + '</option>';
        });
    }

    html += '               </select>';
    html += '           </div>';

    html += '           <div class="col-6 form-group">';
    html += '               <label for="estadoS">Estado</label>';
    html += '               <select class="form-control" id="estadoS">';

    if (obj.practices[n].estado == "En proceso") {
        html += '                 <option selected>En proceso</option>';
        html += '                 <option>Finalizada</option>';
        html += '                 <option>Anulada</option>';
        html += '                 <option>Vencida</option>';
    } else if (obj.practices[n].estado == "Finalizada") {
        html += '                 <option>En proceso</option>';
        html += '                 <option selected>Finalizada</option>';
        html += '                 <option>Anulada</option>';
        html += '                 <option>Vencida</option>';
    } else if (obj.practices[n].estado == "Anulada") {
        html += '                 <option>En proceso</option>';
        html += '                 <option>Finalizada</option>';
        html += '                 <option selected>Anulada</option>';
        html += '                 <option>Vencida</option>';
    } else if (obj.practices[n].estado == "Vencida") {
        html += '                 <option>En proceso</option>';
        html += '                 <option>Finalizada</option>';
        html += '                 <option>Anulada</option>';
        html += '                 <option selected>Vencida</option>';
    }

    html += '               </select>';
    html += '           </div>';

    html += '           <div class="col-6 form-group">';
    html += '               <label for="naprobacionS">Semestre</label>';
    html += '               <input type="text" class="form-control" id="semestreS" placeholder="Semestre" required value="' + obj.practices[n].semestre + '">'
    html += '           </div>';

    html += '           <div class="col-6 form-group">';
    html += '               <label for="naprobacionS">Tipo de Práctica</label>';
    html += '               <input type="text" class="form-control" id="tipoS" placeholder="Tipo de Práctica" required value="' + obj.practices[n].tipo + '">'
    html += '           </div>';

    html += '           <div class="col-6 form-group">';
    html += '               <label for="aprobacionS">Fecha Aprobación</label>';
    html += '               <input type="date" class="form-control" id="aprobacionS" value="' + obj.practices[n].aprobacion + '">';
    html += '           </div>';

    html += '           <div class="col-6 form-group">';
    html += '               <label for="horasS">Nro. Horas</label>';
    html += '               <input type="number" class="form-control" id="horasS" placeholder="Nro. Horas" value="' + obj.practices[n].horas + '">';
    html += '           </div>';

    html += '           <div class="col-6 form-group">';
    html += '               <label for="inicioS">Inicio</label>';
    html += '               <input type="date" class="form-control" id="inicioS" required value="' + obj.practices[n].inicio + '">';
    html += '           </div>';

    html += '           <div class="col-6 form-group">';
    html += '               <label for="inicioS">Fin 50%</label>';
    html += '               <input type="date" class="form-control" id="f50" value="' + obj.practices[n].f50 + '">';
    html += '           </div>';

    html += '           <div class="col-6 form-group">';
    html += '               <label for="inicioS">Inicio 51%</label>';
    html += '               <input type="date" class="form-control" id="i51" value="' + obj.practices[n].i51 + '">';
    html += '           </div>';

    html += '           <div class="col-6 form-group">';
    html += '               <label for="inicioS">Fin 100%</label>';
    html += '               <input type="date" class="form-control" id="f100" required value="' + obj.practices[n].f100 + '">';
    html += '           </div>';

    html += '           <div class="col-6 form-group">';
    html += '               <label for="reajusteS">Reajuste</label>';
    html += '               <input type="date" class="form-control" id="reajusteS" value="' + obj.practices[n].reajuste + '">';
    html += '           </div>';

    html += '           <div class="col-6 form-group">';
    html += '               <label for="naprobacionS">Aprobación Vicedecanato</label>';
    html += '               <input type="text" class="form-control" id="naprobacionS" placeholder="Aprobación Vicedecanato" value="' + obj.practices[n].naprobacion + '">'
    html += '           </div>';

    html += '           <div class="col-6 form-group">';
    html += '               <input type="submit" class="btn btn-sm btn-primary btn-block" value="Guardar">';
    html += '           </div>';
    html += '       </form>';

    html += '</div>';

    html += '</div>';

    $("#contentDynamic").html(html);
    $('.selectpicker').selectpicker();
}

function editPracticeJSON(index) {
    var studentsList = JSON.parse(localStorage.getItem('studentsList'));
    var teachersList = JSON.parse(localStorage.getItem('teachersList'));
    var companysList = JSON.parse(localStorage.getItem('companysList'));

    var practice = {
        student: studentsList.students[parseInt($("#codigoS").val())],
        teacher: teachersList.teachers[parseInt($("#tutorS").val())],
        company: companysList.companys[parseInt($("#empresaS").val())],
        estado: $("#estadoS").val(),
        semestre: $("#semestreS").val(),
        tipo: $("#tipoS").val(),
        aprobacion: $("#aprobacionS").val(),
        horas: $("#horasS").val(),
        inicio: $("#inicioS").val(),
        f50: $("#f50").val(),
        i51: $("#i51").val(),
        f100: $("#f100").val(),
        reajuste: $("#reajusteS").val(),
        naprobacion: $("#naprobacionS").val(),

    };

    if (updatePractice(practice, index)) {
        listPractices();
    } else {
        Swal.fire("Error", "Error al Guardar", "warning");
    }

    return false;
}

function deletePractice(index) {
    Swal.fire({
        title: "¿Seguro desea eliminar?",
        text: "Una vez eliminado no se podrá recuperar",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Eliminar",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.value) {
            if (removePractice(index)) {
                listPractices();
            } else {
                Swal.fire("Error", "Error al eliminar", "warning");
            }
        }
    });

    return false;
}