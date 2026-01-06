/**
 * @typedef {Object} Product
 * @property {string} id
 * @property {string} name
 * @property {string} category
 * @property {number} price
 * @property {string} material
 * @property {string} image
 * @property {boolean} [isNew]
 * @property {boolean} [isBestSeller]
 * @property {string} description
 */

/**
 * @typedef {Object} Booking
 * @property {string} id
 * @property {string} date
 * @property {string} time
 * @property {string} type
 * @property {'Confirmed'|'Pending'|'Completed'|'Cancelled'} status
 * @property {string} description
 */

/**
 * @typedef {Object} ChatMessage
 * @property {'user'|'model'} role
 * @property {string} text
 */

// This file provides JSDoc typedefs as a JavaScript replacement for the
// original TypeScript `types.ts`. It intentionally exports nothing at
// runtime — the typedefs are for editor/type hinting only.

export {};
