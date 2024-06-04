<script setup lang="ts">

</script>

<template>

    <div :class="$style.sidebar">

        <div :class="$style.sidebarItem" style="margin-top: 10px;">
            <div :class="$style.styleImg" style="background-color: rgba(73, 149, 87, 0.1);">
                <img loading="eager"
                    src="https://assets.quillbot.com/images/theme/commonImages/product/paraphraser-new.svg"
                    alt="paraphraser icon" style="width:14px;height:14px">

            </div>
            <span>paraphraser</span>
        </div>

        <div :class="$style.sidebarItem">
            <div :class="$style.styleImg" style="background-color: rgba(239, 65, 76, 0.1);">
                <img loading="eager"
                    src="https://assets.quillbot.com/images/theme/commonImages/product/grammar-checker-new.svg"
                    alt="grammar checker icon" style="width:16px;height:16px">
            </div>
            <span>Grammar Checker</span>

        </div>

        <div :class="$style.sidebarItem">
            <div :class="$style.styleImg" style="background-color: rgba(49, 157, 255, 0.1);">
                <img loading="eager" src="https://assets.quillbot.com/images/theme/light/commonImages/co-writer-new.svg"
                    alt="co-writer icon" style="width:15px;height:15px">
            </div>
            <span>QuillBot Flow</span>
        </div>

        <div :class="$style.sidebarItem">
            <div :class="$style.styleImg" style="background-color: rgba(242, 124, 14, 0.1);">
                <img loading="eager"
                    src="https://assets.quillbot.com/images/theme/commonImages/product/plag-checker-new.svg"
                    alt="plagiarism checker icon" style="width:14px;height:14px">
            </div>
            <span>Plagiarism Checker</span>
        </div>

        <div :class="$style.sidebarItem">
            <div :class="$style.styleImg" style="background-color: rgba(128, 81, 255, 0.1);">
                <img loading="eager"
                    src="https://assets.quillbot.com/images/theme/commonImages/product/summarizer-new.svg"
                    alt="summarizer icon" style="width:15px;height:15px">
            </div>
            <span>Summarizer</span>
        </div>

        <div :class="$style.sidebarItem">

            <div :class="$style.styleImg">
                <img loading="eager"
                    src="https://assets.quillbot.com/images/theme/light/translator/translator_icondifferentiateCowriter_April2023.svg"
                    alt="translator icon">
            </div>
            <span>Trasnlator</span>

        </div>

        <div :class="$style.sidebarItem">
            <div :class="$style.styleImg" style="background-color: rgba(0, 103, 197, 0.1);">
                <img loading="eager"
                    src="https://assets.quillbot.com/images/theme/commonImages/product/citation-generator-new.svg"
                    alt="citation generator icon" style="width:14px;height:12px">
            </div>
            <span>Citation Generator</span>
        </div>

        <div :class="$style.divider">
            <div :class="$style.sidebarItem">
                <div :class="$style.styleImg">
                    <img loading="eager"
                        src="https://assets.quillbot.com/images/theme/commonImages/product/premium-icn.svg"
                        alt="premium icon" style="width: 24px; height: 24px;">
                </div>
                <span>QuillBot Premium</span>
            </div>
        </div>

        <div :class="$style.sidebarItem">
            <div :class="$style.styleImg">
                <img style="width: 26px;height: 26px;" loading="eager"
                    src="https://assets.quillbot.com/images/theme/commonImages/chrome.png" alt="chrome extension">
            </div>
            <span>QuillBot For Chrome </span>
        </div>

        <div :class="$style.sidebarItem">
            <div :class="$style.styleImg">
                <img loading="eager"
                    src="https://assets.quillbot.com/images/theme/light/commonImages/AppandExtensions.svg"
                    alt="microsoft word extension" style="width: 20px; height: 20px;">
            </div>
            <span>Apps & Extensions</span>
        </div>



    </div>

</template>


<style lang="scss" module>
.sidebar {
     position: fixed;
        top:42px;
        left: 0;
       height: 100vh;
        width: 100px;
        background-color: white;
        display: flex;
        flex-direction: column;
        align-items: flex-start;

    border-right: 1px solid var(--color-gray-lighter);
   
}
.sidebarItem {
    border-radius: 5px;
    padding-top: 4px;
    padding-bottom: 4px;
    cursor: pointer;
    margin-bottom: 10px;
    text-align: center;
    width: 80px;
    margin-left: 10px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    span{
        font-size: 14px;
    }
}
.sidebarItem:hover{
    text-decoration: none;
        background-color: rgba(0, 0, 0, 0.04);
}
.sidebarItem:focus-visible{
    // background-color: ;
}

.styleImg {
    width: 24px;
    height: 24px;
    opacity: 1;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.divider{
    position: relative;
}
.divider::before,
.divider::after{
    content: '';
        position: absolute;
        
        width: 60%;
        left: 55%;
            /* Đặt nó ở giữa theo chiều ngang */
            transform: translateX(-50%);
            /* Dịch chuyển lại vị trí của nó để căn giữa */
            width: 60%;
        height: 1px;
        /* Chiều dày của đường line */
        background-color: var(--color-gray-lighter);
    
        /* Màu của đường line */
}
.divider::before{
    top:-5px;
}
.divider::after{
    bottom: 5px;
}



</style>