<template>
    <div class="global-grid" aria-hidden="true" :class="placement" :style="{ transform : `translateY(${transformY})` }"> </div>
</template>


<script setup>
    const props = defineProps({
        placement: {
            type: String,
            required: false,
            default: 'left'
        },
        transformY: {
            type:  Number,
            required: false,
            default: 0,
        }
    })

</script>

<style lang="scss">
    

.global-grid {
    height: 0;
    overflow: visible;
    position: relative;
    z-index: -1;
    width: 70%;
    
    &.left {
        margin-right: auto;
    }
    &.right {
        margin-left: auto;
    }

    

    &::after {
        width: 100%;
        height: 0;
        padding-top: 300%;
        position: absolute;
        display: block;
        content: '';
        top: 0;
        left:0;
        background-image: repeating-linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0) 33px,$stroke 33px,$stroke 34px), repeating-linear-gradient(90deg,rgba(0,0,0,0),rgba(0,0,0,0) 33px,$stroke 33px,$stroke 34px); 
    }
  
}
</style>