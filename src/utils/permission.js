// 全局路由解析和控制
import router from '@/router'
import store from '@/store'
import {getToken} from './auth'

const whiteList = ['/login']

router.beforeEach(async(to, from, next) => {
    // to and from are both route objects. must call `next`.
    const hasToken = getToken();

    if(hasToken){
        if(to.path == 'login'){
            next({path:'/'})
        }else{
            const hasRoles = store.getters.roles && store.getters.roles.length>0;
            if(hasRoles){
                next()
            }else{
                //获取需要的路由
                const  {roles} = await store.dispatch('user/getInfo')
                console.log(roles)
                const acyncRoutes = await store.dispatch('permission/generateRoutes',roles)
                //生成路由到router
                router.addRoutes(acyncRoutes)
                //重定向
                next({...to,replace:true})
            }
        }
    }else{
        if(whiteList.indexOf(to.path) !== -1){
            next();
        }else{
            next()
        }
    }
})