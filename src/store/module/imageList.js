const imageList = {
  namespaced: true, // 增加命名空间
  state: {
    imgs: [
      { index: 1, title: "鲜花", src: "../../../static/flower.jpg" },
      { index: 2, title: "营业", src: "../../../static/营业.jpg" },
      { index: 3, title: "本草纲目", src: "../../../static/本草.jpg" },
      { index: 4, title: "plant", src: "../../../static/plant.jpg" },
      { index: 5, title: "plant2", src: "../../../static/plant2.png" },
      { index: 6, title: "DSC01127", src: "../../../static/DSC01127.jpeg" },
      // { index: 7, title: "DSC01129", src: "../../../static/DSC01129.jpeg" },
      // { index: 8, title: "双鱼座", src: "../../../static/双鱼座.jpg" },
      // { index: 9, title: "天秤座", src: "../../../static/天秤座.jpg" },
      // { index: 10, title: "射手座", src: "../../../static/射手座.jpg" },
      // { index: 11, title: "雨滴", src: "../../../static/1雨滴 .mp4" }
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
      console.log("newImageList", newImageList);
      state.imgs = newImageList;
    }
  },
  actions: {
    deleteImg({ commit }, image) {
      commit("deleteImg", image);
    },
    setNewImg({ commit }, newImageList) {
      console.log(`----------这？------------`);
      commit("setImg", newImageList);
    }
  }
};
export default imageList;
