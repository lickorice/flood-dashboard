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
                    <hr>
                    <div v-if="!selectedCity.isUnselected">
                        <div class="card my-2">
                            <div class="card-body">
                                <h2>Economic impact</h2>
                                <h6>Monthly income affected</h6>
                                <h3>Php {{ getIncome() }}*<span class="font-weight-light" style="font-size: 1rem"> or USD {{ getIncomeDollars() }}</span></h3>
                                <small>*based on estimated income per sq. km (Philippine Statistics Authority, 2015)</small>
                                
                                <hr>

                                <h6>Monthly tax collection affected</h6>
                                <h3>Php {{ getTax() }}*<span class="font-weight-light" style="font-size: 1rem"> or USD {{ getTaxDollars() }}</span></h3>
                                <small>*based on estimated tax collection per sq. km (Philippine Statistics Authority, 2015)</small>
                            </div>
                        </div>
                        <div class="card mb-2">
                            <div class="card-body">
                                <h2>Humanitarian impact</h2>
                                <h6>People affected</h6>
                                <h3><i class="fa fas fa-running"></i> {{ getPop() }}*</h3>
                                <small>*based on estimated population density per sq. km (Philippine Statistics Authority, 2015)</small>
                            </div>
                        </div>
                    </div>
                    <div v-else class="text-muted text-center">
                        Select a region to start calculating...
                    </div>
                    <div class="card mb-2">
                        <div class="card-body">
                            <h3>Recent Floods</h3>
                            <ul v-if="events">
                                <li v-for="(event, key) in events">
                                    {{ event['title'] }}
                                </li>
                            </ul>
                            <p v-else>None</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-8 p-0 m-0">
            <map-general
                :flood-level="floodLevel"
                :selected-city="selectedCity"
                :show-evacuation-centers="true"
            ></map-general>
        </div>
    </div>
</template>

<script>
    export default { 
        data: function() {
            return {
                cities: [
                    {NAME_2: "ncr", name: "National Capital Region (All)", lat: 14.540320, lng: 121.033626, zoom: 11, income: [4434896376, 8072633749, 8477251436], tax: [1411702701, 2570086318, 2699033726,], population: [2980296, 6099815, 6999823]},
                    {NAME_2: "Manila", name: "Manila", lat: 14.600185, lng: 120.995241, zoom: 13.5, income: [145452345.5, 422266469.2, 508748210.3, ], tax: [46395568.66, 134692176.3, 162277634.3,], population: [345405, 1002754, 1208121]},
                    {NAME_2: "Quezon City", name: "Quezon City", lat: 14.651461, lng: 121.049301, zoom: 13.5, income: [201998668.9, 446450250.6, 513509080.9,], tax: [973204629.3, 1557290916, 1595279796,], population: [808112, 1293115, 1324660]},
                    {NAME_2: "Kalookan City", name: "Caloocan City", lat: 14.753569, lng: 121.039468, zoom: 13.5, income: [201998668.9, 446450250.6, 513509080.9,], tax: [64340316.75, 142202672.4, 163562151.7,], population: [274952, 607689, 698966]},
                    {NAME_2: "Las PiÃ±as", name: "Las Piñas", lat: 14.440362, lng: 120.994935, zoom: 13.5, income: [0, 1981314.441, 5765136.176,], tax: [0, 629821.8092, 1832626.069,], population: [0, 2605, 7578]},
                    {NAME_2: "Makati City", name: "Makati City", lat: 14.557752, lng: 121.032881, zoom: 13.5, income: [52074564.8, 144796613.1, 205012346.3,], tax: [16588268.63, 46124727.56, 65306352.23,], population: [156269, 434514, 615213]},
                    {NAME_2: "Malabon", name: "Malabon", lat: 14.672840, lng: 120.961093, zoom: 13.5, income: [38541303.58, 67067749.55, 78346053.09,], tax: [12301539.36, 21406555.68, 25006342.97,], population: [133883, 232977, 272155]},
                    {NAME_2: "Mandaluyong", name: "Mandaluyong", lat: 14.582816, lng: 121.039677, zoom: 13.5, income: [11625516.14, 26207741.75, 29463044.01,], tax: [3707349.636, 8357586.935, 9395695.137,], population: [88310, 199080, 223808]},
                    {NAME_2: "Marikina", name: "Marikina", lat: 14.647497, lng: 121.104577, zoom: 13.5, income: [125177566.3, 126053222.7, 66344537.82,], tax: [39719804.7, 39997657.2, 21051632.19,], population: [265410, 267266, 140668]},
                    {NAME_2: "Muntinlupa", name: "Muntinlupa", lat: 14.409599, lng: 121.040035, zoom: 13.5, income: [122667339.5, 218193372.4, 295390440.1,], tax: [39215413.73, 69754047.04, 94433109.62,], population: [84091, 149575, 202495]},
                    {NAME_2: "Navotas", name: "Quezon City", lat: 14.651461, lng: 121.049301, zoom: 13.5, income: [3013613.303, 18152946.74, 32809504.21,], tax: [958352.1233, 5772776.167, 10433673.75,], population: [14004, 84352, 152457]},
                    {NAME_2: "ParaÃ±aque", name: "Parañaque", lat: 14.476529, lng: 121.021311, zoom: 13.5, income: [240974511.3, 502231571.9, 603600573.7,], tax: [76693714.32, 159842651, 192104840.1,], population: [169844, 353982, 425429]},
                    {NAME_2: "Pasay City", name: "Pasay City", lat: 14.534376, lng: 121.001729, zoom: 13.5, income: [22723244.58, 85325374.16, 122338126.3,], tax: [7246281.364, 27209656.02, 39012759.89,], population: [69341, 260375, 373321]},
                    {NAME_2: "Pasig City", name: "Pasig City", lat: 14.577207, lng: 121.087034, zoom: 13.5, income: [175091102.4, 268110171.7, 279275163.6,], tax: [55666895.31, 85240544.24, 88790241.68,], population: [319522, 489271, 509646]},
                    {NAME_2: "Pateros", name: "Pateros", lat: 14.545394, lng: 121.070521, zoom: 13.5, income: [160008.6104, 1120981.337, 2376763.231,], tax: [50594.27189, 354451.141, 751525.8384,], population: [4473, 31334, 66435]},
                    {NAME_2: "San Juan", name: "San Juan", lat: 14.601434, lng: 121.036458, zoom: 13.5, income: [6670072.648, 7623841.651, 9030266.267,], tax: [2130441.114, 2435077.781, 2884294.002,], population: [57625, 65865, 78015]},
                    {NAME_2: "Taguig", name: "Taguig", lat: 14.513940, lng: 121.058843, zoom: 13.5, income: [70248775.83, 339597134.2, 378722552.9,], tax: [22370483.95, 108143553.4, 120602910,], population: [67677, 327162, 364855]},
                    {NAME_2: "Valenzuela", name: "Valenzuela", lat: 14.705606, lng: 120.977897, zoom: 13.5, income: [160416334, 393711492.4, 444068139.2,], tax: [51113047.61, 125447289.3, 141492299.3,], population: [121378, 297899, 336001]},
                ],
                selectedCity: {NAME_2: "Manila", name: "Manila", lat: 14.600185, lng: 120.995241, zoom: 13.5, income: [145452345.5, 508748210.3, 422266469.2,], tax: [46395568.66, 162277634.3, 134692176.3,], isUnselected: true},
                floodLevel: 3,
                usExchangeRate: 48.48,
                events: null,
            };
        },

        methods: {
            getPop() {
                return this.selectedCity.population[this.floodLevel-1].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            },
            getTax() {
                return this.selectedCity.tax[this.floodLevel-1].toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
            },
            getTaxDollars() {
                return (this.selectedCity.tax[this.floodLevel-1] / this.usExchangeRate).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
            },
            getIncome() {
                return this.selectedCity.income[this.floodLevel-1].toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
            },
            getIncomeDollars() {
                return (this.selectedCity.income[this.floodLevel-1] / this.usExchangeRate).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
            },
        },
        mounted () {
            fetch('https://eonet.sci.gsfc.nasa.gov/api/v3/categories/floods?bbox=14.676863,120.956038,14.520046,121.098956')
            .then(response => response.json())
            .then((responseJSON) => {
                this.events = responseJSON['events']
            });
        },
    }
</script>