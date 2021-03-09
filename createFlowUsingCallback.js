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
let connectcionId, exportId, importId;
const createConnection = (callback) => {
    var connectionJson = {
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
    request(authentication('/connections',connectionJson,'POST'), (err,response,body) => {
        if(err) console.log(JSON.stringify(response));
        callback(body);
    })
}

const exportGenerator = (callback)=> {
    createConnection((connection)=>{
        const Exportjson = {
            'name': 'Backend Export HTTP',
            '_connectionId': connection._id,
            'asynchronous': true,
            'http': {
              'relativeURI': '/products.json',
              'method': 'GET'
            },
            'adaptorType': 'HTTPExport'
        }
        request(authentication('/exports',Exportjson,'POST'), (err,response,body) => {
            if(err) console.log(JSON.stringify(response));
            callback(body)
        })
    })
}

const importGenerator = (callback)=> {
    createConnection((connection)=>{
        const Importjson = {
            'name': 'Backend Import HTTP',
            '_connectionId': connection._id,
            'http': {
              'relativeURI': [
                '/products.json'
              ],
              'method': [
                'POST'
              ]
            },
            'adaptorType': 'HTTPImport'
        }
        request(authentication('/imports',Importjson,'POST'), (err,response,body) => {
            if(err) console.log(JSON.stringify(response));
            callback(body)
        })
    })
}

const createFlow = (callback) => {
    async.series([
        (callbackOne) => {
           async.parallel([
            (exportIdFetcher) => {
                exportGenerator((id)=>{
                    exportId = id._id
                    console.log("ExportID :",exportId);
                    return exportIdFetcher(null, exportId);
                })
            },
            (ixportIdFetcher) => {
                importGenerator((id)=>{
                    importId = id._id
                    console.log("ImportID :",importId);
                    return ixportIdFetcher(null, importId);
                })
            }
           ], (err, res)=>{
               if(err) console.log('Error: ', err);
               return callbackOne(null, res);
           })
        },
        (callbackOne) => {
            var json={
                'name': 'Backend Flow for creating New Customer',
                'disabled':true,
                '_exportId':exportId,
                '_importId':importId,
                'skipRetries':false
            }
            request(authentication('/flows', json, 'POST'), (err,response,body) => {
                if (err) console.log(JSON.stringify(response));
                console.log('FlowID :',body._id)
                return callbackOne(null, body)
            })
        }
    ], (err, res) => {
        if(err) console.log(err);
        //console.log(res)
    })
}

createFlow();