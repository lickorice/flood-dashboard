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
            :geojson="getGeoJson()"
            :options="options"
            :options-style="geoJsonStyleFunction"
        />
        <!-- <l-polygon
            v-for="coords in getAlertLevel()"
            :key="coords[0]"
            :lat-lngs="coords" -->
        ></l-polygon>
            <l-marker :lat-lng="withPopup">
                <l-popup>
                    <div @click="innerClick">
                        I am a popup
                        <p v-show="showParagraph">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                        sed pretium nisl, ut sagittis sapien. Sed vel sollicitudin nisi.
                        Donec finibus semper metus id malesuada.
                        </p>
                    </div>
                </l-popup>
            </l-marker>
        </l-map>
    </div>
</template>

<script>
    import { latLng } from "leaflet";
    import { LMap, LTileLayer, LMarker, LPopup, LTooltip, LGeoJson } from "vue2-leaflet";
    import 'leaflet/dist/leaflet.css';

    var LAT_START = 14.652517;
    var LONG_START = 121.071482;

    export default {
        props: [
            'varLevel',
        ],

        components: {
            LMap,
            LTileLayer,
            LMarker,
            LPopup,
            LTooltip,
            LGeoJson,
        },

        data() {
            return {
                zoom: 14,
                center: latLng(LAT_START, LONG_START),
                fillColor: "#dddd00",
                url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                attribution:
                    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                withPopup: latLng(LAT_START, LONG_START),
                withTooltip: latLng(LAT_START, LONG_START),
                currentZoom: 11.5,
                currentCenter: latLng(LAT_START, LONG_START),
                showParagraph: false,
                mapOptions: {
                    zoomSnap: 0.5
                },
                loading: false,
                showMap: true
            };
        },
        computed: {
            options() {
                return {
                    onEachFeature: this.onEachFeatureFunction
                };
            },
            geoJsonStyleFunction() {
                const fillColor = this.fillColor; // important! need touch fillColor in computed for re-calculate when change fillColor
                return () => {
                    return {
                        weight: 2,
                        color: fillColor,
                        opacity: 1,
                        fillColor: fillColor,
                        fillOpacity: 0.5
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
            getGeoJson() {
                var x = require('./ncr_'+this.varLevel+'_250m_square.json')
                if (this.varLevel == "var3") {
                    this.fillColor = "#dd0000"
                }
                if (this.varLevel == "var2") {
                    this.fillColor = "#dd4400"
                }
                if (this.varLevel == "var1") {
                    this.fillColor = "#dddd00"
                }
                return x
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
            this.getGeoJson()
        }
    }
</script>