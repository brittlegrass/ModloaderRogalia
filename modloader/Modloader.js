import dom from '/src/dom.js';
import game from '/src/game.js';
import * as core from './core/index.js';

export default class Modloader {
    constructor() {
        if (Modloader.instance) {
            return Modloader.instance;
        }

        Modloader.instance = this;

        this.gameStartModificator = (proto, key, original) => {
            const modloader = this;
            const current = proto[key];
            proto[key] = async function () {
                const wasLoaded = await modloader.load(...arguments);
                if (wasLoaded) {
                    await modloader.gameStartBefore(...arguments);
                }

                await current.bind(this)(...arguments);

                if (wasLoaded) {
                    await modloader.gameStartAfter(...arguments);
                }
            };
        };

        this.init();
    }

    async init() {
        core.registerPrototypeFunctionModification(game, 'start', this.gameStartModificator);
    }

    async load() {
        try {
        core.loadStylesFile('modloader/css/index.css');

        return await new Promise(resolve => {
            const overlay = dom.div('.ml-loading-overlay');

            const overlayBg = dom.div('.ml-loading-overlay-bg');

            const contentWrapper = dom.div('');
            const content = dom.div('.ml-loading-content');
            const title = dom.div('.ml-title mb-10');
            title.innerHTML = 'Modloader v0.0.1 for Rogalia v0.46 patch ...';
            const text = dom.div('.ml-text mb-10');
            text.innerHTML = 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi voluptas ipsa veritatis! Deleniti voluptatibus veniam et obcaecati voluptas, voluptates, natus, mollitia sequi sint veritatis fuga voluptate ea dolore commodi nihil!';
            const btns = dom.div('');
            const classicButton = dom.button('Play Classic', '', () => {
                dom.hide(overlay);
                resolve(false);
            });
            const moddedButton = dom.button('Play Modded', '', () => {
                dom.hide(overlay);
                resolve(true);
            });
            const exitButton = dom.button('Quit', '', () => {
                const gui = require("nw.gui");
                gui.App.quit();
            });
            dom.append(btns, [classicButton, moddedButton, exitButton]);
            const configTitle = dom.div('');
            configTitle.innerHTML = 'Select mods to load(new added mods are selected by default)';
            configTitle.style.marginBottom = '10px';

            const savedModsConfig = core.getLocalData('modsConfig', 'ml_') || {};
            const selectAll = dom.checkbox('Select All', true, function(e) {
                const checked = this.checked;
                modsConfig.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
                    if (checkbox !== this) {
                        checkbox.checked = checked;
                        checkbox.onchange();
                    }
                });
            });
            selectAll.classList.add('ml-config-item');
            const modsConfig = dom.scrollable('.ml-config', [
                configTitle,
                selectAll,
                ...(['Mod1', 'SuperMod228', 'MegaLooser', 'Cccccc'].map(modName => {
                    const label = dom.checkbox(modName, savedModsConfig[modName] || savedModsConfig[modName] === undefined, function() {
                        savedModsConfig[modName] = this.checked;
                        core.setLocalData('modsConfig', savedModsConfig, 'ml_');
                    });
                    label.classList.add('ml-config-item');
                    return label;
                })),
            ]);
            dom.append(content, [title, text, btns, modsConfig]);
            dom.append(contentWrapper, content);

            const loadingHint = dom.div('.ml-loading-hint');
            const hintButton = dom.button('', '.ml-button-icon ml-button-icon-glass mr-10', () => {

            });
            hintButton.innerHTML = '<span>>></span>';
            hintButton.title = 'Next hint';
            const hintText = dom.span('Chickens eat any seeds, mushroom spores and grass.');
            dom.append(loadingHint, [hintButton, hintText]);
            dom.append(overlay, [overlayBg, contentWrapper]);

            dom.insert(overlay);

            // timeouts for animations
            setTimeout(() => {
                dom.append(overlay, loadingHint);
            }, 1000);
            setTimeout(() => {
                content.classList.add('ml-loading-content-shown');
            }, 4500);
        });
        } catch (e) {
            core.writeLog(e.stack || e.message);
        }
    }

    // getModNamesList() {
    //     const nodePath = core.getNodePath();

    //     return (core.findDirectories('./mods', itemPath => {
    //         return core.getNodeFileSystem().existsSync(nodePath.join(itemPath, 'index.js'));
    //     }) || []).map(item => nodePath.basename(item));


    //     // const fs = require('fs');
    //     // const path = require('path');

    //     // async function importAllFiles(directoryPath) {
    //     //   const files = fs.readdirSync(directoryPath);

    //     //   const modules = await Promise.all(files.map(async (file) => {
    //     //     const filePath = path.join(directoryPath, file);
    //     //     if (path.extname(filePath) === '.js') {
    //     //       return import(filePath);
    //     //     }
    //     //   }));

    //     //   return modules.filter(Boolean);
    //     // }

    //     // importAllFiles('./my-directory')
    //     //   .then((modules) => {
    //     //     modules.forEach((module) => {
    //     //       console.log(module);
    //     //     });
    //     //   });
    // }

    async gameStartBefore() {
        
    }

    async gameStartAfter() {

    }
}
