//@ts-check

const b16 = new ArrayBuffer(2);
const d16 = new DataView(b16);
const u16 = new Uint8Array(b16);

/**
 * @param {import("../index.js").Read} read
 * @param {import("../index.js").Write} write
 */
export default (read, write) => ({
    /**
     * @param {number} byteOffset
     * @param {boolean} [littleEndian]
     * @returns {number}
     */
    getFloat16(byteOffset, littleEndian = false) {
        /* c8 ignore next 3 */
        read(u16, byteOffset);
        //@ts-ignore
        return d16.getFloat16(0, littleEndian);
    },

    /**
     * @param {number} byteOffset
     * @param {boolean} [littleEndian]
     * @returns
     */
    getInt16(byteOffset, littleEndian = false) {
        read(u16, byteOffset);
        return d16.getInt16(0, littleEndian);
    },

    /**
     * @param {number} byteOffset
     * @param {boolean} [littleEndian]
     * @returns
     */
    getUint16(byteOffset, littleEndian = false) {
        read(u16, byteOffset);
        return d16.getUint16(0, littleEndian);
    },

    /**
     * @param {number} byteOffset
     * @param {number} value
     * @param {boolean} [littleEndian]
     */
    setFloat16(byteOffset, value, littleEndian = false) {
        /* c8 ignore next 3 */
        //@ts-ignore
        d16.setFloat16(0, value, littleEndian);
        write(u16, byteOffset);
    },

    /**
     * @param {number} byteOffset
     * @param {number} value
     * @param {boolean} [littleEndian]
     */
    setInt16(byteOffset, value, littleEndian = false) {
        d16.setInt16(0, value, littleEndian);
        write(u16, byteOffset);
    },

    /**
     * @param {number} byteOffset
     * @param {number} value
     * @param {boolean} [littleEndian]
     */
    setUint16(byteOffset, value, littleEndian = false) {
        d16.setUint16(0, value, littleEndian);
        write(u16, byteOffset);
    },
});
