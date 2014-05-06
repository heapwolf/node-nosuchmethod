# SYNOPSIS
Object.create with a handler for methods that do not exist.

# USAGE
Just add a callback to the end to catch non-existing methods.
This module requires the `--harmony` flag, you can do something
like `node --harmony filename.js` or `#!/user/bin/env node --harmony`.

```js
var createHandled = require('node-nosuchmethod');
var assert = require('assert').ok;

var o = createHandled(Object, function(name, args) {
  return 1;
});

o.foo = function() {
  return 0;
};

assert(o.foo() == 0);
assert(o.bar() == 1);
```

