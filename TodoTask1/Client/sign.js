var Doc = document.getElementsByClassName.bind(document);
var firstName = Doc('first-name-inp')[0],
lastName = Doc('last-name-inp')[0],
username = Doc('username-input')[0],
password = Doc('password-input')[0];

function signIn() {
    if(!verfing("sign in")) return;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {
            var res = this.responseText;
            if(res == "notExist") alert("This username does not exist!");

            else if(res == "passWrong") alert("password wrong!");

            else{
                var JWT = this.responseText;
                localStorage["information"] = JWT;
                localStorage["guestMode"] = "false";
                username.value = "";
                location.href= "/user";
            }

        }
    };
    xhttp.open('POST', 'sign-in', true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    var user = {
        username:username.value,
        password:password.value
    };
    xhttp.send(JSON.stringify(user));

}


function signUp() {
    if(!verfing("sign up")) return;
    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if(this.responseText){
                var JWT = this.responseText;
                localStorage["information"] = JWT;
                localStorage["guestMode"] = "false";
                firstName.value = "";
                lastName.value = "";
                username.value = "";
                location.href= "/user";
            }
            else{
                alert("this username already exist");
            }
        }
    };
    xhttp.open('POST', 'sign-up', true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    var user = {
        firstName:firstName.value,
        lastName:lastName.value,
        username:username.value,
        password:password.value
    };
    xhttp.send(JSON.stringify(user));
}


function changePage(href) {
    location.href = "/" + href;
}


function verfing(page){
    if(/\s/.test(username.value) || /\s/.test(password.value)){
        alert("shouldn't be use space in username or password");
        return false;
    }

    if(page == "sign in"){
        if(!username.value){
            alert("please enter username");
            return false;
        }
    }
    
    else{
        if(!firstName.value){
            alert("please enter first name");
            return false;
        }
        if(!lastName.value){
            alert("please enter last name");
            return false;
        }
        if(!username.value){
            alert("please enter username");
            return false;
        }
        if(!password.value){
            alert("please enter password");
            return false;
        }
        if(password.value.length < 6){
            alert("password should be more than 6 character");
            return false;
        }
    }
    return true;
}

function anonymous(){
    if(localStorage["guestInf"]){
        localStorage["guestMode"]= "true";
        changePage('anonymous');
        return;
    }

    //for first user
    var inf = {};
    inf.list = [];
    inf.token = "";
    inf.firstName = "guest";
    inf.lastName = "";
    inf.username = "anonymous";
    localStorage["guestInf"] = JSON.stringify(inf);
    localStorage["guestMode"]= "true";
    changePage('anonymous');
}