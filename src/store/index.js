import Vue from 'vue';
import Vuex from 'vuex';
import api from '../services/api';

Vue.use(Vuex);

function __ajaxAction(fn) {
  return async function (ctx, ...args) {
    try {
      ctx.commit("startLoading");
      await fn.apply(this, [ctx, ...args]);
    } finally {
      ctx.commit("stopLoading");
    }
  };
}

export default new Vuex.Store({
  state: {
    authToken: localStorage.getItem('admin.authToken'),
    otpAuthKey: '',
    settings: [],
    runningTasks: 0
  },
  getters: {
    settings: state => state.settings,
    loading: state => state.runningTasks > 0,
    loggedIn: state => !!state.authToken,
    waitingForPin: state => !!state.otpAuthKey
  },
  actions: {

    // ------------------------------------------
    loadSettings: __ajaxAction(async (ctx) => {
      const { goodcity_settings } = await api.get('/api/v1/goodcity_settings')
      ctx.commit("settings", goodcity_settings);
    }),

    // ------------------------------------------
    updateSetting: __ajaxAction(async (ctx, goodcity_setting) => {
      await api.putJSON(
        `/api/v1/goodcity_settings/${goodcity_setting.id}`,
        { goodcity_setting },
        ctx.state.authToken
      );
    }),

    // ------------------------------------------
    createSetting: __ajaxAction(async (ctx, goodcity_setting) => {
      await api.postJSON(`/api/v1/goodcity_settings`,
        { goodcity_setting }, ctx.state.authToken
      );
      return ctx.dispatch('loadSettings');
    }),

    // ------------------------------------------
    deleteSetting: __ajaxAction(async (ctx, id) => {
      await api.delete(`/api/v1/goodcity_settings/${id}`, ctx.state.authToken);
      return ctx.dispatch('loadSettings');
    }),

    // ------------------------------------------
    sendPin: __ajaxAction(async (ctx, mobile) => {
      const { otp_auth_key } = await api.postJSON('/api/v1/auth/send_pin', {
        mobile: (/^\+852/.test(mobile)) ? mobile : `+852${mobile}`
      });
      ctx.commit("otpAuthKey", otp_auth_key);
    }),

    // ------------------------------------------
    verify: __ajaxAction(async (ctx, pin) => {
      const { jwt_token } = await api.postForm('/api/v1/auth/verify', {
        pin: pin,
        otp_auth_key: ctx.state.otpAuthKey,
      });
      ctx.commit("authToken", jwt_token);
      ctx.commit("otpAuthKey", "");
    }),

    // ------------------------------------------
    logout(ctx) {
      ctx.commit("authToken", "");
    }
  },
  mutations: {
    startLoading(state) {
      state.runningTasks++;
    },
    stopLoading(state) {
      state.runningTasks--;
    },
    settings(state, data) {
      state.settings = data;
    },
    otpAuthKey(state, key) {
      state.otpAuthKey = key;
    },
    authToken(state, token) {
      localStorage.setItem('admin.authToken', token);
      state.authToken = token;
    }
  }
});