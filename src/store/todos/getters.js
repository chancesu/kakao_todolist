export default {
  todos(state) {
    return (state.todos.length)? state.todos : [];
  },
  dayWords(state) {
    return state.dayWords;
  },
  dayImages(state) {
    return state.dayImages;
  },
  categories(state) {
    return (state.categories.length)? state.categories : [];
  },
  listType(state){
    return state.listType;
  }
};
