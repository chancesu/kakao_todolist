export default {
  addTodo({ commit }, todo) {
    commit("ADD_TODO", todo);
  },
  addCategory({commit}, category){
    commit("ADD_CATEGORY", category);
  },
  removeTodo({ commit }, todos) {
    commit("REMOVE_TODO", todos);
  },
  completeTodo({ commit }, todo){
    commit("COMPLETE_TODO", todo);
  },
  putTodo({ commit }, todo){
    commit("PUT_TODO", todo);
  },
  modifySort({ commit }, type){
    commit("MODIFY_SORT",type);
  },
  deleteCategory({ commit }, index){
    commit("REMOVE_CATEGORY",index);
  },
  modifyDayWords({ commit}, words){
    commit("MODIFY_WORDS",words);
  }
};
