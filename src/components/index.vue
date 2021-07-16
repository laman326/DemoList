<template>
 <div>
     <button @click="goToMall">去商场</button>
     <button@click="goToCanvas">去横线对比canvas</button>
     <button@click="goToCanvas2">去竖线对比canvas</button>
     <button@click="goToZoom">师兄对比canvas</button>
     <button@click="goToSwiper">轮播图</button>
     <button@click="goToDrag">拖拽列表</button>
     <button @click="goToModal">蒙版</button>
     <button @click="goToDragModal">带蒙版的拖拽</button>
     <button @click="goToGallery">游廊用起来</button>
 
 </div>
</template>
<script>
 export default {
   name:'home',
   data () {
     return {
 
     }
   },
   computed:{
 
   },
   methods:{
       goToCanvas(){
            this.$router.push('/canvas');
       },
      goToCanvas2(){
            this.$router.push('/canvas2');
       },
       goToMall(){
            this.$router.push('/mall');
       },
       goToSwiper(){
            this.$router.push('/swiper');
       },
     goToZoom(){
          this.$router.push('/canvas-image')
     },
     goToDrag(){
          this.$router.push('/drag-demo')
     },
     goToModal(){
          this.$router.push('/modal')
     },
     goToDragModal(){
          this.$router.push('/dragModal')

     },
      goToGallery(){
          this.$router.push('/galleryDemo')

     },
 
   },
   components: {
 
   },
 }
</script>
<style scoped>
 
</style>
