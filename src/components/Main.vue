<script setup>
import ProfileView from "./ProfileView.vue"
import DataView from "./DataView.vue"
import AngleView from "./AngleView.vue"
import LeaderboardView from "./LeaderboardView.vue"
import ScenarioView from "./ScenarioView.vue"
</script>


<template>
    
    <div id="navBar">
        <!-- <img src="../assets/logo.png" width="35" alt="" style="margin-top: 5px;"> -->
        <span style="font-weight: 800; padding-left: 10px; position: absolute;">NLSQL360</span>
        <span style="position: absolute; right: 10px;">A Multi-angle NL2SQL Evaluation System</span> 
    </div>

    <div style="height: calc(94vh - 0px); width: calc(100% - 0px);">
        <div class="framework" id="controlPanel"
            style="position: absolute; left: calc(5px); top: calc(5px); height: calc(50vh); width: calc(15vw + 10px);">
            <ProfileView />
        </div>

        <div class="framework" id="Leaderbord"
            style="position: absolute; left: calc(15vw - 5px + 30px);  top: calc(5px); height: calc(50vh); width: calc(27vw - 30px);">
            <LeaderboardView />
        </div>
        <div class="framework" id="MultiAngles"
            style="position: absolute; right: 5px; top: calc(5px); height: calc((94vh - 10px) * .45 - 10px); width: calc(58vw - 10px);">
            <AngleView />
        </div>
        <div class="framework" id="DataTransformation"
            style="position: absolute; right: 5px; top: calc((94vh - 10px) * .45 + 5px); height: calc((96vh - 10px) * .55 - 30px); width: calc(58vw - 10px);">
            <ScenarioView />
        </div>
        <div class="framework" id="DataDetails"
            style="position: absolute; left: calc(5px); top: calc(50vh + 15px); height: calc(94vh - 50vh - 40px); width: calc(42vw - 10px);">
            <DataView />
        </div>
    </div>

</template>

<style>

.framework {
    border: 0px solid rgb(105, 119, 122);
    background-color: white;
    border-radius: 5px;
}

.framework .frameworkTitle {
    height: 40px;
}

.framework .frameworkBody {
    height: calc(100% - 50px);
    padding: 10px 10px 5px 10px;
}

.framework .frameworkTitle .title {
    float: left;
    width: fit-content;

    background-color: rgb(105, 119, 122);
    height: 35px;

    font-weight: 600;
    font-size: 24px;
    color: white;
    padding-left: 10px;
    padding-right: 3px;
    font-family: 'KoHo';
    line-height: 35px;
}

.framework .frameworkTitle .titleTriangle {
    float: left;
    width: 0;
    height: 0;
    border-color: transparent rgb(105, 119, 122);
    border-width: 0px 0px 35px 35px;
    border-style: solid;
}

#navBar {
    background-color: #4d4d4d;
    text-align: left;
    font-weight: bold;
    color: white;
    font-size: 28px;
    height: calc(6vh);
    padding-top: 0.2%;
    padding-bottom: 0.5%;
    padding-left: 10px;
    font-family: 'KoHo', 'Avenir', Helvetica, Arial, sans-serif;
}

</style>