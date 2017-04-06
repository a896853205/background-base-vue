<template>
    <div id="home">
        <header class="head">
            <h1 class="head-h1">
                <div class="logo"></div>
                第三方物流管理系统
                <el-dropdown class="user-dropdown">
                    <span class="el-drop-link">
                        {{userinfo.employee_name}}<i class="el-icon-caret-bottom el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>
                            <div @click="showInfo">用户信息修改</div>
                        </el-dropdown-item>
                        <el-dropdown-item>密码修改</el-dropdown-item>
                        <el-dropdown-item divided>
                            <div @click="logOut">
                                注销
                            </div>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </h1>
        </header>
        <div class="body">
            <Nav></Nav>
            <div class="body-view">
                <router-view></router-view>
            </div>
        </div>
        <el-dialog title="个人信息修改" v-model="infoVisible">
            <el-form id="infoModel">
                <el-form-item label="姓名" :label-width="formLabelWidth">
                    <el-input v-model="userinfo.employee_name"></el-input>
                </el-form-item>
                <el-form-item label="电话" :label-width="formLabelWidth">
                    <el-input v-model="userinfo.telephone"></el-input>
                </el-form-item>
                <el-form-item label="住址" :label-width="formLabelWidth">
                    <el-input v-model="userinfo.location"></el-input>
                </el-form-item>
                <el-form-item label="职位" :label-width="formLabelWidth">
                    <el-select v-model="userinfo.position" placeholder="请选择职位" id="infoSelect">
                        <el-option v-for="pos in employeePosition" :label="pos" :value="pos"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="infoVisible = false">取消</el-button>
                <el-button @click="updateInfo" type="primary">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import nav from './HomePage/Nav'
    import axios from 'axios'
    import qs from 'qs'
    export default {
        name: 'home',
        data () {
            return {
                infoVisible: false,
                formLabelWidth: '50px',
                userinfo: {
                    employee_name: '',
                    telephone: '',
                    salary: '',
                    location: '',
                    position: ''
                },
                employeePosition: []
            }
        },
        components: {
            Nav: nav
        },
        beforeCreate () {
            // 个人信息请求
            let screen = this.$loading()
            axios({
                method: 'post',
                url: '/employee/selectByUsername',
                data: qs.stringify({
                    'token': window.Authorization
                })
            }).then(res => {
                screen.close()
                this.userinfo = res.data
                // 在这里信息赋值
            }).catch(() => {
                screen.close()
                this.alert('网络错误,请稍后重试.')
            })
        },
        methods: {
            /**
             * 个人信息展示
             */
            showInfo () {
                this.infoVisible = true
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
            /**
             * 修改个人信息
             **/
            updateInfo () {
                let self = this
                let dialogLoading = this.$loading({
                    target: document.querySelector('.el-dialog')
                })
                axios({
                    method: 'post',
                    url: '/employee/updateStaffposition',
                    data: qs.stringify({
                        'token': window.Authorization,
                        employee_name: self.userinfo.employee_name,
                        telephone: self.userinfo.telephone,
                        location: self.userinfo.location,
                        position: self.userinfo.position
                    })
                }).then(res => {
                    if (res.data.status === 0) {
                        dialogLoading.close()
                        this.alert('修改成功!', 'success')
                        self.infoVisible = false
                    }
                }).catch(err => {
                    console.log(err)
                    dialogLoading.close()
                    this.alert('网络错误,请稍后重试.')
                })
            },
            logOut () {
                axios({
                    method: 'post',
                    url: '/employee/logout',
                    data: qs.stringify({
                        'token': window.Authorization
                    })
                }).then(res => {
                    if (res.data.status === '0') {
                        window.Authorization = ''
                        location.href = location.origin + '/#/'
                    }
                }).catch(err => {
                    console.log(err)
                    this.alert('网络错误,请稍后重试.')
                })
            },
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
            }
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
    .user-dropdown {
        float: right;
        font-size: 12px;
        padding:3.5px 20px 3.5px 0;
        cursor: pointer;
    }
    .body-view {
        padding: 10px;
        box-sizing: border-box;
    }
</style>
