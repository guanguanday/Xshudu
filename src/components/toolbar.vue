<template>
    <div>
        <mt-cell title="进度条">
            <mt-switch :value="state.progress.isShow"></mt-switch>
        </mt-cell>
    </div>
</template>
<script>
    import {mapGetters, mapActions} from 'vuex'
    export default {
        data() {
            return{

            }
        },
        computed: {
            ...mapGetters(['state'])
        },
        methods: {

        }
    }
</script>