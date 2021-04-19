import dayjs from 'dayjs'
import * as turf from '@turf/turf'

let TIME_FORMAT;

const getFeature = (lngLat, lngLat2, time) => {
    const bearing = turf.bearing(turf.point(lngLat), turf.point(lngLat2));
    console.log("bearing", bearing)
    const feature = {
        'type': 'Feature',
        'geometry': {'type': 'Point', 'coordinates': lngLat2},
        'properties': {
            'time': dayjs(time).format(TIME_FORMAT),
            'rotation': bearing + 90
        }
    }
    return feature;
}

const plotArrows = (map, route, timeFormat = "HH:mm.ss") => {
    TIME_FORMAT = timeFormat;

    let FEATS = [];
    let i = 0;
    let tmpCoord = [0, 0];
    console.log(route.coords);
    for (const COORD of route.coords) {
        const NOT_SAME_POINT = !(tmpCoord[0] === COORD[0] && tmpCoord[1] === COORD[1]);
        if (tmpCoord && NOT_SAME_POINT) {
            FEATS.push(getFeature(COORD, tmpCoord, route.times[i++]));
        }
        tmpCoord = [...COORD];
    }

    map.addSource(`${route.name}-points-arrows`, {
        'type': 'geojson',
        'data': {
            'type': 'FeatureCollection',
            'features': FEATS
        }
    });

    // map.addLayer({
    //     'id': 'points',
    //     'type': 'circle',
    //     'source': `${route.name}-points`,
    //     'paint': {
    //         'circle-radius': 3,
    //         'circle-color': '#fff'
    //     },
    //     'minzoom': 16,
    //     'filter': ['==', '$type', 'Point']
    // });
    // ['get', 'time']
    map.addLayer({
        'id': 'points-arrows',
        'type': 'symbol',
        'source': `${route.name}-points-arrows`,
        'layout': {
            'text-field': '>',
            'text-font': [
                'Open Sans Semibold',
                'Arial Unicode MS Bold'
            ],
            "text-padding": 50,
            "text-size": 17,
            'text-offset': [0, 0],
            'text-anchor': 'left',
            'text-rotate': ['get', 'rotation'],
            'text-keep-upright': false
        },
        'paint': {
            "text-color": "#fff",
            "text-halo-color": "#000",
            "text-halo-width": 2
        }
    });
}

export {plotArrows}