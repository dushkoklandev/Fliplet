const ExpressBrute = require('express-brute');
const store = new ExpressBrute.MemoryStore();

function bruteforce(namespace, freeRetries, minWait) {
  const bruteForce = new ExpressBrute(store, {
    freeRetries,
    minWait,
    attachResetToRequest: false,
  });

  return function(req, res, next) {
    bruteForce.prevent(req, res, next, {
      key: req.ip + namespace,
      message: `Too many requests for the ${namespace} namespace. Please retry in ${minWait} minutes`,
    });
  };
}