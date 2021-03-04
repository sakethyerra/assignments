const fs = require("fs");
let convert = require("xml-js");
const fileName = "xmlData.xml";
const errHandler = err => console.log(err);
let dataHandler = data => {
    let json = convert.xml2json(data.toString(), {compact: false, spaces: 4});
    //console.log(json)
    let create = fs.createWriteStream('xmlConverted.json');
    create.write(json);
    console.log('New Json file has been created');
}
fs.readFile(fileName, (err, data) => {
    if(err) errHandler(err);
    dataHandler(data);
})