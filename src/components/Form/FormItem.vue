<template>
  <div>
      <label v-if="label">
          {{label}}
      </label>
      <slot></slot>
      <p v-if="errMessage">
          {{errMessage}}
      </p>
  </div>
</template>

<script>

export default {
    components:{
        FormInput
    },
    data() {
        return {
            errMessage:''
        }
    },
    inject:['form'],
    props:{
        label:{
            type: String ,
            default: ''
        },
        prop: String,
    },
    mounted() {
        this.$on('validate',()=>{
            this.validate();
        })
    },
    methods: {
        validate(){//校验
            const rules = this.form.rules[this.prop]
            //对应规则
            const value = this.form.model[this.prop]
            //当前值

            //check
            return new Promise((resolve,reject)=>{
                if(rules[0].required && value == ""){
                    this.errMessage = rules[0].message
                    reject()
                }
                else{
                    this.errMessage = ""
                    resolve(true)
                }
            })
        }
    },
}
</script>

<style>

</style>