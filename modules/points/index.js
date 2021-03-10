import dayjs from 'dayjs'

let TIME_FORMAT;

const getFeature = (lnglat, time) => {
    return {
        'type': 'Feature', 'geometry':
            {'type': 'Point', 'coordinates': lnglat},
        'properties': {'time': dayjs(time).format(TIME_FORMAT)}
    }
}

const DUMMY = [
    getFeature([-77.03238901390978, 38.913188059745586]),
    getFeature([-122.414, 37.776])
];


const plotPoints = (route, timeFormat = "HH:mm.ss") => {
    TIME_FORMAT= timeFormat;

    let FEATS = [];
    let i = 0;
    for (const COORD of route.coords) {
        FEATS.push(getFeature(COORD, route.times[i++]));
    }

    map.addSource('points', {
        'type': 'geojson',
        'data': {
            'type': 'FeatureCollection',
            'features': FEATS
        }
    });

    map.addLayer({
        'id': 'points',
        'type': 'circle',
        'source': 'points',
        'paint': {
            'circle-radius': 3,
            'circle-color': '#fff'
        },
        'minzoom' : 16,
        'filter': ['==', '$type', 'Point']
    });

    map.addLayer({
        'id': 'points-text',
        'type': 'symbol',
        'source': 'points',
        'layout': {
            'text-field': ['get', 'time'],
            'text-font': [
                'Open Sans Semibold',
                'Arial Unicode MS Bold'
            ],
            "text-padding": 36,
            "text-size": 10,
            'text-offset': [1, 0],
            'text-anchor': 'left'
        },
    });
}

export {plotPoints}