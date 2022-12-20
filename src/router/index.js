import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from "@/layout"

Vue.use(VueRouter)


export const constRoutes = [
  {
    path:"/login",
    component:()=>import("@/views/Login"),
    hidden:true //导航忽略
  },
  {
    path:"/",
    component:Layout,
    redirect:"/home",
    children:[
      {
        path:"home",
        component:()=>import("@/views/Home"),
        name:"home",
        meta:{title:"Home"}
      }
    ]
  }
]

export const asyncRoutes = [
  {
    path:"/about",
    component:Layout,
    redirect:"/about/index",
    children:[
      {
        path:"index",
        component:()=> import("@/views/About"),
        name:"ahout",
        meta:{
          title:"About",
          roles:['admin' , 'editor']
        }
      }
    ]
  }
]

export default new VueRouter({
  mode:"history",
  base: process.env.BASE_URL,
  routes: constRoutes
})