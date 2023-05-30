function getPractices() {
    var data = '{}';
    var fs = require('fs');

    if (!fs.existsSync('practices.json')) {
        fs.writeFileSync('practices.json', '{}'); // write it back 
    }

    data = fs.readFileSync('practices.json', 'utf8');

    return JSON.parse(data);
}

function storePractices(practice) {
    var data = "{}";

    var fs = require('fs');

    data = fs.readFileSync('practices.json', 'utf8');

    var obj = JSON.parse(data); //now it an object

    if (obj.practices !== undefined) {
        obj.practices.push(practice);
    } else {
        obj = {
            practices: []
        };
        obj.practices.push(practice);
    }

    json = JSON.stringify(obj); //convert it back to json

    fs.writeFileSync('practices.json', json); // write it back 

    return true;
}

function updatePractice(practice, index) {
    var data = "{}";

    var fs = require('fs');

    data = fs.readFileSync('practices.json', 'utf8');

    var obj = JSON.parse(data); //now it an object

    if (obj.practices !== undefined) {
        obj.practices[index] = practice;

        json = JSON.stringify(obj); //convert it back to json

        fs.writeFileSync('practices.json', json); // write it back 

        return true;
    } 

    return false;
}

function removePractice(index){
    var data = "{}";

    var fs = require('fs');

    data = fs.readFileSync('practices.json', 'utf8');

    var obj = JSON.parse(data); //now it an object

    if (obj.practices !== undefined) {
        obj.practices.splice(index, 1);;

        json = JSON.stringify(obj); //convert it back to json

        fs.writeFileSync('practices.json', json); // write it back 

        return true;
    }

    return false;
}