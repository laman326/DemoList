const mallList = {
  namespaced: true, // 增加命名空间
  state: {
    product: [
      { id: 1, name: "鲜花", price: 10, isShop: true, number: 1 },
      { id: 2, name: "大白菜", price: 5, isShop: true, number: 1 },
      { id: 3, name: "玩具", price: 15, isShop: true, number: 1 }
    ]
  }
  //   getters:{
  //     //   return state.product
  //   }
};

export default mallList
