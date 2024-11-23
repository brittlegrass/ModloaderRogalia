const registeredModificationsMap = new Map();

export const registerPrototypeFunctionModification = (prototypeCarrier, key, callback, index = 0) => {
    if (typeof callback !== 'function') {
        return false;
    }

    const prototypeOwner = typeof prototypeCarrier === 'object'
        ? prototypeCarrier.constructor
        : prototypeCarrier;
    
    if (!prototypeOwner || !prototypeOwner.hasOwnProperty('prototype') || typeof prototypeOwner.prototype[key] !== 'function') {
        return false;
    }

    if (!registeredModificationsMap.has(prototypeOwner)) {
        registeredModificationsMap.set(prototypeOwner, {});
    }

    const prorotypeExtensions = registeredModificationsMap.get(prototypeOwner);
    prorotypeExtensions[key] = prorotypeExtensions[key] || {
        original: prototypeOwner.prototype[key],
        extensions: [],
    };

    if (prorotypeExtensions[key].extensions.findIndex(extension => extension.callback === callback) !== -1) {
        return false;
    }
    prorotypeExtensions[key].extensions.push({ callback, index });

    applyPrototypeFunctionModifications();

    return true;
};

export const unregisterPrototypeFunctionModification = (prototypeCarrier, key, callback) => {
    if (typeof callback !== 'function') {
        return false;
    }

    const prototypeOwner = typeof prototypeCarrier === 'object'
        ? prototypeCarrier.constructor
        : prototypeCarrier;
    
    if (!prototypeOwner
        || !prototypeOwner.hasOwnProperty('prototype')
        || typeof prototypeOwner.prototype[key] !== 'function'
        || !registeredModificationsMap.has(prototypeOwner)
    ) {
        return false;
    }

    const prorotypeExtensions = registeredModificationsMap.get(prototypeOwner);
    if (!prorotypeExtensions[key] || prorotypeExtensions[key].extensions.findIndex(extension => extension.callback === callback) === -1) {
        return false;
    }

    prorotypeExtensions[key].extensions = prorotypeExtensions[key].extensions.filter(extension => extension.callback !== callback);

    applyPrototypeFunctionModifications();

    return true;
};

export const applyPrototypeFunctionModifications = extensionsMap => {
    if (!extensionsMap) {
        extensionsMap = registeredModificationsMap;
    }

    if (!(extensionsMap instanceof Map)) {
        return;
    }

    extensionsMap.forEach((extensionsByKeys, prototypeOwner) => {
        for (const key in extensionsByKeys) {
            const extensionsData = extensionsByKeys[key];

            prototypeOwner.prototype[key] = extensionsData.original;
            extensionsData.extensions.sort((a, b) => {
                if (a.index > b.index) {
                    return 1;
                }

                if (a.index < b.index) {
                    return -1;
                }

                return 0;
            }).forEach(extension => {
                extension.callback(prototypeOwner.prototype, key, extensionsData.original);
            });
        }
    });
};

export const getRegisteredPrototypeFunctionModificationsMap = () => {
    return registeredModificationsMap;
};
