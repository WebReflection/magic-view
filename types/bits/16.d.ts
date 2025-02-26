declare function _default(read: import("../index.js").Read, write: import("../index.js").Write): {
    /**
     * @param {number} byteOffset
     * @param {boolean} [littleEndian]
     * @returns
     */
    getFloat16(byteOffset: number, littleEndian?: boolean): any;
    /**
     * @param {number} byteOffset
     * @param {boolean} [littleEndian]
     * @returns
     */
    getInt16(byteOffset: number, littleEndian?: boolean): number;
    /**
     * @param {number} byteOffset
     * @param {boolean} [littleEndian]
     * @returns
     */
    getUint16(byteOffset: number, littleEndian?: boolean): number;
    /**
     * @param {number} byteOffset
     * @param {number} value
     * @param {boolean} [littleEndian]
     */
    setFloat16(byteOffset: number, value: number, littleEndian?: boolean): void;
    /**
     * @param {number} byteOffset
     * @param {number} value
     * @param {boolean} [littleEndian]
     */
    setInt16(byteOffset: number, value: number, littleEndian?: boolean): void;
    /**
     * @param {number} byteOffset
     * @param {number} value
     * @param {boolean} [littleEndian]
     */
    setUint16(byteOffset: number, value: number, littleEndian?: boolean): void;
};
export default _default;
