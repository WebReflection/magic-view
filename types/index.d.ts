export type Init = import("./magic-view.js").Init;
export type Transferable = import("./magic-view.js").Transferable;
export type TypedArray = import("./magic-view.js").TypedArray;
export type TypedArrayConstructor = import("./magic-view.js").TypedArrayConstructor;
export type Read = import("./magic-view.js").Read;
export type Write = import("./magic-view.js").Write;
/** @typedef {import("./magic-view.js").Init} Init */
/** @typedef {import("./magic-view.js").Transferable} Transferable */
/** @typedef {import("./magic-view.js").TypedArray} TypedArray */
/** @typedef {import("./magic-view.js").TypedArrayConstructor} TypedArrayConstructor */
/** @typedef {import("./magic-view.js").Read} Read */
/** @typedef {import("./magic-view.js").Write} Write */
export const MagicView: {
    (buffer?: Init, byteOffset?: number): import("./magic-view.js").MagicView;
    new (buffer?: Init, byteOffset?: number): import("./magic-view.js").MagicView;
};
import BetterView from './better-view.js';
export { BetterView };
