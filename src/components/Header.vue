<script setup lang="ts">
import Quill from "../../public/quill.vue"


</script>

<template>

    <div :class="$style.header">
        <ul>
            <li>
                <Quill style="cursor: pointer;" />
            </li>
            <li>
                <h4>Paraphrase</h4>
            </li>
            <li>
                <span>
                    <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-10dohqv" focusable="false"
                        aria-hidden="true" viewBox="0 0 16 15" style="width: 18px; height: 20px; margin-right: 8px;">
                        <path
                            d="M8.05882 14L14.7647 4.42727M8.05882 14L1 4.42727M8.05882 14L5.70588 4.42727M8.05882 14L10.4118 4.42727M14.7647 4.42727L12.5294 1M14.7647 4.42727H1M12.5294 1L10.4118 4.42727M12.5294 1H8.05882M3.35294 1L1 4.42727M3.35294 1L5.70588 4.42727M3.35294 1H8.05882M5.70588 4.42727L8.05882 1M10.4118 4.42727L8.05882 1"
                            stroke="white" fill="white" stroke-width="0.8" stroke-linejoin="round"></path>
                    </svg>
                    Upgrade to Premium
                </span>
            </li>
            <li> <a href=""><img src="https://assets.quillbot.com/images/American.svg"
                        style="width: 35px;height:32px;border-radius:50%;object-fit: cover;" alt=""></a> </li>
            <li>
                <a href="">
                    <img style="width: 32px;height:30px;border-radius:50%;object-fit: cover;"
                        src="../../public//avatar-trang-4.jpeg" alt="">

                </a>
            </li>
        </ul>
    </div>



</template>

<style lang="scss" module>
.header{
    position: fixed;

   z-index: 100;
   width: 100vw;
    background-color: white ;
    border-bottom: 1px solid var(--color-gray-lighter);
    span{
        
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 14px;
        padding:6px 16px;
        color: white;
        background-color: rgb(23, 135, 51);
        border-radius: 24px;
    }
    span:hover{
        background-color: #0C6124;
    }
    ul{
        margin: 0;
        height: 100%;
        width: 100%;
        list-style: none;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        
    }
    li{
        display: flex;
        align-items: center;
        height: 50px;
    }
    a{
        height: 100%;
        padding: 0 5px;
        text-decoration: none;
        display: flex;
        align-items: center;

    }
    li:first-child{
        display: flex;
        align-items: center;
        margin-left: -20px;
        margin-right: auto;
    }
    li:nth-child(2){
        color: black;
        margin-left: auto;
        margin-right: auto;
        font-weight: bold;
    }
   
}

</style>