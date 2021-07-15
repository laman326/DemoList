const imageList = {
  namespaced: true, // 增加命名空间
  state: {
    imgs: [
      { title: "鲜花", src: "../../../static/flower.jpg" },
      { title: "营业", src: "../../../static/营业.jpg" },
      { title: "本草纲目", src: "../../../static/本草.jpg" },
      { title: "plant", src: "../../../static/plant.jpg" },
      { title: "plant2", src: "../../../static/plant2.png" },
      { title: "DSC01127", src: "../../../static/DSC01127.jpeg" },
      { title: "DSC01129", src: "../../../static/DSC01129.jpeg" },
      { title: "双鱼座", src: "../../../static/双鱼座.jpg" },
      { title: "天秤座", src: "../../../static/天秤座.jpg" },
      { title: "射手座", src: "../../../static/射手座.jpg" }
    ]
  },
  getters: {
    imageList: state => state.imgs
  },
  mutations: {
    deleteImg(state, image) {
      console.log("删除啦");

      let tmp = state.imgs;
      let index = tmp.indexOf(image);
      tmp.splice(index, 1);
      state.imgs = tmp;
      console.log("图片列表呢？", state.imgs);
      // state.product.push(payload);
    },
    setImg(state, newImageList) {
      state.imgs = newImageList;
    }
  },
  actions: {
    deleteImg({ commit }, image) {
      commit("deleteImg", image);
    },
    setNewImg({ commit }, newImageList) {
      commit("setImg", newImageList);
    }
  }
};
export default imageList;
