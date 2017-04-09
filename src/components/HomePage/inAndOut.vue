<template>
    <div id="inAndOut">
        <el-table :data="tableData" stripe style="width: 100%" height="100%" highlight-current-row>
            <el-table-column prop="type" label="类型"></el-table-column>
            <el-table-column prop="money" label="单价"></el-table-column>
            <el-table-column prop="year" label="年"></el-table-column>
            <el-table-column prop="month" label="月"></el-table-column>
            <el-table-column prop="day" label="日"></el-table-column>
        </el-table>
    </div>
</template>

<script>
    import qs from 'qs'
    import axios from 'axios'
    export default {
        name: 'inAndOut',
        data () {
            return {
                tableData: []
            }
        },
        created () {
            this.selectHandle()
        },
        methods: {
            /**
             * 错误提示
             * @param {string} value 显示的信息
             * @param {string} type 显示类型
             */
            alert (value = '信息错误', type = 'error') {
                this.$message({
                    showClose: true,
                    message: value,
                    type: type
                })
            },
            selectHandle () {
                axios({
                    method: 'post',
                    url: 'financial/queryAll',
                    data: qs.stringify({
                        'token': window.Authorization
                    })
                }).then(res => {
                    this.tableData = res.data
                }).catch(() => {
                    this.alert('网络错误,请稍后重新')
                })
            }
        }
    }
</script>

<style>
    #inAndOut {
        height: 100%;
    }
    .top-button {
        height: 40px;
        line-height: 40px;
        border-radius: 4px;
        box-sizing: border-box;
        padding:0 15px;
        margin-bottom: 10px;
        color: #fff;
        cursor: pointer;
        transition: .2s;
    }
    .top-button:hover {
        box-shadow: 0 0 10px #888;
        transform: scale(1.2,1.2);
    }
    .add-button {
        background: #13ce66;
    }
    .update-button {
        background: #50BFFF;
    }
    .delete-button {
        background: #ff4949;
    }
    .flash-button {
        background: #99A9BF;
    }
    tr {
        cursor: pointer;
    }
</style>
