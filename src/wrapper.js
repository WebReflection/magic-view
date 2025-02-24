//@ts-check

import { LENGTH } from './bits/utils.js';

/**
 * @param {Uint8Array} view
 * @param {number} length
 * @returns {ArrayBuffer}
 */
const transfer = (view, length) => {
    //@ts-ignore
    return view.buffer.transferToFixedLength(length);
};

export default class Wrapper {
    /** @type {ArrayBuffer} */
    #buffer;

    /**
     * @param {ArrayBuffer} buffer
     * @param {number} byteOffset
     */
    constructor(buffer, byteOffset) {
        this.view = new Uint8Array(buffer, byteOffset);
        this.i = 0;
    }

    get buffer() {
        return this.#buffer || (
            this.#buffer = transfer(this.view, this.i)
        );
    }

    /**
     * @param {number} length
     * @returns
     */
    grow(length) {
        return (
            this.view = new Uint8Array(transfer(this.view, length + LENGTH))
        );
    }
}
