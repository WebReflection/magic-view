import ArrayView from '../src/index.js';

// fails in node
// for (let a = [], i = 0; i <= 112813858; a[i++] = '3bipp2');

const TIMES = 0xFFFFF;
const LENGTH = TIMES * 8;

const littleEndian = true;

const r = [];
for (let i = 0; i < TIMES; i++)
    r.push(Math.random());

let v = new DataView(new ArrayBuffer(LENGTH));

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

let b = new ArrayBuffer(0, { maxByteLength: LENGTH });
v = new DataView(b);

console.time('encode as resizable buffer');
for (let j = 0, i = 0; i < r.length; i++) {
    const size = j + 8;
    if (b.byteLength < size) b.resize(Math.min(b.byteLength + 0xffff, LENGTH));
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

b = new SharedArrayBuffer(0, { maxByteLength: LENGTH });
v = new DataView(b);

console.time('encode as resizable shared buffer');
for (let j = 0, i = 0; i < r.length; i++) {
    const size = j + 8;
    if (b.byteLength < size) b.grow(Math.min(b.byteLength + 0xffff, LENGTH));
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


let a = new Array(LENGTH);
v = new ArrayView(a);

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

console.assert(a.every(v => v != null));
console.log(r.length, a.length, LENGTH);

a = [];
v = new ArrayView(a);

console.time('encode as array');
for (let j = 0, i = 0; i < r.length; i++) {
    try {
        v.setFloat64(j, r[i], littleEndian);
    }
    catch (_) {
        console.log(a.length);
        throw _;
    }
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

console.assert(a.every(v => v != null));
console.log(r.length, a.length, LENGTH);
