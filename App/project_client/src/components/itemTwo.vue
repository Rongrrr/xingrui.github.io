<template>
    <div ref="myCharts" class="myCharts"></div>
</template>

<script>
import * as echarts from 'echarts'

export default {
    mounted() {
        let myCharts = echarts.init(this.$refs.myCharts)
        let option = {
            title: {
                text: '季度销售额'
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                type: 'category',
                data: ['一季度', '二季度', '三季度', '四季度']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: [800, 650, 1000, 900],
                    type: 'line',
                    lineStyle: {
                        color: '#006440'
                    },
                    areaStyle: {
                        color: '#EBFEF3'
                    },
                    markPoint: {
                        data: [
                            { type: 'max', name: '最高点' },
                            { type: 'min', name: '最低点' }
                        ],
                        backgroundColor: '#006440'
                    },
                    markLine: {
                        data: [
                            { type: 'average', name: '平均' }
                        ]
                    }
                }
            ]
        }
        myCharts.setOption(option)
    }
}
</script>

<style scoped>
.myCharts {
    height: 5.7rem;
}


</style>