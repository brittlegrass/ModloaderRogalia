export const loadStylesFile = href => {
    const element = document.createElement('link');
    element.rel = 'stylesheet';
    element.href = href;

    document.head.appendChild(element);
};

export const unloadStyleFile = href => {
    const element = document.querySelector('[href="' + href + '"]');
    element && element.parentNode.removeChild(element);
};
