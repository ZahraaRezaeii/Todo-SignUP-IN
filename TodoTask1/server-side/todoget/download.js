var fs = require("fs");

function download (req, res){
    
    fs.readFile("./data.txt" , function(err, data){
        if (err) {
            console.log("error download!");
            return err;        
        }   

        const JWT = JSON.parse(req.headers['authorization']);
        var token = JWT.token;
        var tokenLen = token.length;
        var temp = '', correctPass = false;
        var pass , user;
        var username = JWT.username;

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
        var listUser;
        dataLen = dataFile.length;

        for (var i = 0; i < dataLen; i++) {
            if(dataFile[i].username == user && dataFile[i].password == pass){
                correctPass = true;
                listUser = dataFile[i].list;
            }
        }
        
        if(correctPass){
            res.write(JSON.stringify(listUser));
            res.end();
        }
        else {
            res.write('');
            res.end();
        }


    });
}
module.exports = download