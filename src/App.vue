<template>
  <el-container v-loading="loading">
    <el-main>
      <div v-if="loggedIn">
        <settings-editor></settings-editor>
      </div>
      <div v-else>
        <login-form></login-form>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import { mapGetters } from 'vuex';
import SettingsEditor from './views/SettingsEditor';
import LoginForm from './views/LoginForm';

export default {
  name: 'app',
  components: { SettingsEditor, LoginForm },
  mounted() {
    this.$store.dispatch('loadSettings');
  },
  computed: {
    ...mapGetters(['loggedIn', 'loading'])
  }
}
</script>

<style lang="scss" scoped>

</style>


