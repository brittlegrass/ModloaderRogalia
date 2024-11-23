import game from '/src/game.js';
import * as core from './core/index.js';
import Modloader from './Modloader.js';

init();

/**
 * Entry point for modloader
 */
function init() {
    try {
        // TODO: process window.onerror
        // TODO: translation
        window.modloader = new Modloader();
    } catch(error) {
        core.writeLog(error.stack || error.message);
        game.exit('Mods error. Check the logs file at Rogalia/modlogs/ for details.');
    }
}
