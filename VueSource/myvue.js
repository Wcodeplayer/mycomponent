class MyVue{
    constructor(options){
        this.$options = options;

        this.$data = options.data;

        this.observe(this.$data);

        new Compile(options.el , this)
    }

    observe(value){

        if(!value || typeof value !== 'object'){
            return ;
        }

        Object.keys(value).forEach(key=>{
            //响应式处理
            this.defineReactive(value,key,value[key])
            this.proxyData(key)
        })

    }

    defineReactive(obj,key,val){
        //递归调用
        this.observe(val)

        //定义dep
        const dep = new Dep();

        Object.defineProperty(obj,key,{
            get(){
                Dep.target && dep.addDep(Dep.target);
                return val;
            },
            set(newVal){
                if(newVal !== val){
                    val = newVal;
                    dep.notify();
                }
            }
        })
    }

    proxyData(key){
        Object.defineProperty(this,key,{
            get(){
                return this.$data[key];
            },
            set(newVal){
                this.$data[key] = newVal;
            }
        })
    }
}

class Dep{//存储依赖 ， 通知对应watcher触发更新函数
    constructor(){
        this.deps = []
    }
    addDep(dep){
        this.deps.push(dep)
    }
    notify(){
        this.deps.forEach(dep=>dep.update())
    }
}

class watcher{//收集依赖 ， 保存依赖更新函数
    constructor(vm , key , recall){
        Dep.target = this;
        this.vm = vm;
        this.key = key;
        this.recall = recall;

        this.vm[this.key]; //触发依赖收集
        Dep.target = null;
    }
    update(){
        this.recall.call(this.vm , this.vm[this.key])
    }
}

