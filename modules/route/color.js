import tinygradient from "tinygradient";

let gradient = tinygradient([
    {color: 'purple', pos: 0},
    {color: 'blue', pos: 0.2},
    {color: 'green', pos: 0.4},
    {color: 'yellow', pos: 0.6},
    {color: 'orange', pos: 0.8},
    {color: 'red', pos: 1},
]);

const getColor = (pos) => {
    return `#${gradient.hsvAt(pos).toHex()}`;
}
const getColors = (maxSpeed) => {
    const COLORS = [];
    for(let speed  = 0; speed < maxSpeed; speed++) {
        const POSITION = speed / maxSpeed;
        const COLOR = getColor(POSITION);
        COLORS.push(COLOR);
    }
    return COLORS;
}
const setGradient = (GRADIENT) => {
    gradient = tinygradient(GRADIENT);
}

export {
    getColor,
    getColors,
    setGradient
}