//@ts-check

// ⚠️ This file exists only as TS hack/workaround!
// ⚠️ Nothing in this file is ever imported or executed!

const { isArray } = Array;
const { isView } = ArrayBuffer;

/** @typedef {ArrayBuffer & {transferToFixedLength(length:number):Transferable}} Transferable */
/** @typedef {Int8Array|Uint8Array|Int16Array|Uint16Array|Float32Array|Int32Array|Uint32Array|Float64Array|BigInt64Array|BigUint64Array} TypedArray */
/** @typedef {Int8ArrayConstructor|Uint8ArrayConstructor|Int16ArrayConstructor|Uint16ArrayConstructor|Float32ArrayConstructor|Int32ArrayConstructor|Uint32ArrayConstructor|Float64ArrayConstructor|BigInt64ArrayConstructor|BigUint64ArrayConstructor} TypedArrayConstructor */
/** @typedef {number|number[]|ArrayBuffer|ArrayBufferView} Init */
/** @typedef {(ui8a:Uint8Array, byteOffset:number) => void} Read */
/** @typedef {(ui8a:Uint8Array, byteOffset:number) => void} Write */

/**
 * @extends {DataView<ArrayBuffer>}
 */
export class MagicView extends DataView {
    /**
     * @param {Init} [buffer]
     * @param {number} [byteOffset]
     */
    constructor(buffer = new ArrayBuffer(0xFFFF), byteOffset = 0) {
        if (typeof buffer === 'number') buffer = new ArrayBuffer(buffer);
        else if (isArray(buffer)) buffer = new Uint8Array(buffer).buffer;
        else if (isView(buffer)) buffer = /** @type {Transferable}*/(buffer.buffer);
        super(/** @type {ArrayBuffer} */(buffer), byteOffset);
    }

    /**
     * Refers to the written bytes, usable to keep adding data.
     */
    get size() { return this.byteLength }

    /**
     * Reads bytes from byteOffset to byteOffset + size and return an array
     * @param {number} byteOffset
     * @param {number} size
     * @returns
     */
    getArray(byteOffset, size) {
        return [...new Uint8Array(this.buffer.slice(byteOffset, byteOffset + size))];
    }

    /**
     * Reads bytes from byteOffset to byteOffset + size and return
     * a typed array - by default it's a Uint8Array
     * @param {number} byteOffset
     * @param {number} size
     * @param {TypedArrayConstructor} [Class]
     * @returns
     */
    getTyped(byteOffset, size, Class = Uint8Array) {
        return new Class(this.buffer.slice(byteOffset, byteOffset + size));
    }

    /**
     * Append the content of an array ot the current buffer,
     * automatically resizing it on demand.
     * @param {number} byteOffset
     * @param {number[]} array
     */
    setArray(byteOffset, array) {}

    /**
     * Append the content of any typed array ot the current buffer,
     * automatically resizing it on demand.
     * @param {number} byteOffset
     * @param {ArrayBufferView} typed
     */
    setTyped(byteOffset, typed) {}

    /**
     * Reset the whole instance properties, erasing the buffer too.
     */
    reset() {}
}
