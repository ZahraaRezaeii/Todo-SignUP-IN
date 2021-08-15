var fs = require("fs");

function upload(req, res){
    
    fs.readFile("./states.txt" , function(err, data){
        if (err) {
            console.log("error upload in reading file!");
            return err;        
        }   

        const JWT = JSON.parse(req.headers['authorization']);
        var token = JWT.token;
        var tokenLen = token.length;
        var temp = '', correctPass = false;
        var pass , user;

        for(var i=0; i < tokenLen; i++){
            if(token[i]!="%"){
                temp+= token[i];
            }
            else {
                pass = temp;
                temp = '';
                for(i+=4; i < tokenLen; i++){
                    temp+=token[i];
                }
                user = temp;
            }
        }

        pass = Buffer.from(pass, 'base64').toString();
        user = Buffer.from(user, 'base64').toString();
        var dataFile = JSON.parse(data);
        var indexUser;
        dataLen = dataFile.length;
        
        for (var i = 0; i < dataLen; i++) {
            if(dataFile[i].username == user && dataFile[i].password == pass){
                correctPass = true;
                indexUser = i;
                i=dataLen;
            }
        }
        if(correctPass){
            var dataText='';
            req.on('data', data => {
                dataText += data.toString('utf-8');
                dataFile[indexUser].list = JSON.parse(dataText);
                fs.writeFile('data.txt',JSON.stringify(dataFile), function(err){
                    if(err){
                        console.log('error upload in writig file!');
                        return err;
                    }
                    res.write("ok");
                    res.end();
                    
                })
            });

        }
        else {
            res.write("");
            res.end();
        }



    });
    
    
}
module.exports = upload;