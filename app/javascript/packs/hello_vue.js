/* eslint no-console: 0 */
// Run this example by adding <%= javascript_pack_tag 'hello_vue' %> (and
// <%= stylesheet_pack_tag 'hello_vue' %> if you have styles in your component)
// to the head of your layout file,
// like app/views/layouts/application.html.erb.
// All it does is render <div>Hello Vue</div> at the bottom of the page.

//import Vue from 'vue'
import Vue from 'vue/dist/vue.esm'
import VueResource from 'vue-resource'

Vue.use(VueResource)

document.addEventListener('DOMContentLoaded', () => {
  Vue.http.headers.common['X-CSRF-Token'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content')

  var element = document.getElementById("order-form")
  if (element != null) {
    var order = JSON.parse(element.dataset.order)
    var positions_attributes = JSON.parse(element.dataset.positionsAttributes)
    positions_attributes.forEach(pos => { pos._destroy = null })
    order.positions_attributes = positions_attributes

    var app = new Vue({
      el: element,
      data: function() {
        return { order: order }
      },
      methods: {
        addPosition: function() {
          this.order.positions_attributes.push({
            id: null,
            title: "",
            speciality_area: "",
            _destroy: null
          })
        },

        removePosition: function(index) {
          var player = this.order.positions_attributes[index]

          if (player.id == null) {
            this.order.positions_attributes.splice(index, 1)
          } else {
            this.order.positions_attributes[index]._destroy = "1"
          }
          
        },

        saveOrder: function() {
          if (this.order.id == null) {
            this.$http.post('/orders', { order: this.order }).then(response => {
              window.location = `/orders/${response.body.id}`
            }, error => {
              console.log(error)
            })
          } else {
            this.$http.put(`/orders/${this.order.id}`, { order: this.order }).then(response => {
              window.location = `/orders/${response.body.id}`
            }, error => {
              console.log(error)
            })
          }
        }
      }
    })
  }
})
