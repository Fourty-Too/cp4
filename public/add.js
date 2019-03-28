var app = new Vue({
  el: '#add',
  data: {
    title: "",
    description: "",
    price: "",
    file: null,
    addItem: null,
    items: [],
    findTitle: "",
    findItem: null,
  },
  created() {
    this.getItems();
  },
  computed: {
    findTitles() {
      return this.items.filter(item => item.title.toLowerCase().startsWith(this.findTitle.toLowerCase()));
    },
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0]
    },
    async upload() {
      try {
        const formData = new FormData();
        formData.append('photo', this.file, this.file.name);
        console.log(this.title);
        console.log(this.description);
        console.log(this.price);
        let r1 = await axios.post('/api/photos', formData);
        let r2 = await axios.post('/api/items', {
          title: this.title,
          description: this.description,
          price: this.price,
          path: r1.data.path
        });
        console.log(r2.data);
        this.addItem = r2.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getItems() {
      try {
        let response = await axios.get("/api/items");
        this.items = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async editItem(item) {
      try {
        let response = await axios.put("/api/items/" + item._id, {
          title: this.findItem.title,
          description: this.findItem.description,
          price: this.findItem.price,
        });
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    selectItem(item) {
      this.findTitle = "";
      this.findItem = item;
    },
  }
});
