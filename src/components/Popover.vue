<script setup lang="ts">
import { ref } from 'vue';


const resultRef = ref<HTMLElement>()


defineProps({
  boundingRect: {
    type: Object,
    required: true,
    default: () => ({ x: 0, y: 0 }),
  },
  replaceText: {
    type: Array<String>,
    required: true,
    default: () => [],
  },
  activeReplaceTextId: {
    type: Number,
    required: true,
    default: 0,
  },
  popover: {
    type: String,

  },
  resultRef: {
    type: Object,
  }

  
});

defineEmits([
  "handleClosePopover",
  "replaceSelectedText",
  "handleCopyText",
  "getReplaceText",
  "handlePreReplacetext",
  "handleNextReplacetext",
]);
</script>

<template>

  
  <div ref="popover" :style="{
      backgroundColor: 'white',
      width: '480px',
      maxHeight: '280px',
      borderRadius: '12px',
      position: 'fixed',
      zIndex: 999,
      top: `${boundingRect.y + 6}px`,
      left: `${boundingRect.x + 6}px`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '16px',
      padding: '12px 12px 8px 12px',
      boxShadow: '0px 6px 12px 0px #0000002E',
    }">
    <div :class="$style.homePopoverHeader">
      <div :class="$style.homePopoverHeaderTitle">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12.7319 19.8158L14.6564 24.2147C14.7875 24.5143 15.2125 24.5143 15.3436 24.2147L17.2681 19.8158C17.3097 19.7207 17.3889 19.647 17.4868 19.6125L22.0744 17.9933C22.399 17.8788 22.4107 17.424 22.0924 17.293L17.4855 15.396C17.3885 15.3561 17.3127 15.2773 17.2764 15.1789L15.3519 9.9551C15.2314 9.62795 14.7686 9.62795 14.6481 9.9551L12.7236 15.1789C12.6873 15.2773 12.6115 15.3561 12.5145 15.396L7.90758 17.293C7.58929 17.424 7.60096 17.8788 7.92556 17.9933L12.5132 19.6125C12.6111 19.647 12.6903 19.7207 12.7319 19.8158Z"
            fill="#DD7F3B" />
          <path
            d="M21.8584 10.3907L22.8679 12.698C22.9183 12.8132 23.0817 12.8132 23.1321 12.698L24.1416 10.3907C24.1576 10.3541 24.188 10.3258 24.2257 10.3125L26.644 9.45897C26.7689 9.41491 26.7734 9.24001 26.6509 9.1896L24.2252 8.19077C24.1879 8.17541 24.1587 8.14512 24.1448 8.10726L23.1353 5.36735C23.089 5.24152 22.911 5.24152 22.8647 5.36735L21.8552 8.10726C21.8413 8.14512 21.8121 8.17541 21.7748 8.19077L19.3491 9.1896C19.2266 9.24001 19.2311 9.41491 19.356 9.45897L21.7743 10.3125C21.812 10.3258 21.8424 10.3541 21.8584 10.3907Z"
            fill="#DD7F3B" />
        </svg>
        <span>S-Group Paraphraser</span>
      </div>
      <font-awesome-icon @click="$emit('handleClosePopover')" :class="$style.homeIcon" color="#A9A9A9"
        :icon="['fas', 'xmark']" />

      <div :class="$style.homePopoverContent">
        <div :class="$style.homePopoverContentHeader">
          <div :class="$style.homePopoverContentRefresh" @click="$emit('getReplaceText')">
            <Icon :class="$style.homePopoverIcon" icon="basil:refresh-solid" color="#A9A9A9" />
            <span>Refresh</span>
          </div>
          <div :class="$style.homePopoverContentRefresh">
            <Icon @click="$emit('handlePreReplacetext')" :class="$style.homePopoverIcon"
              icon="material-symbols:chevron-left-rounded" color="#DADCE0" />
            <span>{{ activeReplaceTextId + 1 }}/{{ replaceText.length }}</span>
            <Icon @click=" $emit('handleNextReplacetext') " :class="$style.homePopoverIcon"
              icon="material-symbols:chevron-right-rounded" color="#DADCE0" />
          </div>
        </div>
        <div ref="resultRef" :class="$style.homePopoverContentArea">
          {{ replaceText[activeReplaceTextId] }}
        </div>
      </div>
      <div :class="$style.homePopoverBtnGroup">
        <button @click="$emit('handleCopyText')" :class="$style.homePopoverCopyGroup">
          Copy
        </button>
        <button @mousedown="$emit('replaceSelectedText')">
          <svg width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M16.25 1.5H13.25C12.9739 1.5 12.75 1.72386 12.75 2V5C12.75 5.27614 12.9739 5.5 13.25 5.5H16.25C16.5261 5.5 16.75 5.27614 16.75 5V2C16.75 1.72386 16.5261 1.5 16.25 1.5ZM13.25 0C12.1454 0 11.25 0.89543 11.25 2V5C11.25 6.10457 12.1454 7 13.25 7H16.25C17.3546 7 18.25 6.10457 18.25 5V2C18.25 0.895431 17.3546 0 16.25 0H13.25ZM2 5C2 2.37665 4.12665 0.25 6.75 0.25H8.25C8.66422 0.25 9 0.585786 9 1C9 1.41421 8.66422 1.75 8.25 1.75H6.75C4.95508 1.75 3.5 3.20507 3.5 5V5.59861L3.83398 5.37596C4.17862 5.1462 4.64428 5.23933 4.87404 5.58397C5.10381 5.92862 5.01067 6.39427 4.66603 6.62404L3.16603 7.62404C2.9141 7.79199 2.5859 7.79199 2.33398 7.62404L0.833978 6.62404C0.489332 6.39427 0.396201 5.92862 0.625966 5.58397C0.85573 5.23933 1.32138 5.1462 1.66603 5.37596L2 5.59861V5ZM17.166 9.87596L18.666 10.876C19.0107 11.1057 19.1038 11.5714 18.874 11.916C18.6443 12.2607 18.1786 12.3538 17.834 12.124L17.5 11.9014V12C17.5 14.6234 15.3734 16.75 12.75 16.75H11.25C10.8358 16.75 10.5 16.4142 10.5 16C10.5 15.5858 10.8358 15.25 11.25 15.25H12.75C14.5449 15.25 16 13.7949 16 12V11.9014L15.666 12.124C15.3214 12.3538 14.8557 12.2607 14.626 11.916C14.3962 11.5714 14.4893 11.1057 14.834 10.876L16.334 9.87596C16.5859 9.70801 16.9141 9.70801 17.166 9.87596ZM3.25 11.5H6.25C6.52615 11.5 6.75 11.7239 6.75 12V15C6.75 15.2761 6.52615 15.5 6.25 15.5H3.25C2.97386 15.5 2.75 15.2761 2.75 15V12C2.75 11.7239 2.97386 11.5 3.25 11.5ZM1.25 12C1.25 10.8954 2.14543 10 3.25 10H6.25C7.35457 10 8.25 10.8954 8.25 12V15C8.25 16.1046 7.35457 17 6.25 17H3.25C2.14543 17 1.25 16.1046 1.25 15V12Z"
              fill="white" />
          </svg>
          <span>Apply</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style module lang="scss">
.homePopoverHeader {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
}

.homePopoverHeaderTitle {
  display: flex;
  align-items: center;
  gap: 10px;

  span {
    font-weight: 600;
    font-size: 16p;
    line-height: 22px;
    color: #555555;
  }
}

.homePopoverContent {
  display: flex;
  width: 100%;
  flex-direction: column;
  column-gap: 4px;
  padding: 0 16px;
}

.homePopoverContentHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 18px;
}

.homePopoverContentRefresh {
  display: flex;
  align-items: center;
  gap: 4px;

  span {
    font-size: 12px;
    font-weight: 600;
    color: #a9a9a9;
    line-height: 17px;
  }
}

.homePopoverContentArea {
  max-height: 120px;
  padding: 12px;
  border-radius: 10px;
  background-color: #f8f8f8;
  color: #555555;
  font-weight: 400;
  overflow: auto;
}

.homePopoverBtnGroup {
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
    background-color: #4643dd;
    color: #ffff;
    cursor: pointer;
  }

  & > .homePopoverCopyGroup {
    border: 1px solid #dadce0;
    background-color: #ffff;
    color: #555555;
  }
}

.homePopoverIcon {
  width: 18px;
  height: 18px;
  cursor: pointer;
}
</style>
