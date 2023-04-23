<template>
    <div class="fillContainer">
        <div>
            <el-form :inline="true" ref="add_data">
                <el-form-item class="filterLeft" label="选择类型：" >
                    <el-select v-model="filterValue" placeholder="请选择" style="width: 200px;margin-right: 10px;">
                        <el-option
                        v-for="(filterType,index) in filterData"
                        :key="index"
                        :label="filterType"
                        :value="filterType"
                        >
                        </el-option>
                    </el-select>
                    <el-button type="primary" size="small" @click="handleFilter()">筛选</el-button>
                </el-form-item>
                <el-form-item class="btnRight">
                    <el-button 
                    type="primary" 
                    size="small" 
                    icon="view" 
                    v-if="user.identity == 'manager'" 
                    @click="handleAdd()"> 
                    添加
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="table">
            <el-table
                max-height="450px"
                border
                :data="tableData"
                style="width: 100%"
                
                >

                <el-table-column
                prop="id"
                align="center"
                label="序号"
                width="70">
                </el-table-column>

                <el-table-column
                prop="name"
                align="center"
                label="商品名"
                width="176">
                </el-table-column>

                <el-table-column
                prop="goods_num"
                align="center"
                label="数量"
                width="110">
                    <template slot-scope="scope">
                        <span style="color: #00d053;">{{ scope.row.goods_num }}</span>
                    </template>
                </el-table-column>

                <el-table-column
                prop="goods_price"
                align="center"
                label="价格"
                width="110">
                    <template slot-scope="scope">
                        <span style="color: #4db3ff;">{{ scope.row.goods_price }}</span>
                    </template>
                </el-table-column>

                <el-table-column
                prop="sale"
                align="center"
                label="销售额"
                width="110">
                    <template slot-scope="scope">
                            <span style="color: #f56767;">{{ scope.row.sale }}</span>
                        </template>
                </el-table-column>
                
                <el-table-column
                prop="type"
                align="center"
                label="商品类型"
                width="130">
                </el-table-column>

                <el-table-column
                prop="remark"
                align="center"
                label="备注"
                width="180">
                </el-table-column>

                <el-table-column 
                prop="operation"
                align="center"
                label="操作"
                width="180"
                v-if="user.identity == 'manager'"
                >
                <template slot-scope="scope">
                    <el-button
                    type="primary"
                    size="small"
                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                    size="small"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-row>
                <el-col :span="24">
                    <div class="pagination">
                        <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page.sync="paginations.page_index"
                        :page-sizes="paginations.page_sizes"
                        :page-size="paginations.page_size"
                        :layout="paginations.layout"
                        :total="paginations.total">
                        </el-pagination>
                    </div>
                </el-col>
            </el-row>
        </div>
        <Dialog :dialog="dialog" :formData="formData" @update="getGoods"/>
    </div>
</template>

<script>
import  Dialog  from '../components/Dialog.vue'
export default {
    name: 'goodsList',
    data() {
        return {
            tableData: [],
            allTableData:[],
            formData: {
                id: '',
                name: '',
                goods_num: '',
                goods_price: '',
                sale: '',
                remark: '',
                type: ''
            },
            dialog: {
                show: false,
                title: '',
                option: 'edit'
                
            },
            paginations: {
                page_index: 1,//当前位于哪页
                total: 0,//总数
                page_size: 5,//一页显示多少条
                page_sizes: [5, 10, 15, 20],//每页显示多少条
                layout:"total, sizes, prev, pager, next, jumper"
            },
            filterData: [
                '饮料',
                '糕点',
                '咖啡豆'
            ],
            filterValue: '',
            filterTableData:[]
        }
    },
    created() {
        this.getGoods()
    },
    methods: {
        getGoods() {
            this.$axios.get('/api/goods')
                .then(res => {
                    this.allTableData = res.data.data
                    this.filterTableData = res.data.data
                    //设置分页数据
                    this.setTableData()
                })
            .cache((err)=>{})
        },
        setTableData() {
            //设置分页属性
            this.paginations.total = this.allTableData.length
            this.paginations.page_index = 1
            this.paginations.page_size = 5
            //设置默认分页数据
            this.tableData = this.allTableData.filter((item, index) => {
                return index < this.paginations.page_size
            })
        },
        handleEdit(index, row) {
            this.dialog = {
                show: true,
                title: '修改商品信息',
                option:'edit'
            }

            this.formData = {
                id: row.id,
                name: row.name,
                goods_num: row.goods_num,
                goods_price: row.goods_price,
                sale: row.sale,
                remark: row.remark,
                type: row.type
                
            }
        },
        handleDelete(index, row) {
            this.$axios.post(`/api/goods/delete/${row.id}`)
                .then(res => {
                    console.log(row.id);
                    this.$message('删除成功')
                    this.getGoods()
            })
        },
        handleAdd() {
           this.dialog = {
                show: true,
                title: '添加商品信息',
                option: 'add'
            }

            this.formData = {
                id:"",
                name: "",
                goods_num:'',
                goods_price: '',
                sale: '',
                remark: '',
                type: ''

            }
        },
        handleSizeChange(page_size) {
            //切换size
            this.paginations.page_index = 1
            this.paginations.page_size = page_size
            this.tableData = this.allTableData.filter((item, index) => {
                return index < page_size
            })
        },
        handleCurrentChange(page) {
            //获取当前页
            let index = this.paginations.page_size * (page - 1)
            //数据的总数
            let num = this.paginations.page_size * page
            //容器
            let tables = []

            for (let i = index; i < num; i++){
                if (this.allTableData[i]) {
                    tables.push(this.allTableData[i])
                }
                this.tableData = tables
            }

            console.log(page);
        },
        handleFilter(filterValue) {
            if (!this.filterValue) {
                this.$message({
                    type: 'warning',
                    message:'请选择筛选类型'
                })
                this.getGoods()
                return
            }
            //过滤关键字
            const type = this.filterValue
            this.allTableData = this.filterTableData.filter(item => {
                if (item.type.includes(type)) {
                    return item
                }
            })
            //分页数据
            this.setTableData()
            
        }
    },
    components: {
        Dialog
    },
    computed: {
        user() {
            return this.$store.getters.user
        }
    }
}
</script>

<style scoped>
.fillContainer{
    width: 100%;
    height: 100%;
    padding: 16px;
    box-sizing: border-box;
}
.btnRight{
    float: right;
}
.pagination{
    float: right;
    margin-top: 10px;
}
</style>