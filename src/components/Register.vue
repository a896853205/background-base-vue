<template>
    <div class="login" id="register">
        <div class="login-header">
            <span class="logo"></span>
            <span class="head-h1">第三方物流管理系统</span>
            <div class="pull-right sign-div">
                <span class="fa fa-sign-in"></span>
            </div>
            <small class="head-desicribe">利用互联网&nbsp;来方便您的查看</small>
        </div>
        <div id="inBody" class="login-body">
            <div class="login-inbody">
                <input class="mar-b20" type="text" placeholder="用户名" v-model="userName" @blur="checkRepetName">
                <input class="mar-b20" type="password" placeholder="密码" v-model="passWord">
                <input class="mar-b20" type="password" placeholder="确认密码" v-model="rePassWord">
                <a href="#/" class="none-number">我有账号</a>
                <button class="login-btn" type="button" @click="checkRegirst">注册</button>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import qs from 'qs'
    export default {
        name: 'register',
        data () {
            return {
                userName: '',
                passWord: '',
                rePassWord: ''
            }
        },
        methods: {
            /**
             * 判断用户名格式
             */
            checkRepetName () {
                // 判断是否为空
                if (this.userName === '') {
                    this.alert('用户名不能为空')
                } else {
                    let userLogin = this.$loading({
                        target: document.querySelector('#inBody'),
                        fullscreen: false
                    })
                    // 提交到后台
                    axios({
                        url: '/users/register_judgeUsername',
                        method: 'post',
                        data: qs.stringify({
                            username: this.userName
                        })
                    }).then(res => {
                        userLogin.close()
                        if (res.data.status === 1) {
                            this.alert('用户名已存在!')
                        } else {
                            this.alert('用户名可以使用.', 'success')
                        }
                    }).catch(() => {
                        userLogin.close()
                        this.alert('网络错误,请稍后再试')
                    })
                }
            },
            /**
             * 错误提示
             *
             * @param {string} value 显示信息
             * @param {string} 显示类型 error|success|warning|''
             */
            alert (value = '信息错误', type = 'error') {
                this.$message({
                    showClose: true,
                    message: value,
                    type: type
                })
            },
            checkRegirst () {
                if (this.userName === '' || this.passWord === '') {
                    this.alert('信息不能为空')
                    return
                }
                if (this.passWord !== this.rePassWord) {
                    this.alert('密码不一致')
                    return
                }
                let userLogin = this.$loading({
                    target: document.querySelector('#inBody'),
                    fullscreen: false
                })
                axios({
                    method: 'post',
                    url: '/users/registerUser',
                    data: qs.stringify({
                        username: this.userName,
                        password: this.passWord
                    })
                }).then(res => {
                    if (res.data.status === 1) {
                        userLogin.close()
                        this.alert('用户名已存在!')
                    } else {
                        this.alert('注册成功', 'success')
                        setTimeout(() => {
                            location.href = location.origin + '/#/'
                        }, 2000)
                    }
                }).catch(err => {
                    this.alert('网络错误,请稍后重试')
                    console.log(err)
                })
            }
        }
    }
</script>

<style>

</style>
