<template>
  <div class="write-wrap wrap">
    <Layout>
      <TodoForm/>
    </Layout>
  </div>
</template>

<script>
import Layout from '@/layouts/Layout.vue'
import TodoForm from '@/components/TodoForm.vue'

export default {
  name: 'Write',
  components: {
    Layout,
    TodoForm
  }
}
</script>
