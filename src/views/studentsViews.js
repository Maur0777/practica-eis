function listStudents() {
    var obj = getStudents();

    if (typeof localStorage === "undefined" || localStorage === null) {
        var LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./scratch');
    }

    localStorage.setItem('students', JSON.stringify(obj));

    let html = '<h2 class="display-14 text-white">Estudiantes</h2>';

    html += '<div class="card">';

    html += '<div class="card-header">';
    html += '<a href="#" class="btn btn-sm btn-primary float-right" onclick="createStudent();">Ingresar Estudiante</a>';
    html += '</div>';

    html += '<div class="card-body">';

    html += '<div class="table-responsive">';
    html += '<table id="tableSimple" class="table table-striped table-hover">';
    html += '<thead>';
    html += '    <tr>';
    html += '        <th>Cód.</th>';
    html += '        <th>Cédula</th>';
    html += '        <th>Nombre</th>';
    html += '        <th>Sexo</th>';
    html += '        <th>Teléfono</th>';
    html += '        <th>Opciones</th>';
    html += '    </tr>';
    html += '</thead>';
    html += '<tbody>';

    if (obj.students !== undefined) {

        obj.students.forEach((item, index) => {
            html += '    <tr>';
            html += '        <td>' + item.codigo + '</td>';
            html += '        <td>' + item.cedula + '</td>';
            html += '        <td>' + item.nombre + '</td>';
            html += '        <td>' + item.sexo + '</td>';
            html += '        <td>' + item.telefono + '</td>';
            html += '        <td>';
            html += '           <a href="#" class="btn btn-sm btn-warning" onclick="editStudent(' + index + ');">Editar</a>';
            html += '           <a href="#" class="btn btn-sm btn-danger" onclick="deleteStudent(' + index + ');">Eliminar</a>';
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
    $("#tableFull").DataTable({
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json"
        },
        dom: "Bfrtip",
        buttons: [
            {
                extend: "excel",
                exportOptions: { columns: "th:not(:last-child)" }
            },
            {
                extend: "pdf",
                exportOptions: { columns: "th:not(:last-child)" }
            }
        ]
    });
    $("#tableSimple").DataTable({
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json"
        }
    });
}

function createStudent() {
    let html = '<h2 class="display-14 text-white">Ingreso Estudiante</h2>';

    html += '<div class="card">';

    html += '<div class="card-body">';

    html += '        <form class="row justify-content-center" onsubmit="return createStudentJSON();">';
    html += '           <div class="col-6 form-group">';
    html += '               <label for="codigoS">Código</label>';
    html += '               <input type="text" required pattern="[0-9]{4}" maxlength="4"  title="Ingrese solo números" class="form-control" id="codigoS" placeholder="Código" required>';
    html += '           </div>';
    html += '           <div class="col-6 form-group">';
    html += '               <label for="cedulaS">Cédula</label>';
    html += '               <input type="text" required pattern="[0-9]{10}" maxlength="10"  title="Ingrese Cédula sin guión" class="form-control" id="cedulaS" placeholder="Cédula" required>';
    html += '           </div>';
    html += '           <div class="col-6 form-group">';
    html += '               <label for="nombreS">Nombre</label>';
    html += '               <input type="text" class="form-control" id="nombreS" placeholder="Nombre" required>';
    html += '           </div>';
    html += '           <div class="col-6 form-group">';
    html += '               <label for="sexoS">Sexo</label>';
    html += '               <select class="form-control" id="sexoS">';
    html += '                 <option>Masculino</option>';
    html += '                 <option>Femenino</option>';
    html += '               </select>';
    html += '           </div>';
    html += '           <div class="col-6 form-group">';
    html += '               <label for="telefonoS">Teléfono</label>';
    html += '               <input type="text" required pattern="[0-9]{10}" maxlength="10" title="Ingrese solo números"class="form-control" id="telefonoS" placeholder="Teléfono">';
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

function createStudentJSON() {
    var student = {
        codigo: $("#codigoS").val(),
        cedula: $("#cedulaS").val(),
        nombre: $("#nombreS").val(),
        sexo: $("#sexoS").val(),
        telefono: $("#telefonoS").val()
    };

    if (storeStudents(student)) {
        listStudents();
        //Swal.fire("Guardar", "Guardado Correcto", "success");
    } else {
        Swal.fire("Error", "Error al Guardar", "warning");
    }

    return false;
}

function editStudent(index) {
    var data = localStorage.getItem('students');
    var obj = JSON.parse(data);
    let html = '<h2 class="display-14 text-white">Editar Estudiante</h2>';

    html += '<div class="card">';

    html += '<div class="card-body">';

    html += '        <form class="row justify-content-center" onsubmit="return editStudentJSON(' + index + ');">';
    html += '           <div class="col-6 form-group">';
    html += '               <label for="codigoS">Código</label>';
    html += '               <input type="text" required pattern="[0-9]{4}" maxlength="4" title="Ingrese solo números" class="form-control" id="codigoS" maxlength="4" placeholder="Código" value="' + obj.students[index].codigo + '" required>';
    html += '           </div>';
    html += '           <div class="col-6 form-group">';
    html += '               <label for="cedulaS">Cédula</label>';
    html += '               <input type="text" required pattern="[0-9]{10}" maxlength="10"  title="Ingrese Cédula sin guión" class="form-control" id="cedulaS" placeholder="Cédula" value="' + obj.students[index].cedula + '" required>';
    html += '           </div>';
    html += '           <div class="col-6 form-group">';
    html += '               <label for="nombreS">Nombre</label>';
    html += '               <input type="text" class="form-control" id="nombreS" placeholder="Nombre" value="' + obj.students[index].nombre + '" required>';
    html += '           </div>';
    html += '           <div class="col-6 form-group">';
    html += '               <label for="sexoS">Sexo</label>';
    html += '               <select class="form-control" id="sexoS">';

    if (obj.students[index].sexo == 'Masculino') {
        html += '                 <option selected>Masculino</option>';
        html += '                 <option>Femenino</option>';
    } else {
        html += '                 <option>Masculino</option>';
        html += '                 <option selected>Femenino</option>';
    }

    html += '               </select>';
    html += '           </div>';
    html += '           <div class="col-6 form-group">';
    html += '               <label for="telefonoS">Teléfono</label>';
    html += '               <input type="text" required pattern="[0-9]{10}" maxlength="10"  title="Ingrese solo números" class="form-control" id="telefonoS" placeholder="Teléfono" value="' + obj.students[index].telefono + '">';
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

function editStudentJSON(index) {
    var student = {
        codigo: $("#codigoS").val(),
        cedula: $("#cedulaS").val(),
        nombre: $("#nombreS").val(),
        sexo: $("#sexoS").val(),
        telefono: $("#telefonoS").val()
    };

    if (updateStudent(student, index)) {
        listStudents();
    } else {
        Swal.fire("Error", "Error al Guardar", "warning");
    }

    return false;
}

function deleteStudent(index) {
    Swal.fire({
        title: `¿Seguro desea eliminar al estudiante ${index} ?`,
        text: "Una vez eliminado no se podrá recuperar",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Eliminar",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.value) {
            if (removeStudent(index)) {
                listStudents();
            } else {
                Swal.fire("Error", "Error al eliminar <br/> Existen registros dependientes.", "warning");
            }
        }
    });

    return false;
}