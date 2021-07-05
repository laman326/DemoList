import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store=new Vuex.Store({
    state:{
        products:[
            {"id":1,"name":"鲜花","price":10,isShop:true,number:1},
            {"id":2,"name":"大白菜","price":5,isShop:true,number:1},
            {"id":3,"name":"玩具","price":15,isShop:true,number:1},
        ],
        shoppingcart:[],

    },
    getters:{
        findCartLength:state => {
            var length=0;
            // console.log('length变动：',state.shoppingcart.length)
            for(var i=0;i<state.shoppingcart.length;i++){
                console.log(state.shoppingcart[i].number)
                length+=state.shoppingcart[i].number
            } 

            return length
        },
        totalPrice:state =>{
            var price=0;
            // var item;
            for(var i=0;i<state.shoppingcart.length;i++){
                console.log(state.shoppingcart[i].price)
                price+=state.shoppingcart[i].price*state.shoppingcart[i].number;
            } 
            return price
        },
        getProduct:(state) =>(id) =>{
            const item = state.shoppingcart.find(item=>item.id===id);
            if(item){
                return true;
            }else{
                return false;
            }
        },
        getNumber:(state) => (id) =>{
            // debugger
             const item = state.shoppingcart.find(item=>item.id===id)||{number:0}
            return item.number
        }
        
    },
    mutations:{
        addProduct(state,payload){
            state.shoppingcart.push(payload);
        },
        addNumber(state,payload){
            // var item=
           state.shoppingcart.filter(product => product.id==payload.id)[0].number++;
            // console.log('这个元素选中了吗？',item);
            // item.number+=1;
            console.log('这个元素number？',state.shoppingcart);
        },
    },
    actions:{
        increment({commit},payload){
            setTimeout(() =>{
                commit('addNumber',payload)
            },1000)
        }
    }

})

export default store;