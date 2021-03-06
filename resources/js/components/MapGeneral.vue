<template>
    <div style="height: 95vh; width: 100%">
        <l-map
            v-if="showMap"
            :zoom="zoom"
            :center="center"
            :options="mapOptions"
            style="height: 100%; width: 100%"
            @update:center="centerUpdate"
            @update:zoom="zoomUpdate"
        >
            <l-tile-layer
                :url="url"
                :attribution="attribution"
            />
            <l-geo-json
                v-if="floodLevel >= 3"
                :key="changeGeoJson+2"
                :geojson="require('./ncr_var1_250m_intersection.json')"
                :options="options"
                :options-style="geoJsonStyleFunction1"
            />
            <l-geo-json
                v-if="floodLevel >= 2"
                :key="changeGeoJson+1"
                :geojson="require('./ncr_var2_250m_intersection.json')"
                :options="options"
                :options-style="geoJsonStyleFunction2"
            />
            <l-geo-json
                v-if="floodLevel >= 1"
                :key="changeGeoJson"
                :geojson="require('./ncr_var3_250m_intersection.json')"
                :options="options"
                :options-style="geoJsonStyleFunction3"
            />
            <!-- <l-geo-json
                v-if="showEvacuationCenters"
                :geojson="require('./ncr_evac.json')"
                :options="evacOptions"
            /> -->
            <l-marker
                v-for="evacPoint in evacPoints"
                :key="evacPoint[1]"
                :lat-lng="evacPoint[0]"
            >
                <l-icon
                    icon-url="https://drive.google.com/uc?id=1GsXWLN1d5aX7UjaG4wfjUHThNQz5DYkp"
                ></l-icon>
                <l-popup>
                    {{ evacPoint[1] }}
                </l-popup>
            </l-marker>
        </l-map>
    </div>
</template>

<script>
    import { latLng, icon, marker } from "leaflet";
    import { LMap, LTileLayer, LMarker, LPopup, LTooltip, LGeoJson, LIcon } from "vue2-leaflet";
    import 'leaflet/dist/leaflet.css';

    var LAT_START = 14.600185;
    var LONG_START = 120.995241;

    export default {
        props: [
            'floodLevel', 'selectedCity', 'showEvacuationCenters'
        ],

        components: {
            LMap,
            LTileLayer,
            LMarker,
            LPopup,
            LTooltip,
            LGeoJson,
            LIcon,
        },

        data() {
            return {
                changeGeoJson: 0,
                zoom: 13.5,
                center: latLng(LAT_START, LONG_START),
                fillColor: "#dddd00",
                url: 'https://api.tiles.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiY2JwYXNjdWFsIiwiYSI6ImNrODNlbnlubDA1MWQzb281b2tvaGM1M2EifQ.lcGIG62j6rN1qyXEgFR3jw',
                attribution:
                    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                currentCenter: latLng(LAT_START, LONG_START),
                showParagraph: false,
                mapOptions: {
                    zoomSnap: 0.5
                },
                loading: false,
                showMap: true,
                evacIcon: icon({
                    iconUrl:'https://drive.google.com/uc?id=1epJ3DRUFK0tdUAcK7h0tzffAthAI-Djd',
                    iconRetinaUrl:'https://drive.google.com/uc?id=1epJ3DRUFK0tdUAcK7h0tzffAthAI-Djd',
                    iconSize:[50,50],
                    iconAnchor:[25,0],
                    popupAnchor: [500,50]
                }),
                evacJson: require('./ncr_evac.json'),
                evacPoints: [],
            };
        },
        computed: {
            options() {
                return {
                    onEachFeature: this.onEachFeatureFunction,
                    filter: (f, l) => {
                        if (this.selectedCity.NAME_2 == "ncr") return true
                        return f.properties.NAME_2 == this.selectedCity.NAME_2 
                    }
                };
            },
            evacOptions() {
                return {
                    pointToLayer: (f, l) => {
                        return marker(l, this.evacIcon)
                    }
                };
            },
            geoJsonStyleFunction3() {
                let fillColor = "#dddd00"; // important! need touch fillColor in computed for re-calculate when change fillColor
                if (this.floodLevel == 2) fillColor = "#dd4400"
                if (this.floodLevel == 3) fillColor = "#dd0000"
                return (feature) => {
                    return {
                        weight: 0,
                        color: fillColor,
                        opacity: 1,
                        fillColor: fillColor,
                        fillOpacity: 0.3
                    };
                };
            },
            geoJsonStyleFunction2() {
                let fillColor = "#dddd00"; // important! need touch fillColor in computed for re-calculate when change fillColor
                if (this.floodLevel == 3) fillColor = "#dd4400"
                return () => {
                    return {
                        weight: 0,
                        color: fillColor,
                        opacity: 1,
                        fillColor: fillColor,
                        fillOpacity: 0.3
                    };
                };
            },
            geoJsonStyleFunction1() {
                let fillColor = "#dddd00"; // important! need touch fillColor in computed for re-calculate when change fillColor
                return () => {
                    return {
                        weight: 0,
                        color: fillColor,
                        opacity: 1,
                        fillColor: fillColor,
                        fillOpacity: 0.3
                    };
                };
            },
            onEachFeatureFunction() {
                if (!this.enableTooltip) {
                    return () => {};
                }
                return (feature, layer) => {
                    layer.bindTooltip(
                        "<div>code:" +
                            feature.properties.code +
                            "</div><div>nom: " +
                            feature.properties.nom +
                            "</div>",
                        { permanent: false, sticky: true }
                    );
                };
            },
        },
        methods: {
            changeCenter() {
                this.center = latLng(this.selectedCity.lat, this.selectedCity.lng)
                this.zoom = this.selectedCity.zoom
            },
            zoomUpdate(zoom) {
                this.currentZoom = zoom;
            },
            centerUpdate(center) {
                this.currentCenter = center;
            },
            showLongText() {
                this.showParagraph = !this.showParagraph;
            },
            innerClick() {
                alert("Click!");
            }
        },
        mounted() {
            for (var i = 0; i < this.evacJson.features.length; ++i) {
                let lng = this.evacJson.features[i].geometry.coordinates[0]
                let lat = this.evacJson.features[i].geometry.coordinates[1]
                this.evacPoints.push([latLng(lat, lng), this.evacJson.features[i].properties.address])
            }
        },
        watch: { 
            selectedCity: function(newVal, oldVal) { // watch it
                this.changeCenter()
                this.changeGeoJson++
            }
        }
    }
</script>