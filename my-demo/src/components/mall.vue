<template>
    <div class="mall">
        <h3>{{msg}}</h3>
        <products v-for='product in testProducts' :key="product.id" :product='product'></products>
        <el-button @click="ToPay">去结算</el-button>
    </div> 
</template>
<script>
import products from './products'
import { mapGetters, mapActions } from 'vuex'
import axios from 'axios'
export default {
     name: 'mall',
     data () {
        return {
                msg: '欢迎选购商品',
                testProducts:[],
                // testSrc:"../assets/flower.jpg" 
        }
    },
    // computed:{        
    //     ...mapGetters('mallList',['product'])    
    // },   
    mounted(){
        this.init();
    },
    created(){
            
    },
    methods:{
        init(){
            this.testProducts=this.$store.state.mall.product;
            console.log('有没有：',this.testProducts)

            // console.log('testp:',this.testProducts)
            
        },
        ToPay(){
            console.log('去结算页面')
            this.$router.push('/pay');

        },
        // init(){
        //     console.log('是啥',this.testProduct)
        //     this.testSrc=this.testProduct[0].src
        //     console.log('第一个商品的src是：',this.testSrc,'类型是？',typeof this.testSrc);
        // }
        
    },
    components:{
        products
    }
   
}
</script>

<style scoped>

</style>>
