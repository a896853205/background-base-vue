<template>
    <div id="carShow">
        <el-row :gutter="20">
            <el-col :span="6"><div @click="addHandle" class="top-button add-button"><i class="fa fa-plus-square-o"></i> 增加车辆</div></el-col>
            <el-col :span="6"><div @click="updateHandle" class="top-button update-button"><i class="fa fa-pencil"></i> 修改车辆</div></el-col>
            <el-col :span="6"><div @click="deleteHandle" class="top-button delete-button"><i class="fa fa-minus-square-o"></i> 删除车辆</div></el-col>
            <el-col :span="6"><div @click="refreshHandle" class="top-button flash-button"><i class="fa fa-refresh"></i> 刷新数据</div></el-col>
        </el-row>
        <el-table :data="tableData" stripe style="width: 100%" highlight-current-row @current-change="handleCurrentChange">
            <el-table-column prop="id" label="车辆id"></el-table-column>
            <!--<el-table-column prop="cti_id" label="车队资料"></el-table-column>-->
            <el-table-column prop="license_plate" label="车牌照"></el-table-column>
            <el-table-column prop="employee_name" label="司机名"></el-table-column>
            <el-table-column prop="position" label="职位"></el-table-column>
        </el-table>
        <el-dialog title="增加车辆" v-model="addVisible">
            <el-form :model="addForm">
                <el-form-item label="车牌照" :label-width="formLabelWidth">
                    <el-input v-model="addForm.license_plate" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="员工职位" :label-width="formLabelWidth">
                    <el-select @change="setNameNull(addForm)" v-model="addForm.position" placeholder="请选择员工职位">
                        <el-option v-for="option in employeePosition" :label="option" :value="option"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="员工姓名" :label-width="formLabelWidth">
                    <el-select v-model="addForm.employee_name" placeholder="请选择员工姓名">
                        <el-option v-for="option in employeeName" :label="option" :value="option"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="addConfirm">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="修改车辆" v-model="updateVisible">
            <el-form :model="currentRow">
                <el-form-item label="车牌照" :label-width="formLabelWidth">
                    <el-input v-model="updateForm.license_plate" :disabled="true" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="员工职位" :label-width="formLabelWidth">
                    <el-select @change="setNameNull(updateForm)" v-model="updateForm.position" placeholder="请选择员工职位">
                        <el-option v-for="option in employeePosition" :label="option" :value="option"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="员工姓名" :label-width="formLabelWidth">
                    <el-select v-model="updateForm.employee_name" placeholder="请选择员工姓名">
                        <el-option v-for="option in employeeName" :label="option" :value="option"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="updateVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateConfirm">确 定</el-button>
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
                employeePosition: [],
                employeeName: [],
                addForm: {
                    license_plate: '',
                    position: '',
                    employee_name: ''
                },
                updateVisible: false,
                updateForm: {
                    license_plate: '',
                    position: '',
                    employee_name: ''
                },
                currentRow: {
                    license_plate: '',
                    position: '',
                    employee_name: ''
                },
                activeTr: false
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
                this.updateForm.license_plate = this.currentRow.license_plate
                this.updateForm.position = this.currentRow.position
                this.updateForm.employee_name = this.currentRow.employee_name
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
                    url: '/employee/selectEmployeePosition',
                    data: qs.stringify({
                        'token': window.Authorization
                    })
                }).then(res => {
                    dialogLoading.close()
                    this.employeePosition = res.data
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
                    url: '/car/addCar',
                    data: qs.stringify({
                        'token': window.Authorization,
                        license_plate: this.addForm.license_plate,
                        position: this.addForm.position,
                        employee_name: this.addForm.employee_name
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
                    url: '/car/queryAllCar',
                    data: qs.stringify({
                        'token': window.Authorization
                    })
                }).then(res => {
                    this.tableData = res.data
                }).catch(() => {
                    this.alert('网络错误,请稍后重新')
                })
            },
            updateHandle () {
                if (this.judgeNull()) {
                    this.updateVisible = true
                    let dialogLoading = this.$loading({
                        target: document.querySelector('.el-dialog')
                    })
                    // 所有职位请求
                    axios({
                        method: 'post',
                        url: '/employee/selectEmployeePosition',
                        data: qs.stringify({
                            'token': window.Authorization
                        })
                    }).then(res => {
                        dialogLoading.close()
                        this.employeePosition = res.data
                    }).catch(() => {
                        dialogLoading.close()
                        this.alert('网络错误,请稍后重试.')
                    })
                } else {
                    return
                }
            },
            updateConfirm () {
                if (this.updateForm.license_plate === '' || this.updateForm.position === '' || this.updateForm.employee_name === '') {
                    this.alert('信息不全,请填写完全')
                    return
                }
                let dialogLoading = this.$loading({
                    target: document.querySelector('.el-dialog')
                })
                axios({
                    method: 'post',
                    url: '/car/updateOneCarInfo',
                    data: qs.stringify({
                        'token': window.Authorization,
                        license_plate: this.updateForm.license_plate,
                        position: this.updateForm.position,
                        employee_name: this.updateForm.employee_name
                    })
                }).then(res => {
                    if (res.data.status === '0') {
                        dialogLoading.close()
                        this.updateVisible = false
                        this.selectHandle()
                    }
                }).catch(() => {
                    dialogLoading.close()
                    this.alert('网络错误,请稍后重试.')
                })
            },
            deleteHandle () {
                if (this.judgeNull()) {
                    axios({
                        method: 'post',
                        url: '/car/deleteOneCarId',
                        data: qs.stringify({
                            'token': window.Authorization,
                            id: this.currentRow.id
                        })
                    }).then(res => {
                        if (res.data.status === '0') {
                            this.selectHandle()
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
                    this.alert('请选中车辆')
                    return false
                }
                return true
            },
            /**
             * 选择职位之后清空员工姓名,而且添加员工姓名整体
             */
            setNameNull (obj) {
                let dialogLoading = this.$loading({
                    target: document.querySelector('.el-dialog')
                })
                // 所有职位请求
                axios({
                    method: 'post',
                    url: '/employee/selectEmployee_nameByPosition',
                    data: qs.stringify({
                        'token': window.Authorization,
                        position: obj.position
                    })
                }).then(res => {
                    dialogLoading.close()
                    this.employeeName = res.data
                }).catch(() => {
                    dialogLoading.close()
                    this.alert('网络错误,请稍后重试.')
                })
                this.addForm.employee_name = ''
                this.updateForm.employee_name = ''
            }
        }
    }
</script>

<style>
    #carShow {
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
