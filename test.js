var createHandled = require('./index');
var assert = require('assert').ok;

var o = createHandled(Object, function(name, args) {
  return 1
});

o.foo = function() {
  return 0
};

assert(o.foo() == 0);
assert(o.bar() == 1);

