import Axios from "axios";

export default {
  data() {
    return {
      editing: false
    }
  },

  methods: {
    cancel() {
      this.restoreFromCache();
      this.editing = false;
    },
    
    delete() {},

    destroy() {
      this.$toast.question('Are you sure about that?', "Confirm", {
        timeout: 20000,
        close: false,
        overlay: true,
        displayMode: 'once',
        id: 'question',
        zindex: 999,
        title: 'Hey',
        message: 'Are you sure about that?',
        position: 'center',
        buttons: [
            ['<button><b>Yes</b></button>', (instance, toast) => {
    
                this.delete();

                instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
    
            }, true],
            ['<button>Cancel</button>', function (instance, toast) {
    
                instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
    
            }],
        ]
      });
    },

    edit() {
      this.setEditCache();
      this.editing = true;
    },
    
    payload() {},

    setEditCache() {},

    restoreFromCache() {},

    update() {
      Axios.put(this.endpoint, this.payload())      
      .catch(({response}) => {
        this.$toast.error(response.data.message, "Error", { timeout:3000 });
      })
      .then(({data}) => {
        this.bodyHtml = data.body_html;
        this.$toast.success(data.message, "Success", { timeout: 3000 });
        this.editing = false;
      });
    }
  }
}