<template>
    <div id="carRepairShow">
        <el-row :gutter="20">
            <el-col :span="6"><div @click="addHandle" class="top-button add-button"><i class="fa fa-plus-square-o"></i> 增加维修记录</div></el-col>
            <!--<el-col :span="6"><div @click="updateHandle" class="top-button update-button"><i class="fa fa-pencil"></i> 修改维修记录</div></el-col>-->
            <el-col :span="6"><div @click="deleteHandle" class="top-button delete-button"><i class="fa fa-minus-square-o"></i> 删除维修记录</div></el-col>
            <el-col :span="3"><div @click="yearSearch" class="top-button flash-button"><i class="fa fa-search"></i> 查询当年维修记录</div></el-col>
            <el-col :span="3"><div @click="monthSearch" class="top-button flash-button"><i class="fa fa-search"></i> 查询当月维修记录</div></el-col>
        </el-row>
        <el-table :data="tableData" stripe style="width: 100%" highlight-current-row @current-change="handleCurrentChange" height="100%">
            <el-table-column prop="id" fixed label="维修id" width="300"></el-table-column>
            <el-table-column prop="car_id" label="车辆id" width="300"></el-table-column>
            <el-table-column prop="year" label="维修年份" width="300"></el-table-column>
            <el-table-column prop="month" label="维修月份" width="300"></el-table-column>
            <el-table-column prop="day" label="维修日期" width="300"></el-table-column>
            <el-table-column prop="license_plate" label="车牌号" width="300"></el-table-column>
            <el-table-column prop="service_details" fixed="right" label="维修信息" width="300"></el-table-column>
            <el-table-column prop="money" label="维修价格" width="300"></el-table-column>
            <el-table-column prop="employee_name" label="员工名称" width="300"></el-table-column>
        </el-table>
        <el-dialog title="增加维修记录" v-model="addVisible">
            <el-form :model="addForm">
                <el-form-item label="车牌照" :label-width="formLabelWidth">
                    <el-select v-model="addForm.license_plate" placeholder="请选择员工职位">
                        <el-option v-for="option in license_plate" :label="option" :value="option"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="车辆维修细节" :label-width="formLabelWidth">
                    <el-input v-model="addForm.service_details" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="维修金额" :label-width="formLabelWidth">
                    <el-input v-model="addForm.money" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="addConfirm">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="当年的维修记录" v-model="yearTableVisible">
            <el-table :data="yearData">
                <el-table-column prop="id" fixed label="维修id" width="150"></el-table-column>
                <el-table-column prop="car_id" label="车辆id" width="150"></el-table-column>
                <el-table-column prop="year" label="维修年份" width="150"></el-table-column>
                <el-table-column prop="month" label="维修月份" width="150"></el-table-column>
                <el-table-column prop="day" label="维修日期" width="150"></el-table-column>
                <el-table-column prop="license_plate" label="车牌号" width="150"></el-table-column>
                <el-table-column prop="service_details" fixed="right" label="维修信息" width="150"></el-table-column>
                <el-table-column prop="money" label="维修价格" width="150"></el-table-column>
                <el-table-column prop="employee_name" label="员工名称" width="150"></el-table-column>
            </el-table>
        </el-dialog>
        <el-dialog title="当月的维修记录" v-model="monthTableVisible">
            <el-table :data="monthData">
                <el-table-column prop="id" fixed label="维修id" width="150"></el-table-column>
                <el-table-column prop="car_id" label="车辆id" width="150"></el-table-column>
                <el-table-column prop="year" label="维修年份" width="150"></el-table-column>
                <el-table-column prop="month" label="维修月份" width="150"></el-table-column>
                <el-table-column prop="day" label="维修日期" width="150"></el-table-column>
                <el-table-column prop="license_plate" label="车牌号" width="150"></el-table-column>
                <el-table-column prop="service_details" fixed="right" label="维修信息" width="150"></el-table-column>
                <el-table-column prop="money" label="维修价格" width="150"></el-table-column>
                <el-table-column prop="employee_name" label="员工名称" width="150"></el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script>
    import qs from 'qs'
    import axios from 'axios'
    export default {
        name: 'carRepairShow',
        data () {
            return {
                tableData: [],
                formLabelWidth: '100px',
                addVisible: false,
                addForm: {
                    license_plate: '',
                    service_details: '',
                    money: ''
                },
                currentRow: {
                    id: ''
                },
                activeTr: false,
                license_plate: [],
                yearTableVisible: false,
                monthTableVisible: false,
                yearData: [],
                monthData: []
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
             * 选中tr
             * @param {object} val 选中的tr
             */
            handleCurrentChange (val) {
                this.currentRow = val
                this.activeTr = true
            },
            /**
             * 增加车辆
             **/
            addHandle () {
                this.addVisible = true
                let dialogLoading = this.$loading({
                    target: document.querySelector('.el-dialog')
                })
                // 所有职位请求
                axios({
                    method: 'post',
                    url: '/car/queryAllCar',
                    data: qs.stringify({
                        'token': window.Authorization
                    })
                }).then(res => {
                    dialogLoading.close()
                    this.license_plate = res.data.map(item => {
                        return item.license_plate
                    })
                }).catch(() => {
                    dialogLoading.close()
                    this.alert('网络错误,请稍后重试.')
                })
            },
            addConfirm () {
                if (this.addForm.license_plate === '' || this.addForm.position === '' || this.addForm.employee_name === '') {
                    this.alert('信息不全,请填写完全')
                    return
                }
                let dialogLoading = this.$loading({
                    target: document.querySelector('.el-dialog')
                })
                axios({
                    method: 'post',
                    url: '/car_repair/addOneRecord',
                    data: qs.stringify({
                        'token': window.Authorization,
                        license_plate: this.addForm.license_plate,
                        service_details: this.addForm.service_details,
                        money: this.addForm.money
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
                    url: '/car_repair/queryAll',
                    data: qs.stringify({
                        'token': window.Authorization
                    })
                }).then(res => {
                    this.tableData = res.data
                }).catch(() => {
                    this.alert('网络错误,请稍后重新')
                })
            },
            deleteHandle () {
                if (this.judgeNull()) {
                    axios({
                        method: 'post',
                        url: '/car_repair/deleteOneRecord',
                        data: qs.stringify({
                            'token': window.Authorization,
                            id: this.currentRow.id
                        })
                    }).then(res => {
                        if (res.data.status === '0') {
                            this.selectHandle()
                            this.alert('删除成功.', 'success')
                        }
                    }).catch(() => {
                        this.alert('网络错误,请稍后重试.')
                    })
                } else {
                    return
                }
            },
            refreshHandle () {
                this.selectHandle()
            },
            /**
             * 判断是否选中
             *
             * @returns {boolean} 判断是否选中
             */
            judgeNull () {
                if (!this.activeTr) {
                    this.alert('请选中维修记录')
                    return false
                }
                return true
            },
            yearSearch () {
                this.yearTableVisible = true
                let dialogLoading = this.$loading({
                    target: document.querySelector('.el-dialog')
                })
                // 所有职位请求
                axios({
                    method: 'post',
                    url: '/car_repair/queryByYear',
                    data: qs.stringify({
                        'token': window.Authorization
                    })
                }).then(res => {
                    dialogLoading.close()
                    console.log(res)
                    this.yearData = res.data
                }).catch(() => {
                    dialogLoading.close()
                    this.alert('网络错误,请稍后重试.')
                })
            },
            monthSearch () {
                this.monthTableVisible = true
                let dialogLoading = this.$loading({
                    target: document.querySelector('.el-dialog')
                })
                // 所有职位请求
                axios({
                    method: 'post',
                    url: '/car_repair/queryByMonth',
                    data: qs.stringify({
                        'token': window.Authorization
                    })
                }).then(res => {
                    dialogLoading.close()
                    console.log(res)
                    this.monthData = res.data
                }).catch(() => {
                    dialogLoading.close()
                    this.alert('网络错误,请稍后重试.')
                })
            }
        }
    }
</script>

<style>
    #carRepairShow {
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
