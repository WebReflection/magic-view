//@ts-check

import { read, write } from './utils.js';

const b8 = new ArrayBuffer(2);
const d8 = new DataView(b8);
const u8 = new Uint8Array(b8);

/**
 * @param {number[]} buffer
 * @param {number} i
 * @returns
 */
export default (buffer, i) => ({
    /**
     * @param {number} byteOffset
     * @returns
     */
    getInt8(byteOffset) {
        read(buffer, u8, i + byteOffset);
        return d8.getInt8(0);
    },

    /**
     * @param {number} byteOffset
     * @returns
     */
    getUint8(byteOffset) {
        read(buffer, u8, i + byteOffset);
        return d8.getUint8(0);
    },

    /**
     * @param {number} byteOffset
     * @param {number} value
     */
    setInt8(byteOffset, value) {
        d8.setInt8(0, value);
        write(buffer, u8, i + byteOffset);
    },

    /**
     * @param {number} byteOffset
     * @param {number} value
     */
    setUint8(byteOffset, value) {
        d8.setUint8(0, value);
        write(buffer, u8, i + byteOffset);
    },
});
