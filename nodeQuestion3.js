const request = require('request');
const fs = require("fs");
request('http://www.google.com', function (error, response, body) {
  console.error(`error: ${error}`); // Print the error if one occurred
  console.log(`statusCode: ${response.statusCode}`); // Print the response status code if a response was received
  let create = fs.createWriteStream('google.html');
    create.write(body);
    console.log('New Json file has been created');
});