var stuff = [];
var length = 9999999;
console.log('Populando vetor com: ' + length + ' posições.');
for (var index = 0; index < length; ++index) {
  stuff[index] = Math.random();
}


console.time('forIn');
for (a in stuff) {
  var b = a;
}
console.timeEnd('forIn');

console.time('for');
for (var index = 0; index < stuff.length; ++index) {
  var b = stuff[index];
}
console.timeEnd('for');

console.time('forOf');
for (a of stuff) {
  var b = a;
}
console.timeEnd('forOf');

console.time('forEach');
stuff.forEach(function (a) {
  var b = a;
});
console.timeEnd('forEach');

console.log('Resultado 26/01/2017! Use "for"');