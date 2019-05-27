<template>
  <div class="login-form">
    <div>
      <label> Mobile </label>
      <el-input type="text" v-model="mobile" autocomplete="on" :disabled="waitingForPin"></el-input>
      <el-button v-if="!waitingForPin" type="primary" @click="sendPin">submit</el-button>
    </div>
    <div v-if="waitingForPin">
      <label> Pin </label>
      <el-input type="text" v-model="pin" autocomplete="on"></el-input>
      <el-button type="primary" @click="verify">submit</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ErrorMixin from '../mixins/error';

export default {
  name: 'login-form',
  mixins: [ErrorMixin],
  data() {
    return {
      mobile: "",
      pin: ""
    };
  },
  computed: {
    ...mapGetters(['waitingForPin'])
  },
  methods: {
    // ------------------------------------------
    async sendPin() {
      if (this.mobile.length !== 8) {
        return this.error('Mobile should be 8 chars');
      }
      try {
        await this.$store.dispatch("sendPin", this.mobile);
      } catch (e) {
        this.error(e);
      }
    },

    // ------------------------------------------
    async verify() {
      if (!this.pin) return;
      try {
        await this.$store.dispatch("verify", this.pin);
      } catch (e) {
        this.error(e);
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>