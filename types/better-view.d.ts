
/** @extends {DataView<ArrayBuffer>} */
export default class BetterView extends DataView<ArrayBuffer> {
    constructor(buffer: ArrayBuffer, byteOffset?: number, byteLength?: number);
    /**
     * Reads bytes from byteOffset to byteOffset + size and return an array
     * @param {number} byteOffset
     * @param {number} size
     * @returns
     */
    getArray(byteOffset: number, size: number): number[];
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
     * Append the content of an array ot the current buffer,
     * automatically resizing it on demand.
     * @param {number} byteOffset
     * @param {number[]} array
     */
    setArray(byteOffset: number, array: number[]): void;
    /**
     * Append the content of any typed array ot the current buffer,
     * automatically resizing it on demand.
     * @param {number} byteOffset
     * @param {TypedArray | ArrayBufferView} typed
     */
    setTyped(byteOffset: number, typed: TypedArray | ArrayBufferView): void;
}
export type TypedArray = import("./magic-view.js").TypedArray;
export type TypedArrayConstructor = import("./magic-view.js").TypedArrayConstructor;
