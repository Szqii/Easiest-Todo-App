<template>
  <div class="container">
    <h1 class="text-center mt-5">The Easiest Todo App 🌟</h1>
    <div class="form-group">
      <label class="col-form-label col-form-label-lg" for="inputLarge"
        >New Todo ⚡</label
      >
      <input
        class="form-control form-control-lg"
        type="text"
        placeholder="Enter new todo"
        id="inputLarge"
        aria-describedby="toDoHelp"
        v-model="newTodo"
        @keyup.enter="addNewTodo()"
      />
      <small id="toDoHelp" class="form-text text-muted"
        >Todos you added will be storaged on local.</small
      >
    </div>
    <div align="center">
      <button
        type="submit"
        class="btn btn-outline-success mb-3 w-25 font-weight-bold"
        @click="addNewTodo()"
      >
        Add
        <span v-if="randomNumber == 0">😄</span>
        <span v-if="randomNumber == 1">🙃</span>
        <span v-if="randomNumber == 2">🤩</span>
        <span v-if="randomNumber == 3">😋</span>
        <span v-if="randomNumber == 4">🤫</span>
        <span v-if="randomNumber == 5">🧐</span>
      </button>
    </div>
    <ul class="list-group" v-if="toDoList.length > 0">
      <li class="list-group-item" v-for="(todo, i) in toDoList" :key="todo">
        <span :class="{ isDone: todo.isDone }">{{ todo.title }}</span>
        <div class="btn-group">
          <button
            class="btn btn-outline-warning"
            @click="markDone(todo)"
            v-if="!todo.isDone"
          >
          🍕 Done 
          </button>
            <button
            class="btn btn-outline-warning"
            @click="markDone(todo)"
            v-if="todo.isDone"
          >
          🍔 Undone 
          </button>
          <button class="btn btn-outline-danger" @click="deleteToDo(i)">
            Delete 🗑️
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  
  data() {
    return {
      newTodo: "",
      toDoList: [],
      isDone: false,
      randomNumber: 0,
    };
  },
  watch: {
    toDoList: {
      handler() {
        localStorage.toDoList = JSON.stringify(this.toDoList);
      },
      deep: true,
    },
  },
  mounted() {
    if (localStorage.toDoList) {
      this.toDoList = JSON.parse(localStorage.toDoList);
    }
  },
  methods: {
    addNewTodo() {
      if (this.newTodo == "" || this.newTodo.trim() == "") { // Fix add todo consisting of spaces only.
        this.$toast.open({
          message: "You can not add an empty todo.",
          type: "error",
        });
      } else if(this.newTodo.length < 2){ // Fix add todo consisting of just one letter.
        this.$toast.open({
          message: "You can not add one letter todo.",
          type: "error",
        });
        this.newTodo = ''
      } else {
        this.toDoList.push({
          title: this.newTodo,
          isDone: false,
        });
        this.newTodo = "";
        let number = Math.floor(Math.random() * 6);
        while (number == this.randomNumber) {
          number = Math.floor(Math.random() * 6);
        }
        this.randomNumber = number;
        this.$toast.open({
          message: "New todo added to list successfully.",
          type: "success",
        });
      }
    },
    markDone(todo) {
      todo.isDone = !todo.isDone;
    },
    deleteToDo(index) {
      this.toDoList.splice(index, 1);
    },
  },
}
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Righteous&display=swap");
* {
  font-family: "Righteous", cursive;
}
.list-group-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1rem 3rem;
  justify-content: space-between;
}
.isDone {
  text-decoration: line-through black;
  text-decoration-style: double;
}
span {
  font-size: 24px;
}
</style>
