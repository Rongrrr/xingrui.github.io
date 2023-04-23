<template>
  <div class="infoShow">
    <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="8">
            <div class="user">
            
            </div>
        </el-col>
        <el-col :span="16">
            <div class="userinfo">
                <div class="user-item">
                    <i class="el-icon-user"></i>
                    <span>{{ user.username }}</span>
                </div>
                <div class="user-item">
                    <i class="el-icon-s-custom"></i>
                    <span>{{ user.identity == 'manager' ? '管理员' : "员工"}}</span>
                </div>
            </div>
        </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
    name: 'infoShow',
    computed: {
        user() {
            return this.$store.getters.user
        }
    }
}
</script>

<style>

</style>