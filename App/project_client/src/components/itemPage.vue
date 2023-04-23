<template>
  <div class="item">
    <slot></slot>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.item{
    height: 5.125rem;
    border: 1px solid #eee;
    border-radius: 10px;
    box-shadow: 3px 3px 5px 2px #eee;
    margin:5px 10px ;
    background-color: white;
}
</style>