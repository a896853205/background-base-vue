<template>
    <nav id="nav" class="nav">
        <ul>
            <li v-for="li in navData" @click="showChild(li)" :style="{'max-height': li.maxHeight}" :class="li.showChild ? 'active-li': ''">
                <a>
                    <i :class="li.faClass"></i>
                    {{li.liName}}
                    <i v-if="li.children.length != 0" :style="{'transform': arrRotate(li)}" class="fa fa-angle-right"></i>
                </a>
                <ul class="child-ul">
                    <li class="child-li" v-for="childLi in li.children">
                        <i class="fa fa-circle-thin"></i>
                        <a @click.stop="" :href="childLi.liHref">{{childLi.liName}}</a>
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
                        liName: '车辆资料',
                        liHref: '#/home/carShow'
                    }, {
                        liName: '员工资料',
                        liHref: '#/home/userShow'
                    }, {
                        liName: '储位资料',
                        liHref: '#/home/storageShow'
                    }],
                    showChild: false,
                    maxHeight: '37px'
                }, {
                    liName: '物业管理',
                    liHref: '',
                    faClass: 'fa fa-calendar',
                    children: [{
                        liName: '货物入库',
                        liHref: '#/home/inGoodsShow'
                    }, {
                        liName: '货物出库',
                        liHref: '#/home/outGoodsShow'
                    }, {
                        liName: '货物流动',
                        liHref: '#/home/goodsFlowShow'
                    }],
                    showChild: false,
                    maxHeight: '37px'
                }, {
                    liName: '车辆管理',
                    liHref: '',
                    faClass: 'fa fa-calendar-plus-o',
                    children: [{
                        liName: '维修登记',
                        liHref: '#/home/carRepairShow'
                    }, {
                        liName: '加油登记',
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
            },
            /**
             * 箭头旋转角度
             * @param {object} activeLi 选中的li标签
             * @returns {string} 旋转的角度rotate(90deg)|rotate(0deg)
             */
            arrRotate (activeLi) {
                if (activeLi.showChild) {
                    return 'rotate(90deg)'
                } else {
                    return 'rotate(0deg)'
                }
            }
        }
    }
    /* {
     liName: '车队资料',
     liHref: ''
     }, */
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
        position: relative;
    }
    .child-ul li .fa-circle-thin {
        position: absolute;
        font-size: 16px;
        line-height: 36px;
        top: 0;
        left: -16px;
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
    .child-li {
        position: relative;
        transition: .2s;
        left: 0;
    }
    .child-li:hover {
        left: 20px;
    }
</style>
