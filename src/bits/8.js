//@ts-check

const b8 = new ArrayBuffer(1);
const d8 = new DataView(b8);
const u8 = new Uint8Array(b8);

export default (read, write) => ({
    /**
     * @param {number} byteOffset
     * @returns
     */
    getInt8(byteOffset) {
        read(u8, byteOffset);
        return d8.getInt8(0);
    },

    /**
     * @param {number} byteOffset
     * @returns
     */
    getUint8(byteOffset) {
        read(u8, byteOffset);
        return d8.getUint8(0);
    },

    /**
     * @param {number} byteOffset
     * @param {number} value
     */
    setInt8(byteOffset, value) {
        d8.setInt8(0, value);
        write(u8, byteOffset);
    },

    /**
     * @param {number} byteOffset
     * @param {number} value
     */
    setUint8(byteOffset, value) {
        d8.setUint8(0, value);
        write(u8, byteOffset);
    },
});
