<template>
  <div v-if="isShow">
      <h3>{{title}}</h3>
      <p>{{message}}</p>
  </div>
</template>

<script>


export default {
    props:{
        title:{
            type:String,
            default:''
        },
        message:{
            type:String,
            default:''
        },
        time:{
            type:Number,
            default:1000
        }
    },
    data() {
        return {
            isShow:false
        }
    },
    methods: {
        show(){
            this.isShow = true
            setTimeout(()=>{
                this.hide()
            },this.time)
        },
        hide(){
            this.isShow = false
        }
    },
}
</script>

<style>

</style>