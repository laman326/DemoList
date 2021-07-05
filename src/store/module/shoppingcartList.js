const shoppingcart = {
  namespaced: true, // 增加命名空间
  state: {
    product: []
  },
  getters: {
    findCartLength: state => {
      var length = 0;
      // console.log('length变动：',state.shoppingcart.length)
      for (var i = 0; i < state.product.length; i++) {
        console.log(state.product[i].number);
        length += state.product[i].number;
      }

      return length;
    },
    totalPrice: state => {
      var price = 0;
      // var item;
      for (var i = 0; i < state.product.length; i++) {
        console.log(state.product[i].price);
        price += state.product[i].price * state.product[i].number;
      }
      return price;
    },
    getProduct: state => (id) => {
      const item = state.product.find(item => item.id === id);
      if (item) {
        return true;
      } else {
        return false;
      }
    },
    getNumber: state => id => {
      // debugger
      const item = state.product.find(item => item.id === id) || {
        number: 0
      };
      return item.number;
    }
  },
  mutations: {
    addProduct(state, payload) {
      state.product.push(payload);
    },
    addNumber(state, payload) {
      // var item=
      state.product.filter(product => product.id == payload.id)[0]
        .number++;
      // console.log('这个元素选中了吗？',item);
      // item.number+=1;
      console.log("这个元素number？", state.product);
    }
  },
  actions: {
    increment({ commit }, payload) {
      setTimeout(() => {
        commit("addNumber", payload);
      }, 1000);
    }
  }
};
export default shoppingcart
  
