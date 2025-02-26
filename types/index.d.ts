/** @typedef {import("./magic-view.js").Init} Init */
/** @typedef {import("./magic-view.js").Transferable} Transferable */
/** @typedef {import("./magic-view.js").TypedArrayConstructor} TypedArrayConstructor */
/** @typedef {import("./magic-view.js").Read} Read */
/** @typedef {import("./magic-view.js").Write} Write */
/**
 * @param {Init} [buffer]
 * @param {number} [byteOffset]
 * @returns
 */
export default function MagicView(buffer?: Init, byteOffset?: number): {
    /**
     * Reads bytes from byteOffset to byteOffset + size and return
     * a typed array - by default it's a Uint8Array
     * @param {number} byteOffset
     * @param {number} size
     * @param {TypedArrayConstructor} [Class]
     * @returns
     */
    getTyped(byteOffset: number, size: number, Class?: TypedArrayConstructor): Int8Array<ArrayBuffer> | Uint8Array<ArrayBuffer> | Int16Array<ArrayBuffer> | Uint16Array<ArrayBuffer> | Int32Array<ArrayBuffer> | Uint32Array<ArrayBuffer> | Float32Array<ArrayBuffer> | Float64Array<ArrayBuffer> | BigInt64Array<ArrayBuffer> | BigUint64Array<ArrayBuffer>;
    /**
     * Append the content of any typed array ot the current buffer,
     * automatically resizing it on demand.
     * @param {number} byteOffset
     * @param {ArrayBufferView} typed
     */
    setTyped(byteOffset: number, typed: ArrayBufferView): void;
    /**
     * Reset the whole instance properties, erasing the buffer too.
     */
    reset(): void;
    getInt8(byteOffset: number): number;
    getUint8(byteOffset: number): number;
    setInt8(byteOffset: number, value: number): void;
    setUint8(byteOffset: number, value: number): void;
    getFloat16(byteOffset: number, littleEndian?: boolean): any;
    getInt16(byteOffset: number, littleEndian?: boolean): number;
    getUint16(byteOffset: number, littleEndian?: boolean): number;
    setFloat16(byteOffset: number, value: number, littleEndian?: boolean): void;
    setInt16(byteOffset: number, value: number, littleEndian?: boolean): void;
    setUint16(byteOffset: number, value: number, littleEndian?: boolean): void;
    getFloat32(byteOffset: number, littleEndian?: boolean): number;
    getInt32(byteOffset: number, littleEndian?: boolean): number;
    getUint32(byteOffset: number, littleEndian?: boolean): number;
    setFloat32(byteOffset: number, value: number, littleEndian?: boolean): void;
    setInt32(byteOffset: number, value: number, littleEndian?: boolean): void;
    setUint32(byteOffset: number, value: number, littleEndian?: boolean): void;
    getBigInt64(byteOffset: number, littleEndian?: boolean): bigint;
    getBigUint64(byteOffset: number, littleEndian?: boolean): bigint;
    getFloat64(byteOffset: number, littleEndian?: boolean): number;
    setBigInt64(byteOffset: number, value: bigint, littleEndian?: boolean): void;
    setBigUint64(byteOffset: number, value: bigint, littleEndian?: boolean): void;
    setFloat64(byteOffset: number, value: number, littleEndian?: boolean): void;
    __proto__: DataView<ArrayBufferLike>;
    buffer: ArrayBuffer;
    byteLength: number;
    byteOffset: number;
    size: number;
};
export type Init = import("./magic-view.js").Init;
export type Transferable = import("./magic-view.js").Transferable;
export type TypedArrayConstructor = import("./magic-view.js").TypedArrayConstructor;
export type Read = import("./magic-view.js").Read;
export type Write = import("./magic-view.js").Write;
