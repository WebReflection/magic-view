//@ts-check

const b64 = new ArrayBuffer(8);
const d64 = new DataView(b64);
const u64 = new Uint8Array(b64);

export default (read, write) => ({
    /**
     * @param {number} byteOffset
     * @param {boolean} [littleEndian]
     * @returns
     */
    getBigInt64(byteOffset, littleEndian = false) {
        read(u64, byteOffset);
        return d64.getBigInt64(0, littleEndian);
    },

    /**
     * @param {number} byteOffset
     * @param {boolean} [littleEndian]
     * @returns
     */
    getBigUint64(byteOffset, littleEndian = false) {
        read(u64, byteOffset);
        return d64.getBigUint64(0, littleEndian);
    },

    /**
     * @param {number} byteOffset
     * @param {boolean} [littleEndian]
     * @returns
     */
    getFloat64(byteOffset, littleEndian = false) {
        read(u64, byteOffset);
        return d64.getFloat64(0, littleEndian);
    },

    /**
     * @param {number} byteOffset
     * @param {bigint} value
     * @param {boolean} [littleEndian]
     */
    setBigInt64(byteOffset, value, littleEndian = false) {
        d64.setBigInt64(0, value, littleEndian);
        write(u64, byteOffset);
    },

    /**
     * @param {number} byteOffset
     * @param {bigint} value
     * @param {boolean} [littleEndian]
     */
    setBigUint64(byteOffset, value, littleEndian = false) {
        d64.setBigUint64(0, value, littleEndian);
        write(u64, byteOffset);
    },

    /**
     * @param {number} byteOffset
     * @param {number} value
     * @param {boolean} [littleEndian]
     */
    setFloat64(byteOffset, value, littleEndian = false) {
        d64.setFloat64(0, value, littleEndian);
        write(u64, byteOffset);
    },
});
