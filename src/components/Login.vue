<template>
    <div class="login">
        <div class="login-header">
            <span class="logo"></span>
            <span class="head-h1">第三方物流管理系统</span>
            <div class="pull-right sign-div">
                <span class="fa fa-sign-in"></span>
            </div>
            <small class="head-desicribe">利用互联网&nbsp;来方便您的查看</small>
        </div>
        <div class="login-body">
            <div class="login-inbody">
                <el-input class="mar-b20" v-model="userName" placeholder="用户名"></el-input>
                <el-input class="mar-b20" v-model="passWord" placeholder="密码" type="password"></el-input>
                <a class="none-number" href="#/register">没有账号?</a>
                <button @click="loginTest" class="login-btn" type="button">登录</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'login',
        data () {
            return {
                userName: '',
                passWord: ''
            }
        },
        methods: {
            loginTest () {
                if (this.userName === '') {
                    this.alert('用户名不能为空!')
                    return
                }
                if (this.passWord === '') {
                    this.alert('密码不能为空!')
                    return
                }
                this.$loading()
                // ajax
            },
            /**
             * 错误提示
             * @param value
             */
            alert (value = '信息错误') {
                this.$message({
                    showClose: true,
                    message: value,
                    type: 'error'
                })
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    /*==========
     = PC样式登录
     ===========*/
    body{
        background:#d9e0e7;
        padding:0;
        margin:0;
        color: #707478;
        height:100%;
    }
    .login{
        margin-top:140px;
    }
    .login-header{
        margin:0 auto 20px auto;
        width:370px;
    }
    .logo{
        float: left;
        margin-right: 10px;
        border: 14px solid transparent;
        border-color: #4DCACA #31A3A3 #1D8888;
        opacity: .9;
        border-radius: 50%;
    }
    .head-h1{
        font-size:20px;
        font-weight:bold;
    }
    .sign-div span{
        font-size:70px;
        opacity: .1;
    }
    .head-desicribe{
        display:block;
        margin-top:10px;
    }
    .login-body{
        background:#2d353c;
        padding-top:30px;
        padding-bottom:30px;
        transition:.5s;
    }
    .login-inbody{
        width:370px;
        margin:0 auto;
        overflow: hidden;
    }
    .login-inbody input{
        width:100%;
        border:1px solid #e2e7eb;
        font-size:14px;
        border-radius:3px;
        height:46px;
        padding:10px 16px;
        box-sizing: border-box;
    }
    .login-btn{
        color:#fff;
        width:100%;
        height:46px;
        border:0;
        background:#00acac;
        border-radius:3px;
        cursor:pointer;
    }
    .login-btn:hover{
        background:#008a8a;
    }
    .mar-b20{
        margin-bottom:20px;
    }
    .none-number {
        float:right;
        margin-bottom: 10px;
        color: #fff;
    }
</style>
