//在body挂载vue实例的方法
import Vue from "vue";
export default function create(Component , props){
    //创建vue实例
    const vm = new Vue({
        render(h){
            return h(Component,{props})
        }
    })
    //获取vue对象
    const comp = vm.$root
    //挂载vue对象
    document.body.appendChild(vm.$el)
    //删除方法
    comp.remove = ()=>{
        document.body.removeChild(vm.$el)
        vm.$destroy
    }
    return comp
}