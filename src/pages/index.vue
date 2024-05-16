<script setup lang="ts">
import  OpenAi  from '@/api/openai'
import {ref, onMounted} from 'vue'
import '../assets/custom.scss'

type SelectedStatus = 'initial' | 'tooltip' | 'popover'
interface Position {
    x: number
    y: number
}

const text = ref<string>('')
const replaceText = ref<string[]>([])
const result = ref<string>('')
const languageList = [
    'English (US)',
    'Chinese',
    'Hindi',
    'French',
    'All',
]
const activeItem = ref<number>(0)
const status = ref<SelectedStatus>('initial')

const inMouseArea = ref<HTMLElement>()
const tooltip = ref<HTMLElement>()
const popover = ref<HTMLElement>()
const boundingRect = ref<Position>({ x: 0, y: 0 })
let selection: Selection | null = null
const mousePos = ref<Position>({
    x: 0,
    y: 0,
})
const paraPhraseId = ref<number>(0)


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

onMounted(() => {
    document.addEventListener('selectionchange', () => {
        selection = window.getSelection()
        if (!selection?.rangeCount || selection.getRangeAt(0).toString().length === 0) {
            return
        }

        const range = selection.getRangeAt(0)
        const rect = range.getBoundingClientRect()

        boundingRect.value = {
            x: rect.right,
            y: rect.top,
        }
    })

    document.addEventListener('mouseover', (e) => {
        mousePos.value.x = e.clientX
        mousePos.value.y = e.clientY
    })
})

function reselectElement() {
    if (!selection?.anchorNode || !selection.focusNode)
        return

    const range = document.createRange()

    range.setStart(selection?.anchorNode, selection?.anchorOffset || 0)
    range.setEnd(selection?.focusNode, selection?.focusOffset || 0)

    selection.removeAllRanges()
    selection.addRange(range)
}

function isMouseInEllement(element: HTMLElement) {
    const elementRect = element.getBoundingClientRect()

    return (
        mousePos.value.x >= elementRect.left
        && mousePos.value.x <= elementRect.right
        && mousePos.value.y <= elementRect.bottom
        && mousePos.value.y >= elementRect.top
    )
}

function handleMouseBlur() {

    if ((inMouseArea.value && isMouseInEllement(inMouseArea.value))
        || (popover.value && isMouseInEllement(popover.value))
        || (tooltip.value && isMouseInEllement(tooltip.value))
    ) {
        reselectElement()
    }
    else {
        status.value = 'initial'
        replaceText.value = []
        paraPhraseId.value = 0
    }
}

async function handleMouseup() {
    const selection = window.getSelection()
    if (selection?.getRangeAt(0).toString().length === 0) {
        status.value = 'initial'
        return
    }
    status.value = 'tooltip'
}

function replaceSelectedText() {
    status.value = 'initial'
    const range = selection?.getRangeAt(0)
    range?.deleteContents()
    range?.insertNode(document.createTextNode(replaceText.value[paraPhraseId.value]))
}

async function getRefreshText() {
    try {
        const content = selection?.getRangeAt(0).toString() || ''
        console.log(content)
        const res = await OpenAi.getParaphraseFullContent(content)
        replaceText.value.push(res)
        if (replaceText.value.length > 1)
            paraPhraseId.value++
    } catch (error) {
        console.error(error)
    }
}

async function handleOpenPopover() {
    status.value = 'popover'
    getRefreshText()

}

function handlePreReplacetext() {
    if (paraPhraseId.value <= 0)
        return
    paraPhraseId.value -= 1
}

function handleNextReplacetext() {
    if (paraPhraseId.value >= replaceText.value.length - 1)
        return
    paraPhraseId.value += 1
}

function handleClosePopover() {
    status.value = 'initial'
    replaceText.value = []
    paraPhraseId.value = 0
}

async function handleCopyText() {
    await navigator.clipboard.writeText(replaceText.value[paraPhraseId.value]);
}
</script>

<template>
    <div :class="$style.Container">
        <div :class="$style.Content">
            <div :class="$style.ContentParaPhrase">
                <div :class="$style.ContentLanguageList">
                    <div v-for="(item, index) in languageList" v-show="index < 5" :key="index"
                        :class="[(activeItem === index || (activeItem > 4 && index === 1)) && $style.LanguageActiveItem, $style.ContentLanguageListItem]">
                        <span>{{ index === 1 && activeItem > 4 ? languageList[activeItem] : item }}</span>

                    </div>

                </div>
                <div :class="$style.TextAreaBox">
                    <div :class="$style.TextAreaBoxHeader">
                        <div>
                            <span :class="$style.TextAreaBoxHeaderTitle">Models:</span>
                            <span :class="$style.TextAreaBoxHeaderValue">Standard</span>
                        </div>
                        <div :class="$style.TextAreaHeaderBtn">
                            <el-icon :class="$style.Icon">
                                <ChromeFilled />
                            </el-icon>
                            <span>Add to Chrome</span>
                        </div>
                    </div>
                    <div :class="$style.TextArea">
                        <div :class="$style.TextAreaLeftBox">
                            <textarea id="" v-model="text" :class="$style.TextAreaTag" name="" cols="30" rows="25"
                                placeholder="To rewrite text, enter or paste it here and press &quot;Paraphrase.&quot;" />
                            <div v-show="!text" :class="$style.TextAreaBoxPaste" @click="pasteText">
                                <div :class="$style.TextAreaBoxPasteBox">
                                    <svg :class="$style.TextArerPasteIcon"
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
                            <div :class="$style.TextAreaLeftFooter">
                                <div :class="$style.TextAreaLeftUpload">
                                    <Icon :class="$style.Icon" icon="bi:cloud-arrow-up" />
                                    <span>Upload Doc</span>
                                </div>
                                <button :class="$style.TextAreaLeftButton" @click="parapharseText">
                                    Paraphrase
                                </button>
                            </div>
                        </div>
                        <div :class="$style.TextAreaRightBox">
                            <div v-if="status === 'tooltip'" ref="tooltip" :style="{
        backgroundColor: 'white',
        position: 'fixed',
        zIndex: 999,
        top: `${boundingRect.y + 4}px`,
        left: `${boundingRect.x + 4}px`,
        padding: '1px',
        cursor: 'pointer',
    boxShadow: '0px 6px 12px 0px #0000002E'
    }" @mousedown="handleOpenPopover">
                                <img width="20" height="20"
                                    src="https://sgroupvn.org/_nuxt/img/logo-sgroup-symbol.ae66e60.png" alt="">
                            </div>

                            <div v-else-if="status === 'popover'" ref="popover" :style="{
    backgroundColor: 'white',
    width: '480px',
    height: '280px',
    borderRadius: '12px',
    position: 'fixed',
    zIndex: 999,
    top: `${boundingRect.y + 6}px`,
    left: `${boundingRect.x + 6}px`,
    padding: '12px 28px 24px',
    boxShadow: '0px 0.375rem 0.75rem 0px rgba(0,0,0,0.18)',
    }">
                                <div :class="$style.PopoverContainer">
                                    <div :class="$style.PopoverHeader">
                                        <div :class="$style.PopoverHeaderTitle">
                                            <div :class="$style.PopoverHeaderLogo">
                                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M12.7319 19.8158L14.6564 24.2147C14.7875 24.5143 15.2125 24.5143 15.3436 24.2147L17.2681 19.8158C17.3097 19.7207 17.3889 19.647 17.4868 19.6125L22.0744 17.9933C22.399 17.8788 22.4107 17.424 22.0924 17.293L17.4855 15.396C17.3885 15.3561 17.3127 15.2773 17.2764 15.1789L15.3519 9.9551C15.2314 9.62795 14.7686 9.62795 14.6481 9.9551L12.7236 15.1789C12.6873 15.2773 12.6115 15.3561 12.5145 15.396L7.90758 17.293C7.58929 17.424 7.60096 17.8788 7.92556 17.9933L12.5132 19.6125C12.6111 19.647 12.6903 19.7207 12.7319 19.8158Z"
                                                        fill="#DD7F3B" />
                                                    <path
                                                        d="M21.8584 10.3907L22.8679 12.698C22.9183 12.8132 23.0817 12.8132 23.1321 12.698L24.1416 10.3907C24.1576 10.3541 24.188 10.3258 24.2257 10.3125L26.644 9.45897C26.7689 9.41491 26.7734 9.24001 26.6509 9.1896L24.2252 8.19077C24.1879 8.17541 24.1587 8.14512 24.1448 8.10726L23.1353 5.36735C23.089 5.24152 22.911 5.24152 22.8647 5.36735L21.8552 8.10726C21.8413 8.14512 21.8121 8.17541 21.7748 8.19077L19.3491 9.1896C19.2266 9.24001 19.2311 9.41491 19.356 9.45897L21.7743 10.3125C21.812 10.3258 21.8424 10.3541 21.8584 10.3907Z"
                                                        fill="#DD7F3B" />
                                                </svg>
                                                <span>S-Group Paraphraser</span>

                                            </div>


                                            <el-icon :class="$style.Icon" @click="handleClosePopover"
                                                color="#A9A9A9">
                                                <Close />
                                            </el-icon>
                                        </div>




                                        <div :class="$style.PopoverContent">
                                            <div :class="$style.PopoverContentHeader">
                                                <div :class="$style.PopoverContentRefresh" @click="getRefreshText">
                                                    <svg s xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                                                        <path fill="currentColor"
                                                            d="M784.512 230.272v-50.56a32 32 0 1 1 64 0v149.056a32 32 0 0 1-32 32H667.52a32 32 0 1 1 0-64h92.992A320 320 0 1 0 524.8 833.152a320 320 0 0 0 320-320h64a384 384 0 0 1-384 384 384 384 0 0 1-384-384 384 384 0 0 1 643.712-282.88z">
                                                        </path>
                                                    </svg>
                                                    <Icon :class="$style.PopoverIcon" icon="basil:refresh-solid"
                                                        color="#A9A9A9" />
                                                    <span>Refresh</span>
                                                </div>
                                                <div :class="$style.PopoverContentRefresh">
                                                    <el-icon @click="handlePreReplacetext"
                                                        :class="$style.PopoverIcon" color="#DADCE0">
                                                        <ArrowLeft />
                                                    </el-icon>

                                                    <span>{{ paraPhraseId + 1 }}/{{ replaceText.length }}</span>

                                                    <el-icon @click="handleNextReplacetext"
                                                        :class="$style.PopoverIcon" color="#DADCE0">
                                                        <ArrowRight />
                                                    </el-icon>

                                                </div>
                                            </div>
                                            <div :class="$style.PopoverContentArea">
                                                {{ replaceText[paraPhraseId] }}
                                            </div>
                                        </div>
                                        <div :class="$style.PopoverBtnGroup">
                                            <button @click="handleCopyText" :class="$style.PopoverCopyGroup">
                                                Copy
                                            </button>
                                            <button @mousedown="replaceSelectedText">
                                                <svg width="19" height="17" viewBox="0 0 19 17" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                                        d="M16.25 1.5H13.25C12.9739 1.5 12.75 1.72386 12.75 2V5C12.75 5.27614 12.9739 5.5 13.25 5.5H16.25C16.5261 5.5 16.75 5.27614 16.75 5V2C16.75 1.72386 16.5261 1.5 16.25 1.5ZM13.25 0C12.1454 0 11.25 0.89543 11.25 2V5C11.25 6.10457 12.1454 7 13.25 7H16.25C17.3546 7 18.25 6.10457 18.25 5V2C18.25 0.895431 17.3546 0 16.25 0H13.25ZM2 5C2 2.37665 4.12665 0.25 6.75 0.25H8.25C8.66422 0.25 9 0.585786 9 1C9 1.41421 8.66422 1.75 8.25 1.75H6.75C4.95508 1.75 3.5 3.20507 3.5 5V5.59861L3.83398 5.37596C4.17862 5.1462 4.64428 5.23933 4.87404 5.58397C5.10381 5.92862 5.01067 6.39427 4.66603 6.62404L3.16603 7.62404C2.9141 7.79199 2.5859 7.79199 2.33398 7.62404L0.833978 6.62404C0.489332 6.39427 0.396201 5.92862 0.625966 5.58397C0.85573 5.23933 1.32138 5.1462 1.66603 5.37596L2 5.59861V5ZM17.166 9.87596L18.666 10.876C19.0107 11.1057 19.1038 11.5714 18.874 11.916C18.6443 12.2607 18.1786 12.3538 17.834 12.124L17.5 11.9014V12C17.5 14.6234 15.3734 16.75 12.75 16.75H11.25C10.8358 16.75 10.5 16.4142 10.5 16C10.5 15.5858 10.8358 15.25 11.25 15.25H12.75C14.5449 15.25 16 13.7949 16 12V11.9014L15.666 12.124C15.3214 12.3538 14.8557 12.2607 14.626 11.916C14.3962 11.5714 14.4893 11.1057 14.834 10.876L16.334 9.87596C16.5859 9.70801 16.9141 9.70801 17.166 9.87596ZM3.25 11.5H6.25C6.52615 11.5 6.75 11.7239 6.75 12V15C6.75 15.2761 6.52615 15.5 6.25 15.5H3.25C2.97386 15.5 2.75 15.2761 2.75 15V12C2.75 11.7239 2.97386 11.5 3.25 11.5ZM1.25 12C1.25 10.8954 2.14543 10 3.25 10H6.25C7.35457 10 8.25 10.8954 8.25 12V15C8.25 16.1046 7.35457 17 6.25 17H3.25C2.14543 17 1.25 16.1046 1.25 15V12Z"
                                                        fill="white" />
                                                </svg>
                                                <span style="color: white;" >Apply</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div >

                            <div ref="inMouseArea" :class="$style.TextAreaTag" contenteditable
                                placeholder="To rewrite text, enter or paste it here and press &quot;Paraphrase.&quot;"
                                @blur="handleMouseBlur" @mouseup="handleMouseup">
                                {{ result }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </div>
</template>

<style module lang="scss">
.Container {
    margin-left: 96px;
}

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

.Content {
    margin-top: 52px;
    background-color: #f1f1f1;
    // height: 100vh;

    &::-webkit-scrollbar {
        width: 3px;
    }
}

.ContentParaPhrase {
    position: relative;
    width: 1200px;

}

.ContentLanguageList {
    display: flex;
    align-items: center;
    position: relative;

    .ContentLanguageListItem {
        padding: 8px 16px;
        font-size: 14px;
        color: #505050;
        border-radius: 8px 8px 0px 0px;
        cursor: pointer;
        display: flex;
        align-items: center;
        position: relative;

        &.LanguageActiveItem {
            background-color: #ffff;

            &:hover {
                background-color: #25252514;
            }
        }

        &:hover {
            background-color: #25252514;
        }
    }
}

.TextAreaBox {
    position: relative;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 20px 20px 0px;
    ;
}

.TextAreaBoxHeader {
    position: sticky;
    top: 0px;
    z-index: 1;
    line-height: 1.5;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #ffff;
    border-bottom: 1px solid #DEE1E3;
}

.TextAreaBoxHeaderTitle {
    color: #505050;
    padding: 13px 12px 12px 20px;
    font-weight: 700;
    font-size: 16px;
}

.TextAreaHeaderBtn {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 6px 16px;
    border: 1px solid #499557;
    border-radius: 20px;
    margin-right: 8px;

    span {
        font-weight: 600;
        color: #499557;
        font-size: 14px;
    }
}

.TextAreaBoxHeaderValue {
    color: #499557;
    font-weight: 500;
    padding: 14px 9px 11px 9px;
    border-bottom: 2px solid #499557;
}

.TextArea {
    background-color: #ffff;
    display: flex;
    align-items: start;
}

.TextAreaLeftBox {
    position: relative;
    width: 50%;
    border-right: 3px solid rgba(0, 0, 0, 0.2);
}

.TextAreaRightBox {
    width: 50%;
}

.TextAreaTag {
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

.TextAreaLeftFooter {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 12px;
}

.TextAreaLeftUpload {
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

.Icon {
    width: 24px;
    height: 24px;
    cursor: pointer;
}

.TextAreaLeftButton {
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


.TextAreaBoxPaste {
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

.TextAreaBoxPasteBox {
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

.TextArerPasteIcon {
    color: #499557;
    width: 24px;
}

.ExpandLanguages {
    width: 520px;
    display: grid;
    column-gap: 12px;
    grid-auto-flow: column;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(9, 1fr);
    position: absolute;
    top: 36px;
    left: 27%;
    background-color: #ffff;
    z-index: 9;
    padding: 4px;
    border-radius: 4px;
    box-shadow: rgba(0, 0, 0, 0.08) 0px 8px 16px 0px, rgba(0, 0, 0, 0.04) 0px 16px 20px 0px, rgba(0, 0, 0, 0.12) 0px 0px 2px 0px;

    div {
        padding: 8px;
        height: 36px;
        font-weight: 400;
        line-height: 20px;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-radius: 4px;

        &:hover {
            background-color: #ebebeb;
        }
    }
}

.ExpandLanguagesActiveItem {
    background-color: rgba(46, 125, 50, 0.1);
}




.PopoverHeader {

display: flex;
    align-items: center;
    flex-direction: column;
   width: 100%;
   gap:20px;
    justify-content: space-between;
}

.PopoverHeaderTitle {
    width:100%;

    display: flex;
    align-items: center;
    justify-content: flex-start;

    .PopoverHeaderLogo {
        margin-left: auto;
        width: 100%;
        display: flex;
        align-items: center;
        span{
               font-weight: 600;
        font-size: 16p;
        line-height: 22px;
        color: #555555;

        }
        
     
      
    }
}

.PopoverContent {
    display: flex;
    width: 100%;
    flex-direction: column;
    column-gap: 4px;
    padding: 0 16px;
}

.PopoverContentHeader {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 18px;
}

.PopoverContentRefresh {
    display: flex;
    align-items: center;
    gap: 4px;

    span {
        font-size: 12px;
        font-weight: 600;
        color: #A9A9A9;
        line-height: 17px;
    }
}

.PopoverContentArea {
    min-height: 120px;
    padding: 12px;
    border-radius: 10px;
    background-color: #F8F8F8;
    color: #555555;
    font-weight: 400;
    overflow-x:scroll;
    overflow-y: auto;
}

.PopoverBtnGroup {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: end;
    gap: 8px;
    padding: 0px 16px 16px;
    height: 52px;

    button {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
        padding: 8px 12px;
        border: none;
        border-radius: 40px;
        background-color: #4643DD;
        color: #ffff;
        cursor: pointer;
    }

    &>.PopoverCopyGroup {
        border: 1px solid #DADCE0;
        background-color: #ffff;
        color: #555555;
    }
}

.PopoverIcon {
    width: 18px;
    height: 18px;
    cursor: pointer;
}
</style>
