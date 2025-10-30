/**
 * Helper function to generate a new sequential ID as a string
 * based on the current keys of the data object.
 * NOTE: In a real database, this would be auto-generated.
 * @param {Object} dataObject The object (e.g., users or transactions) to check keys against.
 * @returns {string} The new sequential ID.
 */

export function getNewId(dataObject) {
    // Get all current numeric keys, convert to numbers, find max, and add 1
    const keys = Object.keys(dataObject);
    const maxId = keys.length > 0 ? Math.max(...keys.map(Number)) : 0;

    return String(maxId + 1);
};