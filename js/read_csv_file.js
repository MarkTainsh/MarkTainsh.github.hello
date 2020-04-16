
let glob_document;
let cssFile ;
let displayClients;

function selectFile(doc, files) {
    glob_document = doc;
    if (window.FileReader) {
        // FileReader are supported.
        cssFile = files[0]
        doc.getElementById("cssfile").value = files[0].name;

    } else {
        alert('FileReader are not supported in this browser.');
    }

}

function showClients(doc) {
    glob_document = doc;

    // Set that we are showing clients
    displayClients = true;

    // Check for the various File API support.
    glob_document = doc;
    if (window.FileReader) {
        // FileReader are supported.
        const lines = getAsText(cssFile);
    } else {
        alert('FileReader are not supported in this browser.');
    }
}

function addClient(doc) {
    glob_document = doc;

    // Set that we are adding client
    displayClients = false;

    const lines = getAsText(cssFile);
}

function getAsText(fileToRead) {
    const reader = new FileReader();
    // Read file into memory as UTF-8
    reader.readAsText(fileToRead);
    // Handle errors load
    reader.onload = readFileHandler;
    reader.onerror = errorHandler;
}

function readFileHandler(event) {
    const csv = event.target.result;
    const allTextLines = csv.split(/\r\n|\n/);

    //console.log(lines);
    if (displayClients == true) {
        show_table(allTextLines);
    } else {
        add_client(allTextLines);
    }

}

function show_table(allTextLines) {
    // First convert the csv file into individual fields by creating a 2-D matrix
    let lines = [];
    for (let i = 0; i < allTextLines.length; i++) {
        let data = allTextLines[i].split(',');
        let tarr = [];
        for (let j = 0; j<data.length; j++) {
            tarr.push(data[j]);
        }
        lines.push(tarr);
    }


    let myTable= "<table><tr>";
    for (let j = 0; j < lines[0].length; j++) {
        myTable += "<td style='width: 100px; color: red;'>" + lines[0][j] + "</td>";
    }
    myTable+="</tr><tr>";

    for (let j = 0; j < lines[0].length; j++) {
        myTable += "<td style='width: 100px;'>---------------</td>";
    }
    myTable += "</tr><tr>";

    for (let i = 1;  i < lines.length; i++) {
        for (let j = 0; j < lines[i].length; j++) {
            myTable += "<td style='width: 100px;'>" + lines[i][j] + "</td>";
        }
        myTable += "</tr>";
    }
    myTable+="</table>";

    glob_document.write( myTable);
}

function add_client(allTextLines) {
    const cname = glob_document.getElementById("cname").value;
    const cage = glob_document.getElementById("cage").value;
    const cweight = glob_document.getElementById("cweight").value;
    const cheight = glob_document.getElementById("cheight").value;
    let newline = cname + "," + cage + "," + cweight + "," + cheight

    import * as fs from 'fs'
    // Now we need to append the newline at the end of the other lines i.e. allTextLines
    // var fs = require('fs')
    fs.appendFile('log.txt', 'new data', (err) => {
        if (err) {
            // append failed
        } else {
            // done
        }
    });
}

function errorHandler(evt) {
    if(evt.target.error.name == "NotReadableError") {
        alert("Cannot read file !");
    }
}