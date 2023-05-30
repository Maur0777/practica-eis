function getStudents() {
    var data = '{}';
    var fs = require('fs');

    if (!fs.existsSync('students.json')) {
        fs.writeFileSync('students.json', '{}'); // write it back 
    }

    data = fs.readFileSync('students.json', 'utf8');

    return JSON.parse(data);
}

function storeStudents(student) {
    var data = "{}";

    var fs = require('fs');

    data = fs.readFileSync('students.json', 'utf8');

    var obj = JSON.parse(data); //now it an object

    if (obj.students !== undefined) {
        obj.students.push(student);
    } else {
        obj = {
            students: []
        };
        obj.students.push(student);
    }

    json = JSON.stringify(obj); //convert it back to json

    fs.writeFileSync('students.json', json); // write it back 

    return true;
}

function updateStudent(student, index) {
    var data = "{}";

    var fs = require('fs');

    data = fs.readFileSync('students.json', 'utf8');

    var obj = JSON.parse(data); //now it an object

    if (obj.students !== undefined) {

        //Update JSON Practice
        data = fs.readFileSync('practices.json', 'utf8');
        var companysList = JSON.parse(data); //now it an object

        if (companysList.practices !== undefined) {
            companysList.practices.forEach((item, i) => {
                if (JSON.stringify(item.student) == JSON.stringify(obj.students[index])) {
                    item.student = student;
                }
            });
            json = JSON.stringify(companysList); //convert it back to json

            fs.writeFileSync('practices.json', json); // write it back 
        }
        //Update JSON Practice

        obj.students[index] = student;

        json = JSON.stringify(obj); //convert it back to json

        fs.writeFileSync('students.json', json); // write it back 

        return true;
    }

    return false;
}

function removeStudent(index) {
    var data = "{}";
    var r = true;

    var fs = require('fs');

    data = fs.readFileSync('students.json', 'utf8');

    var obj = JSON.parse(data); //now it an object

    if (obj.students !== undefined) {

        //Update JSON Practice
        data = fs.readFileSync('practices.json', 'utf8');
        var companysList = JSON.parse(data); //now it an object

        if (companysList.practices !== undefined) {
            companysList.practices.forEach((item, i) => {
                if (JSON.stringify(item.student) == JSON.stringify(obj.students[index])) {
                    r = false;
                }
            });
        }
        //Update JSON Practice

        if (r) {
            obj.students.splice(index, 1);;

            json = JSON.stringify(obj); //convert it back to json

            fs.writeFileSync('students.json', json); // write it back 
        }

    }else{
        r = false;
    }

    return r;
}