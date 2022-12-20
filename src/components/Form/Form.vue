<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>

export default {
    props:{
        model:{
            type:Object,
            required:true
        },
        rules:{
            type:Object
        }
    },
    methods: {
        validate(callback){
            const validates = this.$children
                .filter(item=>item.prop)
                .map( item => item.validate());

            Promise.all(validates)
                .then(()=>callback(true))
                .catch(()=>callback(false));
        }
    },
    provide(){
        return {
            form: this
        }
    }
}
</script>

<style>

</style>