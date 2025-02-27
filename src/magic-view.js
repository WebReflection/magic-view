//@ts-check

// ⚠️ This file exists only as TS hack/workaround!
// ⚠️ Nothing in this file is ever imported or executed!
import BetterView from './better-view.js';

const { isArray } = Array;
const { isView } = ArrayBuffer;

/** @typedef {ArrayBuffer & {transferToFixedLength(length:number):Transferable}} Transferable */
/** @typedef {Int8Array|Uint8Array|Int16Array|Uint16Array|Float32Array|Int32Array|Uint32Array|Float64Array|BigInt64Array|BigUint64Array} TypedArray */
/** @typedef {Int8ArrayConstructor|Uint8ArrayConstructor|Int16ArrayConstructor|Uint16ArrayConstructor|Float32ArrayConstructor|Int32ArrayConstructor|Uint32ArrayConstructor|Float64ArrayConstructor|BigInt64ArrayConstructor|BigUint64ArrayConstructor} TypedArrayConstructor */
/** @typedef {number|number[]|ArrayBuffer|ArrayBufferView} Init */
/** @typedef {(ui8a:Uint8Array, byteOffset:number) => void} Read */
/** @typedef {(ui8a:Uint8Array, byteOffset:number) => void} Write */

export class MagicView extends BetterView {
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
     * Reset the whole instance properties, erasing the buffer too.
     */
    reset() {}
}
