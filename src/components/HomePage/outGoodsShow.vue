<template>
    <div id="outGoodsShow">
        <el-row :gutter="20">
            <el-col :span="6"><div @click="selectMySelf" class="top-button flash-button"><i class="fa fa-search"></i> 查询自己的出库信息</div></el-col>
        </el-row>
        <el-table :data="tableData" stripe style="width: 100%" height="100%" highlight-current-row>
            <el-table-column prop="id" label="货物出库信息id" fixed width="300"></el-table-column>
            <el-table-column prop="goods_id" label="货物id" width="300"></el-table-column>
            <el-table-column prop="loc_id" label="储位id" width="300"></el-table-column>
            <el-table-column prop="car_id" label="车辆id" width="300"></el-table-column>
            <el-table-column prop="type" label="类型" width="300"></el-table-column>
            <el-table-column prop="username" label="用户名" width="300"></el-table-column>
            <el-table-column prop="count" label="数量" width="300"></el-table-column>
            <el-table-column prop="money" label="单价" fixed="right" width="300"></el-table-column>
        </el-table>
        <el-dialog title="自己的出库信息" v-model="dialogTableVisible">
            <el-table :data="gridData">
                <el-table-column prop="id" label="货物出库信息id" fixed width="200"></el-table-column>
                <el-table-column prop="goods_id" label="货物id" width="150"></el-table-column>
                <el-table-column prop="loc_id" label="储位id" width="150"></el-table-column>
                <el-table-column prop="car_id" label="车辆id" width="150"></el-table-column>
                <el-table-column prop="type" label="类型" width="150"></el-table-column>
                <el-table-column prop="username" label="用户名" width="150"></el-table-column>
                <el-table-column prop="count" label="数量" width="150"></el-table-column>
                <el-table-column prop="money" label="单价" fixed="right" width="100"></el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script>
    import qs from 'qs'
    import axios from 'axios'
    export default {
        name: 'outGoodsShow',
        data () {
            return {
                tableData: [],
                formLabelWidth: '100px',
                dialogTableVisible: false,
                gridData: []
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
            /**
             * 查询所有车辆
             **/
            selectHandle () {
                axios({
                    method: 'post',
                    url: '/goods_flow/queryOutGoods',
                    data: qs.stringify({
                        'token': window.Authorization
                    })
                }).then(res => {
                    this.tableData = res.data
                }).catch(() => {
                    this.alert('网络错误,请稍后重新')
                })
            },
            selectMySelf () {
                this.dialogTableVisible = true
                let dialogLoading = this.$loading({
                    target: document.querySelector('.el-dialog')
                })
                // 所有职位请求
                axios({
                    method: 'post',
                    url: '/goods_flow/queryByUsernameAndOut',
                    data: qs.stringify({
                        'token': window.Authorization
                    })
                }).then(res => {
                    dialogLoading.close()
                    console.log(res)
                    this.gridData = res.data
                }).catch(() => {
                    dialogLoading.close()
                    this.alert('网络错误,请稍后重试.')
                })
            }
        }
    }
</script>

<style>
    #outGoodsShow {
        height: 100%;
    }
    .el-table {
        height: calc(100% - 50px)
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
