const fs = require("fs");
const path = require("path");
var pdf = require("pdf-creator-node");
var html = fs.readFileSync('template.html', 'utf8');
var current_date = new Date().toISOString().slice(0, 19);

let imgSrc = 'file://' + __dirname + '/assets/logo.png';
imgSrc = path.normalize(imgSrc);  //Make sure you import part.

var options = {
    format: "A4",
    orientation: "portrait",
    border: "5mm",

    "footer": {
        "height": "20mm",
        "contents": {
            first: '',
            2: 'Second page', // Any page number is working. 1-based index
            default: '<div class="pdf-footer"><strong> Disclaimer :</strong> <i>This is a system generated report Form and does not require signature.</i>'
                + ' <hr> <i class="row-fluid">Generated and Printed on ' + current_date + '  Unitmaster </i></div>'
        }
    }
};

var users = [
    {
        name: "Shyam",
        age: "26"
    },
    {
        name: "Navjot",
        age: "26"
    },
    {
        name: "Vitthal",
        age: "26"
    }
]
var document = {
    html: html,
    data: {
        users: users
    },
    path: "./output.pdf"
};

pdf.create(document, options)
    .then(res =>
    {
        console.log(res)
    })
    .catch(error =>
    {
        console.error(error)
    });
