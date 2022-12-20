let Vue;
class VueRouter{
    constructor(options){
        this.$options = options;
        
        // 创建一个路由path和Component的映射
        this.routeMap = {};

        this.app = new Vue({
            data:{
                current:'/'
            }
        })
    }
    init(){
        //绑定浏览器事件
        this.bindEvents()

        //解析路由配置
        this.createRouteMap(this.$options)

        //创建routerLink和routerView组件来显示对应内容
        this.initComponent()
    }
    bindEvents(){
        window.addEventListener('hashchange',this.onHashchange.bind(this))
        window.addEventListener('load',this.onHashchange.bind(this))
    }
    onHashchange(){
        this.app.current = window.location.hash.slice(1) || '/'
    }
    createRouteMap(options){
        options.routes.forEach(item=>{
            this.routeMap[item.path] = item
        })
    } 
    initComponent(){
        //声明全局组件
        Vue.component('router-link',{
            props:{
                to:String
            },
            render(h){
                // 渲染 内容为 <a :href="to"> slots </a>
                return h('a',{attrs:{href:'#'+this.to}},this.$slots.default)

                // return  <a href={this.to}>{this.$slots.default}</a>
                //jsx
            }
        })

        Vue.component('router-view',{
            render:(h)=>{
                const Comp = this.routeMap[this.app.current].component;
                return h(Comp)
            }
        })
    }
}

// VueRouter --> 插件

VueRouter.install = function(_Vue){
    Vue = _Vue

    Vue.mixin({
        beforeCreate(){
            // 外部初始化时调用
            if(this.$options.router){
                Vue.prototype.$router = this.$options.router;
                this.$options.router.init();
            }
        }
    })
}

export default VueRouter