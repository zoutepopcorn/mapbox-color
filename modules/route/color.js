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
const setGradientFromSpeed = (GRADIENT) => {
    const MAX = [...GRADIENT].pop().pos;
    const newGradient = [];
    for(const ITEM of GRADIENT) {
        console.log(ITEM);
        const pos = ITEM.pos > 0 ? ITEM.pos / MAX : 0;
        const color = ITEM.color;
        console.log(pos);
        newGradient.push({color, pos})
    }
    gradient = tinygradient(newGradient);
}

export {
    getColor,
    getColors,
    setGradient,
    setGradientFromSpeed
}