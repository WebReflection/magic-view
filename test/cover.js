//@ts-check

import { MagicView, BetterView } from '../src/index.js';

/** @param {boolean} situation */
const assert = situation => {
    if (!situation) throw new Error('assertion failed');
};

const encoder = new TextEncoder;
const decoder = new TextDecoder;

let mv = new MagicView([0, 0, 0], 1);
assert(mv instanceof MagicView);
assert(mv instanceof DataView);
assert(mv.byteLength === 2);

mv.setUint8(1, 1);
assert([...new Uint8Array(mv.buffer)].join(',') === '0,0,1');
assert([...new Uint8Array(mv.buffer)].join(',') === '0,0,1');

mv = new MagicView([0, 0, 0]);
assert(mv.byteLength === 3);
mv.setFloat64(0, Math.PI);
assert(mv.byteLength === 8 + 3);
assert(mv.size === 8);
assert(mv.getFloat64(0) === Math.PI);
assert(new Uint8Array(mv.buffer).length === 8);
assert(new DataView(mv.buffer).getFloat64(0) === Math.PI);

mv = new MagicView(0xFF);
assert(mv.byteLength === 0xFF);

mv = new MagicView(new ArrayBuffer(0xFFF));
assert(mv.byteLength === 0xFFF);

mv = new MagicView(new Uint8Array(0xFFF));
assert(mv.byteLength === 0xFFF);

mv = new MagicView;
assert(mv.byteLength === 0xFFFF);

mv.setTypedU8(mv.size, encoder.encode('magic'));
mv.setTypedU8(mv.size, encoder.encode('view'));

assert(mv.size === 'magicview'.length);
assert(decoder.decode(mv.buffer) === 'magicview');
mv.reset();

mv.setTyped(mv.size, new Uint32Array(encoder.encode('view').buffer));
assert(decoder.decode(mv.buffer) === 'view');
mv.reset();

mv.setTyped(mv.size, encoder.encode('view'));
assert(decoder.decode(mv.buffer) === 'view');
mv.reset();

const pi = new Float64Array([Math.PI]);
mv.setTyped(0, pi);
const typed = mv.getTyped(0, Float64Array.BYTES_PER_ELEMENT, Float64Array);
assert(typed[0] === pi[0]);
assert(new Float64Array(mv.getTyped(0, 8).buffer)[0] === pi[0]);
assert(mv.getSub(0, 8).join(',') === new Uint8Array(pi.buffer).join(','));

mv.reset();
mv.setInt8(0, 1);
assert(mv.getInt8(0) === 1);
mv.setUint8(0, 1);
assert(mv.getUint8(0) === 1);
mv.setU8(0, 1);
assert(mv.getUint8(0) === 1);

mv.setUint16(0, 1);
assert(mv.getUint16(0) === 1);
mv.setInt16(0, 1);
assert(mv.getInt16(0) === 1);
try {
    //@ts-ignore
    mv.setFloat16(0, 1);
    //@ts-ignore
    assert(mv.getFloat16(0) === 1);
}
catch (_) {
    // console.warn(_);
}

mv.setUint32(0, 1);
assert(mv.getUint32(0) === 1);
mv.setInt32(0, 1);
assert(mv.getInt32(0) === 1);
mv.setFloat32(0, 1);
assert(mv.getFloat32(0) === 1);

mv.setBigUint64(0, 1n);
assert(mv.getBigUint64(0) === 1n);
mv.setBigInt64(0, 1n);
assert(mv.getBigInt64(0) === 1n);
mv.setFloat64(0, 1);
assert(mv.getFloat64(0) === 1);

let size = mv.size;
mv.setArray(size, [1, 2, 3, 4]);
assert(mv.getArray(size, 4).join(',') === '1,2,3,4');

let bv = new BetterView(mv.view.buffer);
bv.setTypedU8(0, encoder.encode('magic'));
assert(decoder.decode(bv.getTyped(0, 5)) === 'magic');
bv.setTyped(0, encoder.encode('magic'));
assert(decoder.decode(bv.getTyped(0, 5)) === 'magic');
bv.setArray(size, [1, 2, 3, 4]);
assert(bv.getArray(size, 4).join(',') === '1,2,3,4');
assert(bv.view instanceof Uint8Array);


bv.setTypedU8(0, encoder.encode('magic'));
bv.setU8(0, bv.getUint8(0));

bv = new BetterView(new ArrayBuffer(4));
const view = new Uint32Array(encoder.encode('view').buffer);
bv.setTyped(0, view);
assert(decoder.decode(bv.buffer) === 'view');
assert(view[0] === bv.getTyped(0, Uint32Array.BYTES_PER_ELEMENT, Uint32Array)[0]);
assert(bv.getSub(0, 4).join(',') === new Uint8Array(view.buffer).join(','));
