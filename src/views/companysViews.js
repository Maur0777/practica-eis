function listCompanys() {
    var obj = getCompanys();

    if (typeof localStorage === "undefined" || localStorage === null) {
        var LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./scratch');
    }

    localStorage.setItem('companys', JSON.stringify(obj));

    let html = '<h2 class="display-14 text-white">Empresas</h2>';

    html += '<div class="card">';

    html += '<div class="card-header">';
    html += '<a href="#" class="btn btn-sm btn-primary float-right" onclick="createCompany();">Ingresar Empresa</a>';
    html += '</div>';

    html += '<div class="card-body">';

    html += '<div class="table-responsive">';
    html += '<table id="tableSimple" class="table table-striped table-hover">';
    html += '<thead>';
    html += '    <tr>';
    html += '        <th>Nombre</th>';
    html += '        <th>Ciudad</th>';
    html += '        <th>Teléfono</th>';
    html += '        <th>Celular</th>';
    html += '        <th>Tipo</th>';
    html += '        <th>Sector</th>';
    html += '        <th>Campo</th>';
    html += '        <th>Representante</th>';
    html += '        <th>Opciones</th>';
    html += '    </tr>';
    html += '</thead>';
    html += '<tbody>';

    if (obj.companys !== undefined) {

        obj.companys.forEach((item, index) => {
            html += '    <tr>';
            html += '        <td>' + item.nombre + '</td>';
            html += '        <td>' + item.ciudad + '</td>';
            html += '        <td>' + item.telefono + '</td>';
            html += '        <td>' + item.celular + '</td>';
            html += '        <td>' + item.tipo + '</td>';
            html += '        <td>' + item.sector + '</td>';
            html += '        <td>' + item.campo + '</td>';
            html += '        <td>' + item.representante + '</td>';
            html += '        <td>';
            html += '           <a href="#" class="btn btn-sm btn-warning" onclick="editCompany(' + index + ');">Editar</a>';
            html += '           <a href="#" class="btn btn-sm btn-danger" onclick="deleteCompany(' + index + ');">Eliminar</a>';
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

function createCompany() {
    let html = '<h2 class="display-14 text-white">Ingreso Empresa</h2>';

    html += '<div class="card">';

    html += '<div class="card-body">';

    html += '        <form class="row justify-content-center" onsubmit="return createCompanyJSON();">';
    html += '           <div class="col-6 form-group">';
    html += '               <label for="nombreS">Nombre</label>';
    html += '               <input type="text" class="form-control" id="nombreS" placeholder="Nombre" required>';
    html += '           </div>';
    html += '           <div class="col-6 form-group">';
    html += '               <label for="ciudadS">Ciudad</label>';
    html += '               <input type="text" class="form-control" id="ciudadS" placeholder="Ciudad" list="ciudadList">';
    html += '               <datalist id="ciudadList">';
    html += '                   <option>Riobamba</option>';
    html += '                   <option>Guano</option>';
    html += '                   <option>Ambato</option>';
    html += '                   <option>Quito</option>';
    html += '               </datalist>';
    html += '           </div>';
    html += '           <div class="col-6 form-group">';
    html += '               <label for="telefonoS">Teléfono</label>';
    html += '               <input type="text" class="form-control" id="telefonoS" placeholder="Teléfono">';
    html += '           </div>';
    html += '           <div class="col-6 form-group">';
    html += '               <label for="celularS">Celular</label>';
    html += '               <input type="text" class="form-control" id="celularS" placeholder="Celular">';
    html += '           </div>';
    html += '           <div class="col-6 form-group">';
    html += '               <label for="tipoS">Tipo</label>';
    html += '               <select class="form-control" id="tipoS">';
    html += '                 <option>Público</option>';
    html += '                 <option>Privada</option>';
    html += '                 <option>Tercer Sector</option>';
    html += '                 <option>Organismos Institucionales</option>';
    html += '                 <option>Otros</option>';
    html += '               </select>';
    html += '           </div>';
    html += '           <div class="col-6 form-group">';
    html += '               <label for="sectorS">Sector Económico</label>';
    html += '               <select class="form-control" id="sectorS">';
    html += '                 <option>AGRICULTURA, GANADERÍA, SELVICULTURA Y PESCA</option>';
    html += '                 <option>COMERCIO</option>';
    html += '                 <option>EXPLOTACIÓN DE MINAS Y CANTERAS</option>';
    html += '                 <option>INDUSTRIAS MANUFACTURERAS</option>';
    html += '                 <option>SERVICIOS</option>';
    html += '               </select>';
    html += '           </div>';
    html += '           <div class="col-6 form-group">';
    html += '               <label for="campoS">Campo Específico</label>';
    html += '               <input type="text" class="form-control" id="campoS" placeholder="Campo Específico" list="campoList" required>';
    html += '               <datalist id="campoList">';
    html += '                   <option>TECNOLOGÍAS DE LA INFORMACIÓN</option>';
    html += '               </datalist>';
    html += '           </div>';
    html += '           <div class="col-6 form-group">';
    html += '               <label for="nombreS">Representante</label>';
    html += '               <input type="text" class="form-control" id="representanteS" placeholder="Representante">';
    html += '           </div>';
    html += '           <div class="col-6 form-group">';
    html += '               <input type="submit" class="btn btn-sm btn-primary btn-block" value="Guardar">';
    html += '           </div>';
    html += '       </form>';

    html += '</div>';

    html += '</div>';

    $("#contentDynamic").html(html);
}

function createCompanyJSON() {
    var company = {
        nombre: $("#nombreS").val(),
        ciudad: $("#ciudadS").val(),
        telefono: $("#telefonoS").val(),
        celular: $("#celularS").val(),
        tipo: $("#tipoS").val(),
        sector: $("#sectorS").val(),
        campo: $("#campoS").val(),
        representante: $("#representanteS").val()
    };

    if (storeCompanys(company)) {
        listCompanys();
        //Swal.fire("Guardar", "Guardado Correcto", "success");
    } else {
        Swal.fire("Error", "Error al Guardar", "warning");
    }

    return false;
}

function editCompany(index) {
    var data = localStorage.getItem('companys');
    var obj = JSON.parse(data);
    let html = '<h2 class="display-14 text-white">Editar Empresa</h2>';

    html += '<div class="card">';

    html += '<div class="card-body">';

    html += '        <form class="row justify-content-center" onsubmit="return editCompanyJSON(' + index + ');">';
    html += '           <div class="col-6 form-group">';
    html += '               <label for="nombreS">Nombre</label>';
    html += '               <input type="text" class="form-control" id="nombreS" placeholder="Nombre" required value="' + obj.companys[index].nombre + '">';
    html += '           </div>';
    html += '           <div class="col-6 form-group">';
    html += '               <label for="ciudadS">Ciudad</label>';
    html += '               <input type="text" class="form-control" id="ciudadS" placeholder="Ciudad" list="ciudadList" value="' + obj.companys[index].ciudad + '">';
    html += '               <datalist id="ciudadList">';
    html += '                   <option>Riobamba</option>';
    html += '                   <option>Guano</option>';
    html += '                   <option>Ambato</option>';
    html += '                   <option>Quito</option>';
    html += '               </datalist>';
    html += '           </div>';
    html += '           <div class="col-6 form-group">';
    html += '               <label for="telefonoS">Teléfono</label>';
    html += '               <input type="text" class="form-control" id="telefonoS" placeholder="Teléfono" value="' + obj.companys[index].telefono + '">';
    html += '           </div>';
    html += '           <div class="col-6 form-group">';
    html += '               <label for="celularS">Celular</label>';
    html += '               <input type="text" class="form-control" id="celularS" placeholder="Celular" value="' + obj.companys[index].celular + '">';
    html += '           </div>';
    html += '           <div class="col-6 form-group">';
    html += '               <label for="tipoS">Tipo</label>';
    html += '               <select class="form-control" id="tipoS">';

    if (obj.companys[index].tipo == "Público") {
        html += '                 <option>Público</option>';
        html += '                 <option>Privada</option>';
        html += '                 <option>Tercer Sector</option>';
        html += '                 <option>Organismos Institucionales</option>';
        html += '                 <option>Otros</option>';
    } else if (obj.companys[index].tipo == "Privada") {
        html += '                 <option>Público</option>';
        html += '                 <option>Privada</option>';
        html += '                 <option>Tercer Sector</option>';
        html += '                 <option>Organismos Institucionales</option>';
        html += '                 <option>Otros</option>';
    } else if (obj.companys[index].tipo == "Tercer Sector") {
        html += '                 <option>Público</option>';
        html += '                 <option>Privada</option>';
        html += '                 <option>Tercer Sector</option>';
        html += '                 <option>Organismos Institucionales</option>';
        html += '                 <option>Otros</option>';
    } else if (obj.companys[index].tipo == "Organismos Institucionales") {
        html += '                 <option>Público</option>';
        html += '                 <option>Privada</option>';
        html += '                 <option>Tercer Sector</option>';
        html += '                 <option>Organismos Institucionales</option>';
        html += '                 <option>Otros</option>';
    } else if (obj.companys[index].tipo == "Otros") {
        html += '                 <option>Público</option>';
        html += '                 <option>Privada</option>';
        html += '                 <option>Tercer Sector</option>';
        html += '                 <option>Organismos Institucionales</option>';
        html += '                 <option>Otros</option>';
    }

    html += '               </select>';
    html += '           </div>';
    html += '           <div class="col-6 form-group">';
    html += '               <label for="sectorS">Sector Económico</label>';
    html += '               <select class="form-control" id="sectorS">';

    if (obj.companys[index].sector == "AGRICULTURA, GANADERÍA, SELVICULTURA Y PESCA") {
        html += '                 <option selected>AGRICULTURA, GANADERÍA, SELVICULTURA Y PESCA</option>';
        html += '                 <option>COMERCIO</option>';
        html += '                 <option>EXPLOTACIÓN DE MINAS Y CANTERAS</option>';
        html += '                 <option>INDUSTRIAS MANUFACTURERAS</option>';
        html += '                 <option>SERVICIOS</option>';
    } else if (obj.companys[index].sector == "COMERCIO") {
        html += '                 <option>AGRICULTURA, GANADERÍA, SELVICULTURA Y PESCA</option>';
        html += '                 <option selected>COMERCIO</option>';
        html += '                 <option>EXPLOTACIÓN DE MINAS Y CANTERAS</option>';
        html += '                 <option>INDUSTRIAS MANUFACTURERAS</option>';
        html += '                 <option>SERVICIOS</option>';
    } else if (obj.companys[index].sector == "EXPLOTACIÓN DE MINAS Y CANTERAS") {
        html += '                 <option>AGRICULTURA, GANADERÍA, SELVICULTURA Y PESCA</option>';
        html += '                 <option>COMERCIO</option>';
        html += '                 <option selected>EXPLOTACIÓN DE MINAS Y CANTERAS</option>';
        html += '                 <option>INDUSTRIAS MANUFACTURERAS</option>';
        html += '                 <option>SERVICIOS</option>';
    } else if (obj.companys[index].sector == "INDUSTRIAS MANUFACTURERAS") {
        html += '                 <option>AGRICULTURA, GANADERÍA, SELVICULTURA Y PESCA</option>';
        html += '                 <option>COMERCIO</option>';
        html += '                 <option>EXPLOTACIÓN DE MINAS Y CANTERAS</option>';
        html += '                 <option selected>INDUSTRIAS MANUFACTURERAS</option>';
        html += '                 <option>SERVICIOS</option>';
    } else if (obj.companys[index].sector == "SERVICIOS") {
        html += '                 <option>AGRICULTURA, GANADERÍA, SELVICULTURA Y PESCA</option>';
        html += '                 <option>COMERCIO</option>';
        html += '                 <option>EXPLOTACIÓN DE MINAS Y CANTERAS</option>';
        html += '                 <option>INDUSTRIAS MANUFACTURERAS</option>';
        html += '                 <option selected>SERVICIOS</option>';
    } else{
        html += '                 <option>AGRICULTURA, GANADERÍA, SELVICULTURA Y PESCA</option>';
        html += '                 <option>COMERCIO</option>';
        html += '                 <option>EXPLOTACIÓN DE MINAS Y CANTERAS</option>';
        html += '                 <option>INDUSTRIAS MANUFACTURERAS</option>';
        html += '                 <option>SERVICIOS</option>';
    }

    html += '               </select>';
    html += '           </div>';
    html += '           <div class="col-6 form-group">';
    html += '               <label for="campoS">Campo Específico</label>';
    html += '               <input type="text" class="form-control" id="campoS" placeholder="Campo Específico" list="campoList" required value="' + obj.companys[index].campo + '">';
    html += '               <datalist id="campoList">';
    html += '                   <option>TECNOLOGÍAS DE LA INFORMACIÓN</option>';
    html += '               </datalist>';
    html += '           </div>';
    html += '           <div class="col-6 form-group">';
    html += '               <label for="nombreS">Representante</label>';
    html += '               <input type="text" class="form-control" id="representanteS" placeholder="Representante" value="' + obj.companys[index].representante + '">';
    html += '           </div>';
    html += '           <div class="col-6 form-group">';
    html += '               <input type="submit" class="btn btn-sm btn-primary btn-block" value="Guardar">';
    html += '           </div>';
    html += '       </form>';

    html += '</div>';

    html += '</div>';

    $("#contentDynamic").html(html);
}

function editCompanyJSON(index) {
    var company = {
        nombre: $("#nombreS").val(),
        ciudad: $("#ciudadS").val(),
        telefono: $("#telefonoS").val(),
        celular: $("#celularS").val(),
        tipo: $("#tipoS").val(),
        sector: $("#sectorS").val(),
        campo: $("#campoS").val(),
        representante: $("#representanteS").val()
    };

    if (updateCompany(company, index)) {
        listCompanys();
    } else {
        Swal.fire("Error", "Error al Guardar", "warning");
    }

    return false;
}

function deleteCompany(index) {
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
            if (removeCompany(index)) {
                listCompanys();
            } else {
                Swal.fire("Error", "Error al eliminar <br/> Existen registros dependientes.", "warning");
            }
        }
    });

    return false;
}