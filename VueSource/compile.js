class Compile{
    constructor(el , vm){
        this.$vm = vm;
        this.$el = document.querySelector(el);
        
        this.$fragment = this.node2Fragment(this.$el);

        this.compile(this.$fragment);

        this.$el.appendChild(this.$fragment);

    }

    node2Fragment(el){
        const fragment = document.createDocumentFragment();
        let child;
        while(child = el.firstChild){
            fragment.appendChild(child);
            //appendChild移动child
        }
        return fragment;
    }

    compile(el){
        const childNodes = el.childNodes;
        Array.from(childNodes).forEach(node=>{
            if(node.nodeType == 1){
                //element
                // console.log("编译元素:" + node.nodeName)
                this.compileElement(node)

            }else if(this.isInter(node)){
                // console.log("插值元素:" + node.textContent);
                this.compileText(node);
            }
            //递归
            if(node.children && node.childNodes.length > 0){
                this.compile(node);
            }
        })
    }

    isInter(node){
        return node.nodeType==3 && /\{\{(.*)\}\}/.test(node.textContent)
    }

    compileElement(node){
        //支持k-text , k-html , k-model
        const nodeAttrs = node.attributes;

        Array.from(nodeAttrs).forEach(attr=>{
            // xxx = yyy;
            const attrName = attr.name;//xxx
            const attrValue = attr.value;//yyy

            if(attrName.indexOf("k-") == 0){
                const dir = attrName.substring(2);
                this[dir] && this[dir](node , attrValue);
            }
            if(attrName.indexOf("@")==0){
                const dir = attrName.substring(1);
                this.eventHandler(node,this.$vm,attrValue,dir);
            }
        })
    }
    text(node , attrValue){
        this.update(node,attrValue,'text')
    }
    html(node , attrValue){
        this.update(node,attrValue,'html')
    }
    eventHandler(node , vm , methodName , dir){
        const recall = vm.$options.methods[methodName];
        if(recall && dir){
            node.addEventListener(dir , recall.bind(vm))
            //在对应的vue组件中添加监听
        }
    }


    compileText(node){
        // 编译插值元素，页面文本替换为对应值
        const exp = RegExp.$1;
        //node.textContent = this.$vm[RegExp.$1];
        this.update(node,exp,'text');
    }
    update(node,exp,dir){
        //对应方法
        const updater = this[dir+'Updater'];
        updater && updater(node , this.$vm[exp])
        //初始化的显示

        new watcher(this.$vm , exp , function(value){
            updater && updater(node , value)
        })
        //创建watcher实例，接管更新方式
    }

    textUpdater(node,value){
        node.textContent = value;
    }
    htmlUpdater(node,value){
        node.innerHTML = value
    }
    modelUpdater(node,value){
        node.value = value
    }
}