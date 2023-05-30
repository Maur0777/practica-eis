function getTeachers() {
    var data = '{}';
    var fs = require('fs');

    if (!fs.existsSync('teachers.json')) {
        fs.writeFileSync('teachers.json', '{}'); // write it back 
    }

    data = fs.readFileSync('teachers.json', 'utf8');
    data = JSON.parse(data);

    if (fs.existsSync('practices.json')) {
        var practicesList = fs.readFileSync('practices.json', 'utf8');
        practicesList = JSON.parse(practicesList);

        if (data.teachers !== undefined) {
            data.npracticas = [];
            data.teachers.forEach((item2, j) => {
                var cont = 0;
                
                if (practicesList.practices != undefined){

                    practicesList.practices.forEach((item, i) => {
                        if (JSON.stringify(item2) == JSON.stringify(item.teacher)) {
                            cont++;
                        }
                    });
                }
                
                data.npracticas[j] = cont;
            });
        }

    }


    return data;
}

function storeTeachers(teacher) {
    var data = "{}";

    var fs = require('fs');

    data = fs.readFileSync('teachers.json', 'utf8');

    var obj = JSON.parse(data); //now it an object

    if (obj.teachers !== undefined) {
        obj.teachers.push(teacher);
    } else {
        obj = {
            teachers: []
        };
        obj.teachers.push(teacher);
    }

    json = JSON.stringify(obj); //convert it back to json

    fs.writeFileSync('teachers.json', json); // write it back 

    return true;
}

function updateTeacher(teacher, index) {
    var data = "{}";

    var fs = require('fs');

    data = fs.readFileSync('teachers.json', 'utf8');

    var obj = JSON.parse(data); //now it an object

    if (obj.teachers !== undefined) {

        //Update JSON Practice
        data = fs.readFileSync('practices.json', 'utf8');
        var companysList = JSON.parse(data); //now it an object

        if (companysList.practices !== undefined) {
            companysList.practices.forEach((item, i) => {
                if (JSON.stringify(item.teacher) == JSON.stringify(obj.teachers[index])) {
                    item.teacher = teacher;
                }
            });
            json = JSON.stringify(companysList); //convert it back to json

            fs.writeFileSync('practices.json', json); // write it back 
        }
        //Update JSON Practice

        obj.teachers[index] = teacher;

        json = JSON.stringify(obj); //convert it back to json

        fs.writeFileSync('teachers.json', json); // write it back 

        return true;
    }

    return false;
}

function removeTeacher(index) {
    var data = "{}";
    var r = true;

    var fs = require('fs');

    data = fs.readFileSync('teachers.json', 'utf8');

    var obj = JSON.parse(data); //now it an object

    if (obj.teachers !== undefined) {

        //Update JSON Practice
        data = fs.readFileSync('practices.json', 'utf8');
        var companysList = JSON.parse(data); //now it an object

        if (companysList.practices !== undefined) {
            companysList.practices.forEach((item, i) => {
                if (JSON.stringify(item.teacher) == JSON.stringify(obj.teachers[index])) {
                    r = false;
                }
            });
        }
        //Update JSON Practice

        if (r) {
            obj.teachers.splice(index, 1);;

            json = JSON.stringify(obj); //convert it back to json

            fs.writeFileSync('teachers.json', json); // write it back 
        }
    } else {
        r = false;
    }

    return r;
}