<script setup lang="ts">
import {  reactive } from 'vue'

const menuItems = reactive([
    {
        name: 'History',
        src: '/src/assets/history-svg.svg',
        srcDisplay: '',
        
        isPremium: true,
    },
    {
        name: 'Compare Modes',
        src: '/src/assets/photo-compare-svg.svg',
        srcDisplay: '',
       
        isPremium: true,
    },
    {
        name: 'Statistics',
        src: '/src/assets/analytics-svg.svg',
        srcDisplay: '',

        isPremium: false,
    },
    {
        name: 'Tone',
        src: '/src/assets/smile-svg.svg',
        srcDisplay: '',
        isPremium: true,
    },
    {
        name: 'Setting',
        src: '/src/assets/setting-svg.svg',
        srcDisplay: '',
        
        isPremium: false,
    },
    {
        name: 'Feedback',
        src: '/src/assets/comment-svg.svg',
        srcDisplay: '',
        
        isPremium: false,
    },
    {
        name: 'Hotkeys',
        src: '/src/assets/keyboard-svg.svg',
        srcDisplay: '',
        isPremium: false,
    },

])


</script>

<template>
    <div :class="$style.directionMenuContainer">
        <div v-for="(item, index) in menuItems" :key="index" :class="$style.directionMenuItem">
            <img :class="$style.directionMenuItemImg" :src="item.srcDisplay ? item.srcDisplay : item.src"
               >
          
            <div v-if="item.isPremium" :class="$style.directionMenuItemIconPremium">
                <img src="@/assets/diamond-svg.svg" alt="Premium">
            </div>
            <div v-if="item.isPremium" :class="$style.tooltipPremium" />
        </div>
    </div>
</template>

<style lang="scss" module>
.directionMenuContainer {}

.directionMenuItem {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    margin-top: 0.75rem;
    position: relative;
}

.directionMenuItemImg {
    margin: 0.5rem;
    width: 1.5rem;
    height: 1.5rem;
}

.directionMenuItem:hover {
    cursor: pointer;

}

.directionMenuItem span {
    font-size: 0.75rem;
    max-width: 3rem;
    text-align: center;
}

.directionMenuItemIconPremium {
    width: 1rem;
    height: 1rem;
    background-color: var(--color-primary);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 12%;
    top: 30%;

}

.directionMenuItemIconPremium img {
    width: 0.5rem;
    height: 0.5rem;

}

.noHoverSrc {
    color: #C5C6C7;
}
</style>