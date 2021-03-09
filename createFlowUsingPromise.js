const request = require('request');
const async = require('async');
const accessToken ='<Provide your IO Token>';
const url = 'https://api.staging.integrator.io/v1';

const authentication = (relativeURI='', body= '', method= '') => {
    let options={
        method: method,
        uri :url+relativeURI,
        headers:{
            Authorization:'Bearer '+accessToken,
            'Content-Type':'application/json',
            'charset':'utf8'
        },
        json: body
    }
    return options;
}

let connectcionId, exportId, importId, flowtId;
const createConnection =  () => {
    return new Promise((resolve, rejected) => {
        const connectionJson = {
            'type': 'http',
            'name': 'Backend import Shopify Connection',
            'http': {
              'mediaType': 'json',
              'baseURI': 'https://io-staging-demo-store.myshopify.com/admin/api/2021-01/',
              'ping': {
                'relativeURI': 'products.json',
                'method': 'GET'
              },
              'auth': {
                'type': 'basic',
                'basic': {
                  'username': 'a59f3815557785b86989b44161840c30',
                  'password': '<Provide your Shopify private App secret key>'
                },
                'oauth': {
                    'clientCredentialsLocation': 'body'
                }
              }
            }
        };
        request(authentication('/connections', connectionJson, 'POST'), (err,response,body) => {
            if(err) console.log(response);
            if (response.statusCode == '201') {
                console.log('Connection ID: ', body._id);
                connectcionId = body._id;
                resolve(connectcionId);
            }
            else {
                rejected(response.body);
            }
        })

});
}

const createExport = ()=> {
    return new Promise((resolve, rejected) => {
        const exportJson = {
            'name': 'Backend Export HTTP',
            '_connectionId': connectcionId,
            'asynchronous': true,
            'http': {
              'relativeURI': '/products.json',
              'method': 'GET'
            },
            'adaptorType': 'HTTPExport'
        };
        request(authentication('/exports', exportJson, 'POST'), (err,response,body) => {
            if(err) console.log(response);
            if (response.statusCode == '201') {
                console.log('Export ID: ', body._id);
                exportId = body._id;
                resolve(exportId)
            }
            else {
                rejected(response.body);
            }
            
        })
    })
}

const createImport = ()=> {
    return new Promise((resolve, rejected) => {
        const importJson = {
            'name': 'Backend Import HTTP',
            '_connectionId': connectcionId,
            'http': {
              'relativeURI': [
                '/products.json'
              ],
              'method': [
                'POST'
              ]
            },
            'adaptorType': 'HTTPImport'
        };
        request(authentication('/imports', importJson, 'POST'), (err,response,body) => {
            if(err) console.log(response);
            if (response.statusCode == '201') {
                console.log('Import ID: ', body._id);
                importId = body._id;
                resolve(importId)
            }
            else {
                rejected(response.body);
            }
            
        })
    })
}

const createFlow = async ()=> {
    const Connection = await createConnection();
    //console.log(Connection);
    const Export = await createExport();
    //console.log(Export);
    const Import = await createImport();
    //console.log(Export);
    let flow = new Promise((resolve, rejected) => {
        const flowJson = {
            'name': 'Backend Flow for creating New Products',
            'disabled':true,
            '_exportId':exportId,
            '_importId':importId,
            'skipRetries':false
        };
        request(authentication('/flows', flowJson, 'POST'), (err,response,body) => {
            if(err) console.log(response);
            if (response.statusCode == '201') {
                console.log('Flow ID: ', body._id);
                flowtId = body._id;
                resolve(flowtId)
            }
            else {
                rejected(response.body);
            }
            
        })
    })
    let Flows = await flow;
}
createFlow();
