<template>
    <div id="mainShow">
        <el-carousel :interval="4000" type="card" height="90%">
            <el-carousel-item class="disabled">
                <carShow></carShow>
            </el-carousel-item>
            <el-carousel-item class="disabled">
                <carOilShow></carOilShow>
            </el-carousel-item>
            <el-carousel-item class="disabled">
                <storageShow></storageShow>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
    import carShow from './carShow'
    import carOilShow from './carOilShow'
    import storageShow from './storageShow'

    export default {
        name: 'mainShow',
        data () {
            return {}
        },
        components: {
            carShow,
            carOilShow,
            storageShow
        }
    }
</script>

<style>
    #mainShow {
        height: 100%;
    }
    .el-carousel {
        height: 100%;
    }
    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 200px;
        margin: 0;
    }
    .el-carousel__item {
        box-shadow: 0 0 10px #666;
    }
    .disabled { pointer-events: none; }
</style>
