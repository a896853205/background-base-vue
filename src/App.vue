<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'app'
    }
</script>

<style>
    * {
        margin:0;
        padding:0;
    }
    html,body {
        width:100%;
        height:100%;
        overflow-x: hidden;
    }
    #app {
        width:100%;
        height:100%;
        font-family: '微软雅黑';
        position:relative;
    }
</style>
