var pinion = require('../')

describe('app', function(){

  it('should inherit from event emitter', function(done){
    var app = pinion();
    app.on('foo', done);
    app.emit('foo');
  });

  it('should accept standard middleware and pass through properly', function(done){

    var app = pinion();

    app.use(function(req, res, next){
      next()
    })

    app.use(function(req, res, next){
      done()
    })

    app({}, {})

  });

  it('should accept standard middleware and error middleware', function(done){
    var app = pinion();

    app.use(function(req, res, next){
      next();
    })

    app.use(function(err, req, res, next){
      should.fail("should not have called error middleware");
    })

    app.use(function(req, res, next){
      done();
    })

    app({}, {})

  })

})
