import Vuex from 'vuex'
import Vue from 'vue'

import user from './user'
import permission from './permission'

Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        permission , user
    },
    getters:{
        roles:state => state.user.roles,
        permission_routes: state => state.permission.routes
    }
})