//@ts-check

/** @typedef {import("./magic-view.js").TypedArray} TypedArray */
/** @typedef {import("./magic-view.js").TypedArrayConstructor} TypedArrayConstructor */

/** @extends {DataView<ArrayBuffer>} */
export default class BetterView extends DataView {
  get view() {
    return new Uint8Array(this.buffer);
  }

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
   * @template {TypedArrayConstructor} TConstructor
   * @param {number} byteOffset
   * @param {number} size
   * @param {TConstructor} [Class]
   * @returns {InstanceType<TConstructor>}
   */
  getTyped(byteOffset, size, Class = /** @type {TConstructor} */(Uint8Array)) {
    return /** @type {InstanceType<TConstructor>} */(
        new Class(this.buffer.slice(byteOffset, byteOffset + size))
    );
  }

  /**
   * Append the content of an array ot the current buffer,
   * automatically resizing it on demand.
   * @param {number} byteOffset
   * @param {number[]} array
   */
  setArray(byteOffset, array) {
    const view = new Uint8Array(this.buffer);
    view.set(new Uint8Array(array), byteOffset);
  }

  /**
   * Append just one uint8 value.
   * @param {number} byteOffset
   * @param {number} value
   */
  setDirectU8(byteOffset, value) {
    const view = new Uint8Array(this.buffer);
    view[byteOffset] = value;
  }

  /**
   * Append the content of any typed array to the current buffer,
   * automatically resizing it on demand.
   * @param {number} byteOffset
   * @param {TypedArray | ArrayBufferView} typed
   */
  setTyped(byteOffset, typed) {
    const view = new Uint8Array(this.buffer);
    view.set(/** @type {ArrayLike<number>} */(typed), byteOffset);
  }

  /**
   * Append the content of a `Uint8Array` view to the current buffer,
   * automatically resizing it on demand.
   * @param {number} byteOffset
   * @param {Uint8Array} ui8a
   */
  setTypedU8(byteOffset, ui8a) {
    const view = new Uint8Array(this.buffer);
    view.set(ui8a, byteOffset);
  }
}
