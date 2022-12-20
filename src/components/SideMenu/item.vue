<template>
    <li v-if="!model.hidden">
        <div @click="toggle">
            <Icon v-if="model.meta && moodel.meta.icon" :icon-class="model.meta.icon"></Icon>
            <span v-if='isFolder'>
                <span v-if='model.meta && model.meta.title'>{{model.meta.title}}</span>
                <span>[{{open ? '-' : '+'}}]</span>
            </span>
            <template>
                <router-link 
                    v-if="model.meta && model.meta.title"
                    :to='resolvePath(model.path)'>
                    
                    {{model.meta.title}}
                </router-link>
            </template>
        </div>
        <ul v-show="open" v-if="isFolder">
            <item class="item" 
                  v-for="route in model.children" 
                  :model="route" 
                  :key="route.path"
                  :base-path ="resolvePath(model.path)">
            </item>
        </ul>
    </li>
</template>

<script>
export default {
    name:"item",
    props:{
        model:Object,
        basePath:{
            type:String,
            default:''
        }
    },
    data: function(){
        return {
            open:false
        }
    },
    computed:{
        isFolder:function(){
            return this.model.children && this.model.children.length
        }
    },
    methods: {
        toggle:function(){
            if(this.isFolder){
                this.open = !this.open
            }
        },
        //拼接路径
        resolvePath(routePath){
            return this.basePath + routePath;
        }
    },
}
</script>

<style>

</style>