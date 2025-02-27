declare const _default: MagicView;
export default _default;
export type Init = import("./magic-view.js").Init;
export type Transferable = import("./magic-view.js").Transferable;
export type TypedArray = import("./magic-view.js").TypedArray;
export type TypedArrayConstructor = import("./magic-view.js").TypedArrayConstructor;
export type Read = import("./magic-view.js").Read;
export type Write = import("./magic-view.js").Write;
export type MagicView = {
    (buffer?: Init, byteOffset?: number): import("./magic-view.js").MagicView;
    new (buffer?: Init, byteOffset?: number): import("./magic-view.js").MagicView;
};
