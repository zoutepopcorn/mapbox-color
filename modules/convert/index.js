import {kml, gpx} from "@tmcw/togeojson";
import {getDistance} from "geolib";

const toLL = (COORD) => {
    return {latitude: COORD[1], longitude: COORD[0]}
}
const getDistances = (COORDS) => {
    const DISTS = {
        totalLength: 0,
        route: []
    };
    for (let i = 1; i < COORDS.length; i++) {
        const dist = getDistance(toLL(COORDS[i - 1]), toLL(COORDS[i]));
        if (dist > 0) {
            DISTS.totalLength += dist;
            DISTS.route.push(dist);
        }
    }
    return DISTS;
}
const getTimeDiff = (times) => {
    const TIMES_DIFF = [];
    let tmpTime;
    for (const TIME of times) {
        const nextTime = new Date(TIME);
        if (tmpTime) {
            TIMES_DIFF.push(nextTime - tmpTime);
        }
        tmpTime = nextTime;
    }
    return TIMES_DIFF;
}
const getSpeeds = (route, times) => {
    const DISTANCES = getDistances(route);
    const TIME_DIFF = getTimeDiff(times);
    const SPEEDS = [];
    let i = 0;
    for (const DISTANCE of DISTANCES.route) {
        const HOURS = TIME_DIFF[i++] / 1000 / 60 / 60;
        const SPEED = HOURS > 0 && DISTANCE > 0 ? (DISTANCE / 1000) / HOURS : 0; // km / h
        SPEEDS.push(SPEED >= 0 && SPEED < 10000 ? Math.round(SPEED) : 0);
    }

    return SPEEDS;
}
const convertFromInput = (TEXT) => {
    // const RES = await fetch(FILENAME);
    const GPX_TXT = gpx(new DOMParser().parseFromString(TEXT, "text/xml"))
    const ROUTE = {};
    ROUTE.coords = GPX_TXT.features[0].geometry.coordinates;
    ROUTE.times = GPX_TXT.features[0].properties.coordTimes;
    ROUTE.speeds = getSpeeds(ROUTE.coords, ROUTE.times);
    ROUTE.distances = getDistances(ROUTE.coords);
    ROUTE.maxSpeed = 200;
    ROUTE.rotation = Math.floor(360 * Math.random());
    console.log(ROUTE);
    return ROUTE;
}
const convertGpx = async (FILENAME) => {
    const RES = await fetch(FILENAME);
    const GPX_TXT = gpx(new DOMParser().parseFromString(await RES.text(), "text/xml"))
    const ROUTE = {};
    ROUTE.coords = GPX_TXT.features[0].geometry.coordinates;
    ROUTE.times = GPX_TXT.features[0].properties.coordTimes;
    ROUTE.speeds = getSpeeds(ROUTE.coords, ROUTE.times);
    ROUTE.distances = getDistances(ROUTE.coords);
    ROUTE.maxSpeed = 200;

    ROUTE.rotation = [];
    for (const SPEED of ROUTE.speeds) {
        ROUTE.rotation.push(Math.floor(360 * Math.random()));
    }
    return ROUTE;
}

export {convertGpx, getDistances, convertFromInput}