//维护状态state
//修改状态commit
//业务逻辑控制dispatch
//状态激发getter
//state响应式
//插件
//mixin

let Vue;

class Store{
    constructor(options = {}){
        this.state = new Vue({
            data: options.state
        }) //利用vue响应式

        this.mutations = options.mutations || {}

        this.actions = optinos.actions || {}
    
        options.getters && this.handleGetters(options.getters)
    }

    commit = (type,...args) =>{
        const muta = this.mutations[type];
        muta(this.state,...args)
    }

    dispatch = (type , ...args)=>{
        const action = this.actions[type]
        return action({commit: this.commit , state: this.state} , ...args)
    }

    handleGetters(getters){
        this.getters = {};
        Object.keys(getters).forEach(key=>{
            Object.defineProperty(this.getters , key , {
                get:()=>{
                    return getters[key](this.state);
                }
            })
        })
    }
}

function install(_Vue){
    Vue = _Vue;

    //mixin
    Vue.mixin({
        beforeCreate(){
            if(this.$options.store){
                Vue.prototype.kvuex = this.$options.store;
            }
        }
    })
}

export default {Store,install}