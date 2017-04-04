<template>
    <nav class="nav">
        <ul>
            <li v-for="li in navData" v-on:click="showChild(li)" v-bind:style="{'max-height': li.maxHeight}" v-bind:class="li.showChild ? 'active-li': ''">
                <a>
                    <i v-bind:class="li.faClass"></i>
                    {{li.liName}}
                    <i v-if="li.children.length != 0" v-bind:style="{'transform': li.showChild ? 'rotate(90deg)' : 'rotate(0deg)'}" class="fa fa-angle-right"></i>
                </a>
                <ul class="child-ul">
                    <li class="child-li" v-for="childLi in li.children">
                        <a v-on:click.stop="" v-bind:href="childLi.liHref">{{childLi.liName}}</a>
                    </li>
                </ul>
            </li>
        </ul>
    </nav>
</template>

<script>
    export default {
        name: 'nav',
        data () {
            return {
                navData: [{
                    liName: '资料管理',
                    liHref: '',
                    faClass: 'fa fa-search',
                    children: [{
                        liName: '车队资料',
                        liHref: ''
                    }, {
                        liName: '车辆资料',
                        liHref: ''
                    }, {
                        liName: '员工资料',
                        liHref: ''
                    }],
                    showChild: false,
                    maxHeight: '37px'
                }, {
                    liName: '物业管理',
                    liHref: '',
                    faClass: 'fa fa-calendar',
                    children: [{
                        liName: '货物入库',
                        liHref: '#/'
                    }, {
                        liName: '货物出库',
                        liHref: '#/'
                    }, {
                        liName: '货物盘点',
                        liHref: '#/'
                    }],
                    showChild: false,
                    maxHeight: '37px'
                }, {
                    liName: '车辆管理',
                    liHref: '',
                    faClass: 'fa fa-calendar-plus-o',
                    children: [{
                        liName: '维修登记',
                        liHref: '#/'
                    }, {
                        liName: '保养登记',
                        liHref: '#/'
                    }],
                    showChild: false,
                    maxHeight: '37px'
                }, {
                    liName: '财务管理',
                    liHref: '',
                    faClass: 'fa fa-braille',
                    children: [{
                        liName: '支出与收入',
                        liHref: '#/'
                    }, {
                        liName: '银行存取款',
                        liHref: '#/'
                    }, {
                        liName: '生成报表',
                        liHref: '#/'
                    }, {
                        liName: '工资管理',
                        liHref: '#/'
                    }],
                    showChild: false,
                    maxHeight: '37px'
                }]
            }
        },
        methods: {
            /**
             * 展示子菜单
             *
             * @param activeLi
             */
            showChild (activeLi) {
                if (activeLi.showChild) {
                    activeLi.showChild = !activeLi.showChild
                    activeLi.maxHeight = '37px'
                } else {
                    if (activeLi.children.length === 0) {
                        // 跳转
                    } else {
                        this.navData.forEach(item => {
                            item.showChild = false
                            item.maxHeight = '37px'
                        })
                        // 一个是21px;
                        activeLi.maxHeight = `${(activeLi.children.length + 1) * 37}px`
                        activeLi.showChild = !activeLi.showChild
                    }
                }
            }
        }
    }
</script>

<style>
    .nav {
        float: left;
        height: 100%;
        width: 160px;
        background: #2d353c;
        padding-top: 20px;
        box-sizing: border-box;
        color: #eee;
        font-size: 14px;
    }
    .nav li {
        transition:.3s;
        overflow: hidden;
        cursor: pointer;
        -moz-user-select:none;
        -webkit-user-select:none;
    }
    .nav li:hover {
        background: #232a2f;
    }
    .nav a:link,
    .nav a:valid,
    .nav a:hover,
    .nav a:active,
    .nav a {
        text-decoration: none;
        display: block;
        padding: 8px 0 8px 10px;
    }
    .nav li i {
        display: inline-block;
        width: 30px;
        font-size:20px;
        text-align: center;
        transition:.3s;
    }
    .child-ul li {
        font-size: 14px;
        border-bottom: 1px dashed rgb(213,218,230);
    }
    .child-ul .child-li a {
        /*padding-left: 50px;*/
    }
    .child-ul {
        border-left: 1px dashed rgb(213,218,230);
        margin-left: 50px;
    }
    .active-li>a{
        background: #00acac;
    }
    .active-li a,.active-li .fa {
        color: #fff;
    }
</style>
