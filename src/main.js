import Vue        from 'vue'
import Vuex       from 'vuex'
import store      from "./store";
import App        from './App'
import ElementUI  from 'element-ui'
import locale     from 'element-ui/lib/locale/lang/en'

import 'element-ui/lib/theme-chalk/index.css'
import './styles/global.scss'

Vue.use(ElementUI, { locale });

export function render(selector) {
  new Vue({
      store,
      render: h => h(App)
  }).$mount(selector);
};