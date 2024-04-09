<script setup lang="ts">
import { ref } from 'vue';
import '../../assets/main.scss'

const guides = ref([
    {
        name: "Tuyển dụng hướng dẫn viên",
        description: "Toi la 1 huong dan vien da co kinh nghiem trong nhieu nam ve viec huong dan khach du lich trung quoc",
        language: "",
        experience: "1 nam kinh nghiem",
        price: 500000,
        readMore: false,
        user_attributes: [
            {
                id: 0,
                key: "language",
                value: "Tiếng Anh"
            },
            {
                id: 1,
                key: "language",
                value: "Tiếng Việt"
            },
            {
                id: 2,
                key: "language",
                value: "Tiếng Em"
            },
        ],

    },
    {
        name: "Tuyển dụng hướng dẫn viên",
        description: "Toi la 1 huong dan vien da co kinh nghiem trong nhieu nam ve viec huong dan khach du lich Viet Nam",
        language: "",
        experience: "30 nam kinh nghiem",
        price: 700000,
        readMore: false,
        user_attributes: [
            {
                id: 0,
                key: "language",
                value: "Tiếng Viet"
            },
            {
                id: 1,
                key: "language",
                value: "Tiếng Hue"
            },
            {
                id: 2,
                key: "language",
                value: "Tiếng Em"
            },
        ],

    },
    {
        name: "Tuyển dụng hướng dẫn viên",
        description: "Toi la 1 huong dan vien da co kinh nghiem trong nhieu nam ve viec huong dan khach du lich trung quoc",
        language: "",
        experience: "1 nam kinh nghiem",
        price: 100000,
        readMore: false,
        user_attributes: [
            {
                id: 0,
                key: "language",
                value: "Tiếng Anh"
            },
            {
                id: 1,
                key: "language",
                value: "Tiếng Việt"
            },
            {
                id: 2,
                key: "language",
                value: "Tiếng Em"
            },
        ],

    }
])
   
const toggleReadMore = (guide: any) => {
    guide.readMore = !guide.readMore;
}

</script>

<template>
    <div :class="$style.guideFormat" v-for="guide in guides" :key="guide.price">
        <div :class="$style.guideContainer">
            <p> Posted 2 minutes ago </p>
            <div :class="$style.guideItemHeader">
                <h3>
                    Tuyển dụng hướng dẫn viên
                </h3>
                <h4>
                    {{ guide.price }}/ngày - {{ guide.experience }}
                </h4>
                <p>hrs/week</p>
            </div>

            <div :class="$style.guideItemBody">
                <p v-if="!guide.readMore"> {{ guide.description.slice(0, 50) + "..." }} </p>
                <p v-else>{{ guide.description }}</p>

                <div v-if="!guide.readMore" @click="toggleReadMore(guide)">more</div>
                <div v-else @click="toggleReadMore(guide)">less</div>
                <div :class="$style.list">
                    <span v-for="attribute in guide.user_attributes" :key="attribute.id"> {{
                        attribute.value }} </span>
                </div>
            </div>

            <div :class="$style.guideFooter">
                <div>
                    <span>Payment unverified</span>
                    <span>☆ ☆ ☆ ☆ ☆</span>
                    <span>💲0 spent </span>
                    <span> 📍Đà Nẵng</span>
                </div>
                <div>
                    <span>Proposals: 15 to 20</span>
                </div>

            </div>


        </div>
    </div>


</template>

<style lang="scss" module>
.guideFormat{

    border-bottom: 1px solid #ccc;
}
.guideItemHeader{
    line-height: 10px;
    p{

      color: #676767;
        
    }
}
.guideContainer{
    margin-left: 1rem;
    
}

.guideItemBody{
   div{
      cursor: pointer;
       text-decoration: underline;
       color: green;
   }
    p{
        overflow: hidden;
        
    }
.list{
    display: flex;
    gap: 0.25rem;
    flex-wrap: wrap;
    justify-content:space-evenly;
    span{
        margin-bottom: 20px;
    }
}
span{
    padding: 0.25rem 0.75rem;
        border-radius: 9999px;
        background-color: gray;
        font-size: 0.8rem;
        color:black;
        opacity: 0.6;
    }
    
}

.guideFooter{
      span{
        margin-right: 30px;;
      }
}

</style>