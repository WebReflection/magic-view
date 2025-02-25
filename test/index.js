import MagicView from '../src/index.js';

// fails in node
// for (let a = [], i = 0; i <= 112813858; a[i++] = '3bipp2');

const LENGTH = 0xFFFF;
const TIMES = LENGTH * 2;
const MAX_BYTE_LENGTH = TIMES * 8;

const littleEndian = false;

const newSize = b => Math.min(b.byteLength + LENGTH, MAX_BYTE_LENGTH);

const r = [];
for (let i = 0; i < TIMES; i++)
    r.push(Math.random());

let b = new ArrayBuffer(LENGTH, { maxByteLength: MAX_BYTE_LENGTH });
let v = new DataView(b);

console.time('encode as resizable buffer');
for (let j = 0, i = 0; i < r.length; i++) {
    const size = j + 8;
    if (b.byteLength < size) b.resize(newSize(b));
    v.setFloat64(j, r[i], littleEndian);
    j += 8;
}
console.timeEnd('encode as resizable buffer');

console.time('decode as resizable buffer');
for (let j = 0, i = 0; i < r.length; i++) {
    if (v.getFloat64(j, littleEndian) !== r[i])
        throw new Error('invalid value');
    j += 8;
}
console.timeEnd('decode as resizable buffer');

b = new SharedArrayBuffer(LENGTH, { maxByteLength: MAX_BYTE_LENGTH });
v = new DataView(b);

console.time('encode as resizable shared buffer');
for (let j = 0, i = 0; i < r.length; i++) {
    const size = j + 8;
    if (b.byteLength < size) b.grow(newSize(b));
    v.setFloat64(j, r[i], littleEndian);
    j += 8;
}
console.timeEnd('encode as resizable shared buffer');

console.time('decode as resizable shared buffer');
for (let j = 0, i = 0; i < r.length; i++) {
    if (v.getFloat64(j, littleEndian) !== r[i])
        throw new Error('invalid value');
    j += 8;
}
console.timeEnd('decode as resizable shared buffer');


v = new MagicView(MAX_BYTE_LENGTH);

console.time('encode as array with fixed length');
for (let j = 0, i = 0; i < r.length; i++) {
    v.setFloat64(j, r[i], littleEndian);
    j += 8;
}
console.timeEnd('encode as array with fixed length');

console.time('decode as array with fixed length');
for (let j = 0, i = 0; i < r.length; i++) {
    if (v.getFloat64(j, littleEndian) !== r[i])
        throw new Error('invalid value');
    j += 8;
}
console.timeEnd('decode as array with fixed length');

console.log(r.length, v.buffer.byteLength, MAX_BYTE_LENGTH);

v = new MagicView;

console.time('encode as array');
for (let j = 0, i = 0; i < r.length; i++) {
    v.setFloat64(j, r[i], littleEndian);
    j += 8;
}
console.timeEnd('encode as array');

console.time('decode as array');
for (let j = 0, i = 0; i < r.length; i++) {
    if (v.getFloat64(j, littleEndian) !== r[i])
        throw new Error('invalid value');
    j += 8;
}
console.timeEnd('decode as array');

const buffer = v.buffer;
console.log(r.length, buffer.byteLength, MAX_BYTE_LENGTH);
v = new DataView(buffer);

console.time('decode as dataview from array');
for (let j = 0, i = 0; i < r.length; i++) {
    if (v.getFloat64(j, littleEndian) !== r[i])
        throw new Error('invalid value');
    j += 8;
}
console.timeEnd('decode as dataview from array');

console.log(r.length, buffer.byteLength, MAX_BYTE_LENGTH);

v = new DataView(new ArrayBuffer(MAX_BYTE_LENGTH));

console.time('encode as fixed buffer');
for (let j = 0, i = 0; i < r.length; i++) {
    v.setFloat64(j, r[i], littleEndian);
    j += 8;
}
console.timeEnd('encode as fixed buffer');

console.time('decode as fixed buffer');
for (let j = 0, i = 0; i < r.length; i++) {
    if (v.getFloat64(j, littleEndian) !== r[i])
        throw new Error('invalid value');
    j += 8;
}
console.timeEnd('decode as fixed buffer');
