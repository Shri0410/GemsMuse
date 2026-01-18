// types.js
/**
 * @typedef {Object} Product
 * @property {string} id
 * @property {string} name
 * @property {string} category
 * @property {string} collection
 * @property {number} price
 * @property {string} material
 * @property {string} image
 * @property {string[]} [images] // Multiple angle photos
 * @property {string} [videoUrl] // Product video
 * @property {boolean} [isNew]
 * @property {boolean} [isBestSeller]
 * @property {string} description
 * @property {string} [collectionName]
 * 
 * // Detailed Specs
 * @property {string} [sku]
 * @property {string} [jewelryType]
 * @property {string} [setInfo]
 * @property {string} [metal]
 * @property {string} [purity]
 * @property {string} [metalColor]
 * @property {string} [metalWeight]
 * @property {string} [gemStoneCts]
 * @property {string} [centerStoneCts]
 * @property {string} [totalStoneWt]
 * @property {string} [totalDiamondWeight]
 * @property {string} [size]
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

export { };