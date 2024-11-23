const fs = require('fs');
const path = require('path');

/**
 * Creates directory and write text to file
 * @param {string} text - text to write to file
 * @param {string} filePath - path to file
 * @param {string} [flag=a] - file system flag https://nodejs.org/api/fs.html#file-system-flags
 */
export const writeToFile = (text, filePath, flag = 'a') => {
    if (!text || !filePath) {
        return;
    }

    const dir = path.dirname(filePath);

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(
        filePath,
        text,
        { flag }
    );
};

export const findDirectories = (parentDirPath, callbackFn = () => true) => {
    if (!fs.existsSync(parentDirPath)) {
        return false;
    }

    const entries = fs.readdirSync(parentDirPath).map(item => {
        return path.join(parentDirPath, item);
    });

    return entries.filter(item => {
        const isDirectory = fs.existsSync(item) && fs.lstatSync(item).isDirectory();

        return isDirectory && callbackFn(item);
    });
};

export const getNodeFileSystem = () => {
    return fs;
};

export const getNodePath = () => {
    return path;
};
