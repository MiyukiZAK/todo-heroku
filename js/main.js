(function(){
  'use strict';

  let app = new Vue({
    el: '#app',
    data: {
      newItem: '',
      todos: []
  },
  watch: {
    todos:{
      handler: function(){
        localStorage.setItem('todos', JSON.stringify(this.todos));
      },
      deep: true
    }
  },
  mounted: function (){
    this.todos = JSON.parse(localStorage.getItem('todos')) || [];
  },

  methods: {
    addItem:function(){
      let item = {
        title: this.newItem,
        isDone: false
      };
      this.todos.push(item);
      this.newItem = '';
    },
    deleteItem:function(index){
      if(confirm('Are you sure to delete?')){
        this.todos.splice(index, 1);
      }
    },
    purge:function(){
      if(!confirm('Finished deleting?')){
        return;
      }
      this.todos = this.remaining;
        
    }
  },
  computed: {
      remaining: function(){
        return this.todos.filter(function(todo){
          return !todo.isDone;
        });
      }
    }
  }) 
})();
