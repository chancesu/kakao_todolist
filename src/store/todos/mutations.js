export default {
  ADD_TODO(state, todo) {
    state.todos.push(todo);
  },
  ADD_CATEGORY(state, category){
    state.categories.push(category);
  },
  REMOVE_TODO(state, todos) {
    state.todos = todos;
  },
  COMPLETE_TODO(state, todo){
    todo.complete = true;
    state.todos.splice(state.todos.indexOf(todo),1,todo);
  },
  PUT_TODO(state, todo){
    state.todos.splice(state.todos.findIndex(t=> t.uuid == todo.uuid),1,todo);
  },
  MODIFY_SORT(state, type){
    state.listType = type;
  },
  REMOVE_CATEGORY(state,index){
    state.categories.splice(index,1);
  },
  MODIFY_WORDS(state,words){
    state.dayWords = words;
  }
};
