var pinion = require('../');
var app = pinion();

//normal middleware
app.use(function(req, res, next){
    if(req.id === undefined) {
        return next(new Error('id missing'));
    }
    console.log('message id:', req.id);
    console.log('message length:', req.message.length);
})

//error handler
app.use(function(err, req, res, next){
    console.error(err);
    //If we want to hand off to the next error handling middleware
    next(err);
});


var req = {
    id: 1284,
    message: "here is some stuff"
}

var res = console.log

app(req, res);


var req = {
    message: "watch me fail"
};

app(req, res);
