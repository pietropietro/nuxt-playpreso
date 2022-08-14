<template >
    <div>
        <user-participation-standing v-for="up in ups" :key="up.id" :up="up" />
    </div>
</template>
<script>
export default {
    props: {
        ups: {type: Array}
    }
}
</script>