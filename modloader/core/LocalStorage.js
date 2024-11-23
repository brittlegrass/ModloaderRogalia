/**
 * Returns JSON parsed value from localStorage
 * @param {string} key - localStorage item key
 * @param {string} prefix - prefix for localStorage items
 * @returns {*} JSON parsed value for {prefix}{key} entry
 */
export const getLocalData = (key, prefix) => {
    const value = localStorage.getItem(prefix + key);
    return value && JSON.parse(value);
};

/**
 * Writes JSON stringified value to localStorage
 * @param {string} key - localStorage item key
 * @param {*} value - string, number, booleen, Object, Array
 * @param {string} prefix - prefix for localStorage items
 */
export const setLocalData = (key, value, prefix) => {
    localStorage.setItem(prefix + key, JSON.stringify(value));
};

/**
 * Removes value from localStorage
 * @param {string} key - localStorage item key
 * @param {string} prefix - prefix for localStorage items
 */
export const removeLocalData = (key, prefix) => {
    localStorage.removeItem(prefix + key);
};

/**
 * Removes all values from localStorage by prefix
 * @param {string} prefix - prefix for localStorage items
 */
export const removeAllLocalDataByPrefix = (prefix) => {
    const storageLength = localStorage.length;
    const keysToRemove = [];
    for (let i = 0; i < storageLength; i++) {
        const key = localStorage.key(i);
        if (key.startsWith(prefix)) {
            keysToRemove.push(key);
        }
    }

    keysToRemove.forEach(key => {
        localStorage.removeItem(key);
    });
};
