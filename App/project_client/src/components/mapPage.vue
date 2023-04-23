<template>
    <div class="map" ref="map"></div>
</template>

<script>
import * as echarts from 'echarts'
import { mapData } from '../assets/map/mapData'

export default {

    mounted() {
        
        let myEcharts = echarts.init(this.$refs.map)
        //注册当前使用的地图名
        echarts.registerMap("chinaMap", mapData)
        let option = {
            geo: {//地理坐标组件
                type: 'map',
                map: 'chinaMap',
                roam: true,//平移或缩放
                itemStyle: {
                    areaColor: "#E4EEDC",
                    borderColor: "#698757",
                    emphasis: {
                        focus:"self"
                    }
                }
            },
            title: {
                text:"全国门店分布"
            },
            tooltip: {
                trigger: "item",
                formatter: '{b}'
            },
            series: [
                //散点图
                {
                    type: 'scatter',
                    itemStyle: {
                        color:"#006440"
                    },
                    data: [
                        { name: "北京灯市口天客隆咖啡店", value: [116.41, 39.92] },
                        { name: "北京万博苑咖啡店", value: [116.36, 39.87] },
                        { name: "北京建国路咖啡店", value: [116.50, 39.91] },
                        { name: "天津融创天拖店", value: [117.14, 39.11] },
                        { name: "天津金座广场咖啡店", value: [117.14, 39.11] },
                        { name: "石家庄天河方圆荟店", value: [114.44, 38.09] },
                        { name: "石家庄辛集万达店", value: [115.23, 37.95] },
                        { name: "重庆渝北吾悦广场店", value: [106.58, 29.72] },
                        { name: "重庆龙湖两江星悦荟店", value: [106.57, 29.64] },
                        { name: "重庆涪陵万达广场店", value: [107.42, 29.70] },
                        { name: "济南万虹广场店", value: [117.13, 36.72] },
                        { name: "淄博山东理工大学店", value: [118.04, 36.81] },
                        { name: "泰安万达广场店", value: [117.09, 36.18] },
                        { name: "阳泉万达广场店", value: [113.59, 37.88] },
                        { name: "太原钟楼街店", value: [112.56, 37.87] },
                        { name: "西安兵马俑博物馆店", value: [109.28, 34.39] },
                        { name: "西安机场3店", value: [108.92, 34.36] },
                        { name: "新乡宝龙城市广场店", value: [113.93, 35.29] },
                        { name: "许昌新田360广场店", value: [113.85, 34.03] },
                        { name: "滁州天长吾悦广场店", value: [119.00, 32.66] },
                        { name: "南京金象城店", value: [118.74, 32.13] },
                        { name: "南昌吾悦广场店", value: [115.80, 28.69] },
                        { name: "武汉绿地汉口中心店", value: [114.29, 30.66] },
                        { name: "长沙星沙新城吾悦广场店", value: [113.10, 28.25] },
                        { name: "海口万达店", value: [110.28, 19.98] },
                        { name: "上海华润时代广场店", value: [121.52, 31.23] },
                        { name: "成都七一广场店", value: [104.17, 30.82] },
                        { name: "泸州摩尔国际广场", value: [105.45, 28.89] },
                        { name: "广州萝岗万达店", value: [113.47, 23.17] },
                        { name: "湖州吾悦广场店", value: [120.10, 30.91] },
                        { name: "厦门同安宝龙广场店", value: [118.17, 24.72] },
                        { name: "贵阳中大国际购物中心店", value: [116.43, 39.92] },
                        {name:"南宁华润幸福里店",value:[108.39, 22.81]}
                    ] ,
                    coordinateSystem: 'geo',//指定坐标系为地理坐标
                },
                
            ],

        }
        myEcharts.setOption(option)

        //图表自适应浏览器屏幕大小
        window.addEventListener('resize', () => {
            myEcharts.resize()
        })

        
    }
}
</script>

<style>
.map {
    height: 100%;
    width: 100%;
}
</style>