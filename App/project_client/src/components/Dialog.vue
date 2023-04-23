<template>
    <el-dialog 
    :title="dialog.title" 
    :visible.sync="dialog.show"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :modal-append-to-body="false"
    >
        <div class="form">
            <el-form 
            ref="form" 
            :model="formData" 
            :rules="form_rules" 
            label_width="120px" 
            style="margin: 10px;width: auto;">
                <el-form-item label="商品类型：">
                    <el-select v-model="formData.type">
                        <el-option v-for="(formtype,index) in format_type_list" :key="index" :label="formtype" :value="formtype">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="name" label="商品名称：">
                    <el-input type="name" v-model="formData.name" style="width: 80%;"></el-input>
                </el-form-item>
                <el-form-item prop="goods_num" label="数量：">
                    <el-input type="goods_num" v-model="formData.goods_num" style="width: 80%;"></el-input>
                </el-form-item>
                <el-form-item prop="goods_price" label="价格：">
                    <el-input type="goods_price" v-model="formData.goods_price" style="width: 80%;"></el-input>
                </el-form-item>
                <el-form-item prop="sale" label="销售额：">
                    <el-input type="sale" v-model="formData.sale" style="width: 80%;"></el-input>
                </el-form-item>
                <el-form-item prop="remark" label="备注：">
                        <el-input type="remark" v-model="formData.remark" style="width: 80%;"></el-input>
                    </el-form-item>
                <el-form-item>
                    <el-button @click="dialog.show=false">取消</el-button>
                    <el-button type="primary" @click="onSubmit('form')">提交</el-button>
                </el-form-item> 
            </el-form>
        </div>
    </el-dialog>
</template>

<script>
export default {
    name: 'theDialog',
    data() {
        return {
            
            format_type_list: [
                '饮料',
                '糕点',
                '咖啡豆'
            ],
            form_rules: {
                name: [
                    {required:true,message:'商品名称不能为空',trigger:blur}
                ],
                goods_num: [
                    { required: true, message: '数量不能为空', trigger: blur }
                ],
                goods_price: [
                    { required: true, message: '价格不能为空', trigger: blur }
                ],
                sale: [
                    { required: true, message: '销售额不能为空', trigger: blur }
                ],
            }
        }
    },
    props: {
        dialog: Object,
        formData:Object
    },
    methods: {
        onSubmit(form) {
            this.$refs[form].validate(valid => {
                if (valid) {
                    const url = this.dialog.option == 'add' ? 'add' : `edit/${this.formData.id}`
                    this.$axios.post(`/api/goods/${url}`, this.formData)
                        .then(res => {
                        //添加成功
                            this.$message({
                                message: '添加成功',
                                type:'success'
                            })
                        //隐藏dialog
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