<template>
  <div class="write-wrap wrap">
    <Layout>
      <AppSetting/>
    </Layout>
  </div>
</template>

<script>
import Layout from '@/layouts/Layout.vue'
import AppSetting from '@/components/AppSetting.vue'

export default {
  name: 'Write',
  components: {
    Layout,
    AppSetting
  }
}
</script>
