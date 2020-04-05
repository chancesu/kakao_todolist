<template>
  <div class="home wrap">
    <Layout>
      <TodoList></TodoList>
    </Layout>
  </div>
</template>

<script>
import Layout from '@/layouts/Layout.vue'
import TodoList from '@/components/TodoList.vue'

export default {
  name: 'Home',
  components: {
    Layout,
    TodoList
  }
}
</script>
