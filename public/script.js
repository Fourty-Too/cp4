var app = new Vue({
  el: '#app',
  data: {
    items: [],
  },
  created() {
    this.getItems();
  },
  methods: {
    async getItems() {
      try {
        let response = await axios.get("/api/items");
        this.items = response.data;
        response = await axios.get("/api/items");
        this.items = response.data;
        response = await axios.get("/api/items");
        this.items = response.data;
        response = await axios.get("/api/items");
        this.items = response.data;
        response = await axios.get("/api/items");
        this.items = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteItem(item) {
      try {
        let response = axios.delete("/api/items/" + item._id);
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
});
