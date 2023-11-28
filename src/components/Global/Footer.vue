<template>
<footer>

       <div class="container text-center">
        <p>&copy; {{ year }} Marie-Claire Balabanian</p>
       </div>

</footer>

</template>

<script setup>

    const year = new Date().getFullYear();
</script>

<style lang="scss">
    footer {
        background: $black;
        padding: 30px 0;
        color: $white;
    }
</style>