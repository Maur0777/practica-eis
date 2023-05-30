function listTeachers() {
    var obj = getTeachers();

    if (typeof localStorage === "undefined" || localStorage === null) {
        var LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./scratch');
    }

    localStorage.setItem('teachers', JSON.stringify(obj));

    let html = '<h2 class="display-14 text-white">Docentes</h2>';

    html += '<div class="card">';

    html += '<div class="card-header">';
    html += '<a href="#" class="btn btn-sm btn-primary float-right" onclick="createTeacher();">Ingresar Docente</a>';
    html += '</div>';

    html += '<div class="card-body">';

    html += '<div class="table-responsive">';
    html += '<table id="tableSimple" class="table table-striped table-hover">';
    html += '<thead>';
    html += '    <tr>';
    html += '        <th>Cédula</th>';
    html += '        <th>Nombre</th>';
    html += '        <th>Tipo</th>';
    html += '        <th>Tutorias</th>';
    html += '        <th>Opciones</th>';
    html += '    </tr>';
    html += '</thead>';
    html += '<tbody>';

    if (obj.teachers !== undefined) {

        obj.teachers.forEach((item, index) => {
            html += '    <tr>';
            html += '        <td>' + item.cedula + '</td>';
            html += '        <td>' + item.nombre + '</td>';
            html += '        <td>' + item.tipo + '</td>';
            html += '        <td>' + obj.npracticas[index] + '</td>';
            html += '        <td>';
            html += '           <a href="#" class="btn btn-sm btn-warning" onclick="editTeacher(' + index + ');">Editar</a>';
            html += '           <a href="#" class="btn btn-sm btn-danger" onclick="deleteTeacher(' + index + ');">Eliminar</a> ';
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

function createTeacher() {
    let html = '<h2 class="display-14 text-white">Ingreso Docente</h2>';

    html += '<div class="card">';

    html += '<div class="card-body">';

    html += '        <form class="row justify-content-center" onsubmit="return createTeacherJSON();">';
    html += '           <div class="col-6 form-group">';
    html += '               <label for="cedulaS">Cédula</label>';
    html += '               <input type="text" class="form-control" id="cedulaS" placeholder="Cédula" required>';
    html += '           </div>';
    html += '           <div class="col-6 form-group">';
    html += '               <label for="nombreS">Nombre</label>';
    html += '               <input type="text" class="form-control" id="nombreS" placeholder="Nombre" required>';
    html += '           </div>';
    html += '           <div class="col-6 form-group">';
    html += '               <label for="tipoS">Tipo</label>';
    html += '               <select class="form-control" id="tipoS">';
    html += '                 <option>Nombramiento</option>';
    html += '                 <option>Contrato</option>';
    html += '               </select>';
    html += '           </div>';
    html += '           <div class="col-6 form-group">';
    html += '           </div>';
    html += '           <div class="col-6 form-group">';
    html += '               <input type="submit" class="btn btn-sm btn-primary btn-block" value="Guardar">';
    html += '           </div>';
    html += '       </form>';

    html += '</div>';

    html += '</div>';

    $("#contentDynamic").html(html);
}

function createTeacherJSON() {
    var teacher = {
        cedula: $("#cedulaS").val(),
        nombre: $("#nombreS").val(),
        tipo: $("#tipoS").val()

    };

    if (storeTeachers(teacher)) {
        listTeachers();
        //Swal.fire("Guardar", "Guardado Correcto", "success");
    } else {
        Swal.fire("Error", "Error al Guardar", "warning");
    }

    return false;
}

function editTeacher(index) {
    var data = localStorage.getItem('teachers');
    var obj = JSON.parse(data);
    let html = '<h2 class="display-14 text-white">Editar Estudiante</h2>';

    html += '<div class="card">';

    html += '<div class="card-body">';

    html += '        <form class="row justify-content-center" onsubmit="return editTeacherJSON(' + index + ');">';
    html += '           <div class="col-6 form-group">';
    html += '               <label for="cedulaS">Cédula</label>';
    html += '               <input type="text" class="form-control" id="cedulaS" placeholder="Cédula" value="' + obj.teachers[index].cedula + '" required>';
    html += '           </div>';
    html += '           <div class="col-6 form-group">';
    html += '               <label for="nombreS">Nombre</label>';
    html += '               <input type="text" class="form-control" id="nombreS" placeholder="Nombre" value="' + obj.teachers[index].nombre + '" required>';
    html += '           </div>';
    html += '           <div class="col-6 form-group">';
    html += '               <label for="tipoS">Tipo</label>';
    html += '               <select class="form-control" id="tipoS">';

    if (obj.teachers[index].tipo == 'Nombramiento') {
        html += '                 <option selected>Nombramiento</option>';
        html += '                 <option>Contrato</option>';
    } else {
        html += '                 <option>Nombramiento</option>';
        html += '                 <option selected>Contrato</option>';
    }

    html += '               </select>';
    html += '           </div>';
    html += '           <div class="col-6 form-group">';
    html += '           </div>';
    html += '           <div class="col-6 form-group">';
    html += '               <input type="submit" class="btn btn-sm btn-primary btn-block" value="Guardar">';
    html += '           </div>';
    html += '       </form>';

    html += '</div>';

    html += '</div>';

    $("#contentDynamic").html(html);
}

function editTeacherJSON(index) {
    var teacher = {
        cedula: $("#cedulaS").val(),
        nombre: $("#nombreS").val(),
        tipo: $("#tipoS").val()

    };

    if (updateTeacher(teacher, index)) {
        listTeachers();
    } else {
        Swal.fire("Error", "Error al Guardar", "warning");
    }

    return false;
}

function deleteTeacher(index) {
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
            if (removeTeacher(index)) {
                listTeachers();
            } else {
                Swal.fire("Error", "Error al eliminar <br/> Existen registros dependientes.", "warning");
            }
        }
    });

    return false;
}