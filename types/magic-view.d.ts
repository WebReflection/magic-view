/** @typedef {ArrayBuffer & {transferToFixedLength(length:number):Transferable}} Transferable */
/** @typedef {Int8Array|Uint8Array|Int16Array|Uint16Array|Float32Array|Int32Array|Uint32Array|Float64Array|BigInt64Array|BigUint64Array} TypedArray */
/** @typedef {Int8ArrayConstructor|Uint8ArrayConstructor|Int16ArrayConstructor|Uint16ArrayConstructor|Float32ArrayConstructor|Int32ArrayConstructor|Uint32ArrayConstructor|Float64ArrayConstructor|BigInt64ArrayConstructor|BigUint64ArrayConstructor} TypedArrayConstructor */
/** @typedef {number|number[]|ArrayBuffer|ArrayBufferView} Init */
/** @typedef {(ui8a:Uint8Array, byteOffset:number) => void} Read */
/** @typedef {(ui8a:Uint8Array, byteOffset:number) => void} Write */
/**
 * @extends {DataView<ArrayBuffer>}
 */
export class MagicView extends DataView<ArrayBuffer> {
    /**
     * @param {Init} [buffer]
     * @param {number} [byteOffset]
     */
    constructor(buffer?: Init, byteOffset?: number);
    /**
     * Refers to the written bytes, usable to keep adding data.
     */
    get size(): number;
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
}
export type Transferable = ArrayBuffer & {
    transferToFixedLength(length: number): Transferable;
};
export type TypedArray = Int8Array | Uint8Array | Int16Array | Uint16Array | Float32Array | Int32Array | Uint32Array | Float64Array | BigInt64Array | BigUint64Array;
export type TypedArrayConstructor = Int8ArrayConstructor | Uint8ArrayConstructor | Int16ArrayConstructor | Uint16ArrayConstructor | Float32ArrayConstructor | Int32ArrayConstructor | Uint32ArrayConstructor | Float64ArrayConstructor | BigInt64ArrayConstructor | BigUint64ArrayConstructor;
export type Init = number | number[] | ArrayBuffer | ArrayBufferView;
export type Read = (ui8a: Uint8Array, byteOffset: number) => void;
export type Write = (ui8a: Uint8Array, byteOffset: number) => void;
