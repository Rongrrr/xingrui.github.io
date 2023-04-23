<template>
  <section class="container">
    <!-- 左容器 -->
    <section class="leftItem">
      <itemPage>
        <itemOne/>
      </itemPage>

      <itemPage>
        <itemTwo/>
      </itemPage>
    </section>
    <!-- 中容器 -->
    <section class="centerItem">
      <mapPage></mapPage>
    </section>
    <!-- 右容器 -->
    <section class="rightItem">
      <itemPage>
        <itemThree/>
      </itemPage>

      <itemPage>
        <itemFour/>
      </itemPage>
    </section>
  </section>
</template>

<script>
import itemPage from '@/components/itemPage.vue';
import itemOne from '@/components/itemOne.vue'
import itemTwo from '../components/itemTwo.vue';
import itemThree from '../components/itemThree.vue';
import itemFour from '../components/itemFour.vue';
import mapPage from '@/components/mapPage.vue';

export default {
  name: 'homePage',
  components: {
      itemPage, itemOne, itemTwo, itemThree, itemFour,mapPage
    }
}
</script>

<style scoped>
.container{
  display: flex;
}
.leftItem,.rightItem{
  flex: 3;
}
.centerItem{
  flex: 5;
  height: 10.5rpx;
  border: 1px solid #eee;
  border-radius: 10px;
  box-shadow: 3px 3px 5px 2px #eee;
  margin:5px 5px ;
  background-color: white;
}
</style>