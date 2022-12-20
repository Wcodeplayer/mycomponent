<template>
    <div>
        <input type="text" v-model="username">
        <button @click="login">login</button>
    </div>
</template>

<script>
export default {
    name:"Login",
    data() {
        return {
            username:"admin"
        }
    },
    methods: {
        login(){
            console.log(this.username)
            this.$store
                .dispatch("user/login",{username: this.username})
                .then(()=>{
                    this.$router.push({
                        path: this.$route.query.redirect || "/"
                    })
                })
                .catch(error=> alert(error))
        }
    },
}
</script>

<style>

</style>