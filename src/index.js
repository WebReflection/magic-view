//@ts-check

import { LENGTH } from './bits/utils.js';
import Wrapper from './wrapper.js';
import bits64 from './bits/64.js';
import bits32 from './bits/32.js';
import bits16 from './bits/32.js';
import bits8 from './bits/32.js';

const { isArray } = Array;
const { isView } = ArrayBuffer;
const { prototype } = DataView;

/**
 * @class
 * @param {number[]|ArrayBuffer|Uint8Array} [buffer]
 * @param {number} [byteOffset]
 * @returns
 */
function ArrayView(buffer = new ArrayBuffer(LENGTH), byteOffset = 0) {
    if (isArray(buffer)) buffer = new Uint8Array(buffer).buffer;
    else if (isView(buffer)) buffer = buffer.buffer;
    const wrapper = new Wrapper(buffer, byteOffset);

    return {
        __proto__: prototype,

        /** @readonly */
        get byteLength() { return wrapper.i || (wrapper.view.buffer.byteLength - byteOffset) },

        /** @readonly */
        get byteOffset() { return byteOffset },

        /** @readonly */
        get buffer() { return wrapper.buffer },

        ...bits64(wrapper, byteOffset),
        ...bits32(wrapper, byteOffset),
        ...bits16(wrapper, byteOffset),
        ...bits8(wrapper, byteOffset),

        /** @param {number} length */
        grow(length) {
            if (wrapper.view.length < length) wrapper.grow(length);
        },
    };
}

ArrayView.prototype = prototype;

export default ArrayView;
