let shortUrl = require('node-url-shortener');
let urls = ['https://codeportal.in','https://testingpath.in', 'https://testcodeportal.in']
urls.forEach( (e) => {
    shortUrl.short(e, function(err, url){
        console.log(url);
    });
    
})