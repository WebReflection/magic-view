declare function _default(read: import("../index.js").Read, write: import("../index.js").Write): {
    /**
     * @param {number} byteOffset
     * @returns
     */
    getInt8(byteOffset: number): number;
    /**
     * @param {number} byteOffset
     * @returns
     */
    getUint8(byteOffset: number): number;
    /**
     * @param {number} byteOffset
     * @param {number} value
     */
    setInt8(byteOffset: number, value: number): void;
    /**
     * @param {number} byteOffset
     * @param {number} value
     */
    setUint8(byteOffset: number, value: number): void;
};
export default _default;
