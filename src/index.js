//@ts-check

import bits8 from './bits/8.js';
import bits16 from './bits/16.js';
import bits32 from './bits/32.js';
import bits64 from './bits/64.js';
import BetterView from './better-view.js';
import stringBytes from './string-bytes.js';
import encoder from './text-encoder.js';

const { isArray } = Array;
const { isView } = ArrayBuffer;
const { prototype } = BetterView;

/**
 * @param {Transferable} buffer
 * @param {number} length
 * @param {number} byteOffset
 * @returns
 */
const review = (buffer, length, byteOffset) => new Uint8Array(
  transfer(buffer, length),
  byteOffset
);

/**
 * @param {Transferable} buffer
 * @param {number} length
 * @returns
 */
const transfer = (buffer, length) => buffer.transferToFixedLength(length);

/** @typedef {import("./magic-view.js").Init} Init */
/** @typedef {import("./magic-view.js").Transferable} Transferable */
/** @typedef {import("./magic-view.js").TypedArray} TypedArray */
/** @typedef {import("./magic-view.js").TypedArrayConstructor} TypedArrayConstructor */
/** @typedef {import("./magic-view.js").Read} Read */
/** @typedef {import("./magic-view.js").Write} Write */

const MagicView = /** @type {{(buffer?: Init, byteOffset?: number): import("./magic-view.js").MagicView, new (buffer?: Init, byteOffset?: number): import("./magic-view.js").MagicView}} */(/** @type {unknown} */(
  function (buffer = new ArrayBuffer(0xFFFF), byteOffset = 0) {
    if (typeof buffer === 'number') buffer = new ArrayBuffer(buffer);
    else if (isArray(buffer)) buffer = new Uint8Array(buffer).buffer;
    else if (isView(buffer)) buffer = /** @type {Transferable}*/(buffer.buffer);

    /** @type {Transferable?} */
    let $ = null;
    let view = new Uint8Array(/** @type {Transferable}*/(buffer), byteOffset), i = 0;
    const LENGTH = view.length;

    /**
     * @param {number} length
     */
    const resize = length => {
      if (i < length) {
        i = length;
        if (view.length < length) {
          view = review(view.buffer, length + byteOffset + LENGTH, byteOffset);
        }
      }
    };

    /** @type {Read} */
    const read = (ui8a, byteOffset) => {
      // much slower in both v8 and jsc
      // ui8a.set(view.subarray(byteOffset, byteOffset + ui8a.length));
      for (let i = 0; i < ui8a.length; i++)
        ui8a[i] = view[byteOffset++];
    };

    /** @type {Write} */
    const write = (ui8a, byteOffset) => {
      resize(byteOffset + ui8a.length);
      // slower in v8
      // for (let j = 0; j < ui8a.length; j++) view[byteOffset++] = ui8a[j];
      view.set(ui8a, byteOffset);
    };

    return {
      //@ts-ignore
      __proto__: prototype,

      /** @readonly @type {ArrayBuffer} */
      get buffer() { return $ || ($ = transfer(view.buffer, i + byteOffset)) },

      /** @readonly */
      get byteLength() { return view.length },

      /** @readonly */
      get byteOffset() { return byteOffset },

      /** @readonly */
      get size() { return i },

      /** @readonly @returns {Uint8Array<ArrayBuffer>} */
      get view() {
        const view = new Uint8Array(this.buffer);
        this.reset();
        return view;
      },

      ...bits64(read, write),
      ...bits32(read, write),
      ...bits16(read, write),
      ...bits8(read, write),

      /**
       * Reads bytes from byteOffset to byteOffset + size and return an array
       * @param {number} byteOffset
       * @param {number} size
       * @returns
       */
      getArray(byteOffset, size) {
        return [...view.subarray(byteOffset, byteOffset + size)];
      },

      /**
       * Returns a subarray of the current view.
       * @param {number} byteOffset
       * @param {number} size
       * @returns
       */
      getSub(byteOffset, size) {
        return view.subarray(byteOffset, byteOffset + size);
      },

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
        const ui8a = view.slice(byteOffset, byteOffset + size);
        return /** @type {InstanceType<TConstructor>} */(
          Class === Uint8Array ? ui8a : new Class(/** @type {ArrayBuffer} */(ui8a.buffer))
        );
      },

      /**
       * Append the content of an array of uint8 numbers
       * to the current buffer, automatically resizing it on demand.
       * @param {number} byteOffset
       * @param {number[]} array
       */
      setArray(byteOffset, array) {
        resize(byteOffset + array.length);
        for (let j = 0; j < array.length; j++) view[byteOffset++] = array[j];
      },

      /**
       * Append just one uint8 value, resizing if needed.
       * @param {number} byteOffset
       * @param {number} value
       */
      setU8(byteOffset, value) {
        resize(byteOffset + 1);
        view[byteOffset] = value;
      },

      /**
       * Append the content of any typed array ot the current buffer,
       * automatically resizing it on demand.
       * @param {number} byteOffset
       * @param {TypedArray | ArrayBufferView} typed
       */
      setTyped(byteOffset, typed) {
        const ui8a = typed instanceof Uint8Array ? typed : new Uint8Array(typed.buffer);
        write(ui8a, byteOffset);
      },

      /**
       * Append the content of a `Uint8Array` view to the current buffer,
       * automatically resizing it on demand.
       * @param {number} byteOffset
       * @param {Uint8Array} ui8a
       */
      setTypedU8(byteOffset, ui8a) {
        write(ui8a, byteOffset);
      },

      /**
       * Set the string content into the current buffer,
       * automatically resizing it on demand.
       * @param {number} byteOffset
       * @param {string} value
       */
      setString(byteOffset, value) {
        const byteEndset = byteOffset + stringBytes(value);
        resize(byteEndset);
        encoder.encodeInto(value, view.subarray(byteOffset, byteEndset));
      },

      /**
       * Reset the whole instance properties, erasing the buffer too.
       */
      reset() {
        view = new Uint8Array(/** @type {Transferable}*/(new ArrayBuffer(LENGTH)), byteOffset);
        i = 0;
        $ = null;
      },
    };
  }
));

MagicView.prototype = prototype;

export { MagicView, BetterView };
