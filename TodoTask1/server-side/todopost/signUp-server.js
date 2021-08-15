var fs = require('fs');

function signUp(req, res) {
    var temp, user = {},userList = [], lenList, exist = false;
    
    req.on('data', data =>{
        temp = data.toString('utf-8');
        user = JSON.parse(temp);
                fs.readFile("./data.txt" , function(err, datafile){
                    if (err) {
                        console.log("error sign up in reading file");
                        return err;        
                    }

                    // for first user
                    if(!datafile.toString()){
                        datafile = "[]";
                    }

                    userList = JSON.parse(datafile);
                    lenList = userList.length;
                    for(var i = 0; i<lenList; i++) {
                        if(userList[i].username == user.username){
                            exist = true;
                            i=lenList;
                        }
                    }
                
                    if(exist){
                        res.write("");
                        res.end();
                        return;
                    }
                    
                
                    var newUser = {
                        firstName:user.firstName,
                        lastName:user.lastName,
                        username:user.username,
                        password:user.password,
                        list:[]
                    }
                    userList.push(newUser);
                   
                    fs.writeFile('./data.txt', JSON.stringify(userList) , function(err){
                        if(err){
                            console.log("error sign up in writing file");
                            return err;
                        }
                    });
                    
                    var randomNum = Math.floor(Math.random() * 800)+101;
                    const newToken = Buffer.from(user.password).toString('base64')+"%"+
                    randomNum + Buffer.from(user.username).toString('base64')+"";

                    var TODOS = {
                        firstName:user.firstName,
                        lastName:user.lastName,
                        username:user.username,
                        token:newToken,
                        list:[]
                    }
                    var JWT = JSON.stringify(TODOS);

                    res.write(JWT);
                    res.end();
                });   
    });
    

}
module.exports = signUp;