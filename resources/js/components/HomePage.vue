<template>
    <div class="row" style="height: 95vh; width: 100vw">
        <div class="col-4 p-0 m-0">
            <div class="row">
                <div class="col mx-4 mt-3">
                    <div class="card mb-2">
                        <div class="card-body">
                            <h3>Select a city:</h3>
                            <select name="" id="" class="custom-select">
                                <option value="ncr">All (NCR)</option>
                                <option value="">Manila</option>
                                <option value="">Marikina</option>
                            </select>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-body">
                            <h3>Enter flood level:</h3>
                            <div class="custom-control custom-radio custom-control-inline">
                                <input type="radio" id="customRadioInline1" v-model="varLevel" value="var3" class="custom-control-input">
                                <label class="custom-control-label bg-yellow px-1 rounded" for="customRadioInline1">Alert Level</label>
                            </div>
                            <div class="custom-control custom-radio custom-control-inline">
                                <input type="radio" id="customRadioInline2" v-model="varLevel" value="var2" class="custom-control-input">
                                <label class="custom-control-label bg-orange px-1 rounded" for="customRadioInline2">Alarm Level</label>
                            </div>
                            <div class="custom-control custom-radio custom-control-inline">
                                <input type="radio" id="customRadioInline3" v-model="varLevel" value="var1" class="custom-control-input">
                                <label class="custom-control-label bg-red px-1 rounded" for="customRadioInline3">Critical Level</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-8 p-0 m-0">
            <map-general
                :var-level="varLevel"
            ></map-general>
        </div>
    </div>
</template>

<script>
    export default {
        data: function() {
            return {
                varLevel: "var1"
            };
        }
    }
</script>