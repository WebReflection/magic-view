//@ts-check

import stringBytes from './string-bytes.js';
import encoder from './text-encoder.js';

/** @typedef {import("./magic-view.js").TypedArray} TypedArray */
/** @typedef {import("./magic-view.js").TypedArrayConstructor} TypedArrayConstructor */

/** @extends {DataView<ArrayBufferLike>} */
export default class BetterView extends DataView {
  /**
   * @param {ArrayBufferLike} buffer
   * @param {number} [byteOffset]
   */
  constructor(buffer, byteOffset = 0) {
    super(buffer, byteOffset);
    /** @readonly @type {Uint8Array} */
    this.view = new Uint8Array(this.buffer);
  }

  /**
   * Reads bytes from byteOffset to byteOffset + size and return an array
   * @param {number} byteOffset
   * @param {number} size
   * @returns
   */
  getArray(byteOffset, size) {
    return [...this.view.slice(byteOffset, byteOffset + size)];
  }

  /**
   * Returns a subarray of the current view.
   * @param {number} byteOffset
   * @param {number} size
   * @returns
   */
  getSub(byteOffset, size) {
    return this.view.subarray(byteOffset, byteOffset + size);
  }

  /**
   * Reads bytes from byteOffset to byteOffset + size and return
   * a typed array - by default it's a Uint8Array
   * @template {TypedArrayConstructor} TConstructor
   * @param {number} byteOffset
   * @param {number} size
   * @param {TConstructor} [Class]
   * @returns {InstanceType<TConstructor>}
   */
  getTyped(byteOffset, size, Class = /** @type {TConstructor} */(Uint8Array)) {
    const ui8a = this.view.slice(byteOffset, byteOffset + size);
    return /** @type {InstanceType<TConstructor>} */(
      Class === Uint8Array ? ui8a : new Class(/** @type {ArrayBuffer} */(ui8a.buffer))
    );
  }

  /**
   * Set the content of an array of uint8 numbers to the current buffer.
   * @param {number} byteOffset
   * @param {number[]} array
   */
  setArray(byteOffset, array) {
    this.view.set(new Uint8Array(array), byteOffset);
  }

  /**
   * Set just one uint8 value.
   * @param {number} byteOffset
   * @param {number} value
   */
  setU8(byteOffset, value) {
    super.setUint8(byteOffset, value);
  }

  /**
   * Set the content of any typed array to the current buffer.
   * @param {number} byteOffset
   * @param {TypedArray | ArrayBufferView} typed
   */
  setTyped(byteOffset, typed) {
    const ui8a = typed instanceof Uint8Array ? typed : new Uint8Array(typed.buffer);
    this.view.set(ui8a, byteOffset);
  }

  /**
   * Set the content of a `Uint8Array` view to the current buffer.
   * @param {number} byteOffset
   * @param {Uint8Array} ui8a
   */
  setTypedU8(byteOffset, ui8a) {
    this.view.set(ui8a, byteOffset);
  }

  /**
   * Set the string content into the current buffer.
   * @param {number} byteOffset
   * @param {string} value
   * @param {number} [bytes]
   */
  setString(byteOffset, value, bytes = stringBytes(value)) {
    const byteEndset = byteOffset + bytes;
    encoder.encodeInto(value, this.view.subarray(byteOffset, byteEndset));
  }
}
