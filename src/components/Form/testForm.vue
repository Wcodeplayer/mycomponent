<template>
      <Form :model="model" :rules ="rules" ref="loginForm">
        <FormItem label="username" prop="username">
            <FormInput
                v-model="model.username"
            >
            </FormInput>
        </FormItem>

        <FormItem label="password" prop="password">
            <FormInput
                v-model="model.password"
                type="password"
            >
            </FormInput>
        </FormItem>
        <FormItem>
          <button @click ="onLogin">login</button>
        </FormItem>
      </Form>
</template>

<script>
import Form from "./Form.vue"
import FormInput from './FormInput.vue'
import FormItem from './FormItem.vue'
export default {
  name: 'testForm',
  components: {
    Form,
    FormInput,
    FormItem
  },
  data() {
        return {
            model:{
                username:"",
                password:""
            },
            rules:{
                username:[
                    {required:true , message:"用户名缺失"}
                ],
                password:[
                    {required:true , message:"密码必填"}
                ]
            }
        }
    },
    methods: {
      onLogin(){
        this.$refs.loginForm.validate((isvali)=>{
          if(isvali){
            console.log(true)
          }
          else{
            console.log(false)
          }
        })
      }
    },
}
</script>

<style>
</style>
