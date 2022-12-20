<template>
    <div>
        <input :value="value" @input="onInput" v-bind="$attrs">
    </div>
</template>

<script>
export default {
    name:"FormInput",
    inheritAttrs:false,
    provide(){
        return {
            form : this,
        }
    },
    props:{
        value:{
            type:String,
            default:''
        }
    },
    methods: {
        onInput(e){
            this.$emit('input',e.target.value);

            this.$parent.$emit('validate')
        }
    },
}
</script>

<style>

</style>