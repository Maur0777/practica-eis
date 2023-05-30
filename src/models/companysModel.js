function getCompanys() {
    var data = '{}';
    var fs = require('fs');

    if (!fs.existsSync('companys.json')) {
        fs.writeFileSync('companys.json', '{}'); // write it back 
    }

    data = fs.readFileSync('companys.json', 'utf8');

    return JSON.parse(data);
}

function storeCompanys(company) {
    var data = "{}";

    var fs = require('fs');

    data = fs.readFileSync('companys.json', 'utf8');

    var obj = JSON.parse(data); //now it an object

    if (obj.companys !== undefined) {
        obj.companys.push(company);
    } else {
        obj = {
            companys: []
        };
        obj.companys.push(company);
    }

    json = JSON.stringify(obj); //convert it back to json

    fs.writeFileSync('companys.json', json); // write it back 

    return true;
}

function updateCompany(company, index) {
    var data = "{}";

    var fs = require('fs');

    data = fs.readFileSync('companys.json', 'utf8');

    var obj = JSON.parse(data); //now it an object

    if (obj.companys !== undefined) {

        //Update JSON Practice
        data = fs.readFileSync('practices.json', 'utf8');
        var companysList = JSON.parse(data); //now it an object

        if (companysList.practices !== undefined) {
            companysList.practices.forEach((item, i) => {
                if (JSON.stringify(item.company) == JSON.stringify(obj.companys[index])) {
                    item.company = company;
                }
            });
            json = JSON.stringify(companysList); //convert it back to json

            fs.writeFileSync('practices.json', json); // write it back 
        }
        //Update JSON Practice

        obj.companys[index] = company;

        json = JSON.stringify(obj); //convert it back to json

        fs.writeFileSync('companys.json', json); // write it back 

        return true;
    }

    return false;
}

function removeCompany(index) {
    var data = "{}";
    var r = true;

    var fs = require('fs');

    data = fs.readFileSync('companys.json', 'utf8');

    var obj = JSON.parse(data); //now it an object

    if (obj.companys !== undefined) {

        //Update JSON Practice
        data = fs.readFileSync('practices.json', 'utf8');
        var companysList = JSON.parse(data); //now it an object

        if (companysList.practices !== undefined) {
            companysList.practices.forEach((item, i) => {
                if (JSON.stringify(item.company) == JSON.stringify(obj.companys[index])) {
                    r = false;
                }
            });
        }
        //Update JSON Practice

        if (r) {
            obj.companys.splice(index, 1);;

            json = JSON.stringify(obj); //convert it back to json

            fs.writeFileSync('companys.json', json); // write it back 

        }
    }else{
        r=false;
    }

    return r;
}