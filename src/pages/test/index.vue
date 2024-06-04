<!-- <script setup lang="ts">
import { onMounted, ref } from 'vue';
// import {getSelection, setSelection} from "../../core/index"


const divRef = ref<HTMLElement>()

onMounted(() => {
    
    try{
        document.addEventListener('mouseup', async () => {

            const { text, direction } = await getSelection(divRef.value)

            console.log(`text:${text}`, `direction:${direction}`)

            const { startOffset, endOffset } = setSelection(divRef.value)


            console.log(`startOffset:${startOffset}`, `endOffset:${endOffset}`)

        })

    }catch(error){
        console.log(error)
    }
    
  

})
  
    
</script> -->

<template>
    <div ref="divRef" style=" width: 200px; " id="contentEditableDiv" contenteditable>
      Hello <b>World</b>
    </div>
  
</template>