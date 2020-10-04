<template>
    <div class="row" style="height: 95vh; width: 100vw">
        <div class="col-4 p-0 m-0 w-100" style="overflow-y: scroll; overflow-x: hidden">
            <div class="row">
                <div class="col mx-4 mt-3">
                    <div class="card mb-2">
                        <div class="card-body">
                            <h3>Select a city:</h3>
                            <select name="" id="" class="custom-select" v-model="selectedCity">
                                <option :value="city" v-for="city in cities" :key="city.NAME_2" :selected="city.NAME_2 == 'ncr'">
                                    {{ city.name }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="card mb-2">
                        <div class="card-body">
                            <h3>Enter flood level:</h3>
                            <div class="custom-control custom-radio custom-control-inline">
                                <input type="radio" id="customRadioInline1" v-model="floodLevel" value="1" class="custom-control-input">
                                <label class="custom-control-label bg-yellow px-1 rounded" for="customRadioInline1">Alert Level (0.5m)</label>
                            </div>
                            <div class="custom-control custom-radio custom-control-inline">
                                <input type="radio" id="customRadioInline2" v-model="floodLevel" value="2" class="custom-control-input">
                                <label class="custom-control-label bg-orange px-1 rounded" for="customRadioInline2">Alarm Level (1.0m)</label>
                            </div>
                            <div class="custom-control custom-radio custom-control-inline">
                                <input type="radio" id="customRadioInline3" v-model="floodLevel" value="3" class="custom-control-input">
                                <label class="custom-control-label bg-red px-1 rounded" for="customRadioInline3">Critical Level (>1.5m)</label>
                            </div>
                        </div>
                    </div>
                    <div class="card" v-if="!selectedCity.isUnselected">
                        <div class="card-body">
                            <h2>Economic impact</h2>
                            <h6>Monthly income affected</h6>
                            <h3>12,835,979.00* Php<span class="font-weight-light" style="font-size: 1rem"> or 124,123 USD</span></h3>
                            <small>*based on estimated income per sq. km (Philippine Statistics Authority)</small>
                            
                            <hr>

                            <h6>Monthly tax collection affected</h6>
                            <h3>12,835,979.00* Php<span class="font-weight-light" style="font-size: 1rem"> or 124,123 USD</span></h3>
                            <small>*based on estimated tax collection per sq. km (Philippine Statistics Authority)</small>
                        </div>
                    </div>
                    <div v-else class="text-muted text-center">
                        Select a region to start calculating...
                    </div>
                </div>
            </div>
        </div>
        <div class="col-8 p-0 m-0">
            <map-general
                :flood-level="floodLevel"
                :selected-city="selectedCity"
            ></map-general>
        </div>
    </div>
</template>

<script>
    export default {
        data: function() {
            return {
                cities: [
                    {NAME_2: "ncr", name: "National Capital Region (All)", lat: 14.540320, lng: 121.033626, zoom: 11, income: [4434896376, 8072633749, 8477251436,], tax: [4434896376, 8072633749, 8477251436,]},
                    {NAME_2: "Manila", name: "Manila", lat: 14.600185, lng: 120.995241, zoom: 14, income: [145452345.5, 508748210.3, 422266469.2,], tax: [145452345.5, 508748210.3, 422266469.2,]},
                    {NAME_2: "Quezon City", name: "Quezon City", lat: 14.651461, lng: 121.049301, zoom: 14, income: [201998668.9, 446450250.6, 513509080.9,], tax: [201998668.9, 446450250.6, 513509080.9,]},
                    {NAME_2: "Kalookan City", name: "Caloocan City", lat: 14.753569, lng: 121.039468, zoom: 14, income: [201998668.9, 446450250.6, 513509080.9,], tax: [201998668.9, 446450250.6, 513509080.9,]},
                    {NAME_2: "Las PiÃ±as", name: "Las Piñas", lat: 14.440362, lng: 120.994935, zoom: 14, income: [0, 1981314.441, 5765136.176,], tax: [0, 1981314.441, 5765136.176,]},
                    {NAME_2: "Makati City", name: "Makati City", lat: 14.557752, lng: 121.032881, zoom: 14, income: [52074564.8, 144796613.1, 205012346.3,], tax: [52074564.8, 144796613.1, 205012346.3,]},
                    {NAME_2: "Malabon", name: "Malabon", lat: 14.672840, lng: 120.961093, zoom: 14, income: [38541303.58, 78346053.09, 67067749.55,], tax: [38541303.58, 78346053.09, 67067749.55,]},
                    {NAME_2: "Mandaluyong", name: "Mandaluyong", lat: 14.582816, lng: 121.039677, zoom: 14, income: [11625516.14, 26207741.75, 29463044.01,], tax: [11625516.14, 26207741.75, 29463044.01,]},
                    {NAME_2: "Marikina", name: "Marikina", lat: 14.647497, lng: 121.104577, zoom: 14, income: [125177566.3, 126053222.7, 66344537.82,], tax: [125177566.3, 126053222.7, 66344537.82,]},
                    {NAME_2: "Muntinlupa", name: "Muntinlupa", lat: 14.409599, lng: 121.040035, zoom: 14, income: [122667339.5, 218193372.4, 295390440.1,], tax: [122667339.5, 218193372.4, 295390440.1,]},
                    {NAME_2: "Navotas", name: "Quezon City", lat: 14.651461, lng: 121.049301, zoom: 14, income: [3013613.303, 18152946.74, 32809504.21,], tax: [3013613.303, 18152946.74, 32809504.21,]},
                    {NAME_2: "ParaÃ±aque", name: "Parañaque", lat: 14.476529, lng: 121.021311, zoom: 14, income: [240974511.3, 502231571.9, 603600573.7,], tax: [240974511.3, 502231571.9, 603600573.7,]},
                    {NAME_2: "Pasay City", name: "Pasay City", lat: 14.534376, lng: 121.001729, zoom: 14, income: [22723244.58, 85325374.16, 122338126.3,], tax: [22723244.58, 85325374.16, 122338126.3,]},
                    {NAME_2: "Pasig City", name: "Pasig City", lat: 14.577207, lng: 121.087034, zoom: 14, income: [175091102.4, 279275163.6, 268110171.7,], tax: [175091102.4, 279275163.6, 268110171.7,]},
                    {NAME_2: "Pateros", name: "Pateros", lat: 14.545394, lng: 121.070521, zoom: 14, income: [160008.6104, 1120981.337, 2376763.231,], tax: [160008.6104, 1120981.337, 2376763.231,]},
                    {NAME_2: "San Juan", name: "San Juan", lat: 14.601434, lng: 121.036458, zoom: 14, income: [6670072.648, 9030266.267, 7623841.651,], tax: [6670072.648, 9030266.267, 7623841.651,]},
                    {NAME_2: "Taguig", name: "Taguig", lat: 14.513940, lng: 121.058843, zoom: 14, income: [70248775.83, 339597134.2, 378722552.9,], tax: [70248775.83, 339597134.2, 378722552.9,]},
                    {NAME_2: "Valenzuela", name: "Valenzuela", lat: 14.705606, lng: 120.977897, zoom: 14, income: [160416334, 393711492.4, 444068139.2,], tax: [160416334, 393711492.4, 444068139.2,]},
                ],
                selectedCity: {NAME_2: "Manila", name: "Manila", lat: 14.600185, lng: 120.995241, zoom: 14, income: [145452345.5, 508748210.3, 422266469.2,], tax: [145452345.5, 508748210.3, 422266469.2,], isUnselected: true},
                floodLevel: 3,
            };
        }
    }
</script>