function profile() {

    var obj = getProfile()

    let html = '<h2 class="display-14 text-white">Editar Perfil</h2>';

    html += '<div class="card">';

    html += '<div class="card-body">';

    html += '        <form class="row justify-content-center" onsubmit="return editProfileJSON();">';

    if (obj.nombre !== undefined) {
        html += '           <div class="col-6 form-group">';
        html += '               <label for="codigoS">Secretaria</label>';
        html += '               <input type="text" class="form-control" id="nombreS" placeholder="Secretaria" value="' + obj.nombre + '" required>';
        html += '           </div>';
        html += '           <div class="col-6 form-group">';
        html += '               <label for="codigoS">Faculta</label>';
        html += '               <input type="text" class="form-control" id="escuelaS" placeholder="Faculta" value="' + obj.escuela + '" required>';
        html += '           </div>';
        html += '           <div class="col-6 form-group">';
        html += '               <input type="submit" class="btn btn-sm btn-primary btn-block" value="Guardar">';
        html += '           </div>';
    }else {
        html += '           <div class="col-6 form-group">';
        html += '               <label for="codigoS">Secretaria</label>';
        html += '               <input type="text" class="form-control" id="nombreS" placeholder="Secretaria" value="" required>';
        html += '           </div>';
        html += '           <div class="col-6 form-group">';
        html += '               <label for="codigoS">Faculta</label>';
        html += '               <input type="text" class="form-control" id="escuelaS" placeholder="Facultad" value="" required>';
        html += '           </div>';
        html += '           <div class="col-6 form-group">';
        html += '               <input type="submit" class="btn btn-sm btn-primary btn-block" value="Guardar">';
        html += '           </div>';
    }

    html += '       </form>';

    html += '</div>';

    html += '</div>';

    $("#contentDynamic").html(html);
}

function editProfileJSON() {
    var profile = {
        nombre: $("#nombreS").val(),
        escuela: $("#escuelaS").val(),
    };

    if (updateProfile(profile)) {
        Swal.fire("Guardado", "Perfil Guardado", "success");
        var data = "{}";
        
        data = fs.readFileSync("profile.json", "utf8");

        var obj = JSON.parse(data); //now it an object

        if (obj.nombre !== undefined) {
          $("#nameUser").html(obj.nombre);
          $("#escuelaUser").html(obj.escuela);
        } else{
          $("#nameUser").html("Usuario");
          $("#escuelaUser").html("Escuela");
        }
    } else {
        Swal.fire("Error", "Error al Guardar", "warning");
    }

    return false;
}