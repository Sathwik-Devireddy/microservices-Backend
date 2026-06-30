const fs = require("fs");
const crypto = require("crypto");
console.log("1.Start");
setTimeout(() => {
  console.log("2.0s callback");
}, 0);
setTimeout(() => {
  console.log("3.2nd 0s callback");
}, 0);
setImmediate(() => {
  console.log("4.immediate callback");
});
Promise.resolve().then(() => {
  console.log("5.promise callback(microtask)");
});
process.nextTick(() => {
  console.log("6.process.nextTick callback (microtask");
});
fs.readFile(__filename, () => {
  console.log("7.fs callback (i/o call back)");
});
crypto.pbkdf2("secret", "salt", 10000, 64, "sha512", (err, key) => {
  if (err) throw err;
  console.log("8.pbkdf2 callback");
  console.log(key);
});
console.log("9.end");
