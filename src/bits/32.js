//@ts-check

const b32 = new ArrayBuffer(4);
const d32 = new DataView(b32);
const u32 = new Uint8Array(b32);

export default (read, write) => ({
    /**
     * @param {number} byteOffset
     * @param {boolean} [littleEndian]
     * @returns
     */
    getFloat32(byteOffset, littleEndian = false) {
        read(u32, byteOffset);
        return d32.getFloat32(0, littleEndian);
    },

    /**
     * @param {number} byteOffset
     * @param {boolean} [littleEndian]
     * @returns
     */
    getInt32(byteOffset, littleEndian = false) {
        read(u32, byteOffset);
        return d32.getInt32(0, littleEndian);
    },

    /**
     * @param {number} byteOffset
     * @param {boolean} [littleEndian]
     * @returns
     */
    getUint32(byteOffset, littleEndian = false) {
        read(u32, byteOffset);
        return d32.getUint32(0, littleEndian);
    },

    /**
     * @param {number} byteOffset
     * @param {number} value
     * @param {boolean} [littleEndian]
     */
    setFloat32(byteOffset, value, littleEndian = false) {
        d32.setFloat32(0, value, littleEndian);
        write(u32, byteOffset);
    },

    /**
     * @param {number} byteOffset
     * @param {number} value
     * @param {boolean} [littleEndian]
     */
    setInt32(byteOffset, value, littleEndian = false) {
        d32.setInt32(0, value, littleEndian);
        write(u32, byteOffset);
    },

    /**
     * @param {number} byteOffset
     * @param {number} value
     * @param {boolean} [littleEndian]
     */
    setUint32(byteOffset, value, littleEndian = false) {
        d32.setUint32(0, value, littleEndian);
        write(u32, byteOffset);
    },
});
