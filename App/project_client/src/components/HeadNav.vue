<template>
  <header class="head-nav">
    <el-row>
        <el-col :span="12" class="logo-container">
            <img src="../assets/coffeelogo.svg" alt="" class="logo">
            <span class="title">星瑞在线管理系统</span>
        </el-col>
        <el-col :span="11" class="user">
            <img src="" class="avatar" alt="">
            <div class="welcome">
                <p class="name comename">欢迎</p>
                <p class="name avatarname">{{ user.username }}</p>
            </div>

            <span class="username">
                <!-- 下拉箭头 -->
                <el-dropdown trigger="click" @command="setDialogDown" style="color: #fff;">
                    <span class="el-dropdown-link">
                        <i class="el-icon-caret-bottom el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="info">个人信息</el-dropdown-item>
                        <el-dropdown-item command="logout">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </span>
        </el-col>
    </el-row>
  </header>
</template>

<script>
export default {
    name: 'headNav',
    computed:{
        user() {
            return this.$store.getters.user
        }
    },
    methods: {
        setDialogDown(cmdItem) {
            switch (cmdItem) {
                case 'info':
                    this.showInfoList()
                    break;
                case 'logout':
                    this.logout()
                    break;
            }
        },

        showInfoList() {
            this.$router.push('/infoshow')
        },
        logout() {
            //清除token
            localStorage.removeItem('eleToken')
            //设置vuex,store
            this.$store.dispatch('clearCurrentState')
            //跳转页面
            this.$router.push('/login')
        }

    }
}
</script>

<style scoped>

.head-nav{
    
    width: 100%;
    height: 60px;
    min-width: 600px;
    padding: 5px;
    background-color: #006440;
    color: #fff;
    border-bottom: 1px solid #006440;
}
.logo-container {
    line-height: 60px;
    min-width: 400px;
    
}
.logo {
    height: 60px;
    width: 60px;
    margin-right: 5px;
    vertical-align: middle;
    display: inline-block;
    border: 1px solid #fff;
    border-radius: 50px;
}
.title {
    vertical-align: middle;
    font-size: 22px;
    font-family: "Microsoft YaHei";
    letter-spacing: 3px;
}
.user {
    line-height: 60px;
    text-align: right;
    float: right;
    padding-right: 10px;
}
.avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    vertical-align: middle;
    display: inline-block;
}
.welcome {
    display: inline-block;
    width: auto;
    vertical-align: middle;
    padding: 0 5px;
}
.name {
    line-height: 20px;
    text-align: center;
    font-size: 14px;
}
.comename{
    font-size: 12px;
}
.avatarname{
    color: #409eff;
    font-weight: bolder;
}
.username{
    cursor: pointer;
    margin-right: 5px;
}

</style>