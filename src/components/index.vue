<template>
 <div>
     <button @click="goToMall">去商场</button>
     <button@click="goToCanvas">去canvas</button>
 
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
       goToMall(){
            this.$router.push('/mall');
       }
 
   },
   components: {
 
   },
 }
</script>
<style scoped>
 
</style>
