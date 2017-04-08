<template>
    <div id="goodsFlowShow">
        <el-row :gutter="20">
            <el-col :span="6"><div @click="addHandle" class="top-button add-button"><i class="fa fa-plus-square-o"></i> 增加货物流动</div></el-col>
<!--            <el-col :span="6"><div @click="updateHandle" class="top-button update-button"><i class="fa fa-pencil"></i> 修改车辆</div></el-col>
            <el-col :span="6"><div @click="deleteHandle" class="top-button delete-button"><i class="fa fa-minus-square-o"></i> 删除车辆</div></el-col>
            <el-col :span="6"><div @click="refreshHandle" class="top-button flash-button"><i class="fa fa-refresh"></i> 刷新数据</div></el-col>-->
        </el-row>
        <el-table :data="tableData" stripe style="width: 100%" height="100%" highlight-current-row @current-change="handleCurrentChange">
            <el-table-column prop="id" label="货物入库信息id" fixed width="300"></el-table-column>
            <el-table-column prop="goods_id" label="货物id" width="300"></el-table-column>
            <el-table-column prop="loc_id" label="储位id" width="300"></el-table-column>
            <el-table-column prop="car_id" label="车辆id" width="300"></el-table-column>
            <el-table-column prop="type" label="类型" width="300"></el-table-column>
            <el-table-column prop="username" label="用户名" width="300"></el-table-column>
            <el-table-column prop="count" label="数量" width="300"></el-table-column>
            <el-table-column prop="money" label="单价" fixed="right" width="300"></el-table-column>
        </el-table>
        <el-dialog title="增加车辆" v-model="addVisible">
            <el-form :model="addForm">
                <el-form-item label="货物id" :label-width="formLabelWidth">
                    <el-select v-model="addForm.goods_id" placeholder="请选择员工姓名">
                        <el-option v-for="option in goods_id" :label="option" :value="option"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="储位id" :label-width="formLabelWidth">
                    <el-select v-model="addForm.loc_id" placeholder="请选择员工姓名">
                        <el-option v-for="option in loc_id" :label="option" :value="option"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="车辆id" :label-width="formLabelWidth">
                    <el-select v-model="addForm.car_id" placeholder="请选择员工姓名">
                        <el-option v-for="option in car_id" :label="option" :value="option"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="类型" :label-width="formLabelWidth">
                    <el-select v-model="addForm.type" placeholder="请选择员工姓名">
                        <el-option v-for="option in type" :label="option" :value="option"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="货物单价" :label-width="formLabelWidth">
                    <el-input v-model="addForm.money" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="货物数量" :label-width="formLabelWidth">
                    <el-input v-model="addForm.count" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="addConfirm">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import qs from 'qs'
    import axios from 'axios'
    export default {
        name: 'carShow',
        data () {
            return {
                tableData: [],
                formLabelWidth: '100px',
                addVisible: false,
                addForm: {
                    goods_id: '',
                    loc_id: '',
                    car_id: '',
                    type: '',
                    money: '',
                    count: ''
                },
                goods_id: [],
                loc_id: [],
                car_id: [],
                type: [
                    '入库',
                    '出库'
                ]
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
             * 增加流动
             **/
            addHandle () {
                this.addVisible = true
                axios({
                    method: 'post',
                    url: '/goods/queryAll',
                    data: qs.stringify({
                        'token': window.Authorization
                    })
                }).then(res => {
                    this.goods_id = res.data.map(item => {
                        return item.id
                    })
                }).catch(() => {
                    this.alert('网络错误,请稍后重试.')
                })
                axios({
                    method: 'post',
                    url: '/storage_location/queryAll',
                    data: qs.stringify({
                        'token': window.Authorization
                    })
                }).then(res => {
                    this.loc_id = res.data.map(item => {
                        return item.loc_id
                    })
                }).catch(() => {
                    this.alert('网络错误,请稍后重试.')
                })
                axios({
                    method: 'post',
                    url: '/car/queryAllCar',
                    data: qs.stringify({
                        'token': window.Authorization
                    })
                }).then(res => {
                    this.car_id = res.data.map(item => {
                        return item.id
                    })
                }).catch(() => {
                    this.alert('网络错误,请稍后重试.')
                })
            },
            addConfirm () {
                let exp = /^[1-9]{1}[0-9]{0,5}$/
                if (this.addForm.goods_id === '' || this.addForm.loc_id === '' || this.addForm.car_id === '' || this.addForm.type === '' || !exp.test(this.addForm.money) || !exp.test(this.addForm.count)) {
                    this.alert('信息错误,请填写完全')
                    return
                }
                let dialogLoading = this.$loading({
                    target: document.querySelector('.el-dialog')
                })
                axios({
                    method: 'post',
                    url: '/goods_flow/addGoods_flow',
                    data: qs.stringify({
                        'token': window.Authorization,
                        goods_id: this.addForm.goods_id,
                        loc_id: this.addForm.loc_id,
                        car_id: this.addForm.car_id,
                        type: this.addForm.type,
                        money: this.addForm.money,
                        count: this.addForm.count
                    })
                }).then(res => {
                    if (res.data.status === '0') {
                        dialogLoading.close()
                        this.addVisible = false
                        this.selectHandle()
                    }
                }).catch(() => {
                    dialogLoading.close()
                    this.alert('网络错误,请稍后重试.')
                })
            },
            /**
             * 查询所有车辆
             **/
            selectHandle () {
                axios({
                    method: 'post',
                    url: '/goods_flow/queryAll',
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
    #goodsFlowShow {
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
