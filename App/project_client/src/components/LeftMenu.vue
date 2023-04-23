<template>
    <el-row class="menu_page">
        <el-col>
            
            <el-menu
            class="el-menu-vertical-demo"
            background-color="#E8F3F5"
            text-color="#000"
            active-text-color="#006440"
            active-background-color="#67A943"
            >
            <router-link to="/home">
                <el-menu-item index="0" style="border-bottom:1px solid #fff;">
                    <i class="fa fa-margin fa-server"></i>
                    <span slot="title">首页</span>
                </el-menu-item>
            </router-link>
                <template v-for="item in items">
                    <el-submenu v-if="item.children" :index="item.path" :key="item.path">
                        <template class="title">
                            <i :class="'fa fa-margin'+item.icon"></i>
                            <span slot="title">{{ item.name }}</span>
                        </template>
                        <router-link v-for="(citem,cindex) in item.children" :to="citem.path" :key="cindex">
                            <el-menu-item :index="citem.path">
                                <span slot="title">{{ citem.name }}</span>
                            </el-menu-item>
                        </router-link>
                    </el-submenu>
                </template>
            
            </el-menu>
        </el-col>
    </el-row>

</template>

<script>
export default {
    name: 'leftMenu',
    data() {
        return {
            items: [
                {
                    icon: 'el-icon-s-goods',
                    name: '商品管理',
                    path: 'goods',
                    children:[{path:'goodslist',name:'商品列表'}]
                },
                {
                    icon: 'el-icon-user-solid',
                    name: '信息管理',
                    path: 'info',
                    children: [{ path: 'userinfo', name: '用户信息' }]
                },
            ]
        }
    },
}
</script>

<style scoped>
.menu_page {
  position: fixed;
  top: 71px;
  left: 0;
  min-height: 100%;
  background-color: #E8F3F5;
  z-index: 99;
}
.el-menu {
  border: none;
}
.fa-margin {
  margin-right: 5px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 180px;
  min-height: 400px;
  
}
.el-menu-vertical-demo {
  width: 35px;
}
.el-submenu .el-menu-item {
  min-width: 180px;
  
}
.el-submenu{
    border-bottom:1px solid #fff;
}
.hiddenDropdown,
.hiddenDropname {
  display: none;
}
a {
  text-decoration: none;
}
</style>