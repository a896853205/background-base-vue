<template>
    <div id="home">
        <header class="head">
            <h1 class="head-h1">
                <div class="logo"></div>
                第三方物流管理系统
            </h1>
        </header>
        <div class="body">
            <Nav></Nav>
            <div class="body-view">
                <router-view></router-view>
            </div>
        </div>
    </div>

</template>

<script>
    import nav from './HomePage/Nav'
    export default {
        name: 'home',
        components: {
            Nav: nav
        }
    }
</script>

<style>
    #home {
        height: 100%;
        width: 100%;
        position: relative;
    }
    .body-view {
        height: 100%;
        float: left;
        width: calc(100% - 160px);
    }
    .head {
        background: #fff;
        position: absolute;
        width: 100%;
        box-shadow: 0 0 5px #222;
    }
    .body {
        padding-top: 42px;
        height: 100%;
        box-sizing: border-box;
    }
    .head-h1 {
        overflow: hidden;
        padding: 8px;
    }
</style>
