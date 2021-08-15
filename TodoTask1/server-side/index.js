var root = require('./todoget/server');
var download = require('./todoget/download');
var upload = require('./todopost/todo-upload');
var signIn = require('./todopost/todo-signin');
var signUp = require('./todopost/todo-signup');
module.exports={
    root,
    download,
    upload,
    signIn,
    signUp
}
