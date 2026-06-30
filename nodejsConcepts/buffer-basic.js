//objects ->handle binary data
//file system operations,cryptography ,image processing
const buffOne = Buffer.alloc(10); //allocate 10 bytes
console.log(buffOne);
const buffFromString = Buffer.from("hello");
console.log(buffFromString);

const buffFromArrayOfIntegers = Buffer.from([1, 2, 3]);
console.log(buffFromArrayOfIntegers);
buffOne.write("seraph");
console.log(buffOne.toString());

console.log(buffFromString[0]);
console.log(buffFromArrayOfIntegers[0]);
const concatBuffs = Buffer.concat([buffOne, buffFromString]);
console.log(concatBuffs);
console.log(concatBuffs.toString());
console.log(concatBuffs.toJSON());
