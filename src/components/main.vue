
<style lang="less">
    .my-progress{
        margin-top: 40px;
        .mt-progress{
            height: 0;
        }
    }
</style>
<template>
    <div>
        <mt-header fixed :title="state.title">
            <mt-button icon="more" slot="right" @click="showNavBar"></mt-button>
        </mt-header>
        <div class="my-progress" v-show="state.progress.isShow">
            <mt-progress :value="state.progress.num"></mt-progress>
        </div>
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
            ...mapGetters(['state'])
        },
        methods: {
            showNavBar() {
                console.log('123');
            },
        }
    }
</script>