<template>
  <div class="view-wrap wrap">
    <Layout>
      <TodoView/>
    </Layout>
  </div>
</template>

<script>
import Layout from '@/layouts/Layout.vue'
import TodoView from '@/components/TodoView.vue'

export default {
  name: 'TodoDetail',
  components: {
    Layout,
    TodoView
  }
}
</script>
