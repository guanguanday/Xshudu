<template>
    <div>
        {{gettersMsg}}
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    export default {
        data() {
            return{

            }
        },
        components: {

        },
        computed: {
            ...mapGetters(['gettersMsg'])
        },
    }
</script>