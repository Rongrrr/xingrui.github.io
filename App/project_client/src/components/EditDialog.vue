<template>
  <el-dialog
    title="修改用户信息" 
    :visible.sync="dialog.show"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :modal-append-to-body="false">
        <div class="from">
            <el-form
            ref="form"
            :model="userData" 
            :rules="user_rules" 
            label_width="120px" 
            style="margin: 10px;width: auto;">
                <el-form-item prop="username" label="用户名：">
                    <el-input type="username" v-model="userData.username" style="width: 80%;"></el-input>
                </el-form-item>
                <el-form-item prop="email" label="邮箱：">
                    <el-input type="email" v-model="userData.email" style="width: 80%;"></el-input>
                </el-form-item>
                <el-form-item label="身份" prop="identity">
                        <el-select v-model="userData.identity" aria-placeholder="请选择身份">
                            <el-option label="管理员" value="manager"></el-option>
                            <el-option label="员工" value="employee"></el-option>
                        </el-select>
                </el-form-item>
                <el-form-item>
                        <el-button @click="dialog.show = false">取消</el-button>
                        <el-button type="primary" @click="onSubmit('form')">提交</el-button>
                </el-form-item> 
            </el-form>
        </div>
  </el-dialog>
</template>

<script>
export default {
    name: "editDialog",
    props: {
        userData: Object,
        dialog:Object
    },
    data() {
        return {
            user_rules: {
                username: [
                    { required: true, message: '用户名不能为空', trigger: blur }
                ],
                email: [
                    {type:"email",required:true,message:"邮箱格式不正确",trigger:blur}
                ],

            }
        }
    },
    methods: {
        onSubmit(from) {
            this.$refs[from].validate(valid => {
                if (valid) {
                    this.$axios.post('/api/userinfo/updateinfo', this.userData)
                        .then(res => {
                            this.$message({
                                message: "修改成功！",
                                type:"success"
                            })

                            this.dialog.show = false
                            this.$emit('update')
                    })
                }
            })
        }
    }
}
</script>

<style>

</style>