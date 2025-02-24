//@ts-check

import bits64 from './bits/64.js';
import bits32 from './bits/32.js';
import bits16 from './bits/32.js';
import bits8 from './bits/32.js';

const { prototype } = DataView;

/**
 * @class
 * @param {number[]} array
 * @param {number} [byteOffset]
 * @returns
 */
function ArrayView(array, byteOffset = 0) {
    /** @type {Uint8Array} */
    let view;

    const getView = () => (view || (view = new Uint8Array(array)));

    return {
        __proto__: prototype,

        /** @readonly */
        get byteLength() { return array.length },

        /** @readonly */
        get byteOffset() { return byteOffset },

        /** @readonly */
        get buffer() { return getView().buffer },

        /** @readonly */
        get view() { return getView() },

        ...bits64(array, byteOffset),
        ...bits32(array, byteOffset),
        ...bits16(array, byteOffset),
        ...bits8(array, byteOffset),
    };
}

ArrayView.prototype = prototype;

export default ArrayView;
