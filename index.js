var getProps = require('getprops');

module.exports = function(proto, props, cb) {

  if (typeof props == 'function') {
    cb = props;
    props = {};
  }

  getProps(Object);

  cb = cb || function (id, args) {
    console.log('no such method %s', id)
  };

  Object.createHandled = function(proto, objDesc, noSuchMethod) {

    var handler = {
      get: function(rcvr, p) {
        return function() {
          var args = [].slice.call(arguments, 0);
          return noSuchMethod.call(this, p, args);
        };
      },
      getPropertyDescriptor: function(name) {
        var desc = Object.getPropertyDescriptor(proto, name);
        if (desc !== undefined) { 
          desc.configurable = true; 
        }
        return desc;
      }
    };

    var p = Proxy.create(handler, proto);
    return Object.create(p, objDesc);
  };

  var getOwnProperties = function (o) {

    var props = {};

    for (var prop in o) {
      if (o.hasOwnProperty(prop)) {
        props[prop] = o[prop];
      }
      return props;
    }
  };

  var o = Object.createHandled(
    proto,
    props || getOwnProperties(proto),
    cb
  );

  return o;
};

