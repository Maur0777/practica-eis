function getProfile() {
    var data = '{}';
    var fs = require('fs');

    if (!fs.existsSync('profile.json')) {
        fs.writeFileSync('profile.json', '{}'); // write it back 
    }

    data = fs.readFileSync('profile.json', 'utf8');

    return JSON.parse(data);
}

function updateProfile(profile) {
    var data = "{}";

    var fs = require('fs');

    data = fs.readFileSync('profile.json', 'utf8');

    var obj = JSON.parse(data); //now it an object

    obj = profile;

    json = JSON.stringify(obj); //convert it back to json

    fs.writeFileSync('profile.json', json); // write it back 

    return true;
}