<template>
    <div id="storageShow">
        <el-row :gutter="20">
            <el-col :span="6"><div @click="addHandle" class="top-button add-button"><i class="fa fa-plus-square-o"></i> 增加储位</div></el-col>
            <el-col :span="6"><div @click="updateHandle" class="top-button update-button"><i class="fa fa-pencil"></i> 修改储位</div></el-col>
            <!-- <el-col :span="6"><div @click="deleteHandle" class="top-button delete-button"><i class="fa fa-minus-square-o"></i> 删除车辆</div></el-col> -->
            <el-col :span="6"><div @click="refreshHandle" class="top-button flash-button"><i class="fa fa-refresh"></i> 刷新数据</div></el-col>
        </el-row>
        <el-table :data="tableData" stripe style="width: 100%" height="100%" highlight-current-row @current-change="handleCurrentChange">
            <el-table-column prop="loc_id" label="储位id"></el-table-column>
            <el-table-column prop="size" label="储位大小"></el-table-column>
            <el-table-column prop="goods_id" label="货物id"></el-table-column>
        </el-table>
        <el-dialog title="增加储位" v-model="addStorVisible">
            <el-form :model="addForm">
                <el-form-item label="储位大小" :label-width="formLabelWidth">
                    <el-input v-model="addForm.size" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addStorVisible = false">取 消</el-button>
                <el-button type="primary" @click="addConfirm">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="修改储位" v-model="updateVisible">
            <el-form :model="currentRow">
                <el-form-item label="储位大小" :label-width="formLabelWidth">
                    <el-input v-model="updateForm.size" auto-complete="off"></el-input>
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
        name: 'storageShow',
        data () {
            return {
                tableData: [],
                formLabelWidth: '100px',
                addStorVisible: false,
                addForm: {
                    size: ''
                },
                updateVisible: false,
                updateForm: {
                    size: '',
                    loc_id: ''
                },
                currentRow: {
                    size: '',
                    loc_id: ''
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
                this.updateForm.size = this.currentRow.size
                this.updateForm.loc_id = this.currentRow.loc_id
            },
            /**
             * 增加储位
             **/
            addHandle () {
                this.addStorVisible = true
            },
            addConfirm () {
                let exp = /^[1-9]{1}[0-9]{0,5}$/
                if (!exp.test(this.addForm.size)) {
                    this.alert('信息不正确,请填写完全')
                    return
                }
                let dialogLoading = this.$loading({
                    target: document.querySelector('.el-dialog')
                })
                axios({
                    method: 'post',
                    url: '/storage_location/addOne',
                    data: qs.stringify({
                        'token': window.Authorization,
                        size: this.addForm.size
                    })
                }).then(res => {
                    if (res.data.status === '0') {
                        dialogLoading.close()
                        this.addStorVisible = false
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
                    url: '/storage_location/queryAll',
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
                let exp = /^[1-9]{1}[0-9]{0,5}$/
                if (!exp.test(this.updateForm.size)) {
                    this.alert('信息不正确,请填写完全')
                    return
                }
                let dialogLoading = this.$loading({
                    target: document.querySelector('.el-dialog')
                })
                axios({
                    method: 'post',
                    url: '/storage_location/updateOnestorage_locationbyId',
                    data: qs.stringify({
                        'token': window.Authorization,
                        size: this.updateForm.size,
                        loc_id: this.updateForm.loc_id
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
            /**
             * 判断是否选中
             *
             * @returns {boolean} 判断是否选中
             */
            judgeNull () {
                if (!this.activeTr) {
                    this.alert('请选中储位')
                    return false
                }
                return true
            },
            refreshHandle () {
                this.selectHandle()
            }
        }
    }
</script>

<style>
    #storageShow {
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
