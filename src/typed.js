//@ts-check

/** @typedef {import("./magic-view.js").Init} Init */
/** @typedef {import("./magic-view.js").Transferable} Transferable */
/** @typedef {import("./magic-view.js").TypedArrayConstructor} TypedArrayConstructor */
/** @typedef {import("./magic-view.js").Read} Read */
/** @typedef {import("./magic-view.js").Write} Write */

import { MagicView } from './magic-view.js';
import magicView from './index.js';

export default new Proxy(
    MagicView,
    {
        /**
         * @param {typeof MagicView} target
         * @param {[Init?,number?]} args
         * @param {Function} _
         * @returns {MagicView}
         */
        construct(target, args, _) {
            return magicView.apply(null, args);
        }
    }
);
