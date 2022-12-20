import {asyncRoutes , constRoutes} from '@/router'


//根据路由信息去确认用户是否拥有访问权限
function hasPermission(roles,route){
    if(route.meta && route.meta.roles){
        return roles.some(role => route.meta.roles.includes(role))
    } else {//未存在roles设置,则都可访问
        return true;
    }
}
//获取所有组件
export function filterAsyncRoutes(routes , roles){
    const res = [];
    routes.forEach(route=>{
        const tmp = {...route};
        if(hasPermission(roles,tmp)){
            if(tmp.children){
                tmp.children = filterAsyncRoutes(tmp.children,roles);
            }
            res.push(tmp);
        }
    })
    return res;
}

const state = {
    routes:[],  //完整路由表
    addRoutes:[]    //用户可访问路由表
}

const mutations = {
    set_routes:(state , routes)=>{
        state.addRoutes = routes;
        state.routes = constRoutes.concat(routes);
    }
}

const actions={
    generateRoutes({commit} , roles){
        return new Promise(resolve=>{
            let accessedRoutes;
            if(roles.includes("admin")){
                accessedRoutes = asyncRoutes || [];
            } else{
                accessedRoutes = filterAsyncRoutes(asyncRoutes , roles);
            }
            commit("set_routes" , accessedRoutes);
            resolve(accessedRoutes);
        })
    }
}

export default {
    namespaced:true,//开启命名空间
    state,
    mutations,
    actions,
}