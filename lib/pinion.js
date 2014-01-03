var EventEmitter = require('events').EventEmitter;
var proto = require('./proto');
var utils = require('./utils');


exports = module.exports = createApp;

/*
 *
 *      var pinion = require('pinion')
 *
 *      var app = pinion();
 *
 *      //the emitter emits 'message', fn(req, rep)
 *      something.on('message', app);
 */

function createApp() {
  function app(req, rep, next){ app.handle(req, rep, next); }
  utils.merge(app, proto);
  utils.merge(app, EventEmitter.prototype);
  app.stack = [];
  for (var i = 0; i < arguments.length; ++i) {
    app.use(arguments[i]);
  }
  return app;
};
