export type Transferable = ArrayBuffer & {
    transferToFixedLength(length: number): Transferable;
};
export type TypedArray = Int8Array | Uint8Array | Int16Array | Uint16Array | Float32Array | Int32Array | Uint32Array | Float64Array | BigInt64Array | BigUint64Array;
export type TypedArrayConstructor = Int8ArrayConstructor | Uint8ArrayConstructor | Float32ArrayConstructor | Int16ArrayConstructor | Uint16ArrayConstructor | Float32ArrayConstructor | Int32ArrayConstructor | Uint32ArrayConstructor | Float64ArrayConstructor | BigInt64ArrayConstructor | BigUint64ArrayConstructor;
export type Init = number | number[] | ArrayBuffer | ArrayBufferView;
export type Read = (ui8a: Uint8Array, byteOffset: number) => void;
export type Write = (ui8a: Uint8Array, byteOffset: number) => void;

export class DataViewLike<T extends ArrayBufferLike> extends DataView<T> {
    get size(): number;
    getTyped(byteOffset: number, size: number, Class?: TypedArrayConstructor): TypedArray;
    setTyped(byteOffset: number, typed: ArrayBufferView): void;
    reset(): void;
}

export const MagicView: {
    (buffer?: Init, byteOffset?: number): DataViewLike<ArrayBuffer>
    new (buffer?: Init, byteOffset?: number): DataViewLike<ArrayBuffer>
}
