import {getColors, setGradient} from "./color";

let MAX_SPEED = 30;

const setMaxSpeed = (SPEED) => {
    MAX_SPEED = SPEED;
}
const setColorGradient = (GRADIENT) => {
    setGradient(GRADIENT);
}
const getStops = (DISTS, SPEEDS) => {
    const STOPS = [];
    let routeLength = 0;
    let o = 0;
    const MY_COLORS = getColors(MAX_SPEED + 1);

    for (const LENGTH of DISTS.route) {
        const SPEED = SPEEDS[o++];
        const ARR_NR = SPEED >= MAX_SPEED ? MAX_SPEED : SPEED;
        const COLOR = MY_COLORS[ARR_NR];
        routeLength += LENGTH;
        const STOP = (routeLength / DISTS.totalLength);
        STOPS.push(STOP, COLOR);
    }
    return STOPS;
}

const colorRoute = (route = {}) => {
    console.log(route);
    const STOPS = getStops(route.distances, route.speeds);
    const geojson = {
        'type': 'FeatureCollection',
        'features': [
            {
                'type': 'Feature',
                'properties': {},
                'geometry': {
                    'coordinates': route.coords,
                    'type': 'LineString'
                }
            }
        ]
    };

    map.addSource('color-route', {
        type: 'geojson',
        lineMetrics: true,
        data: geojson
    });

    const GRADIENT = [
        'interpolate',
        ['linear'],
        ['line-progress'],
        ...STOPS];

    map.addLayer({
        type: 'line',
        source: 'color-route',
        id: 'line',
        paint: {
            'line-color': 'red',
            'line-width': 6,
            'line-gradient': GRADIENT
        },
        layout: {
            'line-cap': 'round',
            'line-join': 'round',
        }
    });
}

export {colorRoute, setMaxSpeed, setColorGradient};