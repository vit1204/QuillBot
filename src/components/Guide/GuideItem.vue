<script setup lang="ts">
const guide = {
  name: 'Nguyễn Văn A',
  description: 'Tôi là một hướng dẫn viên chuyên nghiệp tại Đà Nẵng',
  address: 'Đà Nẵng',
  price: 500000,
  avatar: 'https://avatarfiles.alphacoders.com/218/218123.jpg',
  user_attributes: [
    {
      id: 0,
      key: 'language',
      value: 'Tiếng Anh',
    },
    {
      id: 1,
      key: 'language',
      value: 'Tiếng Trung',
    },
    {
      id: 2,
      key: 'experience',
      value: 24, // MONTHS
    },
  ],
}

function getLabel(attribute: {
  id: number
  key: string
  value: string | number
}) {
  switch (attribute.key) {
    case 'experience':

      return `${attribute.value / 12} năm kinh nghiệm`

    default:
      return attribute.value
  }
}
</script>

<template>
  <div :class="$style.guideItemWrapper">
    <div :class="$style.guideItemHeader">
      <img :src="guide.avatar" :class="$style.guideItemAvatar">
      <div :class="$style.guideItemTitle">
        <p :class="$style.guideItemName">
          {{ guide.name }}
        </p>
        <span>-</span>
        <p :class="$style.guideItemAddress">
          {{ guide.address }}
        </p>
      </div>
      <div :class="[$style.guideItemAction, $style.guideItemBtn, $style.guideItemBtnOutline]">
        <!--  -->
      </div>
    </div>
    <div :class="$style.guideItemBody">
      <div :class="$style.guideInfo">
        <p>Giá: {{ guide.price }} / 1 ngày</p>
      </div>
      <div :class="$style.guideBadgeList">
        <span
          v-for="attribute in guide.user_attributes"
          :key="`attribute-${attribute.id}`"
          :class="$style.guideBadgeItem"
        >
          {{ getLabel(attribute) }}
        </span>
      </div>
      <div :class="$style.guideItemDescription">
        <p>{{ guide.description }}</p>
      </div>
    </div>
    <div :class="$style.guideItemFooter">
      <button :class="[$style.guideItemBtn, $style.guideItemBtnOutline]">
        Message
      </button>
      <button :class="[$style.guideItemBtn, $style.guideItemBtnPrimary]">
        Invite to tour
      </button>
    </div>
  </div>
</template>

<style lang="scss" module>
.guideItemWrapper {
  background-color: white;
  padding: 1.5rem 1rem;
}

.guideItemHeader {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.guideItemAvatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: var(--color-primary);
  object-fit: contain;
}

.guideItemAction {
  flex: initial !important;
  width: 40px;
  height: 40px;
}

.guideItemTitle {
  flex: 1;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.25rem;

  * {
    margin: 0;
    padding: 0;
  }
}

.guideItemName {
  font-size: 1rem;
  font-weight: 600;
}

.guideItemAddress {
  font-size: 0.875rem;
}

.guideBadgeList {
  display: flex;
  gap: 0.25rem;
  flex-wrap: wrap;
}

.guideBadgeItem {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  background-color: var(--color-gray-lighter);
  font-size: 0.75rem;
  color: var(--color-gray-dark);
}

.guideItemFooter {
  display: flex;
  gap: 0.75rem;
}

.guideItemBtn {
  flex: 1;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  outline: none;
  cursor: pointer;
  transition-duration: 300ms;

  &.guideItemBtnOutline {
    border: 1px solid var(--color-primary);
    color: var(--color-primary);
    background-color: white;
  }

  &.guideItemBtnPrimary {
    border: none;
    background-color: var(--color-primary);
    color: white;
  }

  &:hover {
    color: white;
    background-color: var(--color-primary-dark);
  }

  &:active {
    color: white;
    background-color: var(--color-primary-darker);
  }
}
</style>
