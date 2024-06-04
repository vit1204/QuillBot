<template>
    <input v-model="message" type="text">
    <div>
        {{ message }}
    </div>
</template>

<script>
export default{
    data(){
        return{
            message: ''
        }
    }
}
</script>