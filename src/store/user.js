import {getToken , setToken , removeToken} from '@/utils/auth'

const state = {
    token: getToken(),
    roles: []
}

const mutations ={
    set_token:(state , token)=>{
        state.token = token;
    },
    set_roles:(state,roles)=>{
        state.roles=roles;
    }
}

const actions = {
    login({commit} , userInfo){
        const username = userInfo;
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                if(userInfo.username == "admin"){
                    commit("set_token" , username);
                    setToken(username)
                    resolve();
                }else{
                    reject(`非已有用户`)
                }
            },0)
        })
    },
    getInfo({commit , state}){
        return new Promise(resolve=>{
            setTimeout(() => {
                const roles = state.token === 'admin' ? ['admin'] : ['editor'];
                commit('set_roles' , roles);
                resolve({roles});
            }, 0);
        })
    },
    //remove token
    resetToken({ commit }){
        return new Promise(resolve=>{
            commit("set_token","")
            commit("set_roles",[]);
            removeToken();
            resolve();
        })
    }
}

export default {
    namespaced:true,//开启命名空间
    state,
    mutations,
    actions,
}