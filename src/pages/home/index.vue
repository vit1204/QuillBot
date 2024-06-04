<script setup lang="ts">
import { onMounted, ref } from 'vue';


// let text = ref<String>('')
let boundingRect = ref({ x: 0, y: 0 })
let selection = ref({start: 0, end: 0})


onMounted(() => {
    const textArea = document.getElementById('textArea') as HTMLTextAreaElement
    textArea.addEventListener('mouseup', () => {
        const activeTextarea = document.activeElement as HTMLTextAreaElement || HTMLInputElement
        
        if(activeTextarea.value.length === 0) return

        console.log(activeTextarea.value)
       selection.value = {
           start: activeTextarea.selectionStart,
           end: activeTextarea.selectionEnd
       }

        boundingRect.value = {
            x: selection.value.end,
            y: selection.value.start
        }

    })

})


</script>


<template>

    <div   :style="{
        position: 'fixed',
        width: '20px',
        height: '20px',
        backgroundColor: 'red',
        top: `${boundingRect.y}px`,
        left: `${boundingRect.x}px`,
    }">
    </div>


    <textarea   name="" id="textArea" cols="30" rows="10"></textarea>
    
</template>

