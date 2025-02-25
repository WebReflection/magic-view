//@ts-check

import bits64 from './bits/64.js';
import bits32 from './bits/32.js';
import bits16 from './bits/32.js';
import bits8 from './bits/32.js';

const B = ArrayBuffer;
const U8 = Uint8Array;

const { isArray } = Array;
const { isView } = B;

/**
 * @param {ArrayBuffer} buffer
 * @param {number} length
 * @param {number} byteOffset
 * @returns {Uint8Array}
 */
const review = (buffer, length, byteOffset) => new U8(
    transfer(buffer, length),
    byteOffset
);

/**
 * @param {ArrayBuffer} buffer
 * @param {number} length
 * @returns {ArrayBuffer}
 */
const transfer = (buffer, length) => {
    //@ts-ignore
    return buffer.transferToFixedLength(length);
};


const Float16Array = globalThis.Float16Array || Float32Array;

/** @typedef {Int8Array|Uint8Array|Float16Array|Int16Array|Uint16Array|Float32Array|Int32Array|Uint32Array|Float64Array|BigInt64Array|BigUint64Array} TypedArray */

/**
 * @class
 * @param {number|number[]|ArrayBuffer|TypedArray} [buffer]
 * @param {number} [byteOffset]
 * @returns
 */
function MagicView(buffer = new B(0xFFFF), byteOffset = 0) {
    if (typeof buffer === 'number') buffer = new B(buffer);
    else if (isArray(buffer)) buffer = new U8(buffer).buffer;
    else if (isView(buffer)) buffer = buffer.buffer;

    let view = new U8(buffer, byteOffset), i = 0, $ = null;
    const LENGTH = view.length;

    /**
     * @param {number} length
     */
    const resize = length => {
        if (view.length < length) {
            view = review(view.buffer, length + byteOffset + LENGTH, byteOffset);
            // console.log('resize', view.length);
        }
    };

    /**
     * @param {Uint8Array} ui8a
     * @param {number} byteOffset
     */
    const read = (ui8a, byteOffset) => {
        for (let i = 0, length = ui8a.length; i < length; i++)
            ui8a[i] = view[byteOffset++];
    };

    /**
     * @param {Uint8Array} ui8a
     * @param {number} byteOffset
     */
    const write = (ui8a, byteOffset) => {
        const length = byteOffset + ui8a.length;
        resize(length);
        view.set(ui8a, byteOffset);
        if (i < length) i = length;
    };

    return {
        __proto__: DataView.prototype,

        /** @readonly */
        get byteLength() { return i || view.length },

        /** @readonly */
        get byteOffset() { return byteOffset },

        /** @readonly @type {ArrayBuffer} */
        get buffer() { return $ || ($ = transfer(view.buffer, i + byteOffset)) },

        ...bits64(read, write),
        ...bits32(read, write),
        ...bits16(read, write),
        ...bits8(read, write),

        /**
         * @param {number} byteOffset
         * @param {TypedArray} typed
         */
        setTyped(byteOffset, typed) {
            const ui8a = typed instanceof U8 ? typed : new U8(typed.buffer);
            write(ui8a, byteOffset);
        },

        reset() {
            view = new U8(new B(LENGTH), byteOffset);
            i = 0;
            $ = null;
        },
    };
}

MagicView.prototype = DataView.prototype;

export default MagicView;
