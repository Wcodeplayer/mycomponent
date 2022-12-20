<template>
    <div>
        <crumbItem v-for="crumbItem in crumbData" :key="crumbItem.name" :Item="crumbItem"></crumbItem>
    </div>
</template>

<script>
import crumbItem from './crumbItem.vue'
export default {
    name:"crumb",
    components:{
        crumbItem
    },
    data(){
        return {
            crumbData:[]
        }
    },
    watch:{
        $route:{
            handler(route){
                console.log(this.$route.matched);
                this.crumbData = this.$route.matched.map(m=>m.name || m.redirect)
            },
            immediate:true
        }
    }
}
</script>

<style>

</style>