(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
  var __commonJS = (cb, mod) => () => (mod || cb((mod = {exports: {}}).exports, mod), mod.exports);
  var __exportStar = (target, module, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && key !== "default")
          __defProp(target, key, {get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable});
    }
    return target;
  };
  var __toModule = (module) => {
    return __exportStar(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? {get: () => module.default, enumerable: true} : {value: module, enumerable: true})), module);
  };

  // node_modules/@tmcw/togeojson/dist/togeojson.umd.js
  var require_togeojson_umd = __commonJS((exports, module) => {
    !function(e, t) {
      typeof exports == "object" && typeof module != "undefined" ? t(exports) : typeof define == "function" && define.amd ? define(["exports"], t) : t((e = e || self).toGeoJSON = {});
    }(exports, function(e) {
      "use strict";
      function t(e2) {
        return e2 && e2.normalize && e2.normalize(), e2 && e2.textContent || "";
      }
      function n(e2, t2) {
        const n2 = e2.getElementsByTagName(t2);
        return n2.length ? n2[0] : null;
      }
      function o(e2) {
        const o2 = {};
        if (e2) {
          const s2 = n(e2, "line");
          if (s2) {
            const e3 = t(n(s2, "color")), r2 = parseFloat(t(n(s2, "opacity"))), i2 = parseFloat(t(n(s2, "width")));
            e3 && (o2.stroke = e3), isNaN(r2) || (o2["stroke-opacity"] = r2), isNaN(i2) || (o2["stroke-width"] = 96 * i2 / 25.4);
          }
        }
        return o2;
      }
      function s(e2, o2) {
        const s2 = {};
        let r2, i2;
        for (i2 = 0; i2 < o2.length; i2++)
          r2 = n(e2, o2[i2]), r2 && (s2[o2[i2]] = t(r2));
        return s2;
      }
      function r(e2) {
        const n2 = s(e2, ["name", "cmt", "desc", "type", "time", "keywords"]), o2 = e2.getElementsByTagNameNS("http://www.garmin.com/xmlschemas/GpxExtensions/v3", "*");
        for (let s2 = 0; s2 < o2.length; s2++) {
          const r3 = o2[s2];
          r3.parentNode.parentNode === e2 && (n2[r3.tagName.replace(":", "_")] = t(r3));
        }
        const r2 = e2.getElementsByTagName("link");
        r2.length && (n2.links = []);
        for (let e3 = 0; e3 < r2.length; e3++)
          n2.links.push(Object.assign({href: r2[e3].getAttribute("href")}, s(r2[e3], ["text", "type"])));
        return n2;
      }
      function i(e2) {
        const o2 = [parseFloat(e2.getAttribute("lon")), parseFloat(e2.getAttribute("lat"))], s2 = n(e2, "ele"), r2 = n(e2, "gpxtpx:hr") || n(e2, "hr"), i2 = n(e2, "time");
        let l2;
        s2 && (l2 = parseFloat(t(s2)), isNaN(l2) || o2.push(l2));
        const a2 = {coordinates: o2, time: i2 ? t(i2) : null, extendedValues: []};
        r2 && a2.extendedValues.push(["heartRate", parseFloat(t(r2))]);
        const c2 = n(e2, "extensions");
        if (c2 !== null)
          for (const e3 of ["speed", "course", "hAcc", "vAcc"]) {
            const o3 = parseFloat(t(n(c2, e3)));
            isNaN(o3) || a2.extendedValues.push([e3, o3]);
          }
        return a2;
      }
      function l(e2) {
        const t2 = a(e2, "rtept");
        if (t2)
          return {type: "Feature", properties: Object.assign(r(e2), o(n(e2, "extensions")), {_gpxType: "rte"}), geometry: {type: "LineString", coordinates: t2.line}};
      }
      function a(e2, t2) {
        const n2 = e2.getElementsByTagName(t2);
        if (n2.length < 2)
          return;
        const o2 = [], s2 = [], r2 = {};
        for (let e3 = 0; e3 < n2.length; e3++) {
          const t3 = i(n2[e3]);
          o2.push(t3.coordinates), t3.time && s2.push(t3.time);
          for (let o3 = 0; o3 < t3.extendedValues.length; o3++) {
            const [s3, i2] = t3.extendedValues[o3], l2 = s3 + "s";
            r2[l2] || (r2[l2] = Array(n2.length).fill(null)), r2[l2][e3] = i2;
          }
        }
        return {line: o2, times: s2, extendedValues: r2};
      }
      function c(e2) {
        const t2 = e2.getElementsByTagName("trkseg"), s2 = [], i2 = [], l2 = [];
        for (let e3 = 0; e3 < t2.length; e3++) {
          const n2 = a(t2[e3], "trkpt");
          n2 && (l2.push(n2), n2.times && n2.times.length && i2.push(n2.times));
        }
        if (l2.length === 0)
          return;
        const c2 = l2.length > 1, g2 = Object.assign(r(e2), o(n(e2, "extensions")), {_gpxType: "trk"}, i2.length ? {coordTimes: c2 ? i2 : i2[0]} : {});
        for (let e3 = 0; e3 < l2.length; e3++) {
          const t3 = l2[e3];
          s2.push(t3.line);
          for (const [n2, o2] of Object.entries(t3.extendedValues))
            c2 ? (g2[n2] || (g2[n2] = l2.map((e4) => new Array(e4.line.length).fill(null))), g2[n2][e3] = o2) : g2[n2] = o2;
        }
        return {type: "Feature", properties: g2, geometry: c2 ? {type: "MultiLineString", coordinates: s2} : {type: "LineString", coordinates: s2[0]}};
      }
      function* g(e2) {
        const t2 = e2.getElementsByTagName("trk"), n2 = e2.getElementsByTagName("rte"), o2 = e2.getElementsByTagName("wpt");
        for (let e3 = 0; e3 < t2.length; e3++) {
          const n3 = c(t2[e3]);
          n3 && (yield n3);
        }
        for (let e3 = 0; e3 < n2.length; e3++) {
          const t3 = l(n2[e3]);
          t3 && (yield t3);
        }
        for (let e3 = 0; e3 < o2.length; e3++)
          yield (a2 = o2[e3], {type: "Feature", properties: Object.assign(r(a2), s(a2, ["sym"])), geometry: {type: "Point", coordinates: i(a2).coordinates}});
        var a2;
      }
      const u = "http://www.garmin.com/xmlschemas/ActivityExtension/v2", m = [["heartRate", "heartRates"], ["Cadence", "cadences"], ["Speed", "speeds"], ["Watts", "watts"]], p = [["TotalTimeSeconds", "totalTimeSeconds"], ["DistanceMeters", "distanceMeters"], ["MaximumSpeed", "maxSpeed"], ["AverageHeartRateBpm", "avgHeartRate"], ["MaximumHeartRateBpm", "maxHeartRate"], ["AvgSpeed", "avgSpeed"], ["AvgWatts", "avgWatts"], ["MaxWatts", "maxWatts"]];
      function f(e2, o2) {
        const s2 = [];
        for (const [r2, i2] of o2) {
          let o3 = n(e2, r2);
          if (!o3) {
            const t2 = e2.getElementsByTagNameNS(u, r2);
            t2.length && (o3 = t2[0]);
          }
          const l2 = parseFloat(t(o3));
          isNaN(l2) || s2.push([i2, l2]);
        }
        return s2;
      }
      function d(e2) {
        const o2 = t(n(e2, "LongitudeDegrees")), s2 = t(n(e2, "LatitudeDegrees"));
        if (!o2.length || !s2.length)
          return null;
        const r2 = [parseFloat(o2), parseFloat(s2)], i2 = n(e2, "AltitudeMeters"), l2 = n(e2, "HeartRateBpm"), a2 = n(e2, "Time");
        let c2;
        return i2 && (c2 = parseFloat(t(i2)), isNaN(c2) || r2.push(c2)), {coordinates: r2, time: a2 ? t(a2) : null, heartRate: l2 ? parseFloat(t(l2)) : null, extensions: f(e2, m)};
      }
      function h(e2, t2) {
        const n2 = e2.getElementsByTagName(t2), o2 = [], s2 = [];
        if (n2.length < 2)
          return null;
        const r2 = {extendedProperties: {}};
        for (let e3 = 0; e3 < n2.length; e3++) {
          const t3 = d(n2[e3]);
          if (t3 !== null) {
            o2.push(t3.coordinates), t3.time && s2.push(t3.time);
            for (const [o3, s3] of t3.extensions)
              r2.extendedProperties[o3] || (r2.extendedProperties[o3] = Array(n2.length).fill(null)), r2.extendedProperties[o3][e3] = s3;
          }
        }
        return Object.assign(r2, {line: o2, times: s2});
      }
      function y(e2) {
        const t2 = e2.getElementsByTagName("Track"), n2 = [], o2 = [], s2 = [];
        let r2;
        const i2 = function(e3) {
          const t3 = {};
          for (const [n3, o3] of e3)
            t3[n3] = o3;
          return t3;
        }(f(e2, p));
        for (let e3 = 0; e3 < t2.length; e3++)
          r2 = h(t2[e3], "Trackpoint"), r2 && (n2.push(r2.line), r2.times.length && o2.push(r2.times), s2.push(r2.extendedProperties));
        for (let e3 = 0; e3 < s2.length; e3++) {
          const o3 = s2[e3];
          for (const s3 in o3)
            t2.length === 1 ? i2[s3] = r2.extendedProperties[s3] : (i2[s3] || (i2[s3] = n2.map((e4) => Array(e4.length).fill(null))), i2[s3][e3] = o3[s3]);
        }
        if (n2.length !== 0)
          return o2.length && (i2.coordTimes = n2.length === 1 ? o2[0] : o2), {type: "Feature", properties: i2, geometry: {type: n2.length === 1 ? "LineString" : "MultiLineString", coordinates: n2.length === 1 ? n2[0] : n2}};
      }
      function* N(e2) {
        const t2 = e2.getElementsByTagName("Lap");
        for (let e3 = 0; e3 < t2.length; e3++) {
          const n2 = y(t2[e3]);
          n2 && (yield n2);
        }
      }
      const x = /\s*/g, T = /^\s*|\s*$/g, b = /\s+/;
      function S(e2) {
        if (!e2 || !e2.length)
          return 0;
        let t2 = 0;
        for (let n2 = 0; n2 < e2.length; n2++)
          t2 = (t2 << 5) - t2 + e2.charCodeAt(n2) | 0;
        return t2;
      }
      function k(e2) {
        return e2.replace(x, "").split(",").map(parseFloat);
      }
      function A(e2) {
        return e2.replace(T, "").split(b).map(k);
      }
      function B(e2) {
        if (e2.xml !== void 0)
          return e2.xml;
        if (e2.tagName) {
          let t2 = e2.tagName;
          for (let n2 = 0; n2 < e2.attributes.length; n2++)
            t2 += e2.attributes[n2].name + e2.attributes[n2].value;
          for (let n2 = 0; n2 < e2.childNodes.length; n2++)
            t2 += B(e2.childNodes[n2]);
          return t2;
        }
        return e2.nodeName === "#text" ? (e2.nodeValue || e2.value || "").trim() : e2.nodeName === "#cdata-section" ? e2.nodeValue : "";
      }
      const E = ["Polygon", "LineString", "Point", "Track", "gx:Track"];
      function F(e2, o2, s2) {
        let r2 = t(n(o2, "color")) || "";
        const i2 = s2 == "stroke" || s2 === "fill" ? s2 : s2 + "-color";
        r2.substr(0, 1) === "#" && (r2 = r2.substr(1)), r2.length === 6 || r2.length === 3 ? e2[i2] = r2 : r2.length === 8 && (e2[s2 + "-opacity"] = parseInt(r2.substr(0, 2), 16) / 255, e2[i2] = "#" + r2.substr(6, 2) + r2.substr(4, 2) + r2.substr(2, 2));
      }
      function v(e2, o2, s2, r2) {
        const i2 = parseFloat(t(n(o2, s2)));
        isNaN(i2) || (e2[r2] = i2);
      }
      function P(e2) {
        let n2 = e2.getElementsByTagName("coord");
        const o2 = [], s2 = [];
        n2.length === 0 && (n2 = e2.getElementsByTagName("gx:coord"));
        for (let e3 = 0; e3 < n2.length; e3++)
          o2.push(t(n2[e3]).split(" ").map(parseFloat));
        const r2 = e2.getElementsByTagName("when");
        for (let e3 = 0; e3 < r2.length; e3++)
          s2.push(t(r2[e3]));
        return {coords: o2, times: s2};
      }
      function L(e2, o2, s2, r2) {
        const i2 = function e3(o3) {
          let s3, r3, i3, l3, a3;
          const c3 = [], g3 = [];
          if (n(o3, "MultiGeometry"))
            return e3(n(o3, "MultiGeometry"));
          if (n(o3, "MultiTrack"))
            return e3(n(o3, "MultiTrack"));
          if (n(o3, "gx:MultiTrack"))
            return e3(n(o3, "gx:MultiTrack"));
          for (i3 = 0; i3 < E.length; i3++)
            if (r3 = o3.getElementsByTagName(E[i3]), r3) {
              for (l3 = 0; l3 < r3.length; l3++)
                if (s3 = r3[l3], E[i3] === "Point")
                  c3.push({type: "Point", coordinates: k(t(n(s3, "coordinates")))});
                else if (E[i3] === "LineString")
                  c3.push({type: "LineString", coordinates: A(t(n(s3, "coordinates")))});
                else if (E[i3] === "Polygon") {
                  const e4 = s3.getElementsByTagName("LinearRing"), o4 = [];
                  for (a3 = 0; a3 < e4.length; a3++)
                    o4.push(A(t(n(e4[a3], "coordinates"))));
                  c3.push({type: "Polygon", coordinates: o4});
                } else if (E[i3] === "Track" || E[i3] === "gx:Track") {
                  const e4 = P(s3);
                  c3.push({type: "LineString", coordinates: e4.coords}), e4.times.length && g3.push(e4.times);
                }
            }
          return {geoms: c3, coordTimes: g3};
        }(e2);
        let l2;
        const a2 = {}, c2 = t(n(e2, "name")), g2 = t(n(e2, "address"));
        let u2 = t(n(e2, "styleUrl"));
        const m2 = t(n(e2, "description")), p2 = n(e2, "TimeSpan"), f2 = n(e2, "TimeStamp"), d2 = n(e2, "ExtendedData");
        let h2 = n(e2, "IconStyle"), y2 = n(e2, "LabelStyle"), N2 = n(e2, "LineStyle"), x2 = n(e2, "PolyStyle");
        const T2 = n(e2, "visibility");
        if (c2 && (a2.name = c2), g2 && (a2.address = g2), u2) {
          u2[0] !== "#" && (u2 = "#" + u2), a2.styleUrl = u2, o2[u2] && (a2.styleHash = o2[u2]), s2[u2] && (a2.styleMapHash = s2[u2], a2.styleHash = o2[s2[u2].normal]);
          const e3 = r2[a2.styleHash];
          e3 && (h2 || (h2 = n(e3, "IconStyle")), y2 || (y2 = n(e3, "LabelStyle")), N2 || (N2 = n(e3, "LineStyle")), x2 || (x2 = n(e3, "PolyStyle")));
        }
        if (m2 && (a2.description = m2), p2) {
          const e3 = t(n(p2, "begin")), o3 = t(n(p2, "end"));
          a2.timespan = {begin: e3, end: o3};
        }
        if (f2 && (a2.timestamp = t(n(f2, "when"))), h2) {
          F(a2, h2, "icon"), v(a2, h2, "scale", "icon-scale"), v(a2, h2, "heading", "icon-heading");
          const e3 = n(h2, "hotSpot");
          if (e3) {
            const t2 = parseFloat(e3.getAttribute("x")), n2 = parseFloat(e3.getAttribute("y"));
            isNaN(t2) || isNaN(n2) || (a2["icon-offset"] = [t2, n2]);
          }
          const o3 = n(h2, "Icon");
          if (o3) {
            const e4 = t(n(o3, "href"));
            e4 && (a2.icon = e4);
          }
        }
        if (y2 && (F(a2, y2, "label"), v(a2, y2, "scale", "label-scale")), N2 && (F(a2, N2, "stroke"), v(a2, N2, "width", "stroke-width")), x2) {
          F(a2, x2, "fill");
          const e3 = t(n(x2, "fill")), o3 = t(n(x2, "outline"));
          e3 && (a2["fill-opacity"] = e3 === "1" ? a2["fill-opacity"] || 1 : 0), o3 && (a2["stroke-opacity"] = o3 === "1" ? a2["stroke-opacity"] || 1 : 0);
        }
        if (d2) {
          const e3 = d2.getElementsByTagName("Data"), o3 = d2.getElementsByTagName("SimpleData");
          for (l2 = 0; l2 < e3.length; l2++)
            a2[e3[l2].getAttribute("name")] = t(n(e3[l2], "value"));
          for (l2 = 0; l2 < o3.length; l2++)
            a2[o3[l2].getAttribute("name")] = t(o3[l2]);
        }
        T2 && (a2.visibility = t(T2)), i2.coordTimes.length && (a2.coordTimes = i2.coordTimes.length === 1 ? i2.coordTimes[0] : i2.coordTimes);
        const b2 = {type: "Feature", geometry: i2.geoms.length === 0 ? null : i2.geoms.length === 1 ? i2.geoms[0] : {type: "GeometryCollection", geometries: i2.geoms}, properties: a2};
        return e2.getAttribute("id") && (b2.id = e2.getAttribute("id")), b2;
      }
      function* M(e2) {
        const o2 = {}, s2 = {}, r2 = {}, i2 = e2.getElementsByTagName("Placemark"), l2 = e2.getElementsByTagName("Style"), a2 = e2.getElementsByTagName("StyleMap");
        for (let e3 = 0; e3 < l2.length; e3++) {
          const t2 = S(B(l2[e3])).toString(16);
          o2["#" + l2[e3].getAttribute("id")] = t2, s2[t2] = l2[e3];
        }
        for (let e3 = 0; e3 < a2.length; e3++) {
          o2["#" + a2[e3].getAttribute("id")] = S(B(a2[e3])).toString(16);
          const s3 = a2[e3].getElementsByTagName("Pair"), i3 = {};
          for (let e4 = 0; e4 < s3.length; e4++)
            i3[t(n(s3[e4], "key"))] = t(n(s3[e4], "styleUrl"));
          r2["#" + a2[e3].getAttribute("id")] = i3;
        }
        for (let e3 = 0; e3 < i2.length; e3++) {
          const t2 = L(i2[e3], o2, r2, s2);
          t2 && (yield t2);
        }
      }
      e.gpx = function(e2) {
        return {type: "FeatureCollection", features: Array.from(g(e2))};
      }, e.gpxGen = g, e.kml = function(e2) {
        return {type: "FeatureCollection", features: Array.from(M(e2))};
      }, e.kmlGen = M, e.tcx = function(e2) {
        return {type: "FeatureCollection", features: Array.from(N(e2))};
      }, e.tcxGen = N, Object.defineProperty(e, "__esModule", {value: true});
    });
  });

  // node_modules/geolib/es/constants.js
  var require_constants = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.areaConversion = exports.timeConversion = exports.distanceConversion = exports.altitudeKeys = exports.latitudeKeys = exports.longitudeKeys = exports.MAXLON = exports.MINLON = exports.MAXLAT = exports.MINLAT = exports.earthRadius = exports.sexagesimalPattern = void 0;
    var sexagesimalPattern = /^([0-9]{1,3})°\s*([0-9]{1,3}(?:\.(?:[0-9]{1,}))?)['′]\s*(([0-9]{1,3}(\.([0-9]{1,}))?)["″]\s*)?([NEOSW]?)$/;
    exports.sexagesimalPattern = sexagesimalPattern;
    var earthRadius = 6378137;
    exports.earthRadius = earthRadius;
    var MINLAT = -90;
    exports.MINLAT = MINLAT;
    var MAXLAT = 90;
    exports.MAXLAT = MAXLAT;
    var MINLON = -180;
    exports.MINLON = MINLON;
    var MAXLON = 180;
    exports.MAXLON = MAXLON;
    var longitudeKeys = ["lng", "lon", "longitude", 0];
    exports.longitudeKeys = longitudeKeys;
    var latitudeKeys = ["lat", "latitude", 1];
    exports.latitudeKeys = latitudeKeys;
    var altitudeKeys = ["alt", "altitude", "elevation", "elev", 2];
    exports.altitudeKeys = altitudeKeys;
    var distanceConversion = {m: 1, km: 1e-3, cm: 100, mm: 1e3, mi: 1 / 1609.344, sm: 1 / 1852.216, ft: 100 / 30.48, in: 100 / 2.54, yd: 1 / 0.9144};
    exports.distanceConversion = distanceConversion;
    var timeConversion = {m: 60, h: 3600, d: 86400};
    exports.timeConversion = timeConversion;
    var areaConversion = {m2: 1, km2: 1e-6, ha: 1e-4, a: 0.01, ft2: 10.763911, yd2: 1.19599, in2: 1550.0031};
    exports.areaConversion = areaConversion;
    areaConversion.sqm = areaConversion.m2;
    areaConversion.sqkm = areaConversion.km2;
    areaConversion.sqft = areaConversion.ft2;
    areaConversion.sqyd = areaConversion.yd2;
    areaConversion.sqin = areaConversion.in2;
  });

  // node_modules/geolib/es/getCoordinateKey.js
  var require_getCoordinateKey = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.default = void 0;
    var getCoordinateKey = function getCoordinateKey2(point, keysToLookup) {
      return keysToLookup.reduce(function(foundKey, key) {
        if (typeof point === "undefined" || point === null) {
          throw new Error("'".concat(point, "' is no valid coordinate."));
        }
        if (Object.prototype.hasOwnProperty.call(point, key) && typeof key !== "undefined" && typeof foundKey === "undefined") {
          foundKey = key;
          return key;
        }
        return foundKey;
      }, void 0);
    };
    var _default = getCoordinateKey;
    exports.default = _default;
  });

  // node_modules/geolib/es/isDecimal.js
  var require_isDecimal = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.default = void 0;
    var isDecimal = function isDecimal2(value) {
      var checkedValue = value.toString().trim();
      if (isNaN(parseFloat(checkedValue))) {
        return false;
      }
      return parseFloat(checkedValue) === Number(checkedValue);
    };
    var _default = isDecimal;
    exports.default = _default;
  });

  // node_modules/geolib/es/isSexagesimal.js
  var require_isSexagesimal = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.default = void 0;
    var _constants = require_constants();
    var isSexagesimal = function isSexagesimal2(value) {
      return _constants.sexagesimalPattern.test(value.toString().trim());
    };
    var _default = isSexagesimal;
    exports.default = _default;
  });

  // node_modules/geolib/es/sexagesimalToDecimal.js
  var require_sexagesimalToDecimal = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.default = void 0;
    var _constants = require_constants();
    var sexagesimalToDecimal = function sexagesimalToDecimal2(sexagesimal) {
      var data = new RegExp(_constants.sexagesimalPattern).exec(sexagesimal);
      if (typeof data === "undefined" || data === null) {
        throw new Error("Given value is not in sexagesimal format");
      }
      var min = Number(data[2]) / 60 || 0;
      var sec = Number(data[4]) / 3600 || 0;
      var decimal = parseFloat(data[1]) + min + sec;
      return ["S", "W"].includes(data[7]) ? -decimal : decimal;
    };
    var _default = sexagesimalToDecimal;
    exports.default = _default;
  });

  // node_modules/geolib/es/getCoordinateKeys.js
  var require_getCoordinateKeys = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.default = void 0;
    var _constants = require_constants();
    var _getCoordinateKey = _interopRequireDefault(require_getCoordinateKey());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {default: obj};
    }
    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly)
          symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
          });
        keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        if (i % 2) {
          ownKeys(Object(source), true).forEach(function(key) {
            _defineProperty(target, key, source[key]);
          });
        } else if (Object.getOwnPropertyDescriptors) {
          Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        } else {
          ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
          });
        }
      }
      return target;
    }
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, {value, enumerable: true, configurable: true, writable: true});
      } else {
        obj[key] = value;
      }
      return obj;
    }
    var getCoordinateKeys = function getCoordinateKeys2(point) {
      var keysToLookup = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {longitude: _constants.longitudeKeys, latitude: _constants.latitudeKeys, altitude: _constants.altitudeKeys};
      var longitude = (0, _getCoordinateKey.default)(point, keysToLookup.longitude);
      var latitude = (0, _getCoordinateKey.default)(point, keysToLookup.latitude);
      var altitude = (0, _getCoordinateKey.default)(point, keysToLookup.altitude);
      return _objectSpread({latitude, longitude}, altitude ? {altitude} : {});
    };
    var _default = getCoordinateKeys;
    exports.default = _default;
  });

  // node_modules/geolib/es/isValidLatitude.js
  var require_isValidLatitude = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.default = void 0;
    var _isDecimal = _interopRequireDefault(require_isDecimal());
    var _isSexagesimal = _interopRequireDefault(require_isSexagesimal());
    var _sexagesimalToDecimal = _interopRequireDefault(require_sexagesimalToDecimal());
    var _constants = require_constants();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {default: obj};
    }
    var isValidLatitude = function isValidLatitude2(value) {
      if ((0, _isDecimal.default)(value)) {
        if (parseFloat(value) > _constants.MAXLAT || value < _constants.MINLAT) {
          return false;
        }
        return true;
      }
      if ((0, _isSexagesimal.default)(value)) {
        return isValidLatitude2((0, _sexagesimalToDecimal.default)(value));
      }
      return false;
    };
    var _default = isValidLatitude;
    exports.default = _default;
  });

  // node_modules/geolib/es/isValidLongitude.js
  var require_isValidLongitude = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.default = void 0;
    var _isDecimal = _interopRequireDefault(require_isDecimal());
    var _isSexagesimal = _interopRequireDefault(require_isSexagesimal());
    var _sexagesimalToDecimal = _interopRequireDefault(require_sexagesimalToDecimal());
    var _constants = require_constants();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {default: obj};
    }
    var isValidLongitude = function isValidLongitude2(value) {
      if ((0, _isDecimal.default)(value)) {
        if (parseFloat(value) > _constants.MAXLON || value < _constants.MINLON) {
          return false;
        }
        return true;
      }
      if ((0, _isSexagesimal.default)(value)) {
        return isValidLongitude2((0, _sexagesimalToDecimal.default)(value));
      }
      return false;
    };
    var _default = isValidLongitude;
    exports.default = _default;
  });

  // node_modules/geolib/es/isValidCoordinate.js
  var require_isValidCoordinate = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.default = void 0;
    var _getCoordinateKeys2 = _interopRequireDefault(require_getCoordinateKeys());
    var _isValidLatitude = _interopRequireDefault(require_isValidLatitude());
    var _isValidLongitude = _interopRequireDefault(require_isValidLongitude());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {default: obj};
    }
    var isValidCoordinate = function isValidCoordinate2(point) {
      var _getCoordinateKeys = (0, _getCoordinateKeys2.default)(point), latitude = _getCoordinateKeys.latitude, longitude = _getCoordinateKeys.longitude;
      if (Array.isArray(point) && point.length >= 2) {
        return (0, _isValidLongitude.default)(point[0]) && (0, _isValidLatitude.default)(point[1]);
      }
      if (typeof latitude === "undefined" || typeof longitude === "undefined") {
        return false;
      }
      var lon = point[longitude];
      var lat = point[latitude];
      if (typeof lat === "undefined" || typeof lon === "undefined") {
        return false;
      }
      if ((0, _isValidLatitude.default)(lat) === false || (0, _isValidLongitude.default)(lon) === false) {
        return false;
      }
      return true;
    };
    var _default = isValidCoordinate;
    exports.default = _default;
  });

  // node_modules/geolib/es/toDecimal.js
  var require_toDecimal = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.default = void 0;
    var _isDecimal = _interopRequireDefault(require_isDecimal());
    var _isSexagesimal = _interopRequireDefault(require_isSexagesimal());
    var _sexagesimalToDecimal = _interopRequireDefault(require_sexagesimalToDecimal());
    var _isValidCoordinate = _interopRequireDefault(require_isValidCoordinate());
    var _getCoordinateKeys = _interopRequireDefault(require_getCoordinateKeys());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {default: obj};
    }
    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly)
          symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
          });
        keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        if (i % 2) {
          ownKeys(Object(source), true).forEach(function(key) {
            _defineProperty(target, key, source[key]);
          });
        } else if (Object.getOwnPropertyDescriptors) {
          Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        } else {
          ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
          });
        }
      }
      return target;
    }
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, {value, enumerable: true, configurable: true, writable: true});
      } else {
        obj[key] = value;
      }
      return obj;
    }
    var toDecimal = function toDecimal2(value) {
      if ((0, _isDecimal.default)(value)) {
        return Number(value);
      }
      if ((0, _isSexagesimal.default)(value)) {
        return (0, _sexagesimalToDecimal.default)(value);
      }
      if ((0, _isValidCoordinate.default)(value)) {
        var keys = (0, _getCoordinateKeys.default)(value);
        if (Array.isArray(value)) {
          return value.map(function(v, index) {
            return [0, 1].includes(index) ? toDecimal2(v) : v;
          });
        }
        return _objectSpread(_objectSpread(_objectSpread({}, value), keys.latitude && _defineProperty({}, keys.latitude, toDecimal2(value[keys.latitude]))), keys.longitude && _defineProperty({}, keys.longitude, toDecimal2(value[keys.longitude])));
      }
      if (Array.isArray(value)) {
        return value.map(function(point) {
          return (0, _isValidCoordinate.default)(point) ? toDecimal2(point) : point;
        });
      }
      return value;
    };
    var _default = toDecimal;
    exports.default = _default;
  });

  // node_modules/geolib/es/getLatitude.js
  var require_getLatitude = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.default = void 0;
    var _constants = require_constants();
    var _getCoordinateKey = _interopRequireDefault(require_getCoordinateKey());
    var _toDecimal = _interopRequireDefault(require_toDecimal());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {default: obj};
    }
    var getLatitude = function getLatitude2(point, raw) {
      var latKey = (0, _getCoordinateKey.default)(point, _constants.latitudeKeys);
      if (typeof latKey === "undefined" || latKey === null) {
        return;
      }
      var value = point[latKey];
      return raw === true ? value : (0, _toDecimal.default)(value);
    };
    var _default = getLatitude;
    exports.default = _default;
  });

  // node_modules/geolib/es/getLongitude.js
  var require_getLongitude = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.default = void 0;
    var _constants = require_constants();
    var _getCoordinateKey = _interopRequireDefault(require_getCoordinateKey());
    var _toDecimal = _interopRequireDefault(require_toDecimal());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {default: obj};
    }
    var getLongitude = function getLongitude2(point, raw) {
      var latKey = (0, _getCoordinateKey.default)(point, _constants.longitudeKeys);
      if (typeof latKey === "undefined" || latKey === null) {
        return;
      }
      var value = point[latKey];
      return raw === true ? value : (0, _toDecimal.default)(value);
    };
    var _default = getLongitude;
    exports.default = _default;
  });

  // node_modules/geolib/es/toRad.js
  var require_toRad = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.default = void 0;
    var toRad = function toRad2(value) {
      return value * Math.PI / 180;
    };
    var _default = toRad;
    exports.default = _default;
  });

  // node_modules/geolib/es/toDeg.js
  var require_toDeg = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.default = void 0;
    var toDeg = function toDeg2(value) {
      return value * 180 / Math.PI;
    };
    var _default = toDeg;
    exports.default = _default;
  });

  // node_modules/geolib/es/computeDestinationPoint.js
  var require_computeDestinationPoint = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.default = void 0;
    var _getLatitude = _interopRequireDefault(require_getLatitude());
    var _getLongitude = _interopRequireDefault(require_getLongitude());
    var _toRad = _interopRequireDefault(require_toRad());
    var _toDeg = _interopRequireDefault(require_toDeg());
    var _constants = require_constants();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {default: obj};
    }
    var computeDestinationPoint = function computeDestinationPoint2(start, distance, bearing) {
      var radius = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 6371e3;
      var lat = (0, _getLatitude.default)(start);
      var lng = (0, _getLongitude.default)(start);
      var delta = distance / radius;
      var theta = (0, _toRad.default)(bearing);
      var phi1 = (0, _toRad.default)(lat);
      var lambda1 = (0, _toRad.default)(lng);
      var phi2 = Math.asin(Math.sin(phi1) * Math.cos(delta) + Math.cos(phi1) * Math.sin(delta) * Math.cos(theta));
      var lambda2 = lambda1 + Math.atan2(Math.sin(theta) * Math.sin(delta) * Math.cos(phi1), Math.cos(delta) - Math.sin(phi1) * Math.sin(phi2));
      var longitude = (0, _toDeg.default)(lambda2);
      if (longitude < _constants.MINLON || longitude > _constants.MAXLON) {
        lambda2 = (lambda2 + 3 * Math.PI) % (2 * Math.PI) - Math.PI;
        longitude = (0, _toDeg.default)(lambda2);
      }
      return {latitude: (0, _toDeg.default)(phi2), longitude};
    };
    var _default = computeDestinationPoint;
    exports.default = _default;
  });

  // node_modules/geolib/es/convertArea.js
  var require_convertArea = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.default = void 0;
    var _constants = require_constants();
    var convertArea = function convertArea2(squareMeters) {
      var targetUnit = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "m";
      var factor = _constants.areaConversion[targetUnit];
      if (factor) {
        return squareMeters * factor;
      }
      throw new Error("Invalid unit used for area conversion.");
    };
    var _default = convertArea;
    exports.default = _default;
  });

  // node_modules/geolib/es/convertDistance.js
  var require_convertDistance = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.default = void 0;
    var _constants = require_constants();
    var convertDistance = function convertDistance2(meters) {
      var targetUnit = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "m";
      var factor = _constants.distanceConversion[targetUnit];
      if (factor) {
        return meters * factor;
      }
      throw new Error("Invalid unit used for distance conversion.");
    };
    var _default = convertDistance;
    exports.default = _default;
  });

  // node_modules/geolib/es/convertSpeed.js
  var require_convertSpeed = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.default = void 0;
    var _constants = require_constants();
    var convertSpeed = function convertSpeed2(metersPerSecond) {
      var targetUnit = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "kmh";
      switch (targetUnit) {
        case "kmh":
          return metersPerSecond * _constants.timeConversion.h * _constants.distanceConversion.km;
        case "mph":
          return metersPerSecond * _constants.timeConversion.h * _constants.distanceConversion.mi;
        default:
          return metersPerSecond;
      }
    };
    var _default = convertSpeed;
    exports.default = _default;
  });

  // node_modules/geolib/es/decimalToSexagesimal.js
  var require_decimalToSexagesimal = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.default = void 0;
    function _slicedToArray(arr, i) {
      return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
    }
    function _nonIterableRest() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o)
        return;
      if (typeof o === "string")
        return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor)
        n = o.constructor.name;
      if (n === "Map" || n === "Set")
        return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
        return _arrayLikeToArray(o, minLen);
    }
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length)
        len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i];
      }
      return arr2;
    }
    function _iterableToArrayLimit(arr, i) {
      if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr)))
        return;
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = void 0;
      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);
          if (i && _arr.length === i)
            break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"] != null)
            _i["return"]();
        } finally {
          if (_d)
            throw _e;
        }
      }
      return _arr;
    }
    function _arrayWithHoles(arr) {
      if (Array.isArray(arr))
        return arr;
    }
    var imprecise = function imprecise2(number) {
      var factor = Math.pow(10, 12);
      return Math.round(number * factor) / factor;
    };
    var decimal2sexagesimal = function decimal2sexagesimal2(decimal) {
      var _decimal$toString$spl = decimal.toString().split("."), _decimal$toString$spl2 = _slicedToArray(_decimal$toString$spl, 2), pre = _decimal$toString$spl2[0], post = _decimal$toString$spl2[1];
      var deg = Math.abs(Number(pre));
      var minFull = imprecise(Number("0." + (post || 0)) * 60);
      var min = Math.floor(minFull);
      var sec = imprecise((minFull % min || 0) * 60);
      return deg + "\xB0 " + Number(min.toFixed(6)).toString().split(".").map(function(v, i) {
        return i === 0 ? v.padStart(2, "0") : v;
      }).join(".") + "' " + Number(sec.toFixed(4)).toString().split(".").map(function(v, i) {
        return i === 0 ? v.padStart(2, "0") : v;
      }).join(".") + '"';
    };
    var _default = decimal2sexagesimal;
    exports.default = _default;
  });

  // node_modules/geolib/es/robustAcos.js
  var require_robustAcos = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.default = void 0;
    var robustAcos = function robustAcos2(value) {
      if (value > 1) {
        return 1;
      }
      if (value < -1) {
        return -1;
      }
      return value;
    };
    var _default = robustAcos;
    exports.default = _default;
  });

  // node_modules/geolib/es/getDistance.js
  var require_getDistance = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.default = void 0;
    var _getLatitude = _interopRequireDefault(require_getLatitude());
    var _getLongitude = _interopRequireDefault(require_getLongitude());
    var _toRad = _interopRequireDefault(require_toRad());
    var _robustAcos = _interopRequireDefault(require_robustAcos());
    var _constants = require_constants();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {default: obj};
    }
    var getDistance2 = function getDistance3(from, to) {
      var accuracy = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
      accuracy = typeof accuracy !== "undefined" && !isNaN(accuracy) ? accuracy : 1;
      var fromLat = (0, _getLatitude.default)(from);
      var fromLon = (0, _getLongitude.default)(from);
      var toLat = (0, _getLatitude.default)(to);
      var toLon = (0, _getLongitude.default)(to);
      var distance = Math.acos((0, _robustAcos.default)(Math.sin((0, _toRad.default)(toLat)) * Math.sin((0, _toRad.default)(fromLat)) + Math.cos((0, _toRad.default)(toLat)) * Math.cos((0, _toRad.default)(fromLat)) * Math.cos((0, _toRad.default)(fromLon) - (0, _toRad.default)(toLon)))) * _constants.earthRadius;
      return Math.round(distance / accuracy) * accuracy;
    };
    var _default = getDistance2;
    exports.default = _default;
  });

  // node_modules/geolib/es/orderByDistance.js
  var require_orderByDistance = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.default = void 0;
    var _getDistance = _interopRequireDefault(require_getDistance());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {default: obj};
    }
    var orderByDistance = function orderByDistance2(point, coords) {
      var distanceFn = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : _getDistance.default;
      distanceFn = typeof distanceFn === "function" ? distanceFn : _getDistance.default;
      return coords.slice().sort(function(a, b) {
        return distanceFn(point, a) - distanceFn(point, b);
      });
    };
    var _default = orderByDistance;
    exports.default = _default;
  });

  // node_modules/geolib/es/findNearest.js
  var require_findNearest = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.default = void 0;
    var _orderByDistance = _interopRequireDefault(require_orderByDistance());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {default: obj};
    }
    var findNearest = function findNearest2(point, coords) {
      return (0, _orderByDistance.default)(point, coords)[0];
    };
    var _default = findNearest;
    exports.default = _default;
  });

  // node_modules/geolib/es/getAreaOfPolygon.js
  var require_getAreaOfPolygon = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.default = void 0;
    var _toRad = _interopRequireDefault(require_toRad());
    var _getLatitude = _interopRequireDefault(require_getLatitude());
    var _getLongitude = _interopRequireDefault(require_getLongitude());
    var _constants = require_constants();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {default: obj};
    }
    var getAreaOfPolygon = function getAreaOfPolygon2(points) {
      var area = 0;
      if (points.length > 2) {
        var lowerIndex;
        var middleIndex;
        var upperIndex;
        for (var i = 0; i < points.length; i++) {
          if (i === points.length - 2) {
            lowerIndex = points.length - 2;
            middleIndex = points.length - 1;
            upperIndex = 0;
          } else if (i === points.length - 1) {
            lowerIndex = points.length - 1;
            middleIndex = 0;
            upperIndex = 1;
          } else {
            lowerIndex = i;
            middleIndex = i + 1;
            upperIndex = i + 2;
          }
          var p1lon = (0, _getLongitude.default)(points[lowerIndex]);
          var p2lat = (0, _getLatitude.default)(points[middleIndex]);
          var p3lon = (0, _getLongitude.default)(points[upperIndex]);
          area += ((0, _toRad.default)(p3lon) - (0, _toRad.default)(p1lon)) * Math.sin((0, _toRad.default)(p2lat));
        }
        area = area * _constants.earthRadius * _constants.earthRadius / 2;
      }
      return Math.abs(area);
    };
    var _default = getAreaOfPolygon;
    exports.default = _default;
  });

  // node_modules/geolib/es/getBounds.js
  var require_getBounds = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.default = void 0;
    var _getLatitude = _interopRequireDefault(require_getLatitude());
    var _getLongitude = _interopRequireDefault(require_getLongitude());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {default: obj};
    }
    var getBounds = function getBounds2(points) {
      if (Array.isArray(points) === false || points.length === 0) {
        throw new Error("No points were given.");
      }
      return points.reduce(function(stats, point) {
        var latitude = (0, _getLatitude.default)(point);
        var longitude = (0, _getLongitude.default)(point);
        return {maxLat: Math.max(latitude, stats.maxLat), minLat: Math.min(latitude, stats.minLat), maxLng: Math.max(longitude, stats.maxLng), minLng: Math.min(longitude, stats.minLng)};
      }, {maxLat: -Infinity, minLat: Infinity, maxLng: -Infinity, minLng: Infinity});
    };
    var _default = getBounds;
    exports.default = _default;
  });

  // node_modules/geolib/es/getBoundsOfDistance.js
  var require_getBoundsOfDistance = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.default = void 0;
    var _getLatitude = _interopRequireDefault(require_getLatitude());
    var _getLongitude = _interopRequireDefault(require_getLongitude());
    var _toRad = _interopRequireDefault(require_toRad());
    var _toDeg = _interopRequireDefault(require_toDeg());
    var _constants = require_constants();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {default: obj};
    }
    var getBoundsOfDistance = function getBoundsOfDistance2(point, distance) {
      var latitude = (0, _getLatitude.default)(point);
      var longitude = (0, _getLongitude.default)(point);
      var radLat = (0, _toRad.default)(latitude);
      var radLon = (0, _toRad.default)(longitude);
      var radDist = distance / _constants.earthRadius;
      var minLat = radLat - radDist;
      var maxLat = radLat + radDist;
      var MAX_LAT_RAD = (0, _toRad.default)(_constants.MAXLAT);
      var MIN_LAT_RAD = (0, _toRad.default)(_constants.MINLAT);
      var MAX_LON_RAD = (0, _toRad.default)(_constants.MAXLON);
      var MIN_LON_RAD = (0, _toRad.default)(_constants.MINLON);
      var minLon;
      var maxLon;
      if (minLat > MIN_LAT_RAD && maxLat < MAX_LAT_RAD) {
        var deltaLon = Math.asin(Math.sin(radDist) / Math.cos(radLat));
        minLon = radLon - deltaLon;
        if (minLon < MIN_LON_RAD) {
          minLon += Math.PI * 2;
        }
        maxLon = radLon + deltaLon;
        if (maxLon > MAX_LON_RAD) {
          maxLon -= Math.PI * 2;
        }
      } else {
        minLat = Math.max(minLat, MIN_LAT_RAD);
        maxLat = Math.min(maxLat, MAX_LAT_RAD);
        minLon = MIN_LON_RAD;
        maxLon = MAX_LON_RAD;
      }
      return [{latitude: (0, _toDeg.default)(minLat), longitude: (0, _toDeg.default)(minLon)}, {latitude: (0, _toDeg.default)(maxLat), longitude: (0, _toDeg.default)(maxLon)}];
    };
    var _default = getBoundsOfDistance;
    exports.default = _default;
  });

  // node_modules/geolib/es/getCenter.js
  var require_getCenter = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.default = void 0;
    var _getLatitude = _interopRequireDefault(require_getLatitude());
    var _getLongitude = _interopRequireDefault(require_getLongitude());
    var _toRad = _interopRequireDefault(require_toRad());
    var _toDeg = _interopRequireDefault(require_toDeg());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {default: obj};
    }
    var getCenter = function getCenter2(points) {
      if (Array.isArray(points) === false || points.length === 0) {
        return false;
      }
      var numberOfPoints = points.length;
      var sum = points.reduce(function(acc, point) {
        var pointLat = (0, _toRad.default)((0, _getLatitude.default)(point));
        var pointLon = (0, _toRad.default)((0, _getLongitude.default)(point));
        return {X: acc.X + Math.cos(pointLat) * Math.cos(pointLon), Y: acc.Y + Math.cos(pointLat) * Math.sin(pointLon), Z: acc.Z + Math.sin(pointLat)};
      }, {X: 0, Y: 0, Z: 0});
      var X = sum.X / numberOfPoints;
      var Y = sum.Y / numberOfPoints;
      var Z = sum.Z / numberOfPoints;
      return {longitude: (0, _toDeg.default)(Math.atan2(Y, X)), latitude: (0, _toDeg.default)(Math.atan2(Z, Math.sqrt(X * X + Y * Y)))};
    };
    var _default = getCenter;
    exports.default = _default;
  });

  // node_modules/geolib/es/getCenterOfBounds.js
  var require_getCenterOfBounds = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.default = void 0;
    var _getBounds = _interopRequireDefault(require_getBounds());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {default: obj};
    }
    var getCenterOfBounds = function getCenterOfBounds2(coords) {
      var bounds = (0, _getBounds.default)(coords);
      var latitude = bounds.minLat + (bounds.maxLat - bounds.minLat) / 2;
      var longitude = bounds.minLng + (bounds.maxLng - bounds.minLng) / 2;
      return {latitude: parseFloat(latitude.toFixed(6)), longitude: parseFloat(longitude.toFixed(6))};
    };
    var _default = getCenterOfBounds;
    exports.default = _default;
  });

  // node_modules/geolib/es/getRhumbLineBearing.js
  var require_getRhumbLineBearing = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.default = void 0;
    var _getLatitude = _interopRequireDefault(require_getLatitude());
    var _getLongitude = _interopRequireDefault(require_getLongitude());
    var _toRad = _interopRequireDefault(require_toRad());
    var _toDeg = _interopRequireDefault(require_toDeg());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {default: obj};
    }
    var getRhumbLineBearing = function getRhumbLineBearing2(origin, dest) {
      var diffLon = (0, _toRad.default)((0, _getLongitude.default)(dest)) - (0, _toRad.default)((0, _getLongitude.default)(origin));
      var diffPhi = Math.log(Math.tan((0, _toRad.default)((0, _getLatitude.default)(dest)) / 2 + Math.PI / 4) / Math.tan((0, _toRad.default)((0, _getLatitude.default)(origin)) / 2 + Math.PI / 4));
      if (Math.abs(diffLon) > Math.PI) {
        if (diffLon > 0) {
          diffLon = (Math.PI * 2 - diffLon) * -1;
        } else {
          diffLon = Math.PI * 2 + diffLon;
        }
      }
      return ((0, _toDeg.default)(Math.atan2(diffLon, diffPhi)) + 360) % 360;
    };
    var _default = getRhumbLineBearing;
    exports.default = _default;
  });

  // node_modules/geolib/es/getCompassDirection.js
  var require_getCompassDirection = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.default = void 0;
    var _getRhumbLineBearing = _interopRequireDefault(require_getRhumbLineBearing());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {default: obj};
    }
    var getCompassDirection = function getCompassDirection2(origin, dest) {
      var bearingFn = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : _getRhumbLineBearing.default;
      var bearing = typeof bearingFn === "function" ? bearingFn(origin, dest) : (0, _getRhumbLineBearing.default)(origin, dest);
      if (isNaN(bearing)) {
        throw new Error("Could not calculate bearing for given points. Check your bearing function");
      }
      switch (Math.round(bearing / 22.5)) {
        case 1:
          return "NNE";
        case 2:
          return "NE";
        case 3:
          return "ENE";
        case 4:
          return "E";
        case 5:
          return "ESE";
        case 6:
          return "SE";
        case 7:
          return "SSE";
        case 8:
          return "S";
        case 9:
          return "SSW";
        case 10:
          return "SW";
        case 11:
          return "WSW";
        case 12:
          return "W";
        case 13:
          return "WNW";
        case 14:
          return "NW";
        case 15:
          return "NNW";
        default:
          return "N";
      }
    };
    var _default = getCompassDirection;
    exports.default = _default;
  });

  // node_modules/geolib/es/getDistanceFromLine.js
  var require_getDistanceFromLine = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.default = void 0;
    var _getDistance = _interopRequireDefault(require_getDistance());
    var _robustAcos = _interopRequireDefault(require_robustAcos());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {default: obj};
    }
    var getDistanceFromLine = function getDistanceFromLine2(point, lineStart, lineEnd) {
      var d1 = (0, _getDistance.default)(lineStart, point);
      var d2 = (0, _getDistance.default)(point, lineEnd);
      var d3 = (0, _getDistance.default)(lineStart, lineEnd);
      var alpha = Math.acos((0, _robustAcos.default)((d1 * d1 + d3 * d3 - d2 * d2) / (2 * d1 * d3)));
      var beta = Math.acos((0, _robustAcos.default)((d2 * d2 + d3 * d3 - d1 * d1) / (2 * d2 * d3)));
      if (alpha > Math.PI / 2) {
        return d1;
      }
      if (beta > Math.PI / 2) {
        return d2;
      }
      return Math.sin(alpha) * d1;
    };
    var _default = getDistanceFromLine;
    exports.default = _default;
  });

  // node_modules/geolib/es/getGreatCircleBearing.js
  var require_getGreatCircleBearing = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.default = void 0;
    var _getLatitude = _interopRequireDefault(require_getLatitude());
    var _getLongitude = _interopRequireDefault(require_getLongitude());
    var _toRad = _interopRequireDefault(require_toRad());
    var _toDeg = _interopRequireDefault(require_toDeg());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {default: obj};
    }
    var getGreatCircleBearing = function getGreatCircleBearing2(origin, dest) {
      var destLat = (0, _getLatitude.default)(dest);
      var detLon = (0, _getLongitude.default)(dest);
      var originLat = (0, _getLatitude.default)(origin);
      var originLon = (0, _getLongitude.default)(origin);
      var bearing = ((0, _toDeg.default)(Math.atan2(Math.sin((0, _toRad.default)(detLon) - (0, _toRad.default)(originLon)) * Math.cos((0, _toRad.default)(destLat)), Math.cos((0, _toRad.default)(originLat)) * Math.sin((0, _toRad.default)(destLat)) - Math.sin((0, _toRad.default)(originLat)) * Math.cos((0, _toRad.default)(destLat)) * Math.cos((0, _toRad.default)(detLon) - (0, _toRad.default)(originLon)))) + 360) % 360;
      return bearing;
    };
    var _default = getGreatCircleBearing;
    exports.default = _default;
  });

  // node_modules/geolib/es/getPathLength.js
  var require_getPathLength = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.default = void 0;
    var _getDistance = _interopRequireDefault(require_getDistance());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {default: obj};
    }
    function _typeof(obj) {
      "@babel/helpers - typeof";
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof2(obj2) {
          return typeof obj2;
        };
      } else {
        _typeof = function _typeof2(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return _typeof(obj);
    }
    var getPathLength = function getPathLength2(points) {
      var distanceFn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : _getDistance.default;
      return points.reduce(function(acc, point) {
        if (_typeof(acc) === "object" && acc.last !== null) {
          acc.distance += distanceFn(point, acc.last);
        }
        acc.last = point;
        return acc;
      }, {last: null, distance: 0}).distance;
    };
    var _default = getPathLength;
    exports.default = _default;
  });

  // node_modules/geolib/es/getPreciseDistance.js
  var require_getPreciseDistance = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.default = void 0;
    var _getLatitude = _interopRequireDefault(require_getLatitude());
    var _getLongitude = _interopRequireDefault(require_getLongitude());
    var _toRad = _interopRequireDefault(require_toRad());
    var _constants = require_constants();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {default: obj};
    }
    var getDistance2 = function getDistance3(start, end) {
      var accuracy = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
      accuracy = typeof accuracy !== "undefined" && !isNaN(accuracy) ? accuracy : 1;
      var startLat = (0, _getLatitude.default)(start);
      var startLon = (0, _getLongitude.default)(start);
      var endLat = (0, _getLatitude.default)(end);
      var endLon = (0, _getLongitude.default)(end);
      var b = 6356752314245e-6;
      var ellipsoidParams = 1 / 298.257223563;
      var L = (0, _toRad.default)(endLon - startLon);
      var cosSigma;
      var sigma;
      var sinAlpha;
      var cosSqAlpha;
      var cos2SigmaM;
      var sinSigma;
      var U1 = Math.atan((1 - ellipsoidParams) * Math.tan((0, _toRad.default)(parseFloat(startLat))));
      var U2 = Math.atan((1 - ellipsoidParams) * Math.tan((0, _toRad.default)(parseFloat(endLat))));
      var sinU1 = Math.sin(U1);
      var cosU1 = Math.cos(U1);
      var sinU2 = Math.sin(U2);
      var cosU2 = Math.cos(U2);
      var lambda = L;
      var lambdaP;
      var iterLimit = 100;
      do {
        var sinLambda = Math.sin(lambda);
        var cosLambda = Math.cos(lambda);
        sinSigma = Math.sqrt(cosU2 * sinLambda * (cosU2 * sinLambda) + (cosU1 * sinU2 - sinU1 * cosU2 * cosLambda) * (cosU1 * sinU2 - sinU1 * cosU2 * cosLambda));
        if (sinSigma === 0) {
          return 0;
        }
        cosSigma = sinU1 * sinU2 + cosU1 * cosU2 * cosLambda;
        sigma = Math.atan2(sinSigma, cosSigma);
        sinAlpha = cosU1 * cosU2 * sinLambda / sinSigma;
        cosSqAlpha = 1 - sinAlpha * sinAlpha;
        cos2SigmaM = cosSigma - 2 * sinU1 * sinU2 / cosSqAlpha;
        if (isNaN(cos2SigmaM)) {
          cos2SigmaM = 0;
        }
        var C = ellipsoidParams / 16 * cosSqAlpha * (4 + ellipsoidParams * (4 - 3 * cosSqAlpha));
        lambdaP = lambda;
        lambda = L + (1 - C) * ellipsoidParams * sinAlpha * (sigma + C * sinSigma * (cos2SigmaM + C * cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM)));
      } while (Math.abs(lambda - lambdaP) > 1e-12 && --iterLimit > 0);
      if (iterLimit === 0) {
        return NaN;
      }
      var uSq = cosSqAlpha * (_constants.earthRadius * _constants.earthRadius - b * b) / (b * b);
      var A = 1 + uSq / 16384 * (4096 + uSq * (-768 + uSq * (320 - 175 * uSq)));
      var B = uSq / 1024 * (256 + uSq * (-128 + uSq * (74 - 47 * uSq)));
      var deltaSigma = B * sinSigma * (cos2SigmaM + B / 4 * (cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM) - B / 6 * cos2SigmaM * (-3 + 4 * sinSigma * sinSigma) * (-3 + 4 * cos2SigmaM * cos2SigmaM)));
      var distance = b * A * (sigma - deltaSigma);
      return Math.round(distance / accuracy) * accuracy;
    };
    var _default = getDistance2;
    exports.default = _default;
  });

  // node_modules/geolib/es/getRoughCompassDirection.js
  var require_getRoughCompassDirection = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.default = void 0;
    var getRoughCompassDirection = function getRoughCompassDirection2(exact) {
      if (/^NNE|NE|NNW|N$/.test(exact)) {
        return "N";
      }
      if (/^ENE|E|ESE|SE$/.test(exact)) {
        return "E";
      }
      if (/^SSE|S|SSW|SW$/.test(exact)) {
        return "S";
      }
      if (/^WSW|W|WNW|NW$/.test(exact)) {
        return "W";
      }
    };
    var _default = getRoughCompassDirection;
    exports.default = _default;
  });

  // node_modules/geolib/es/getSpeed.js
  var require_getSpeed = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.default = void 0;
    var _getDistance = _interopRequireDefault(require_getDistance());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {default: obj};
    }
    var getSpeed = function getSpeed2(start, end) {
      var distanceFn = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : _getDistance.default;
      var distance = distanceFn(start, end);
      var time = Number(end.time) - Number(start.time);
      var metersPerSecond = distance / time * 1e3;
      return metersPerSecond;
    };
    var _default = getSpeed;
    exports.default = _default;
  });

  // node_modules/geolib/es/isPointInLine.js
  var require_isPointInLine = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.default = void 0;
    var _getDistance = _interopRequireDefault(require_getDistance());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {default: obj};
    }
    var isPointInLine = function isPointInLine2(point, lineStart, lineEnd) {
      return (0, _getDistance.default)(lineStart, point) + (0, _getDistance.default)(point, lineEnd) === (0, _getDistance.default)(lineStart, lineEnd);
    };
    var _default = isPointInLine;
    exports.default = _default;
  });

  // node_modules/geolib/es/isPointInPolygon.js
  var require_isPointInPolygon = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.default = void 0;
    var _getLatitude = _interopRequireDefault(require_getLatitude());
    var _getLongitude = _interopRequireDefault(require_getLongitude());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {default: obj};
    }
    var isPointInPolygon = function isPointInPolygon2(point, polygon) {
      var isInside = false;
      var totalPolys = polygon.length;
      for (var i = -1, j = totalPolys - 1; ++i < totalPolys; j = i) {
        if (((0, _getLongitude.default)(polygon[i]) <= (0, _getLongitude.default)(point) && (0, _getLongitude.default)(point) < (0, _getLongitude.default)(polygon[j]) || (0, _getLongitude.default)(polygon[j]) <= (0, _getLongitude.default)(point) && (0, _getLongitude.default)(point) < (0, _getLongitude.default)(polygon[i])) && (0, _getLatitude.default)(point) < ((0, _getLatitude.default)(polygon[j]) - (0, _getLatitude.default)(polygon[i])) * ((0, _getLongitude.default)(point) - (0, _getLongitude.default)(polygon[i])) / ((0, _getLongitude.default)(polygon[j]) - (0, _getLongitude.default)(polygon[i])) + (0, _getLatitude.default)(polygon[i])) {
          isInside = !isInside;
        }
      }
      return isInside;
    };
    var _default = isPointInPolygon;
    exports.default = _default;
  });

  // node_modules/geolib/es/isPointNearLine.js
  var require_isPointNearLine = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.default = void 0;
    var _getDistanceFromLine = _interopRequireDefault(require_getDistanceFromLine());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {default: obj};
    }
    var isPointNearLine = function isPointNearLine2(point, start, end, distance) {
      return (0, _getDistanceFromLine.default)(point, start, end) < distance;
    };
    var _default = isPointNearLine;
    exports.default = _default;
  });

  // node_modules/geolib/es/isPointWithinRadius.js
  var require_isPointWithinRadius = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.default = void 0;
    var _getDistance = _interopRequireDefault(require_getDistance());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {default: obj};
    }
    var isPointWithinRadius = function isPointWithinRadius2(point, center, radius) {
      return (0, _getDistance.default)(point, center) < radius;
    };
    var _default = isPointWithinRadius;
    exports.default = _default;
  });

  // node_modules/geolib/es/wktToPolygon.js
  var require_wktToPolygon = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.default = void 0;
    function _slicedToArray(arr, i) {
      return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
    }
    function _nonIterableRest() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o)
        return;
      if (typeof o === "string")
        return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor)
        n = o.constructor.name;
      if (n === "Map" || n === "Set")
        return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
        return _arrayLikeToArray(o, minLen);
    }
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length)
        len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i];
      }
      return arr2;
    }
    function _iterableToArrayLimit(arr, i) {
      if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr)))
        return;
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = void 0;
      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);
          if (i && _arr.length === i)
            break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"] != null)
            _i["return"]();
        } finally {
          if (_d)
            throw _e;
        }
      }
      return _arr;
    }
    function _arrayWithHoles(arr) {
      if (Array.isArray(arr))
        return arr;
    }
    var wktToPolygon = function wktToPolygon2(wkt) {
      if (!wkt.startsWith("POLYGON")) {
        throw new Error("Invalid wkt.");
      }
      var coordsText = wkt.slice(wkt.indexOf("(") + 2, wkt.indexOf(")")).split(", ");
      var polygon = coordsText.map(function(coordText) {
        var _coordText$split = coordText.split(" "), _coordText$split2 = _slicedToArray(_coordText$split, 2), longitude = _coordText$split2[0], latitude = _coordText$split2[1];
        return {longitude: parseFloat(longitude), latitude: parseFloat(latitude)};
      });
      return polygon;
    };
    var _default = wktToPolygon;
    exports.default = _default;
  });

  // node_modules/geolib/es/index.js
  var require_es = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    var _exportNames = {computeDestinationPoint: true, convertArea: true, convertDistance: true, convertSpeed: true, decimalToSexagesimal: true, findNearest: true, getAreaOfPolygon: true, getBounds: true, getBoundsOfDistance: true, getCenter: true, getCenterOfBounds: true, getCompassDirection: true, getCoordinateKey: true, getCoordinateKeys: true, getDistance: true, getDistanceFromLine: true, getGreatCircleBearing: true, getLatitude: true, getLongitude: true, getPathLength: true, getPreciseDistance: true, getRhumbLineBearing: true, getRoughCompassDirection: true, getSpeed: true, isDecimal: true, isPointInLine: true, isPointInPolygon: true, isPointNearLine: true, isPointWithinRadius: true, isSexagesimal: true, isValidCoordinate: true, isValidLatitude: true, isValidLongitude: true, orderByDistance: true, sexagesimalToDecimal: true, toDecimal: true, toRad: true, toDeg: true, wktToPolygon: true};
    Object.defineProperty(exports, "computeDestinationPoint", {enumerable: true, get: function get() {
      return _computeDestinationPoint.default;
    }});
    Object.defineProperty(exports, "convertArea", {enumerable: true, get: function get() {
      return _convertArea.default;
    }});
    Object.defineProperty(exports, "convertDistance", {enumerable: true, get: function get() {
      return _convertDistance.default;
    }});
    Object.defineProperty(exports, "convertSpeed", {enumerable: true, get: function get() {
      return _convertSpeed.default;
    }});
    Object.defineProperty(exports, "decimalToSexagesimal", {enumerable: true, get: function get() {
      return _decimalToSexagesimal.default;
    }});
    Object.defineProperty(exports, "findNearest", {enumerable: true, get: function get() {
      return _findNearest.default;
    }});
    Object.defineProperty(exports, "getAreaOfPolygon", {enumerable: true, get: function get() {
      return _getAreaOfPolygon.default;
    }});
    Object.defineProperty(exports, "getBounds", {enumerable: true, get: function get() {
      return _getBounds.default;
    }});
    Object.defineProperty(exports, "getBoundsOfDistance", {enumerable: true, get: function get() {
      return _getBoundsOfDistance.default;
    }});
    Object.defineProperty(exports, "getCenter", {enumerable: true, get: function get() {
      return _getCenter.default;
    }});
    Object.defineProperty(exports, "getCenterOfBounds", {enumerable: true, get: function get() {
      return _getCenterOfBounds.default;
    }});
    Object.defineProperty(exports, "getCompassDirection", {enumerable: true, get: function get() {
      return _getCompassDirection.default;
    }});
    Object.defineProperty(exports, "getCoordinateKey", {enumerable: true, get: function get() {
      return _getCoordinateKey.default;
    }});
    Object.defineProperty(exports, "getCoordinateKeys", {enumerable: true, get: function get() {
      return _getCoordinateKeys.default;
    }});
    Object.defineProperty(exports, "getDistance", {enumerable: true, get: function get() {
      return _getDistance.default;
    }});
    Object.defineProperty(exports, "getDistanceFromLine", {enumerable: true, get: function get() {
      return _getDistanceFromLine.default;
    }});
    Object.defineProperty(exports, "getGreatCircleBearing", {enumerable: true, get: function get() {
      return _getGreatCircleBearing.default;
    }});
    Object.defineProperty(exports, "getLatitude", {enumerable: true, get: function get() {
      return _getLatitude.default;
    }});
    Object.defineProperty(exports, "getLongitude", {enumerable: true, get: function get() {
      return _getLongitude.default;
    }});
    Object.defineProperty(exports, "getPathLength", {enumerable: true, get: function get() {
      return _getPathLength.default;
    }});
    Object.defineProperty(exports, "getPreciseDistance", {enumerable: true, get: function get() {
      return _getPreciseDistance.default;
    }});
    Object.defineProperty(exports, "getRhumbLineBearing", {enumerable: true, get: function get() {
      return _getRhumbLineBearing.default;
    }});
    Object.defineProperty(exports, "getRoughCompassDirection", {enumerable: true, get: function get() {
      return _getRoughCompassDirection.default;
    }});
    Object.defineProperty(exports, "getSpeed", {enumerable: true, get: function get() {
      return _getSpeed.default;
    }});
    Object.defineProperty(exports, "isDecimal", {enumerable: true, get: function get() {
      return _isDecimal.default;
    }});
    Object.defineProperty(exports, "isPointInLine", {enumerable: true, get: function get() {
      return _isPointInLine.default;
    }});
    Object.defineProperty(exports, "isPointInPolygon", {enumerable: true, get: function get() {
      return _isPointInPolygon.default;
    }});
    Object.defineProperty(exports, "isPointNearLine", {enumerable: true, get: function get() {
      return _isPointNearLine.default;
    }});
    Object.defineProperty(exports, "isPointWithinRadius", {enumerable: true, get: function get() {
      return _isPointWithinRadius.default;
    }});
    Object.defineProperty(exports, "isSexagesimal", {enumerable: true, get: function get() {
      return _isSexagesimal.default;
    }});
    Object.defineProperty(exports, "isValidCoordinate", {enumerable: true, get: function get() {
      return _isValidCoordinate.default;
    }});
    Object.defineProperty(exports, "isValidLatitude", {enumerable: true, get: function get() {
      return _isValidLatitude.default;
    }});
    Object.defineProperty(exports, "isValidLongitude", {enumerable: true, get: function get() {
      return _isValidLongitude.default;
    }});
    Object.defineProperty(exports, "orderByDistance", {enumerable: true, get: function get() {
      return _orderByDistance.default;
    }});
    Object.defineProperty(exports, "sexagesimalToDecimal", {enumerable: true, get: function get() {
      return _sexagesimalToDecimal.default;
    }});
    Object.defineProperty(exports, "toDecimal", {enumerable: true, get: function get() {
      return _toDecimal.default;
    }});
    Object.defineProperty(exports, "toRad", {enumerable: true, get: function get() {
      return _toRad.default;
    }});
    Object.defineProperty(exports, "toDeg", {enumerable: true, get: function get() {
      return _toDeg.default;
    }});
    Object.defineProperty(exports, "wktToPolygon", {enumerable: true, get: function get() {
      return _wktToPolygon.default;
    }});
    var _computeDestinationPoint = _interopRequireDefault(require_computeDestinationPoint());
    var _convertArea = _interopRequireDefault(require_convertArea());
    var _convertDistance = _interopRequireDefault(require_convertDistance());
    var _convertSpeed = _interopRequireDefault(require_convertSpeed());
    var _decimalToSexagesimal = _interopRequireDefault(require_decimalToSexagesimal());
    var _findNearest = _interopRequireDefault(require_findNearest());
    var _getAreaOfPolygon = _interopRequireDefault(require_getAreaOfPolygon());
    var _getBounds = _interopRequireDefault(require_getBounds());
    var _getBoundsOfDistance = _interopRequireDefault(require_getBoundsOfDistance());
    var _getCenter = _interopRequireDefault(require_getCenter());
    var _getCenterOfBounds = _interopRequireDefault(require_getCenterOfBounds());
    var _getCompassDirection = _interopRequireDefault(require_getCompassDirection());
    var _getCoordinateKey = _interopRequireDefault(require_getCoordinateKey());
    var _getCoordinateKeys = _interopRequireDefault(require_getCoordinateKeys());
    var _getDistance = _interopRequireDefault(require_getDistance());
    var _getDistanceFromLine = _interopRequireDefault(require_getDistanceFromLine());
    var _getGreatCircleBearing = _interopRequireDefault(require_getGreatCircleBearing());
    var _getLatitude = _interopRequireDefault(require_getLatitude());
    var _getLongitude = _interopRequireDefault(require_getLongitude());
    var _getPathLength = _interopRequireDefault(require_getPathLength());
    var _getPreciseDistance = _interopRequireDefault(require_getPreciseDistance());
    var _getRhumbLineBearing = _interopRequireDefault(require_getRhumbLineBearing());
    var _getRoughCompassDirection = _interopRequireDefault(require_getRoughCompassDirection());
    var _getSpeed = _interopRequireDefault(require_getSpeed());
    var _isDecimal = _interopRequireDefault(require_isDecimal());
    var _isPointInLine = _interopRequireDefault(require_isPointInLine());
    var _isPointInPolygon = _interopRequireDefault(require_isPointInPolygon());
    var _isPointNearLine = _interopRequireDefault(require_isPointNearLine());
    var _isPointWithinRadius = _interopRequireDefault(require_isPointWithinRadius());
    var _isSexagesimal = _interopRequireDefault(require_isSexagesimal());
    var _isValidCoordinate = _interopRequireDefault(require_isValidCoordinate());
    var _isValidLatitude = _interopRequireDefault(require_isValidLatitude());
    var _isValidLongitude = _interopRequireDefault(require_isValidLongitude());
    var _orderByDistance = _interopRequireDefault(require_orderByDistance());
    var _sexagesimalToDecimal = _interopRequireDefault(require_sexagesimalToDecimal());
    var _toDecimal = _interopRequireDefault(require_toDecimal());
    var _toRad = _interopRequireDefault(require_toRad());
    var _toDeg = _interopRequireDefault(require_toDeg());
    var _wktToPolygon = _interopRequireDefault(require_wktToPolygon());
    var _constants = require_constants();
    Object.keys(_constants).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (Object.prototype.hasOwnProperty.call(_exportNames, key))
        return;
      Object.defineProperty(exports, key, {enumerable: true, get: function get() {
        return _constants[key];
      }});
    });
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {default: obj};
    }
  });

  // node_modules/tinycolor2/tinycolor.js
  var require_tinycolor = __commonJS((exports, module) => {
    (function(Math2) {
      var trimLeft = /^\s+/, trimRight = /\s+$/, tinyCounter = 0, mathRound = Math2.round, mathMin = Math2.min, mathMax = Math2.max, mathRandom = Math2.random;
      function tinycolor(color, opts) {
        color = color ? color : "";
        opts = opts || {};
        if (color instanceof tinycolor) {
          return color;
        }
        if (!(this instanceof tinycolor)) {
          return new tinycolor(color, opts);
        }
        var rgb = inputToRGB(color);
        this._originalInput = color, this._r = rgb.r, this._g = rgb.g, this._b = rgb.b, this._a = rgb.a, this._roundA = mathRound(100 * this._a) / 100, this._format = opts.format || rgb.format;
        this._gradientType = opts.gradientType;
        if (this._r < 1) {
          this._r = mathRound(this._r);
        }
        if (this._g < 1) {
          this._g = mathRound(this._g);
        }
        if (this._b < 1) {
          this._b = mathRound(this._b);
        }
        this._ok = rgb.ok;
        this._tc_id = tinyCounter++;
      }
      tinycolor.prototype = {
        isDark: function() {
          return this.getBrightness() < 128;
        },
        isLight: function() {
          return !this.isDark();
        },
        isValid: function() {
          return this._ok;
        },
        getOriginalInput: function() {
          return this._originalInput;
        },
        getFormat: function() {
          return this._format;
        },
        getAlpha: function() {
          return this._a;
        },
        getBrightness: function() {
          var rgb = this.toRgb();
          return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1e3;
        },
        getLuminance: function() {
          var rgb = this.toRgb();
          var RsRGB, GsRGB, BsRGB, R, G, B;
          RsRGB = rgb.r / 255;
          GsRGB = rgb.g / 255;
          BsRGB = rgb.b / 255;
          if (RsRGB <= 0.03928) {
            R = RsRGB / 12.92;
          } else {
            R = Math2.pow((RsRGB + 0.055) / 1.055, 2.4);
          }
          if (GsRGB <= 0.03928) {
            G = GsRGB / 12.92;
          } else {
            G = Math2.pow((GsRGB + 0.055) / 1.055, 2.4);
          }
          if (BsRGB <= 0.03928) {
            B = BsRGB / 12.92;
          } else {
            B = Math2.pow((BsRGB + 0.055) / 1.055, 2.4);
          }
          return 0.2126 * R + 0.7152 * G + 0.0722 * B;
        },
        setAlpha: function(value) {
          this._a = boundAlpha(value);
          this._roundA = mathRound(100 * this._a) / 100;
          return this;
        },
        toHsv: function() {
          var hsv = rgbToHsv(this._r, this._g, this._b);
          return {h: hsv.h * 360, s: hsv.s, v: hsv.v, a: this._a};
        },
        toHsvString: function() {
          var hsv = rgbToHsv(this._r, this._g, this._b);
          var h = mathRound(hsv.h * 360), s = mathRound(hsv.s * 100), v = mathRound(hsv.v * 100);
          return this._a == 1 ? "hsv(" + h + ", " + s + "%, " + v + "%)" : "hsva(" + h + ", " + s + "%, " + v + "%, " + this._roundA + ")";
        },
        toHsl: function() {
          var hsl = rgbToHsl(this._r, this._g, this._b);
          return {h: hsl.h * 360, s: hsl.s, l: hsl.l, a: this._a};
        },
        toHslString: function() {
          var hsl = rgbToHsl(this._r, this._g, this._b);
          var h = mathRound(hsl.h * 360), s = mathRound(hsl.s * 100), l = mathRound(hsl.l * 100);
          return this._a == 1 ? "hsl(" + h + ", " + s + "%, " + l + "%)" : "hsla(" + h + ", " + s + "%, " + l + "%, " + this._roundA + ")";
        },
        toHex: function(allow3Char) {
          return rgbToHex(this._r, this._g, this._b, allow3Char);
        },
        toHexString: function(allow3Char) {
          return "#" + this.toHex(allow3Char);
        },
        toHex8: function(allow4Char) {
          return rgbaToHex(this._r, this._g, this._b, this._a, allow4Char);
        },
        toHex8String: function(allow4Char) {
          return "#" + this.toHex8(allow4Char);
        },
        toRgb: function() {
          return {r: mathRound(this._r), g: mathRound(this._g), b: mathRound(this._b), a: this._a};
        },
        toRgbString: function() {
          return this._a == 1 ? "rgb(" + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ")" : "rgba(" + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ", " + this._roundA + ")";
        },
        toPercentageRgb: function() {
          return {r: mathRound(bound01(this._r, 255) * 100) + "%", g: mathRound(bound01(this._g, 255) * 100) + "%", b: mathRound(bound01(this._b, 255) * 100) + "%", a: this._a};
        },
        toPercentageRgbString: function() {
          return this._a == 1 ? "rgb(" + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%)" : "rgba(" + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%, " + this._roundA + ")";
        },
        toName: function() {
          if (this._a === 0) {
            return "transparent";
          }
          if (this._a < 1) {
            return false;
          }
          return hexNames[rgbToHex(this._r, this._g, this._b, true)] || false;
        },
        toFilter: function(secondColor) {
          var hex8String = "#" + rgbaToArgbHex(this._r, this._g, this._b, this._a);
          var secondHex8String = hex8String;
          var gradientType = this._gradientType ? "GradientType = 1, " : "";
          if (secondColor) {
            var s = tinycolor(secondColor);
            secondHex8String = "#" + rgbaToArgbHex(s._r, s._g, s._b, s._a);
          }
          return "progid:DXImageTransform.Microsoft.gradient(" + gradientType + "startColorstr=" + hex8String + ",endColorstr=" + secondHex8String + ")";
        },
        toString: function(format) {
          var formatSet = !!format;
          format = format || this._format;
          var formattedString = false;
          var hasAlpha = this._a < 1 && this._a >= 0;
          var needsAlphaFormat = !formatSet && hasAlpha && (format === "hex" || format === "hex6" || format === "hex3" || format === "hex4" || format === "hex8" || format === "name");
          if (needsAlphaFormat) {
            if (format === "name" && this._a === 0) {
              return this.toName();
            }
            return this.toRgbString();
          }
          if (format === "rgb") {
            formattedString = this.toRgbString();
          }
          if (format === "prgb") {
            formattedString = this.toPercentageRgbString();
          }
          if (format === "hex" || format === "hex6") {
            formattedString = this.toHexString();
          }
          if (format === "hex3") {
            formattedString = this.toHexString(true);
          }
          if (format === "hex4") {
            formattedString = this.toHex8String(true);
          }
          if (format === "hex8") {
            formattedString = this.toHex8String();
          }
          if (format === "name") {
            formattedString = this.toName();
          }
          if (format === "hsl") {
            formattedString = this.toHslString();
          }
          if (format === "hsv") {
            formattedString = this.toHsvString();
          }
          return formattedString || this.toHexString();
        },
        clone: function() {
          return tinycolor(this.toString());
        },
        _applyModification: function(fn, args) {
          var color = fn.apply(null, [this].concat([].slice.call(args)));
          this._r = color._r;
          this._g = color._g;
          this._b = color._b;
          this.setAlpha(color._a);
          return this;
        },
        lighten: function() {
          return this._applyModification(lighten, arguments);
        },
        brighten: function() {
          return this._applyModification(brighten, arguments);
        },
        darken: function() {
          return this._applyModification(darken, arguments);
        },
        desaturate: function() {
          return this._applyModification(desaturate, arguments);
        },
        saturate: function() {
          return this._applyModification(saturate, arguments);
        },
        greyscale: function() {
          return this._applyModification(greyscale, arguments);
        },
        spin: function() {
          return this._applyModification(spin, arguments);
        },
        _applyCombination: function(fn, args) {
          return fn.apply(null, [this].concat([].slice.call(args)));
        },
        analogous: function() {
          return this._applyCombination(analogous, arguments);
        },
        complement: function() {
          return this._applyCombination(complement, arguments);
        },
        monochromatic: function() {
          return this._applyCombination(monochromatic, arguments);
        },
        splitcomplement: function() {
          return this._applyCombination(splitcomplement, arguments);
        },
        triad: function() {
          return this._applyCombination(triad, arguments);
        },
        tetrad: function() {
          return this._applyCombination(tetrad, arguments);
        }
      };
      tinycolor.fromRatio = function(color, opts) {
        if (typeof color == "object") {
          var newColor = {};
          for (var i in color) {
            if (color.hasOwnProperty(i)) {
              if (i === "a") {
                newColor[i] = color[i];
              } else {
                newColor[i] = convertToPercentage(color[i]);
              }
            }
          }
          color = newColor;
        }
        return tinycolor(color, opts);
      };
      function inputToRGB(color) {
        var rgb = {r: 0, g: 0, b: 0};
        var a = 1;
        var s = null;
        var v = null;
        var l = null;
        var ok = false;
        var format = false;
        if (typeof color == "string") {
          color = stringInputToObject(color);
        }
        if (typeof color == "object") {
          if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {
            rgb = rgbToRgb(color.r, color.g, color.b);
            ok = true;
            format = String(color.r).substr(-1) === "%" ? "prgb" : "rgb";
          } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
            s = convertToPercentage(color.s);
            v = convertToPercentage(color.v);
            rgb = hsvToRgb(color.h, s, v);
            ok = true;
            format = "hsv";
          } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {
            s = convertToPercentage(color.s);
            l = convertToPercentage(color.l);
            rgb = hslToRgb(color.h, s, l);
            ok = true;
            format = "hsl";
          }
          if (color.hasOwnProperty("a")) {
            a = color.a;
          }
        }
        a = boundAlpha(a);
        return {
          ok,
          format: color.format || format,
          r: mathMin(255, mathMax(rgb.r, 0)),
          g: mathMin(255, mathMax(rgb.g, 0)),
          b: mathMin(255, mathMax(rgb.b, 0)),
          a
        };
      }
      function rgbToRgb(r, g, b) {
        return {
          r: bound01(r, 255) * 255,
          g: bound01(g, 255) * 255,
          b: bound01(b, 255) * 255
        };
      }
      function rgbToHsl(r, g, b) {
        r = bound01(r, 255);
        g = bound01(g, 255);
        b = bound01(b, 255);
        var max = mathMax(r, g, b), min = mathMin(r, g, b);
        var h, s, l = (max + min) / 2;
        if (max == min) {
          h = s = 0;
        } else {
          var d = max - min;
          s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
          switch (max) {
            case r:
              h = (g - b) / d + (g < b ? 6 : 0);
              break;
            case g:
              h = (b - r) / d + 2;
              break;
            case b:
              h = (r - g) / d + 4;
              break;
          }
          h /= 6;
        }
        return {h, s, l};
      }
      function hslToRgb(h, s, l) {
        var r, g, b;
        h = bound01(h, 360);
        s = bound01(s, 100);
        l = bound01(l, 100);
        function hue2rgb(p2, q2, t) {
          if (t < 0)
            t += 1;
          if (t > 1)
            t -= 1;
          if (t < 1 / 6)
            return p2 + (q2 - p2) * 6 * t;
          if (t < 1 / 2)
            return q2;
          if (t < 2 / 3)
            return p2 + (q2 - p2) * (2 / 3 - t) * 6;
          return p2;
        }
        if (s === 0) {
          r = g = b = l;
        } else {
          var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
          var p = 2 * l - q;
          r = hue2rgb(p, q, h + 1 / 3);
          g = hue2rgb(p, q, h);
          b = hue2rgb(p, q, h - 1 / 3);
        }
        return {r: r * 255, g: g * 255, b: b * 255};
      }
      function rgbToHsv(r, g, b) {
        r = bound01(r, 255);
        g = bound01(g, 255);
        b = bound01(b, 255);
        var max = mathMax(r, g, b), min = mathMin(r, g, b);
        var h, s, v = max;
        var d = max - min;
        s = max === 0 ? 0 : d / max;
        if (max == min) {
          h = 0;
        } else {
          switch (max) {
            case r:
              h = (g - b) / d + (g < b ? 6 : 0);
              break;
            case g:
              h = (b - r) / d + 2;
              break;
            case b:
              h = (r - g) / d + 4;
              break;
          }
          h /= 6;
        }
        return {h, s, v};
      }
      function hsvToRgb(h, s, v) {
        h = bound01(h, 360) * 6;
        s = bound01(s, 100);
        v = bound01(v, 100);
        var i = Math2.floor(h), f = h - i, p = v * (1 - s), q = v * (1 - f * s), t = v * (1 - (1 - f) * s), mod = i % 6, r = [v, q, p, p, t, v][mod], g = [t, v, v, q, p, p][mod], b = [p, p, t, v, v, q][mod];
        return {r: r * 255, g: g * 255, b: b * 255};
      }
      function rgbToHex(r, g, b, allow3Char) {
        var hex = [
          pad2(mathRound(r).toString(16)),
          pad2(mathRound(g).toString(16)),
          pad2(mathRound(b).toString(16))
        ];
        if (allow3Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1)) {
          return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
        }
        return hex.join("");
      }
      function rgbaToHex(r, g, b, a, allow4Char) {
        var hex = [
          pad2(mathRound(r).toString(16)),
          pad2(mathRound(g).toString(16)),
          pad2(mathRound(b).toString(16)),
          pad2(convertDecimalToHex(a))
        ];
        if (allow4Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1) && hex[3].charAt(0) == hex[3].charAt(1)) {
          return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0) + hex[3].charAt(0);
        }
        return hex.join("");
      }
      function rgbaToArgbHex(r, g, b, a) {
        var hex = [
          pad2(convertDecimalToHex(a)),
          pad2(mathRound(r).toString(16)),
          pad2(mathRound(g).toString(16)),
          pad2(mathRound(b).toString(16))
        ];
        return hex.join("");
      }
      tinycolor.equals = function(color1, color2) {
        if (!color1 || !color2) {
          return false;
        }
        return tinycolor(color1).toRgbString() == tinycolor(color2).toRgbString();
      };
      tinycolor.random = function() {
        return tinycolor.fromRatio({
          r: mathRandom(),
          g: mathRandom(),
          b: mathRandom()
        });
      };
      function desaturate(color, amount) {
        amount = amount === 0 ? 0 : amount || 10;
        var hsl = tinycolor(color).toHsl();
        hsl.s -= amount / 100;
        hsl.s = clamp01(hsl.s);
        return tinycolor(hsl);
      }
      function saturate(color, amount) {
        amount = amount === 0 ? 0 : amount || 10;
        var hsl = tinycolor(color).toHsl();
        hsl.s += amount / 100;
        hsl.s = clamp01(hsl.s);
        return tinycolor(hsl);
      }
      function greyscale(color) {
        return tinycolor(color).desaturate(100);
      }
      function lighten(color, amount) {
        amount = amount === 0 ? 0 : amount || 10;
        var hsl = tinycolor(color).toHsl();
        hsl.l += amount / 100;
        hsl.l = clamp01(hsl.l);
        return tinycolor(hsl);
      }
      function brighten(color, amount) {
        amount = amount === 0 ? 0 : amount || 10;
        var rgb = tinycolor(color).toRgb();
        rgb.r = mathMax(0, mathMin(255, rgb.r - mathRound(255 * -(amount / 100))));
        rgb.g = mathMax(0, mathMin(255, rgb.g - mathRound(255 * -(amount / 100))));
        rgb.b = mathMax(0, mathMin(255, rgb.b - mathRound(255 * -(amount / 100))));
        return tinycolor(rgb);
      }
      function darken(color, amount) {
        amount = amount === 0 ? 0 : amount || 10;
        var hsl = tinycolor(color).toHsl();
        hsl.l -= amount / 100;
        hsl.l = clamp01(hsl.l);
        return tinycolor(hsl);
      }
      function spin(color, amount) {
        var hsl = tinycolor(color).toHsl();
        var hue = (hsl.h + amount) % 360;
        hsl.h = hue < 0 ? 360 + hue : hue;
        return tinycolor(hsl);
      }
      function complement(color) {
        var hsl = tinycolor(color).toHsl();
        hsl.h = (hsl.h + 180) % 360;
        return tinycolor(hsl);
      }
      function triad(color) {
        var hsl = tinycolor(color).toHsl();
        var h = hsl.h;
        return [
          tinycolor(color),
          tinycolor({h: (h + 120) % 360, s: hsl.s, l: hsl.l}),
          tinycolor({h: (h + 240) % 360, s: hsl.s, l: hsl.l})
        ];
      }
      function tetrad(color) {
        var hsl = tinycolor(color).toHsl();
        var h = hsl.h;
        return [
          tinycolor(color),
          tinycolor({h: (h + 90) % 360, s: hsl.s, l: hsl.l}),
          tinycolor({h: (h + 180) % 360, s: hsl.s, l: hsl.l}),
          tinycolor({h: (h + 270) % 360, s: hsl.s, l: hsl.l})
        ];
      }
      function splitcomplement(color) {
        var hsl = tinycolor(color).toHsl();
        var h = hsl.h;
        return [
          tinycolor(color),
          tinycolor({h: (h + 72) % 360, s: hsl.s, l: hsl.l}),
          tinycolor({h: (h + 216) % 360, s: hsl.s, l: hsl.l})
        ];
      }
      function analogous(color, results, slices) {
        results = results || 6;
        slices = slices || 30;
        var hsl = tinycolor(color).toHsl();
        var part = 360 / slices;
        var ret = [tinycolor(color)];
        for (hsl.h = (hsl.h - (part * results >> 1) + 720) % 360; --results; ) {
          hsl.h = (hsl.h + part) % 360;
          ret.push(tinycolor(hsl));
        }
        return ret;
      }
      function monochromatic(color, results) {
        results = results || 6;
        var hsv = tinycolor(color).toHsv();
        var h = hsv.h, s = hsv.s, v = hsv.v;
        var ret = [];
        var modification = 1 / results;
        while (results--) {
          ret.push(tinycolor({h, s, v}));
          v = (v + modification) % 1;
        }
        return ret;
      }
      tinycolor.mix = function(color1, color2, amount) {
        amount = amount === 0 ? 0 : amount || 50;
        var rgb1 = tinycolor(color1).toRgb();
        var rgb2 = tinycolor(color2).toRgb();
        var p = amount / 100;
        var rgba = {
          r: (rgb2.r - rgb1.r) * p + rgb1.r,
          g: (rgb2.g - rgb1.g) * p + rgb1.g,
          b: (rgb2.b - rgb1.b) * p + rgb1.b,
          a: (rgb2.a - rgb1.a) * p + rgb1.a
        };
        return tinycolor(rgba);
      };
      tinycolor.readability = function(color1, color2) {
        var c1 = tinycolor(color1);
        var c2 = tinycolor(color2);
        return (Math2.max(c1.getLuminance(), c2.getLuminance()) + 0.05) / (Math2.min(c1.getLuminance(), c2.getLuminance()) + 0.05);
      };
      tinycolor.isReadable = function(color1, color2, wcag2) {
        var readability = tinycolor.readability(color1, color2);
        var wcag2Parms, out;
        out = false;
        wcag2Parms = validateWCAG2Parms(wcag2);
        switch (wcag2Parms.level + wcag2Parms.size) {
          case "AAsmall":
          case "AAAlarge":
            out = readability >= 4.5;
            break;
          case "AAlarge":
            out = readability >= 3;
            break;
          case "AAAsmall":
            out = readability >= 7;
            break;
        }
        return out;
      };
      tinycolor.mostReadable = function(baseColor, colorList, args) {
        var bestColor = null;
        var bestScore = 0;
        var readability;
        var includeFallbackColors, level, size;
        args = args || {};
        includeFallbackColors = args.includeFallbackColors;
        level = args.level;
        size = args.size;
        for (var i = 0; i < colorList.length; i++) {
          readability = tinycolor.readability(baseColor, colorList[i]);
          if (readability > bestScore) {
            bestScore = readability;
            bestColor = tinycolor(colorList[i]);
          }
        }
        if (tinycolor.isReadable(baseColor, bestColor, {level, size}) || !includeFallbackColors) {
          return bestColor;
        } else {
          args.includeFallbackColors = false;
          return tinycolor.mostReadable(baseColor, ["#fff", "#000"], args);
        }
      };
      var names = tinycolor.names = {
        aliceblue: "f0f8ff",
        antiquewhite: "faebd7",
        aqua: "0ff",
        aquamarine: "7fffd4",
        azure: "f0ffff",
        beige: "f5f5dc",
        bisque: "ffe4c4",
        black: "000",
        blanchedalmond: "ffebcd",
        blue: "00f",
        blueviolet: "8a2be2",
        brown: "a52a2a",
        burlywood: "deb887",
        burntsienna: "ea7e5d",
        cadetblue: "5f9ea0",
        chartreuse: "7fff00",
        chocolate: "d2691e",
        coral: "ff7f50",
        cornflowerblue: "6495ed",
        cornsilk: "fff8dc",
        crimson: "dc143c",
        cyan: "0ff",
        darkblue: "00008b",
        darkcyan: "008b8b",
        darkgoldenrod: "b8860b",
        darkgray: "a9a9a9",
        darkgreen: "006400",
        darkgrey: "a9a9a9",
        darkkhaki: "bdb76b",
        darkmagenta: "8b008b",
        darkolivegreen: "556b2f",
        darkorange: "ff8c00",
        darkorchid: "9932cc",
        darkred: "8b0000",
        darksalmon: "e9967a",
        darkseagreen: "8fbc8f",
        darkslateblue: "483d8b",
        darkslategray: "2f4f4f",
        darkslategrey: "2f4f4f",
        darkturquoise: "00ced1",
        darkviolet: "9400d3",
        deeppink: "ff1493",
        deepskyblue: "00bfff",
        dimgray: "696969",
        dimgrey: "696969",
        dodgerblue: "1e90ff",
        firebrick: "b22222",
        floralwhite: "fffaf0",
        forestgreen: "228b22",
        fuchsia: "f0f",
        gainsboro: "dcdcdc",
        ghostwhite: "f8f8ff",
        gold: "ffd700",
        goldenrod: "daa520",
        gray: "808080",
        green: "008000",
        greenyellow: "adff2f",
        grey: "808080",
        honeydew: "f0fff0",
        hotpink: "ff69b4",
        indianred: "cd5c5c",
        indigo: "4b0082",
        ivory: "fffff0",
        khaki: "f0e68c",
        lavender: "e6e6fa",
        lavenderblush: "fff0f5",
        lawngreen: "7cfc00",
        lemonchiffon: "fffacd",
        lightblue: "add8e6",
        lightcoral: "f08080",
        lightcyan: "e0ffff",
        lightgoldenrodyellow: "fafad2",
        lightgray: "d3d3d3",
        lightgreen: "90ee90",
        lightgrey: "d3d3d3",
        lightpink: "ffb6c1",
        lightsalmon: "ffa07a",
        lightseagreen: "20b2aa",
        lightskyblue: "87cefa",
        lightslategray: "789",
        lightslategrey: "789",
        lightsteelblue: "b0c4de",
        lightyellow: "ffffe0",
        lime: "0f0",
        limegreen: "32cd32",
        linen: "faf0e6",
        magenta: "f0f",
        maroon: "800000",
        mediumaquamarine: "66cdaa",
        mediumblue: "0000cd",
        mediumorchid: "ba55d3",
        mediumpurple: "9370db",
        mediumseagreen: "3cb371",
        mediumslateblue: "7b68ee",
        mediumspringgreen: "00fa9a",
        mediumturquoise: "48d1cc",
        mediumvioletred: "c71585",
        midnightblue: "191970",
        mintcream: "f5fffa",
        mistyrose: "ffe4e1",
        moccasin: "ffe4b5",
        navajowhite: "ffdead",
        navy: "000080",
        oldlace: "fdf5e6",
        olive: "808000",
        olivedrab: "6b8e23",
        orange: "ffa500",
        orangered: "ff4500",
        orchid: "da70d6",
        palegoldenrod: "eee8aa",
        palegreen: "98fb98",
        paleturquoise: "afeeee",
        palevioletred: "db7093",
        papayawhip: "ffefd5",
        peachpuff: "ffdab9",
        peru: "cd853f",
        pink: "ffc0cb",
        plum: "dda0dd",
        powderblue: "b0e0e6",
        purple: "800080",
        rebeccapurple: "663399",
        red: "f00",
        rosybrown: "bc8f8f",
        royalblue: "4169e1",
        saddlebrown: "8b4513",
        salmon: "fa8072",
        sandybrown: "f4a460",
        seagreen: "2e8b57",
        seashell: "fff5ee",
        sienna: "a0522d",
        silver: "c0c0c0",
        skyblue: "87ceeb",
        slateblue: "6a5acd",
        slategray: "708090",
        slategrey: "708090",
        snow: "fffafa",
        springgreen: "00ff7f",
        steelblue: "4682b4",
        tan: "d2b48c",
        teal: "008080",
        thistle: "d8bfd8",
        tomato: "ff6347",
        turquoise: "40e0d0",
        violet: "ee82ee",
        wheat: "f5deb3",
        white: "fff",
        whitesmoke: "f5f5f5",
        yellow: "ff0",
        yellowgreen: "9acd32"
      };
      var hexNames = tinycolor.hexNames = flip(names);
      function flip(o) {
        var flipped = {};
        for (var i in o) {
          if (o.hasOwnProperty(i)) {
            flipped[o[i]] = i;
          }
        }
        return flipped;
      }
      function boundAlpha(a) {
        a = parseFloat(a);
        if (isNaN(a) || a < 0 || a > 1) {
          a = 1;
        }
        return a;
      }
      function bound01(n, max) {
        if (isOnePointZero(n)) {
          n = "100%";
        }
        var processPercent = isPercentage(n);
        n = mathMin(max, mathMax(0, parseFloat(n)));
        if (processPercent) {
          n = parseInt(n * max, 10) / 100;
        }
        if (Math2.abs(n - max) < 1e-6) {
          return 1;
        }
        return n % max / parseFloat(max);
      }
      function clamp01(val) {
        return mathMin(1, mathMax(0, val));
      }
      function parseIntFromHex(val) {
        return parseInt(val, 16);
      }
      function isOnePointZero(n) {
        return typeof n == "string" && n.indexOf(".") != -1 && parseFloat(n) === 1;
      }
      function isPercentage(n) {
        return typeof n === "string" && n.indexOf("%") != -1;
      }
      function pad2(c) {
        return c.length == 1 ? "0" + c : "" + c;
      }
      function convertToPercentage(n) {
        if (n <= 1) {
          n = n * 100 + "%";
        }
        return n;
      }
      function convertDecimalToHex(d) {
        return Math2.round(parseFloat(d) * 255).toString(16);
      }
      function convertHexToDecimal(h) {
        return parseIntFromHex(h) / 255;
      }
      var matchers = function() {
        var CSS_INTEGER = "[-\\+]?\\d+%?";
        var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";
        var CSS_UNIT = "(?:" + CSS_NUMBER + ")|(?:" + CSS_INTEGER + ")";
        var PERMISSIVE_MATCH3 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
        var PERMISSIVE_MATCH4 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
        return {
          CSS_UNIT: new RegExp(CSS_UNIT),
          rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
          rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
          hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
          hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
          hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
          hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
          hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
          hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
          hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
          hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
        };
      }();
      function isValidCSSUnit(color) {
        return !!matchers.CSS_UNIT.exec(color);
      }
      function stringInputToObject(color) {
        color = color.replace(trimLeft, "").replace(trimRight, "").toLowerCase();
        var named = false;
        if (names[color]) {
          color = names[color];
          named = true;
        } else if (color == "transparent") {
          return {r: 0, g: 0, b: 0, a: 0, format: "name"};
        }
        var match;
        if (match = matchers.rgb.exec(color)) {
          return {r: match[1], g: match[2], b: match[3]};
        }
        if (match = matchers.rgba.exec(color)) {
          return {r: match[1], g: match[2], b: match[3], a: match[4]};
        }
        if (match = matchers.hsl.exec(color)) {
          return {h: match[1], s: match[2], l: match[3]};
        }
        if (match = matchers.hsla.exec(color)) {
          return {h: match[1], s: match[2], l: match[3], a: match[4]};
        }
        if (match = matchers.hsv.exec(color)) {
          return {h: match[1], s: match[2], v: match[3]};
        }
        if (match = matchers.hsva.exec(color)) {
          return {h: match[1], s: match[2], v: match[3], a: match[4]};
        }
        if (match = matchers.hex8.exec(color)) {
          return {
            r: parseIntFromHex(match[1]),
            g: parseIntFromHex(match[2]),
            b: parseIntFromHex(match[3]),
            a: convertHexToDecimal(match[4]),
            format: named ? "name" : "hex8"
          };
        }
        if (match = matchers.hex6.exec(color)) {
          return {
            r: parseIntFromHex(match[1]),
            g: parseIntFromHex(match[2]),
            b: parseIntFromHex(match[3]),
            format: named ? "name" : "hex"
          };
        }
        if (match = matchers.hex4.exec(color)) {
          return {
            r: parseIntFromHex(match[1] + "" + match[1]),
            g: parseIntFromHex(match[2] + "" + match[2]),
            b: parseIntFromHex(match[3] + "" + match[3]),
            a: convertHexToDecimal(match[4] + "" + match[4]),
            format: named ? "name" : "hex8"
          };
        }
        if (match = matchers.hex3.exec(color)) {
          return {
            r: parseIntFromHex(match[1] + "" + match[1]),
            g: parseIntFromHex(match[2] + "" + match[2]),
            b: parseIntFromHex(match[3] + "" + match[3]),
            format: named ? "name" : "hex"
          };
        }
        return false;
      }
      function validateWCAG2Parms(parms) {
        var level, size;
        parms = parms || {level: "AA", size: "small"};
        level = (parms.level || "AA").toUpperCase();
        size = (parms.size || "small").toLowerCase();
        if (level !== "AA" && level !== "AAA") {
          level = "AA";
        }
        if (size !== "small" && size !== "large") {
          size = "small";
        }
        return {level, size};
      }
      if (typeof module !== "undefined" && module.exports) {
        module.exports = tinycolor;
      } else if (typeof define === "function" && define.amd) {
        define(function() {
          return tinycolor;
        });
      } else {
        window.tinycolor = tinycolor;
      }
    })(Math);
  });

  // node_modules/tinygradient/browser.js
  var require_browser = __commonJS((exports, module) => {
    /*!
     * tinygradient (v1.1.2)
     * @copyright 2014-2020 Damien "Mistic" Sorel <contact@git.strangeplanet.fr>
     * @licence MIT
     */
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory(require_tinycolor()) : typeof define === "function" && define.amd ? define(["tinycolor2"], factory) : (global = global || self, global.tinygradient = factory(global.tinycolor));
    })(exports, function(tinycolor2) {
      "use strict";
      tinycolor2 = tinycolor2 && tinycolor2.hasOwnProperty("default") ? tinycolor2["default"] : tinycolor2;
      var RGBA_MAX = {
        r: 256,
        g: 256,
        b: 256,
        a: 1
      };
      var HSVA_MAX = {
        h: 360,
        s: 1,
        v: 1,
        a: 1
      };
      function stepize(start, end, steps) {
        var step = {};
        for (var k in start) {
          if (start.hasOwnProperty(k)) {
            step[k] = steps === 0 ? 0 : (end[k] - start[k]) / steps;
          }
        }
        return step;
      }
      function interpolate(step, start, i, max) {
        var color = {};
        for (var k in start) {
          if (start.hasOwnProperty(k)) {
            color[k] = step[k] * i + start[k];
            color[k] = color[k] < 0 ? color[k] + max[k] : max[k] !== 1 ? color[k] % max[k] : color[k];
          }
        }
        return color;
      }
      function interpolateRgb(stop1, stop2, steps) {
        var start = stop1.color.toRgb();
        var end = stop2.color.toRgb();
        var step = stepize(start, end, steps);
        var gradient2 = [stop1.color];
        for (var i = 1; i < steps; i++) {
          var color = interpolate(step, start, i, RGBA_MAX);
          gradient2.push(tinycolor2(color));
        }
        return gradient2;
      }
      function interpolateHsv(stop1, stop2, steps, mode) {
        var start = stop1.color.toHsv();
        var end = stop2.color.toHsv();
        if (start.s === 0 || end.s === 0) {
          return interpolateRgb(stop1, stop2, steps);
        }
        var trigonometric;
        if (typeof mode === "boolean") {
          trigonometric = mode;
        } else {
          var trigShortest = start.h < end.h && end.h - start.h < 180 || start.h > end.h && start.h - end.h > 180;
          trigonometric = mode === "long" && trigShortest || mode === "short" && !trigShortest;
        }
        var step = stepize(start, end, steps);
        var gradient2 = [stop1.color];
        var diff;
        if (start.h <= end.h && !trigonometric || start.h >= end.h && trigonometric) {
          diff = end.h - start.h;
        } else if (trigonometric) {
          diff = 360 - end.h + start.h;
        } else {
          diff = 360 - start.h + end.h;
        }
        step.h = Math.pow(-1, trigonometric ? 1 : 0) * Math.abs(diff) / steps;
        for (var i = 1; i < steps; i++) {
          var color = interpolate(step, start, i, HSVA_MAX);
          gradient2.push(tinycolor2(color));
        }
        return gradient2;
      }
      function computeSubsteps(stops, steps) {
        var l = stops.length;
        steps = parseInt(steps, 10);
        if (isNaN(steps) || steps < 2) {
          throw new Error("Invalid number of steps (< 2)");
        }
        if (steps < l) {
          throw new Error("Number of steps cannot be inferior to number of stops");
        }
        var substeps = [];
        for (var i = 1; i < l; i++) {
          var step = (steps - 1) * (stops[i].pos - stops[i - 1].pos);
          substeps.push(Math.max(1, Math.round(step)));
        }
        var totalSubsteps = 1;
        for (var n = l - 1; n--; ) {
          totalSubsteps += substeps[n];
        }
        while (totalSubsteps !== steps) {
          if (totalSubsteps < steps) {
            var min = Math.min.apply(null, substeps);
            substeps[substeps.indexOf(min)]++;
            totalSubsteps++;
          } else {
            var max = Math.max.apply(null, substeps);
            substeps[substeps.indexOf(max)]--;
            totalSubsteps--;
          }
        }
        return substeps;
      }
      function computeAt(stops, pos, method, max) {
        if (pos < 0 || pos > 1) {
          throw new Error("Position must be between 0 and 1");
        }
        var start, end;
        for (var i = 0, l = stops.length; i < l - 1; i++) {
          if (pos >= stops[i].pos && pos < stops[i + 1].pos) {
            start = stops[i];
            end = stops[i + 1];
            break;
          }
        }
        if (!start) {
          start = end = stops[stops.length - 1];
        }
        var step = stepize(start.color[method](), end.color[method](), (end.pos - start.pos) * 100);
        var color = interpolate(step, start.color[method](), Math.round((pos - start.pos) * 100), max);
        return tinycolor2(color);
      }
      var TinyGradient = /* @__PURE__ */ function() {
        function TinyGradient2(stops) {
          if (stops.length < 2) {
            throw new Error("Invalid number of stops (< 2)");
          }
          var havingPositions = stops[0].pos !== void 0;
          var l = stops.length;
          var p = -1;
          var lastColorLess = false;
          this.stops = stops.map(function(stop, i) {
            var hasPosition = stop.pos !== void 0;
            if (havingPositions ^ hasPosition) {
              throw new Error("Cannot mix positionned and not posionned color stops");
            }
            if (hasPosition) {
              var hasColor = stop.color !== void 0;
              if (!hasColor && (lastColorLess || i === 0 || i === l - 1)) {
                throw new Error("Cannot define two consecutive position-only stops");
              }
              lastColorLess = !hasColor;
              stop = {
                color: hasColor ? tinycolor2(stop.color) : null,
                colorLess: !hasColor,
                pos: stop.pos
              };
              if (stop.pos < 0 || stop.pos > 1) {
                throw new Error("Color stops positions must be between 0 and 1");
              } else if (stop.pos <= p) {
                throw new Error("Color stops positions are not ordered");
              }
              p = stop.pos;
            } else {
              stop = {
                color: tinycolor2(stop.color !== void 0 ? stop.color : stop),
                pos: i / (l - 1)
              };
            }
            return stop;
          });
          if (this.stops[0].pos !== 0) {
            this.stops.unshift({
              color: this.stops[0].color,
              pos: 0
            });
            l++;
          }
          if (this.stops[l - 1].pos !== 1) {
            this.stops.push({
              color: this.stops[l - 1].color,
              pos: 1
            });
          }
        }
        var _proto = TinyGradient2.prototype;
        _proto.reverse = function reverse() {
          var stops = [];
          this.stops.forEach(function(stop) {
            stops.push({
              color: stop.color,
              pos: 1 - stop.pos
            });
          });
          return new TinyGradient2(stops.reverse());
        };
        _proto.loop = function loop() {
          var stops1 = [];
          var stops2 = [];
          this.stops.forEach(function(stop) {
            stops1.push({
              color: stop.color,
              pos: stop.pos / 2
            });
          });
          this.stops.slice(0, -1).forEach(function(stop) {
            stops2.push({
              color: stop.color,
              pos: 1 - stop.pos / 2
            });
          });
          return new TinyGradient2(stops1.concat(stops2.reverse()));
        };
        _proto.rgb = function rgb(steps) {
          var _this = this;
          var substeps = computeSubsteps(this.stops, steps);
          var gradient2 = [];
          this.stops.forEach(function(stop, i2) {
            if (stop.colorLess) {
              stop.color = interpolateRgb(_this.stops[i2 - 1], _this.stops[i2 + 1], 2)[1];
            }
          });
          for (var i = 0, l = this.stops.length; i < l - 1; i++) {
            var rgb2 = interpolateRgb(this.stops[i], this.stops[i + 1], substeps[i]);
            gradient2.splice.apply(gradient2, [gradient2.length, 0].concat(rgb2));
          }
          gradient2.push(this.stops[this.stops.length - 1].color);
          return gradient2;
        };
        _proto.hsv = function hsv(steps, mode) {
          var _this2 = this;
          var substeps = computeSubsteps(this.stops, steps);
          var gradient2 = [];
          this.stops.forEach(function(stop, i2) {
            if (stop.colorLess) {
              stop.color = interpolateHsv(_this2.stops[i2 - 1], _this2.stops[i2 + 1], 2, mode)[1];
            }
          });
          for (var i = 0, l = this.stops.length; i < l - 1; i++) {
            var hsv2 = interpolateHsv(this.stops[i], this.stops[i + 1], substeps[i], mode);
            gradient2.splice.apply(gradient2, [gradient2.length, 0].concat(hsv2));
          }
          gradient2.push(this.stops[this.stops.length - 1].color);
          return gradient2;
        };
        _proto.css = function css(mode, direction) {
          mode = mode || "linear";
          direction = direction || (mode === "linear" ? "to right" : "ellipse at center");
          var css2 = mode + "-gradient(" + direction;
          this.stops.forEach(function(stop) {
            css2 += ", " + (stop.colorLess ? "" : stop.color.toRgbString() + " ") + stop.pos * 100 + "%";
          });
          css2 += ")";
          return css2;
        };
        _proto.rgbAt = function rgbAt(pos) {
          return computeAt(this.stops, pos, "toRgb", RGBA_MAX);
        };
        _proto.hsvAt = function hsvAt(pos) {
          return computeAt(this.stops, pos, "toHsv", HSVA_MAX);
        };
        return TinyGradient2;
      }();
      var tinygradient2 = function tinygradient3(stops) {
        if (arguments.length === 1) {
          if (!(arguments[0] instanceof Array)) {
            throw new Error('"stops" is not an array');
          }
          stops = arguments[0];
        } else {
          stops = Array.prototype.slice.call(arguments);
        }
        return new TinyGradient(stops);
      };
      return tinygradient2;
    });
  });

  // node_modules/dayjs/dayjs.min.js
  var require_dayjs_min = __commonJS((exports, module) => {
    !function(t, e) {
      typeof exports == "object" && typeof module != "undefined" ? module.exports = e() : typeof define == "function" && define.amd ? define(e) : t.dayjs = e();
    }(exports, function() {
      "use strict";
      var t = "millisecond", e = "second", n = "minute", r = "hour", i = "day", s = "week", u = "month", a = "quarter", o = "year", f = "date", h = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, c = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, d = {name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_")}, $ = function(t2, e2, n2) {
        var r2 = String(t2);
        return !r2 || r2.length >= e2 ? t2 : "" + Array(e2 + 1 - r2.length).join(n2) + t2;
      }, l = {s: $, z: function(t2) {
        var e2 = -t2.utcOffset(), n2 = Math.abs(e2), r2 = Math.floor(n2 / 60), i2 = n2 % 60;
        return (e2 <= 0 ? "+" : "-") + $(r2, 2, "0") + ":" + $(i2, 2, "0");
      }, m: function t2(e2, n2) {
        if (e2.date() < n2.date())
          return -t2(n2, e2);
        var r2 = 12 * (n2.year() - e2.year()) + (n2.month() - e2.month()), i2 = e2.clone().add(r2, u), s2 = n2 - i2 < 0, a2 = e2.clone().add(r2 + (s2 ? -1 : 1), u);
        return +(-(r2 + (n2 - i2) / (s2 ? i2 - a2 : a2 - i2)) || 0);
      }, a: function(t2) {
        return t2 < 0 ? Math.ceil(t2) || 0 : Math.floor(t2);
      }, p: function(h2) {
        return {M: u, y: o, w: s, d: i, D: f, h: r, m: n, s: e, ms: t, Q: a}[h2] || String(h2 || "").toLowerCase().replace(/s$/, "");
      }, u: function(t2) {
        return t2 === void 0;
      }}, y = "en", M = {};
      M[y] = d;
      var m = function(t2) {
        return t2 instanceof S;
      }, D = function(t2, e2, n2) {
        var r2;
        if (!t2)
          return y;
        if (typeof t2 == "string")
          M[t2] && (r2 = t2), e2 && (M[t2] = e2, r2 = t2);
        else {
          var i2 = t2.name;
          M[i2] = t2, r2 = i2;
        }
        return !n2 && r2 && (y = r2), r2 || !n2 && y;
      }, v = function(t2, e2) {
        if (m(t2))
          return t2.clone();
        var n2 = typeof e2 == "object" ? e2 : {};
        return n2.date = t2, n2.args = arguments, new S(n2);
      }, g = l;
      g.l = D, g.i = m, g.w = function(t2, e2) {
        return v(t2, {locale: e2.$L, utc: e2.$u, x: e2.$x, $offset: e2.$offset});
      };
      var S = function() {
        function d2(t2) {
          this.$L = D(t2.locale, null, true), this.parse(t2);
        }
        var $2 = d2.prototype;
        return $2.parse = function(t2) {
          this.$d = function(t3) {
            var e2 = t3.date, n2 = t3.utc;
            if (e2 === null)
              return new Date(NaN);
            if (g.u(e2))
              return new Date();
            if (e2 instanceof Date)
              return new Date(e2);
            if (typeof e2 == "string" && !/Z$/i.test(e2)) {
              var r2 = e2.match(h);
              if (r2) {
                var i2 = r2[2] - 1 || 0, s2 = (r2[7] || "0").substring(0, 3);
                return n2 ? new Date(Date.UTC(r2[1], i2, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2)) : new Date(r2[1], i2, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2);
              }
            }
            return new Date(e2);
          }(t2), this.$x = t2.x || {}, this.init();
        }, $2.init = function() {
          var t2 = this.$d;
          this.$y = t2.getFullYear(), this.$M = t2.getMonth(), this.$D = t2.getDate(), this.$W = t2.getDay(), this.$H = t2.getHours(), this.$m = t2.getMinutes(), this.$s = t2.getSeconds(), this.$ms = t2.getMilliseconds();
        }, $2.$utils = function() {
          return g;
        }, $2.isValid = function() {
          return !(this.$d.toString() === "Invalid Date");
        }, $2.isSame = function(t2, e2) {
          var n2 = v(t2);
          return this.startOf(e2) <= n2 && n2 <= this.endOf(e2);
        }, $2.isAfter = function(t2, e2) {
          return v(t2) < this.startOf(e2);
        }, $2.isBefore = function(t2, e2) {
          return this.endOf(e2) < v(t2);
        }, $2.$g = function(t2, e2, n2) {
          return g.u(t2) ? this[e2] : this.set(n2, t2);
        }, $2.unix = function() {
          return Math.floor(this.valueOf() / 1e3);
        }, $2.valueOf = function() {
          return this.$d.getTime();
        }, $2.startOf = function(t2, a2) {
          var h2 = this, c2 = !!g.u(a2) || a2, d3 = g.p(t2), $3 = function(t3, e2) {
            var n2 = g.w(h2.$u ? Date.UTC(h2.$y, e2, t3) : new Date(h2.$y, e2, t3), h2);
            return c2 ? n2 : n2.endOf(i);
          }, l2 = function(t3, e2) {
            return g.w(h2.toDate()[t3].apply(h2.toDate("s"), (c2 ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(e2)), h2);
          }, y2 = this.$W, M2 = this.$M, m2 = this.$D, D2 = "set" + (this.$u ? "UTC" : "");
          switch (d3) {
            case o:
              return c2 ? $3(1, 0) : $3(31, 11);
            case u:
              return c2 ? $3(1, M2) : $3(0, M2 + 1);
            case s:
              var v2 = this.$locale().weekStart || 0, S2 = (y2 < v2 ? y2 + 7 : y2) - v2;
              return $3(c2 ? m2 - S2 : m2 + (6 - S2), M2);
            case i:
            case f:
              return l2(D2 + "Hours", 0);
            case r:
              return l2(D2 + "Minutes", 1);
            case n:
              return l2(D2 + "Seconds", 2);
            case e:
              return l2(D2 + "Milliseconds", 3);
            default:
              return this.clone();
          }
        }, $2.endOf = function(t2) {
          return this.startOf(t2, false);
        }, $2.$set = function(s2, a2) {
          var h2, c2 = g.p(s2), d3 = "set" + (this.$u ? "UTC" : ""), $3 = (h2 = {}, h2[i] = d3 + "Date", h2[f] = d3 + "Date", h2[u] = d3 + "Month", h2[o] = d3 + "FullYear", h2[r] = d3 + "Hours", h2[n] = d3 + "Minutes", h2[e] = d3 + "Seconds", h2[t] = d3 + "Milliseconds", h2)[c2], l2 = c2 === i ? this.$D + (a2 - this.$W) : a2;
          if (c2 === u || c2 === o) {
            var y2 = this.clone().set(f, 1);
            y2.$d[$3](l2), y2.init(), this.$d = y2.set(f, Math.min(this.$D, y2.daysInMonth())).$d;
          } else
            $3 && this.$d[$3](l2);
          return this.init(), this;
        }, $2.set = function(t2, e2) {
          return this.clone().$set(t2, e2);
        }, $2.get = function(t2) {
          return this[g.p(t2)]();
        }, $2.add = function(t2, a2) {
          var f2, h2 = this;
          t2 = Number(t2);
          var c2 = g.p(a2), d3 = function(e2) {
            var n2 = v(h2);
            return g.w(n2.date(n2.date() + Math.round(e2 * t2)), h2);
          };
          if (c2 === u)
            return this.set(u, this.$M + t2);
          if (c2 === o)
            return this.set(o, this.$y + t2);
          if (c2 === i)
            return d3(1);
          if (c2 === s)
            return d3(7);
          var $3 = (f2 = {}, f2[n] = 6e4, f2[r] = 36e5, f2[e] = 1e3, f2)[c2] || 1, l2 = this.$d.getTime() + t2 * $3;
          return g.w(l2, this);
        }, $2.subtract = function(t2, e2) {
          return this.add(-1 * t2, e2);
        }, $2.format = function(t2) {
          var e2 = this;
          if (!this.isValid())
            return "Invalid Date";
          var n2 = t2 || "YYYY-MM-DDTHH:mm:ssZ", r2 = g.z(this), i2 = this.$locale(), s2 = this.$H, u2 = this.$m, a2 = this.$M, o2 = i2.weekdays, f2 = i2.months, h2 = function(t3, r3, i3, s3) {
            return t3 && (t3[r3] || t3(e2, n2)) || i3[r3].substr(0, s3);
          }, d3 = function(t3) {
            return g.s(s2 % 12 || 12, t3, "0");
          }, $3 = i2.meridiem || function(t3, e3, n3) {
            var r3 = t3 < 12 ? "AM" : "PM";
            return n3 ? r3.toLowerCase() : r3;
          }, l2 = {YY: String(this.$y).slice(-2), YYYY: this.$y, M: a2 + 1, MM: g.s(a2 + 1, 2, "0"), MMM: h2(i2.monthsShort, a2, f2, 3), MMMM: h2(f2, a2), D: this.$D, DD: g.s(this.$D, 2, "0"), d: String(this.$W), dd: h2(i2.weekdaysMin, this.$W, o2, 2), ddd: h2(i2.weekdaysShort, this.$W, o2, 3), dddd: o2[this.$W], H: String(s2), HH: g.s(s2, 2, "0"), h: d3(1), hh: d3(2), a: $3(s2, u2, true), A: $3(s2, u2, false), m: String(u2), mm: g.s(u2, 2, "0"), s: String(this.$s), ss: g.s(this.$s, 2, "0"), SSS: g.s(this.$ms, 3, "0"), Z: r2};
          return n2.replace(c, function(t3, e3) {
            return e3 || l2[t3] || r2.replace(":", "");
          });
        }, $2.utcOffset = function() {
          return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
        }, $2.diff = function(t2, f2, h2) {
          var c2, d3 = g.p(f2), $3 = v(t2), l2 = 6e4 * ($3.utcOffset() - this.utcOffset()), y2 = this - $3, M2 = g.m(this, $3);
          return M2 = (c2 = {}, c2[o] = M2 / 12, c2[u] = M2, c2[a] = M2 / 3, c2[s] = (y2 - l2) / 6048e5, c2[i] = (y2 - l2) / 864e5, c2[r] = y2 / 36e5, c2[n] = y2 / 6e4, c2[e] = y2 / 1e3, c2)[d3] || y2, h2 ? M2 : g.a(M2);
        }, $2.daysInMonth = function() {
          return this.endOf(u).$D;
        }, $2.$locale = function() {
          return M[this.$L];
        }, $2.locale = function(t2, e2) {
          if (!t2)
            return this.$L;
          var n2 = this.clone(), r2 = D(t2, e2, true);
          return r2 && (n2.$L = r2), n2;
        }, $2.clone = function() {
          return g.w(this.$d, this);
        }, $2.toDate = function() {
          return new Date(this.valueOf());
        }, $2.toJSON = function() {
          return this.isValid() ? this.toISOString() : null;
        }, $2.toISOString = function() {
          return this.$d.toISOString();
        }, $2.toString = function() {
          return this.$d.toUTCString();
        }, d2;
      }(), p = S.prototype;
      return v.prototype = p, [["$ms", t], ["$s", e], ["$m", n], ["$H", r], ["$W", i], ["$M", u], ["$y", o], ["$D", f]].forEach(function(t2) {
        p[t2[1]] = function(e2) {
          return this.$g(e2, t2[0], t2[1]);
        };
      }), v.extend = function(t2, e2) {
        return t2.$i || (t2(e2, S, v), t2.$i = true), v;
      }, v.locale = D, v.isDayjs = m, v.unix = function(t2) {
        return v(1e3 * t2);
      }, v.en = M[y], v.Ls = M, v.p = {}, v;
    });
  });

  // modules/convert/index.js
  var import_togeojson = __toModule(require_togeojson_umd());
  var import_geolib = __toModule(require_es());
  var toLL = (COORD) => {
    return {latitude: COORD[1], longitude: COORD[0]};
  };
  var getDistances = (COORDS) => {
    const DISTS = {
      totalLength: 0,
      route: []
    };
    for (let i = 1; i < COORDS.length; i++) {
      const dist = (0, import_geolib.getDistance)(toLL(COORDS[i - 1]), toLL(COORDS[i]));
      if (dist > 0) {
        DISTS.totalLength += dist;
        DISTS.route.push(dist);
      }
    }
    return DISTS;
  };
  var getTimeDiff = (times) => {
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
  };
  var getSpeeds = (route, times) => {
    const DISTANCES = getDistances(route);
    const TIME_DIFF = getTimeDiff(times);
    const SPEEDS = [];
    let i = 0;
    for (const DISTANCE of DISTANCES.route) {
      const HOURS = TIME_DIFF[i++] / 1e3 / 60 / 60;
      const SPEED = HOURS > 0 && DISTANCE > 0 ? DISTANCE / 1e3 / HOURS : 0;
      SPEEDS.push(SPEED >= 0 && SPEED < 1e4 ? Math.round(SPEED) : 0);
    }
    return SPEEDS;
  };
  var convertFromInput = (TEXT) => {
    const GPX_TXT = (0, import_togeojson.gpx)(new DOMParser().parseFromString(TEXT, "text/xml"));
    const ROUTE = {};
    ROUTE.coords = GPX_TXT.features[0].geometry.coordinates;
    ROUTE.times = GPX_TXT.features[0].properties.coordTimes;
    ROUTE.speeds = getSpeeds(ROUTE.coords, ROUTE.times);
    ROUTE.distances = getDistances(ROUTE.coords);
    ROUTE.maxSpeed = 200;
    return ROUTE;
  };
  var convertGpx = async (FILENAME) => {
    const RES = await fetch(FILENAME);
    const GPX_TXT = (0, import_togeojson.gpx)(new DOMParser().parseFromString(await RES.text(), "text/xml"));
    const ROUTE = {};
    ROUTE.coords = GPX_TXT.features[0].geometry.coordinates;
    ROUTE.times = GPX_TXT.features[0].properties.coordTimes;
    ROUTE.speeds = getSpeeds(ROUTE.coords, ROUTE.times);
    ROUTE.distances = getDistances(ROUTE.coords);
    ROUTE.maxSpeed = 200;
    return ROUTE;
  };

  // modules/route/color.js
  var import_tinygradient = __toModule(require_browser());
  var gradient = (0, import_tinygradient.default)([
    {color: "purple", pos: 0},
    {color: "blue", pos: 0.2},
    {color: "green", pos: 0.4},
    {color: "yellow", pos: 0.6},
    {color: "orange", pos: 0.8},
    {color: "red", pos: 1}
  ]);
  var getColor = (pos) => {
    return `#${gradient.hsvAt(pos).toHex()}`;
  };
  var getColors = (maxSpeed) => {
    const COLORS = [];
    for (let speed = 0; speed < maxSpeed; speed++) {
      const POSITION = speed / maxSpeed;
      const COLOR = getColor(POSITION);
      COLORS.push(COLOR);
    }
    return COLORS;
  };
  var setGradient = (GRADIENT) => {
    gradient = (0, import_tinygradient.default)(GRADIENT);
  };
  var setGradientFromSpeed = (GRADIENT) => {
    const MAX = [...GRADIENT].pop().pos;
    const newGradient = [];
    for (const ITEM of GRADIENT) {
      console.log(ITEM);
      const pos = ITEM.pos > 0 ? ITEM.pos / MAX : 0;
      const color = ITEM.color;
      console.log(pos);
      newGradient.push({color, pos});
    }
    gradient = (0, import_tinygradient.default)(newGradient);
  };

  // modules/route/index.js
  var MAX_SPEED = 30;
  var setMaxSpeed = (SPEED) => {
    MAX_SPEED = SPEED;
  };
  var getStops = (distances, speeds) => {
    const stops = [];
    let routeLength = 0;
    let o = 0;
    const myColor = getColors(MAX_SPEED + 1);
    for (const LENGTH of distances.route) {
      const SPEED = speeds[o++];
      const ARR_NR = SPEED >= MAX_SPEED ? MAX_SPEED : SPEED;
      routeLength += LENGTH;
      const STOP = routeLength / distances.totalLength;
      stops.push(STOP, myColor[ARR_NR]);
    }
    return stops;
  };
  var colorRoute = (route = {}) => {
    console.log(route);
    const STOPS = getStops(route.distances, route.speeds);
    const geojson = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {},
          geometry: {
            coordinates: route.coords,
            type: "LineString"
          }
        }
      ]
    };
    map.addSource("color-route", {
      type: "geojson",
      lineMetrics: true,
      data: geojson
    });
    const GRADIENT = [
      "interpolate",
      ["linear"],
      ["line-progress"],
      ...STOPS
    ];
    map.addLayer({
      type: "line",
      source: "color-route",
      id: "line",
      paint: {
        "line-color": "red",
        "line-width": 6,
        "line-gradient": GRADIENT
      },
      layout: {
        "line-cap": "round",
        "line-join": "round"
      }
    });
  };

  // modules/points/index.js
  var import_dayjs = __toModule(require_dayjs_min());
  var TIME_FORMAT;
  var getFeature = (lnglat, time) => {
    return {
      type: "Feature",
      geometry: {type: "Point", coordinates: lnglat},
      properties: {time: (0, import_dayjs.default)(time).format(TIME_FORMAT)}
    };
  };
  var DUMMY = [
    getFeature([-77.03238901390978, 38.913188059745586]),
    getFeature([-122.414, 37.776])
  ];
  var plotPoints = (route, timeFormat = "HH:mm.ss") => {
    TIME_FORMAT = timeFormat;
    let FEATS = [];
    let i = 0;
    for (const COORD of route.coords) {
      FEATS.push(getFeature(COORD, route.times[i++]));
    }
    map.addSource("points", {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: FEATS
      }
    });
    map.addLayer({
      id: "points",
      type: "circle",
      source: "points",
      paint: {
        "circle-radius": 3,
        "circle-color": "#fff"
      },
      minzoom: 16,
      filter: ["==", "$type", "Point"]
    });
    map.addLayer({
      id: "points-text",
      type: "symbol",
      source: "points",
      layout: {
        "text-field": ["get", "time"],
        "text-font": [
          "Open Sans Semibold",
          "Arial Unicode MS Bold"
        ],
        "text-padding": 36,
        "text-size": 10,
        "text-offset": [1, 0],
        "text-anchor": "left"
      }
    });
  };

  // index.js
  mapboxgl.accessToken = "pk.eyJ1Ijoiem91dGVwb3Bjb3JuIiwiYSI6ImNqaDRxem9sNDE1Zmwyd2xuZG1iYTl0OXcifQ.r4qZMpEbr2FoCN4sd97kDw";
  var CENTER = [13.88, 46.37];
  var map2 = window.map = new mapboxgl.Map({
    container: "map",
    center: CENTER,
    style: "mapbox://styles/mapbox/light-v10",
    zoom: 12
  });
  var handleFiles = async (files) => {
    console.log("files ", files);
    const file = document.getElementById("addGpx").files[0];
    if (file) {
      var reader = new FileReader();
      reader.readAsText(file, "UTF-8");
      reader.onload = function(evt) {
        console.log(evt.target.result);
        const hike = convertFromInput(evt.target.result);
        console.log("hike ", hike);
        setGradient([
          {color: "purple", pos: 0},
          {color: "blue", pos: 0.2},
          {color: "green", pos: 0.25},
          {color: "yellow", pos: 0.3},
          {color: "orange", pos: 0.4},
          {color: "red", pos: 1}
        ]);
        setMaxSpeed(70);
        colorRoute(hike);
        plotPoints(hike);
      };
      reader.onerror = function(evt) {
        document.getElementById("fileContents").innerHTML = "error reading file";
      };
    }
    console.log("GPX ", file);
  };
  var inputElement = document.getElementById("addGpx");
  inputElement.addEventListener("change", handleFiles, false);
  var plotRoute = async () => {
    const hike = await convertGpx("routes/hike.gpx");
    setGradientFromSpeed([
      {color: "purple", pos: 0},
      {color: "blue", pos: 10},
      {color: "green", pos: 15},
      {color: "yellow", pos: 25},
      {color: "orange", pos: 30},
      {color: "red", pos: 80}
    ]);
    setMaxSpeed(70);
    colorRoute(hike);
    plotPoints(hike);
  };
  map2.on("load", async () => {
    await plotRoute();
  });
})();
