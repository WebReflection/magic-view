declare function _default(read: import("../index.js").Read, write: import("../index.js").Write): {
    /**
     * @param {number} byteOffset
     * @param {boolean} [littleEndian]
     * @returns
     */
    getFloat32(byteOffset: number, littleEndian?: boolean): number;
    /**
     * @param {number} byteOffset
     * @param {boolean} [littleEndian]
     * @returns
     */
    getInt32(byteOffset: number, littleEndian?: boolean): number;
    /**
     * @param {number} byteOffset
     * @param {boolean} [littleEndian]
     * @returns
     */
    getUint32(byteOffset: number, littleEndian?: boolean): number;
    /**
     * @param {number} byteOffset
     * @param {number} value
     * @param {boolean} [littleEndian]
     */
    setFloat32(byteOffset: number, value: number, littleEndian?: boolean): void;
    /**
     * @param {number} byteOffset
     * @param {number} value
     * @param {boolean} [littleEndian]
     */
    setInt32(byteOffset: number, value: number, littleEndian?: boolean): void;
    /**
     * @param {number} byteOffset
     * @param {number} value
     * @param {boolean} [littleEndian]
     */
    setUint32(byteOffset: number, value: number, littleEndian?: boolean): void;
};
export default _default;
