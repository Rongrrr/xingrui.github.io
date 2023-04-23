<template>
  <div ref="circle_charts" class="circle_charts">
    
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'homePage',
  mounted() {
    let mycharts = echarts.init(this.$refs.circle_charts)
    let data = [
      { value: 20, name: '美式咖啡' },
      { value: 25, name: '拿铁咖啡' },
      { value: 35, name: '卡布奇诺' },
      { value: 45, name: '生椰拿铁' },
      { value: 50, name: '陨石拿铁' },
    ]
    let option = {
      title: {
        text: '热销产品',
        subtext: '产品详情',
        sublink: 'http://localhost:8081/goodslist',
        subtarget:'self'
      },
      tooltip: {
        trigger: "item",
        formatter: '{b}:{d}%'
      },
      
      legend: {
        show: true,
        right: 'right',
        
      },
      series: [
        {
          name: '招牌饮料销售额',
          type: 'pie',
          radius: [20, 100],//设置半径，第一项为内半径，第二项为外半径
          center: ['50%', '50%'],
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          roseType: 'area',
          label: {
            show: true,
            position: 'inside',//outside,inside,center
            formatter: '{d}%'
          },
          itemStyle: {
            borderRadius: 8,
            color: function (parmas) {
              let colorList = ['#006440', '#00A768', '#79BC55', '#D2E4D6', '#EFE683']
              return colorList[parmas.dataIndex]
            }
          },
          data
        },


      ]
    }
    mycharts.setOption(option)

    
  }
}
</script>

<style scoped>
.circle_charts {
  
  height: 5.7rem;

}
</style>