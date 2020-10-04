<template>
    <div class="row" style="height: 95vh; width: 100vw">
        <div class="col-4 p-0 m-0">
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
                    <div class="card">
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
                    {NAME_2: "ncr", name: "National Capital Region (All)", lat: 14.540320, lng: 121.033626, zoom: 11},
                    {NAME_2: "Manila", name: "Manila", lat: 14.600185, lng: 120.995241, zoom: 14},
                    {NAME_2: "Quezon City", name: "Quezon City", lat: 14.651461, lng: 121.049301, zoom: 14},
                    {NAME_2: "Kalookan City", name: "Caloocan City", lat: 14.753569, lng: 121.039468, zoom: 14},
                    {NAME_2: "Las PiÃƒÂ±as", name: "Las Piñas", lat: 14.440362, lng: 120.994935, zoom: 14},
                    {NAME_2: "Makati City", name: "Makati City", lat: 14.557752, lng: 121.032881, zoom: 14},
                    {NAME_2: "Malabon", name: "Malabon", lat: 14.672840, lng: 120.961093, zoom: 14},
                    {NAME_2: "Mandaluyong", name: "Mandaluyong", lat: 14.582816, lng: 121.039677, zoom: 14},
                    {NAME_2: "Marikina", name: "Marikina", lat: 14.647497, lng: 121.104577, zoom: 14},
                    {NAME_2: "Muntinlupa", name: "Muntinlupa", lat: 14.409599, lng: 121.040035, zoom: 14},
                    {NAME_2: "Navotas", name: "Quezon City", lat: 14.651461, lng: 121.049301, zoom: 14},
                    {NAME_2: "ParaÃ±aque", name: "Parañaque", lat: 14.476529, lng: 121.021311, zoom: 14},
                    {NAME_2: "Pasay City", name: "Pasay City", lat: 14.534376, lng: 121.001729, zoom: 14},
                    {NAME_2: "Pasig City", name: "Pasig City", lat: 14.577207, lng: 121.087034, zoom: 14},
                    {NAME_2: "Pateros", name: "Pateros", lat: 14.545394, lng: 121.070521, zoom: 14},
                    {NAME_2: "San Juan", name: "San Juan", lat: 14.601434, lng: 121.036458, zoom: 14},
                    {NAME_2: "Taguig", name: "Taguig", lat: 14.513940, lng: 121.058843, zoom: 14},
                    {NAME_2: "Valenzuela", name: "Valenzuela", lat: 14.705606, lng: 120.977897, zoom: 14},
                ],
                selectedCity: {name: "Manila", lat: 14.600185, lng: 120.995241},
                floodLevel: 3,
            };
        }
    }
</script>