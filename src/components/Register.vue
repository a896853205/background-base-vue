<template>
    <div id="register">
        <input type="text" placeholder="用户名" v-model="userName" v-on:keyup="checkRepetName">
        <input type="text" placeholder="密码">
        <input type="text" placeholder="重复密码">
        <button>注册</button>
        <a href="#/">登录</a>
    </div>
</template>

<script>
    import axios from 'axios'
    import baseUrl from '../urlConfig'

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
            checkRepetName () {
                axios({
                    url: `${baseUrl.localPath}users/register_judgeUsername`,
                    method: 'post',
                    data: {
                        username: this.userName
                    }
                }).then(function (res) {
                    console.log(res)
                }, function (err) {
                    console.log(err)
                })
            }
        }
    }
</script>

<style>

</style>
