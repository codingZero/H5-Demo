
var storage = {
    save: function (key, value) {
        localStorage.setItem(key, JSON.stringify(value))
    },
    fetch: function (key) {
        return JSON.parse(localStorage.getItem(key)) || []
    }
}

var filter = {
    all: function () {
        return list;
    },
    finished: function () {
        return list.filter(function (item) {
            return item.isChecked
        })
    },
    unfinished: function () {
        return list.filter(function (item) {
            return !item.isChecked
        })
    }
}

var list = storage.fetch('todoList')

var vm = new Vue({
    el: '.main',
    data: {
        list: list,
        todo: '',
        editTodo: '',
        beforeTitle: '',
        type: 'all'
    },
    watch: {
      list: {
          handler: function () {
              storage.save('todoList', this.list)
          },
          deep: true
      }
    },
    methods: {
        addTodo: function () {
            this.list.push({
                title: this.todo,
                isChecked: false
            })
            this.todo = ''
        },
        deleteTodo: function (item) {
            let index = this.list.indexOf(item)
            console.log(index)
            this.list.splice(index, 1)
        },
        editingTodo: function (todo) {
            this.beforeTitle = todo.title;
            this.editTodo = todo;
        },
        endEdit: function () {
            this.editTodo = ''
        },
        cancelEdit: function (todo) {
            todo.title = this.beforeTitle
            this.editTodo = ''
        }
    },
    computed: {
        noCompletedLength: function () {
            return this.list.filter(function (item) {
                return !item.isChecked
            }).length
        },
        filterList: function () {
            return filter[this.type]? filter[this.type]() : list;
        }
    },
    directives: {
        "focus": {
            update: function (el) {
                el.focus()
            }
        }
    }
})

function whenHashChange() {
    vm.type = window.location.hash.slice(1)
}

whenHashChange()

window.addEventListener("hashchange", whenHashChange)
