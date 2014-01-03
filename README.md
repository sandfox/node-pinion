# Pinion

Connect like middleware framework for handling generic req, rep pairs.
When I say generic, I mean literally anything can go as `req` and `rep`. Unlike connect, this framework doesn't have any concept of http, or routing built into it. Might add some configurable routing later.

_Why?_
Pretty much just an experiment at the moment and to scratch an itch I have. Lots of room for improvements here. If it proves useful I might do something `koa` like with generators etc etc.


## Usage

### Create a pinion app

```js
var pinion = require('pinion');
var app = pinion();
```
### Add some middleware

Like connect, middleware should either take 3 args `(req, res, next)` in which case it will be standard handler, or 4 args `(err, req, res, next)` in which case it will be an error handler.

```js

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
    console.error("something bad happened", err);
    //If we want to hand off to the next error handling middleware
    //next(err);
})
```

### Sending a message into the app

This should work ok:
```js
var req = {
    id: 1284,
    message: "here is some stuff"
};

var res = console.log;

app(req, res);
```
You should end up with some output like this:
```
message id: 1284
message length: 18
```
 
and this one should give us an error:
```js
var req = {
		message: "watch me fail"
};

var res = console.log;

app(req, res);
```
and the output
```
[Error: id missing]
```

## Todo

+   What to do about unhandled messages/errors
+   Sort out emitters usage
+   tidy up debug usage
+   TESTS!
+   More examples

##License

BSD 2 clause

## Contributing

Open issues, send PRs, ask me questions on twitter (@sandfoxuk)
