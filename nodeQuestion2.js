const Handlebars = require("Handlebars");
const fs = require('fs');
const format = require('xml-formatter');
let source = `<products>{{#each this}}<product><baseId>{{this.baseId}}</baseId><isActive>{{this.isActive}}</isActive>
<features>{{#each feature}}<feature>{{this}}</feature>{{/each}}</features>
<contentType>{{#each contentType}}<contentTypeValue>{{value}}</contentTypeValue>{{/each}}</contentType>
<searchTerms>{{#each searchTerms}}<searchTermValue>{{this}}</searchTermValue>{{/each}}</searchTerms>
{{#each childProducts}}<childProducts><baseId>{{baseId}}</baseId><isActive>{{isActive}}</isActive>
<features>{{#each feature}}<feature>{{this}}</feature>{{/each}}</features>
<contentType>{{#each contentType}}<contentTypeValue>{{value}}</contentTypeValue>{{/each}}</contentType>
<searchTerms>{{#each searchTerms}}<searchTermValue>{{this}}</searchTermValue>{{/each}}</searchTerms>
</childProducts>{{/each}}</product>{{/each}}</products>`;
let template = Handlebars.compile(source);

let data = [
    {
      "baseId": "1",
      "feature": {
        "1": "parent",
        "2": "first entry"
      },
      "contentType": {
        "1": {
          "value": "pure"
        },
        "2": {
          "value": "mix"
        }
      },
      "isActive": true,
      "childProducts": [
        {
          "baseId": "1-1",
          "isActive": true
        },
        {
          "baseId": "1-2",
          "isActive": false
        },
        {
          "baseId": "1-3",
          "isActive": true
        },
        {
          "baseId": "1-4",
          "isActive": true,
          "feature": {
            "1": "parent",
            "2": "first entry"
          },
          "searchTerms": {
            "0": "glue",
            "1": "adhesive",
            "2": "stick"
          }
        }
      ]
    },
    {
      "baseId": "10",
      "isActive": true,
      "searchTerms": {
        "0": "glue",
        "1": "adhesive",
        "2": "stick"
      },
      "childProducts": [
        {
          "baseId": "10-1",
          "isActive": true,
          "searchTerms": {
            "0": "glue"
          }
        },
        {
          "baseId": "10-2",
          "isActive": false
        },
        {
          "baseId": "10-3",
          "isActive": true
        },
        {
          "baseId": "10-4",
          "isActive": true
        }
      ]
    }
  ];
let result = template(data);
// console.log(result);
//console.log(format(result));
let create = fs.createWriteStream('jsonToXml.xml');
    create.write(format(result));
    console.log('New Json file has been created');