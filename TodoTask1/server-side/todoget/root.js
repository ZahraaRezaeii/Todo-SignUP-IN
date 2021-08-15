var fs = require('fs');

 function root (req, res){

    if(req.url=="/" || req.url == "/sign-up"){
        req.url="sign-up.html";
    }
    if(req.url=="/user" || req.url == "/anonymous"){
        req.url = "index.html";
    }
    if(req.url == "/sign-in"){
        req.url = "sign-in.html";
    }

    fs.readFile("./client/" + req.url , function(err, data){
        if(err) {
            return err;
        }
        res.writeHead(200);
        res.write(data);
        res.end();
    });
}
module.exports = root;
