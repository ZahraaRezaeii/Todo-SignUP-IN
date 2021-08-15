var states = require('./server-side');

exports.requestHandler = function requestHandler(req , res){
    var route;

    route = ({
        GET: {
            "/":states.root,
            "/download":states.download
        },
        POST: {
            "/sign-up":states.signUp,
             "/upload":states.upload,
            "/sign-in":states.signIn
        }
    })[req.method][req.url];

    (route||states.root)(req ,res);
}