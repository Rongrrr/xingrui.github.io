<template>
    <div class="fillContainer">
        <!-- 顶部按钮 -->
        <div class="topbtn">
            <el-form :inline="true" :model="search_date">
                <el-form-item label="按照时间筛选：">
                    <el-date-picker
                    v-model="search_date.startTime"
                    type="datetime"
                    placeholder="选择开始时间"
                    default-time="12:00:00">
                    </el-date-picker>
                    --
                    <el-date-picker
                    v-model="search_date.endTime"
                    type="datetime"
                    placeholder="选择结束时间"
                    default-time="12:00:00">
                    </el-date-picker>
                    <el-button type="primary" size="small" style="margin-left: 10px;" @click="handleFilter()">筛选</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!-- 表格 -->
        <div class="table">
            <el-table
            max-height="450px"
            border
            :data="tableData"
            style="width: 100%">

            <el-table-column
            prop="id"
            align="center"
            label="序号"
            width="70">
            </el-table-column>

            <el-table-column
            prop="date"
            align="center"
            label="注册日期"
            width="300">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ formatDate(scope.row.date)}}</span>
                </template>
            </el-table-column>

            <el-table-column
            prop="username"
            align="center"
            label="用户名"
            width="150">
            </el-table-column>

            <el-table-column
            prop="email"
            align="center"
            label="邮箱"
            width="180">
            </el-table-column>

            <el-table-column
            prop="identity"
            align="center"
            label="身份"
            width="180"
            
            >
            </el-table-column>

            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button
                    size="small"
                    type="primary"
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
        <EditDialog :userData="userData" :dialog="dialog" @update="getUserInfo"/>
    </div>
</template>

<script>
import moment from 'moment'
import EditDialog from '@/components/EditDialog.vue'
export default {
    name: "userInfo",
    data() {
        return {
            tableData: [],
            allTableData: [],
            filterTableData:[],
            userData: {
                id: '',
                username: "",
                email: "",
                identity:""
            },
            dialog: {
                show:false
            },
            paginations: {
                page_index: 1,//当前位于哪页
                total: 0,//总数
                page_size: 5,//一页显示多少条
                page_sizes: [5, 10, 15, 20],//每页显示多少条
                layout: "total, sizes, prev, pager, next, jumper"
            },
            search_date: {
                startTime: "",
                endTime:""
            }
        }
    },
    created(){
        this.getUserInfo()
    },
    methods: {
        getUserInfo() {
            this.$axios.get('/api/userinfo')
                .then(res => {
                    this.allTableData = res.data.data
                    this.filterTableData = res.data.data
                    //设置分页数据
                    this.setTableData()
            })
        },
        formatDate(value) {
            return moment(value).format('YYYY-MM-DD HH:mm:ss');
        },
        handleEdit(index, row) {
            this.userData = {
                id: row.id,
                username: row.username,
                email: row.email,
                identity:row.identity
            }
            this.dialog = {
                show:true
            }
            
        },
        handleDelete(index,row) {
            this.$axios.post(`/api/userinfo/deleteuser/${row.id}`)
            
                .then(res => {
                    console.log(row.id);
                    console.log(res);
                    this.$message({
                        message: "删除用户信息成功！",
                        type: "success",
                        
                    })
                    this.getUserInfo()
                })
                .cache(err => {
                    this.$message({
                        message: "删除失败",
                        type:"error"
                    })
                })
        },
        //设置分页
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

            for (let i = index; i < num; i++) {
                if (this.allTableData[i]) {
                    tables.push(this.allTableData[i])
                }
                this.tableData = tables
            }

            console.log(page);
        },
        // 筛选
        handleFilter() {
            if (!this.search_date.startTime || !this.search_date.endTime) {
                this.$message({
                    type: "warning",
                    message:"请选择时间区间"
                })
                this.getUserInfo()
                return
            }

            const startTime = this.search_date.startTime.getTime()
            const endTime = this.search_date.endTime.getTime()
            this.allTableData = this.filterTableData.filter(item => {
                let date = new Date(item.date)
                let time = date.getTime()
                return time >= startTime && time <= endTime
            })

            this.setTableData()
        }
    },
    components:{EditDialog}
}
</script>

<style scoped>
.fillContainer{
    width: 100%;
    height: 100%;
    padding: 16px;
    box-sizing: border-box;
}
.pagination{
    float: right;
    margin-top: 10px;
}
</style>