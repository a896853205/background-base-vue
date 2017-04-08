<template>
    <div id="userShow">
        <el-row :gutter="20">
            <!--<el-col :span="6"><div @click="addHandle" class="top-button add-button"><i class="fa fa-plus-square-o"></i> 增加员工</div></el-col>-->
            <el-col :span="6"><div @click="updateHandle" class="top-button update-button"><i class="fa fa-pencil"></i> 修改员工</div></el-col>
            <!--<el-col :span="6"><div @click="deleteHandle" class="top-button delete-button"><i class="fa fa-minus-square-o"></i> 删除员工</div></el-col>-->
            <el-col :span="6"><div @click="refreshHandle" class="top-button flash-button"><i class="fa fa-refresh"></i> 刷新数据</div></el-col>
        </el-row>
        <el-table :data="tableData" stripe style="width: 100%" height="100%" highlight-current-row @current-change="handleCurrentChange">
            <el-table-column prop="id" label="员工id" width="300"></el-table-column>
            <el-table-column prop="employee_name" label="员工姓名" fixed width="300"></el-table-column>
            <el-table-column prop="telephone" label="电话" width="300"></el-table-column>
            <el-table-column prop="salary" label="薪水" width="300"></el-table-column>
            <el-table-column prop="location" label="地址" width="300"></el-table-column>
            <el-table-column prop="username" label="用户名" width="300"></el-table-column>
            <el-table-column prop="position" label="职位" width="300"></el-table-column>
        </el-table>
        <el-dialog title="修改员工" v-model="updateVisible">
            <el-form :model="currentRow">
                <el-form-item label="员工姓名" :label-width="formLabelWidth">
                    <el-input v-model="updateForm.employee_name"></el-input>
                </el-form-item>
                <el-form-item label="员工电话" :label-width="formLabelWidth">
                    <el-input v-model="updateForm.telephone"></el-input>
                </el-form-item>
                <el-form-item label="员工住址" :label-width="formLabelWidth">
                    <el-input v-model="updateForm.location"></el-input>
                </el-form-item>
                <el-form-item label="员工职位" :label-width="formLabelWidth">
                    <el-select v-model="updateForm.position" placeholder="请选择员工职位">
                        <el-option v-for="option in employeePosition" :label="option" :value="option"></el-option>
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
        name: 'userShow',
        data () {
            return {
                tableData: [],
                formLabelWidth: '100px',
                employeePosition: [],
                updateVisible: false,
                updateForm: {
                    position: '',
                    employee_name: '',
                    telephone: '',
                    location: '',
                    username: ''
                },
                currentRow: {
                    position: '',
                    employee_name: '',
                    telephone: '',
                    location: '',
                    username: ''
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
                this.updateForm.position = this.currentRow.position
                this.updateForm.employee_name = this.currentRow.employee_name
                this.updateForm.telephone = this.currentRow.telephone
                this.updateForm.location = this.currentRow.location
                this.updateForm.username = this.currentRow.username
            },
            /**
             * 查询所有员工
             **/
            selectHandle () {
                axios({
                    method: 'post',
                    url: '/employee/queryAll',
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
                if (this.updateForm.position === '' || this.updateForm.employee_name === '' || this.updateForm.location === '' || this.updateForm.telephone === '') {
                    this.alert('信息不全,请填写完全')
                    return
                }
                let dialogLoading = this.$loading({
                    target: document.querySelector('.el-dialog')
                })
                axios({
                    method: 'post',
                    url: '/employee/updateStaffposition',
                    data: qs.stringify({
                        'token': window.Authorization,
                        position: this.updateForm.position,
                        employee_name: this.updateForm.employee_name,
                        telephone: this.updateForm.telephone,
                        location: this.updateForm.location,
                        username: this.updateForm.username
                    })
                }).then(res => {
                    if (res.data.status === 0) {
                        dialogLoading.close()
                        this.updateVisible = false
                        this.selectHandle()
                    }
                }).catch(() => {
                    dialogLoading.close()
                    this.alert('网络错误,请稍后重试.')
                })
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
                    this.alert('请选中员工')
                    return false
                }
                return true
            }
        }
    }
</script>

<style>
    #userShow {
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
    .el-table {
        height: calc(100% - 50px)
    }
</style>
