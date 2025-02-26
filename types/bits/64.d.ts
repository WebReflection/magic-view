declare function _default(read: import("../index.js").Read, write: import("../index.js").Write): {
    /**
     * @param {number} byteOffset
     * @param {boolean} [littleEndian]
     * @returns
     */
    getBigInt64(byteOffset: number, littleEndian?: boolean): bigint;
    /**
     * @param {number} byteOffset
     * @param {boolean} [littleEndian]
     * @returns
     */
    getBigUint64(byteOffset: number, littleEndian?: boolean): bigint;
    /**
     * @param {number} byteOffset
     * @param {boolean} [littleEndian]
     * @returns
     */
    getFloat64(byteOffset: number, littleEndian?: boolean): number;
    /**
     * @param {number} byteOffset
     * @param {bigint} value
     * @param {boolean} [littleEndian]
     */
    setBigInt64(byteOffset: number, value: bigint, littleEndian?: boolean): void;
    /**
     * @param {number} byteOffset
     * @param {bigint} value
     * @param {boolean} [littleEndian]
     */
    setBigUint64(byteOffset: number, value: bigint, littleEndian?: boolean): void;
    /**
     * @param {number} byteOffset
     * @param {number} value
     * @param {boolean} [littleEndian]
     */
    setFloat64(byteOffset: number, value: number, littleEndian?: boolean): void;
};
export default _default;
