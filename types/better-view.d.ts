/** @typedef {import("./magic-view.js").TypedArray} TypedArray */
/** @typedef {import("./magic-view.js").TypedArrayConstructor} TypedArrayConstructor */
/** @extends {DataView<ArrayBufferLike>} */
export default class BetterView extends DataView<ArrayBufferLike> {
    /**
     * @param {ArrayBufferLike} buffer
     * @param {number} [byteOffset]
     */
    constructor(buffer: ArrayBufferLike, byteOffset?: number);
    /** @readonly @type {Uint8Array} */
    readonly view: Uint8Array;
    /**
     * Reads bytes from byteOffset to byteOffset + size and return an array
     * @param {number} byteOffset
     * @param {number} size
     * @returns
     */
    getArray(byteOffset: number, size: number): number[];
    /**
     * Returns a subarray of the current view.
     * @param {number} byteOffset
     * @param {number} size
     * @returns
     */
    getSub(byteOffset: number, size: number): Uint8Array<ArrayBufferLike>;
    /**
     * Reads bytes from byteOffset to byteOffset + size and return
     * a typed array - by default it's a Uint8Array
     * @template {TypedArrayConstructor} TConstructor
     * @param {number} byteOffset
     * @param {number} size
     * @param {TConstructor} [Class]
     * @returns {InstanceType<TConstructor>}
     */
    getTyped<TConstructor extends TypedArrayConstructor>(byteOffset: number, size: number, Class?: TConstructor): InstanceType<TConstructor>;
    /**
     * Set the content of an array of uint8 numbers to the current buffer.
     * @param {number} byteOffset
     * @param {number[]} array
     */
    setArray(byteOffset: number, array: number[]): void;
    /**
     * Set just one uint8 value.
     * @param {number} byteOffset
     * @param {number} value
     */
    setU8(byteOffset: number, value: number): void;
    /**
     * Set the content of any typed array to the current buffer.
     * @param {number} byteOffset
     * @param {TypedArray | ArrayBufferView} typed
     */
    setTyped(byteOffset: number, typed: TypedArray | ArrayBufferView): void;
    /**
     * Set the content of a `Uint8Array` view to the current buffer.
     * @param {number} byteOffset
     * @param {Uint8Array} ui8a
     */
    setTypedU8(byteOffset: number, ui8a: Uint8Array): void;
    /**
     * Set the string content into the current buffer.
     * @param {number} byteOffset
     * @param {string} value
     */
    setString(byteOffset: number, value: string): void;
}
export type TypedArray = import("./magic-view.js").TypedArray;
export type TypedArrayConstructor = import("./magic-view.js").TypedArrayConstructor;
