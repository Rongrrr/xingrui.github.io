<template>
  <div class="register">
    <img src="../assets/coffee-cultivation-kv.jpg" alt="" srcset="" class="bg">
    <section class="form_container">
        <div class="manage_tip">
            <span class="title">星瑞在线管理系统</span>
            <div class="registerFrom">
                <el-form :model="registerUser" :rules="rules" ref="registerForm" label-width="80px" class="registerForm">
                    <el-form-item label="用户名" prop="username">
                        <el-input  v-model="registerUser.username" placeholder="请输入用户名"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input type="email" v-model="registerUser.email" placeholder="请输入邮箱"></el-input>
                    </el-form-item>
                
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="registerUser.password" aria-placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="checkPass">
                        <el-input type="password" v-model="registerUser.checkPass" aria-placeholder="请确认密码"></el-input>
                    </el-form-item>
                    <el-form-item label="身份" prop="identity">
                        <el-select v-model="registerUser.identity" aria-placeholder="请选择身份">
                            <el-option label="管理员" value="manager"></el-option>
                            <el-option label="员工" value="employee"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="submit_btn" @click="submitForm('registerForm')">注册</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>

    </section>
  </div>
</template>

<script>
import qs from 'qs'
export default {
    name: 'theRegister',
    data() {
         var validatePass2 = (rules, value, callback) => {
            if (value !== this.registerUser.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            registerUser:{
                username: '',
                email: '',
                password: '',
                checkPass: '',
                identity: ''
            },
            rules:{
                username: [
                    {
                        required: true, message: '用户名不能为空', trigger: 'blur'
                    },
                    {
                        min: 2, max: 30, message: '长度在2-30个字符之间', trigger:'blur'
                    }
                ],
                email: [
                    {
                        type: 'email',required:true,message:'邮箱格式不正确',trigger:'blur'
                    }
                ],
                password: [
                    {
                        required: true, message:'密码不能为空',trigger:'blur'
                    },
                    {
                        min:6,max:30,message:'密码长度在6-30之间',trigger:'blur'
                    }
                ],
                checkPass: [
                    {
                        required: true, message: '密码不能为空', trigger: 'blur'
                    },
                    {
                        min: 6, max: 30, message: '密码长度在6-30之间', trigger: 'blur'
                    },
                    {
                        validator: validatePass2,
                        trigger:'blur'
                    }
                ]
            }
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$axios.post('/api/user/register', this.registerUser)
                        .then(res => {
                            console.log(res);
                            //注册成功
                            this.$message({
                                message: '注册成功',
                                type: 'success'
                            })
                        })
                    this.$router.push('/login')
                } else {
                    console.log('注册失败!!');
                    return false;
                }
            });
        },
    }
}
</script>

<style scoped>

.bg{
    width: 100%;
    height: 100%;
    filter: blur(5px);
}
.register{
    position: fixed;
    width: 100%;
    height: 100%;
    overflow: hidden;
}
.form_container{
    width: 370px;
    height: 210px;
    position: absolute;
    top:10%;
    left: 34%;
    padding: 25px;
    border-radius: 5px;
    text-align: center;
}

.form_container,.manage_tip,.title{
    font-family: "Microsoft YaHei";
    font-weight: bold;
    font-size: 26px;
    color: #fff;
}

.registerForm{
    width: 350px;
    margin-top: 20px;
    background-color:rgba(255,255,255);
    padding: 20px 40px 20px 20px;
    border-radius:5px ;
    box-shadow: 0px 5px 10x #cccc;
}
.submit_btn{
    width: 100%;
}
</style>