/**
 * Modeled on connects proto and general way of throwing in middleware for request processing
 */

var debug = require('debug')('pinion:dispatcher');

// prototype

var app = module.exports = {};

app.use = function(fn){
  debug('use %s', fn.name || 'anonymous');
  this.stack.push({handle: fn });

  return this;
}

/**
 * Handle messages, punting them down
 * the middleware stack.
 *
 * @api private
 */

app.handle = function(req, res, out){
  var stack = this.stack;
  var index = 0;

  function next(err){
    var layer;

    // next callback
    layer = stack[index++];
    // all done
    if (!layer) {
      // delegate to parent
      if (out) return out(err);

      // unhandled error
      if (err) {
        //Log the unhandled error
      } else {
        // Do nothing, in connect we'd 404 at this point
        // Because we have no "res" this isn't relevant
      }
      return;
    }

    try {

      debug('middleware: %s, %s', index, layer.handle.name || 'anonymous');
      var arity = layer.handle.length;
      if (err) {
        if (arity === 4) {
          layer.handle(err, req, res, next);
        } else {
          next(err);
        }
      } else if (arity < 4) {
        layer.handle(req, res, next);
      } else {
        next();
      }
    } catch (e) {
      next(e);
    }
  }
  next();
}
