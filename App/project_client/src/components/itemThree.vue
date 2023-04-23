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
                text: '受众人群'
            },
            tooltip: {

            },
            radar: [
                {
                    indicator: [
                        { name: '00后', max: 6500 },
                        { name: '90后', max: 16000 },
                        { name: '80后', max: 3000 },
                        { name: '70后', max: 580 },
                        { name: '60后', max: 350 },

                    ],
                    splitArea: {
                        areaStyle: {
                            color: ["#EBFEF3", "#90E3B8"],
                            shadowColor: "0,0,0,.2",
                            shadowBlur: 10
                        }
                    },
                },

            ],

            series: {
                type: 'radar',
                data: [
                    {
                        name: '受众人群',
                        value: [6000, 15000, 2000, 480, 200],
                        areaStyle: {
                            color: 'rgba(255,250,0,.2)'
                        }
                    }
                ],
                lineStyle: {
                    color: "#006440"
                }
            },

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