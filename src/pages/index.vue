<script setup lang="ts">
import OpenAi from '@/api/openai'
import iconLoading from '@/assets/loading.svg'
import checkIcon from '@/assets/check.svg'
import {ref, onMounted} from 'vue'

const text = ref<string>('')
const result = ref<string>('')
const languageList = [
    'English (US)',
    'French',
    'Spanish',
    'German',
    'All',
]
const activeItem = ref<number>(1)

function handleActiveItem(id: number) {
    activeItem.value = id
}

function pasteText() {
    navigator.clipboard.readText().then((clipText) => {
        text.value = clipText
    })
}

async function parapharseText() {
    try {
        const res = await OpenAi.getParaphraseFullContent(text.value)
        result.value = res
    }
    catch (error) {
        console.error(error)
    }
}

const tooltipVisible = ref<boolean>(false)
const resultTooltip = ref<string>('')
const boundingRect = ref<{ x: number, y: number }>({ x: 0, y: 0 })

async function parapharse(text: string) {
    try {
        const res = await OpenAi.getParaphraseFullContent(text)
        console.log(res)

        resultTooltip.value = res
    }
    catch (error) {
        console.error(error)
    }
}

onMounted(() => {
    document.addEventListener('selectionchange', () => {
        const selection = window.getSelection()

        if (!selection?.rangeCount || selection?.toString().length === 0) {
            tooltipVisible.value = false
            return
        }

        const range = selection.getRangeAt(0)

        const rect = range.getBoundingClientRect()

        boundingRect.value = {
            x: rect.right,
            y: rect.top,
        }
    })
})

function handleMouseUp() {
    const selection = window.getSelection()

    if (!selection?.rangeCount || selection?.toString().length === 0) {
        tooltipVisible.value = false
        return
    }

    tooltipVisible.value = true
    console.log(selection?.toString())
    parapharse(selection?.toString())
}

function handleReplace() {
    console.log("hehe")
    const selection = window.getSelection()

    const range = selection?.getRangeAt(0)
    console.log('range', range)

    range?.deleteContents()
    range?.insertNode(document.createTextNode(resultTooltip.value))
    tooltipVisible.value = false
}

function handleBlur() {
    tooltipVisible.value = false
}
</script>

<template>
    <div>
        <div v-if="tooltipVisible" :style="{
            position: 'fixed',
            top: `${boundingRect.y}px`,
            left: `${boundingRect.x}px`,
            backgroundColor: 'white',
            minWidth: '20px',
            minHeight: '20px',
            zIndex: 999,
            padding: '10px',
            pointerEvents: 'none',
            borderRadius: '8px',
            boxShadow: 'rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px',
        }">
            <div v-if="!resultTooltip" :class="$style.iconBox">
                <img :src="iconLoading" :class="$style.temIcon" alt="iconLoading">
            </div>
            <div v-else :style="{
            cursor: 'pointer',
            zIndex: 9999,
        }">
                <p>
                    {{ resultTooltip }}
                </p>
                
                <img :src="checkIcon " :class="$style.temIcon"   style="pointer-events: visible;" alt="" @mousedown="handleReplace" >
            </div>
        </div>
        <SidebarAuth :class="$style.homeSidebar" />
        <div :class="$style.homeContent">
            <div :class="$style.homeContentParaPhrase">
                <TabRight />
                <ul :class="$style.homeContentLanguageList">
                    <li v-for="(item, index) in languageList" :key="index"
                        :class="activeItem === index && $style.homeLanguageActiveItem" @click="handleActiveItem(index)">
                        {{ item }}
                    </li>
                </ul>
                <div :class="$style.homeTextFillBox">
                    <div :class="$style.homeTextFillBoxHeader">
                        <span :class="$style.homeTextFillBoxHeaderTitle">Models:</span>
                        <span :class="$style.homeTextFillBoxHeaderValueActive">Standard</span>
                        <span :class="$style.homeTextFillBoxHeaderValue">Fluency</span>
                        <span :class="$style.homeTextFillBoxHeaderValue">Natural</span>
                        <span :class="$style.homeTextFillBoxHeaderValue">Academic</span>
                    </div>
                    <div :class="$style.homeTextFill">
                        <div :class="$style.homeTextFillLeftBox">
                            <!-- <textarea
                id="" v-model="text" :class="$style.homeTextFillTag" name="" cols="30" rows="25"
                placeholder="To rewrite text, enter or paste it here and press &quot;Paraphrase.&quot;"
              /> -->
                            <div id="bounding" contenteditable :class="$style.homeTextFillTag" :style="{
            height: '300px',
            padding: '30px 36px 8px 20px',
        }" />
                            <div v-show="!text" :class="$style.homeTextFillBoxPaste" @click="pasteText">
                                <div :class="$style.homeTextFillBoxPasteBox">
                                    <svg :class="$style.homeTextArerPasteIcon"
                                        class="MuiSvgIcon-root MuiSvgIcon-colorPrimary MuiSvgIcon-fontSizeMedium"
                                        focusable="false" aria-hidden="true" viewBox="0 0 24 29" width="24" height="29"
                                        style="font-size: 30px;">
                                        <path width="24" height="29" viewBox="0 0 24 29" fill="#499557"
                                            xmlns="http://www.w3.org/2000/svg"
                                            d="M20.7418 3.25678H15.4522C14.9207 1.78883 13.5286 0.72583 11.8835 0.72583C10.2384 0.72583 8.84639 1.78883 8.31489 3.25678H3.02521C1.63319 3.25678 0.494263 4.3957 0.494263 5.78772V26.0353C0.494263 27.4273 1.63319 28.5662 3.02521 28.5662H20.7418C22.1339 28.5662 23.2728 27.4273 23.2728 26.0353V5.78772C23.2728 4.3957 22.1339 3.25678 20.7418 3.25678ZM11.8835 3.25678C12.5795 3.25678 13.149 3.82624 13.149 4.52225C13.149 5.21826 12.5795 5.78772 11.8835 5.78772C11.1875 5.78772 10.618 5.21826 10.618 4.52225C10.618 3.82624 11.1875 3.25678 11.8835 3.25678ZM20.7418 26.0353H3.02521V5.78772H5.55615V9.58414H18.2109V5.78772H20.7418V26.0353Z" />
                                    </svg>
                                    <i>Paste Text</i>
                                </div>
                            </div>
                            <div :class="$style.homeTextFillLeftFooter">
                                <div :class="$style.homeTextFillLeftUpload">
                                    <Icon :class="$style.homeIcon" icon="bi:cloud-arrow-up" />
                                    <span>Upload Document</span>
                                </div>
                                <button  :class="$style.homeTextFillLeftButton"
                                    @click="parapharseText">
                                    Paraphrase
                                </button>
                            </div>
                        </div>
                        <div placeholder="The result of paraphrase is in here" id="bounding" contenteditable
                            :class="$style.homeTextFillTag" :style="{
                            width: '50%'
          
        }" @mouseup="handleMouseUp" @blur="handleBlur"> {{result}} </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style module lang="scss">
.iconBox {
    width: 24px;
    height: 24px;
    margin-left: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease;

    &:hover {
        background-color: #f3f3f3;
        border-radius: 50%;
    }
}

.temIcon {
    object-fit: contain;
    margin: auto;
    width: 18px;
    height: 18px;
    cursor: pointer;
}

.box {
    margin-left: 100px;
}

.homeContent {
    width: 1200px;
    margin-left: 96px;
    margin-top: 52px;
    background-color: #f1f1f1;
    // height: 100vh;

    &::-webkit-scrollbar {
        width: 3px;
    }
}

.homeContentParaPhrase {
    position: relative;
    padding: 25px 100px 44px 40px;
    height: 100vh;
}

.homeContentLanguageList {
    display: flex;
    align-items: center;

    li {
        padding: 8px 16px;
        font-size: 14px;
        color: #505050;
        border-radius: 8px 8px 0px 0px;
        cursor: pointer;

        &.homeLanguageActiveItem {
            z-index: 1;
            background-color: #ffff;

            &:hover {
                background-color: #ffffff9e;
            }
        }

        &:hover {
            background-color: #25252514;
        }
    }
}

.homeTextFillBox {
    position: relative;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 26px 38px, rgba(0, 0, 0, 0.22) 0px 24px 12px;
}

.homeTextFillBoxHeader {
    position: sticky;
    top: 49px;
    z-index: 10;
    line-height: 1.5;
    height: 50px;
    display: flex;
    align-items: center;
    background-color: #ffff;
    border-bottom: 1px solid #DEE1E3;
}

.homeTextFillBoxHeaderTitle {
    color: #505050;
    padding: 13px 12px 12px 20px;
    font-weight: 700;
    font-size: 16px;
}

.homeTextFillBoxHeaderValueActive {
    color: #499557;
    font-weight: 500;
    padding: 14px 9px 11px 9px;
    border-bottom: 2px solid #499557;
}

.homeTextFillBoxHeaderValue {
    color: black;
    font-weight: 500;
    padding: 14px 9px 11px 9px;
}

.homeTextFill {
    background-color: #ffff;
    display: flex;
    align-items: start;
}

.homeTextFillLeftBox {
    position: relative;
    width: 50%;
    border-right: 3px solid rgba(0, 0, 0, 0.2);
}

.homeTextFillRightBox {
    width: 50%;
}

.homeTextFillTag {
    resize: none;
    width: 100%;
    border: none;
    padding: 30px 36px 8px 20px;

    &::placeholder {
        font-size: 16px;
        color: #8B8B8B;
        font-weight: 300;
    }

    &:focus {
        outline: none;
    }
}

.homeTextFillLeftFooter {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 12px;
}

.homeTextFillLeftUpload {
    display: flex;
    align-items: center;
    gap: 4px;
    background-color: #ffff;
    margin-right: 10px;
    height: 54px;
    padding-left: 15px;

    span {
        font-weight: 600;
        font-size: 12px;
        line-height: 16px;
        color: #252525;
    }
}

.homeIcon {
    width: 24px;
    height: 24px;
}

.homeTextFillLeftButton {
    padding: 5px 25px 6px;
    font-size: 17.5px;
    font-weight: bold;
    width: 140px;
    min-height: 40px;
    background-color: #499557;
    color: #ffff;
    border: none;
    border-radius: 25px;
    cursor: pointer;
}

.homeGetPremium {
    background-color: #ffff;
    padding: 80px 0;
    text-align: center;
}

.homeGetPremiumContent {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.homeGetPremiumDescription {
    font-size: 32px;
    font-weight: 400;
    line-height: 44px;
    color: #172b4d;
    max-width: 66.67%;
    padding-bottom: 32px;
}

.homeGetPremiumBtnBox {
    display: flex;
    justify-content: center;
    width: 100%;
    padding-bottom: 16px;
}

.homeGetPremiumBtn {
    border: none;
    display: flex;
    align-items: center;
    border-radius: 32px;
    padding: 8px 20px;
    background-color: #008847;

    &>span {
        font-size: 16px;
        color: #ffff;
    }
}

.homeGetPremiumCountDate {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    width: 100%;

    &>span {
        font-weight: 600;
        line-height: 24px;
        color: #172b4d;
    }
}

.homeTextFillBoxPaste {
    display: flex;
    align-items: center;
    cursor: pointer;
    justify-content: center;
    position: absolute;
    top: 40%;
    margin-bottom: 20px;
    gap: 12px;
    transform: translateX(-50%);
    left: 50%;
    border: 1px solid #499557;
    border-radius: 6px;
}

.homeTextFillBoxPasteBox {
    font-size: 12px;
    line-height: 16px;
    text-align: center;
    padding: 10px;
    width: 130px;
    height: 74px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;

    i {
        color: #499557;
    }
}

.homeTextArerPasteIcon {
    color: #499557;
    width: 24px;
}
</style>