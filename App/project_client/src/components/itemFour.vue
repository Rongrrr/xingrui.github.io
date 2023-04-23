<template>
    <div>
        
        <div id="myChart" ref="myChart">
            图表容器
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
    
    mounted() {
        
        const myChart = echarts.init(this.$refs.myChart)
        myChart.setOption({
            title: {
                text: '产品库存',
                
            },
            
            tooltip: {
                //触发类型
                trigger: "axis",//item图形触发,axis线型触发
                // 坐标轴指示器
                axisPointer: {
                    type: 'shadow',//line显示实线，shadow阴影效果，corss十字准心
                }
            },
            legend: {
                show: false,//设置图例的显示或隐藏
                right: "10%",
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '13%',
                containLabel: true
            },
            xAxis: {
                type: 'value'
            },
            yAxis: {
                type: 'category',
                data: ["咖啡豆", "纯牛奶", "椰乳", "面粉", "奶油", "抹茶粉"]
            },
            series: {
                name: '库存',
                type: 'bar',
                data: [100, 50, 20, 40, 60, 90],
                itemStyle: {
                    normal: {
                        color: function (parmas) {
                            let colorList = ['#006440', '#00A768', '#79BC55', '#D2E4D6', '#EFE683', '#9FBB67']
                            return colorList[parmas.dataIndex]
                        }
                    }
                }
            }
        
        })
    }
}
</script>

<style>
#myChart{
    
    height: 5.7rem;
}
</style>