import { MagicView, BetterView } from '../src/index.js';

const HOT = 5;
const LENGTH = 0xFFFF;
const TIMES = LENGTH * 2;
const MAX_BYTE_LENGTH = TIMES * 8;

const littleEndian = false;

const newSize = b => Math.min(b.byteLength + LENGTH, MAX_BYTE_LENGTH);

const r = [];
for (let i = 0; i < TIMES; i++)
    r.push(Math.random());

let b, v;
console.log('');

console.log('\x1b[1mRESIZABLE BUFFER\x1b[0m');
for (let i = 0, length = HOT; i < length; i++) {
    b = new ArrayBuffer(LENGTH, { maxByteLength: MAX_BYTE_LENGTH });
    v = new DataView(b);

    const timed = !i || (i === (length - 1));
    if (timed) console.time('encode');
    for (let j = 0, i = 0; i < r.length; i++) {
        const size = j + 8;
        if (b.byteLength < size) b.resize(newSize(b));
        v.setFloat64(j, r[i], littleEndian);
        j += 8;
    }
    if (timed) console.timeEnd('encode');

    if (timed) console.time('decode');
    for (let j = 0, i = 0; i < r.length; i++) {
        if (v.getFloat64(j, littleEndian) !== r[i])
            throw new Error('invalid value');
        j += 8;
    }
    if (timed) console.timeEnd('decode');

    if (i && timed) console.assert(v.buffer.byteLength === MAX_BYTE_LENGTH);
}
console.log('');

console.log('\x1b[1mRESIZABLE SHARED BUFFER\x1b[0m');
for (let i = 0, length = HOT; i < length; i++) {
    b = new SharedArrayBuffer(LENGTH, { maxByteLength: MAX_BYTE_LENGTH });
    v = new DataView(b);

    const timed = !i || (i === (length - 1));
    if (timed) console.time('encode');
    for (let j = 0, i = 0; i < r.length; i++) {
        const size = j + 8;
        if (b.byteLength < size) b.grow(newSize(b));
        v.setFloat64(j, r[i], littleEndian);
        j += 8;
    }
    if (timed) console.timeEnd('encode');

    if (timed) console.time('decode');
    for (let j = 0, i = 0; i < r.length; i++) {
        if (v.getFloat64(j, littleEndian) !== r[i])
            throw new Error('invalid value');
        j += 8;
    }
    if (timed) console.timeEnd('decode');

    if (i && timed) console.assert(v.buffer.byteLength === MAX_BYTE_LENGTH);
}
console.log('');

console.log('\x1b[1mMAGIC VIEW FIXED BUFFER\x1b[0m');
v = new MagicView(MAX_BYTE_LENGTH);
for (let i = 0, length = HOT; i < length; i++) {
    const timed = !i || (i === (length - 1));
    if (timed) console.time('encode');
    for (let j = 0, i = 0; i < r.length; i++) {
        v.setFloat64(j, r[i], littleEndian);
        j += 8;
    }
    if (timed) console.timeEnd('encode');

    if (timed) console.time('decode');
    for (let j = 0, i = 0; i < r.length; i++) {
        if (v.getFloat64(j, littleEndian) !== r[i])
            throw new Error('invalid value');
        j += 8;
    }
    if (timed) console.timeEnd('decode');

    if (i && timed) console.assert(v.buffer.byteLength === MAX_BYTE_LENGTH);
    v.reset();
}
console.log('');

console.log('\x1b[1mMAGIC VIEW RUNTIME BUFFER\x1b[0m');
v = new MagicView(0xFFFF);
for (let i = 0, length = HOT; i < length; i++) {
    const timed = !i || (i === (length - 1));
    if (timed) console.time('encode');
    for (let j = 0, i = 0; i < r.length; i++) {
        v.setFloat64(j, r[i], littleEndian);
        j += 8;
    }
    if (timed) console.timeEnd('encode');

    if (timed) console.time('decode');
    for (let j = 0, i = 0; i < r.length; i++) {
        if (v.getFloat64(j, littleEndian) !== r[i])
            throw new Error('invalid value');
        j += 8;
    }
    if (timed) console.timeEnd('decode');

    if (i && timed) console.assert(v.buffer.byteLength === MAX_BYTE_LENGTH);
    else v.reset();
}
console.log('');

const buffer = v.buffer;

console.log('\x1b[1mDATA VIEW DECODE\x1b[0m');
for (let i = 0, length = HOT; i < length; i++) {
    v = new DataView(buffer);

    const timed = !i || (i === (length - 1));
    if (timed) console.time('decode');
    for (let j = 0, i = 0; i < r.length; i++) {
        if (v.getFloat64(j, littleEndian) !== r[i])
            throw new Error('invalid value');
        j += 8;
    }
    if (timed) console.timeEnd('decode');

    if (i && timed) console.assert(v.buffer.byteLength === MAX_BYTE_LENGTH);
}
console.log('');

console.log('\x1b[1mBETTER VIEW DECODE\x1b[0m');
for (let i = 0, length = HOT; i < length; i++) {
    v = new BetterView(buffer);

    const timed = !i || (i === (length - 1));
    if (timed) console.time('decode');
    for (let j = 0, i = 0; i < r.length; i++) {
        if (v.getFloat64(j, littleEndian) !== r[i])
            throw new Error('invalid value');
        j += 8;
    }
    if (timed) console.timeEnd('decode');

    if (i && timed) console.assert(v.buffer.byteLength === MAX_BYTE_LENGTH);
}
console.log('');

console.log('\x1b[1mFIXED BUFFER - REFERENCE\x1b[0m');
for (let i = 0, length = HOT; i < length; i++) {
    v = new DataView(new ArrayBuffer(MAX_BYTE_LENGTH));

    const timed = !i || (i === (length - 1));
    if (timed) console.time('encode');
    for (let j = 0, i = 0; i < r.length; i++) {
        v.setFloat64(j, r[i], littleEndian);
        j += 8;
    }
    if (timed) console.timeEnd('encode');

    if (timed) console.time('decode');
    for (let j = 0, i = 0; i < r.length; i++) {
        if (v.getFloat64(j, littleEndian) !== r[i])
            throw new Error('invalid value');
        j += 8;
    }
    if (timed) console.timeEnd('decode');

    if (i && timed) console.assert(v.buffer.byteLength === MAX_BYTE_LENGTH);
}
console.log('');
