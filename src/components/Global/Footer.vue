<template>
<footer>

       <div class="container text-center">
        <p class="paragraph">&copy; {{ year }} Marie-Claire Balabanian</p>
       </div>

</footer>

</template>

<script setup>

    const year = new Date().getFullYear();
</script>

<style lang="scss">
    footer {
        padding: 40px 0;
    }
</style>