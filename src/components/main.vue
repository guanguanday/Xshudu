
<style lang="less">
    .my-progress{
        margin-top: 40px;
        .mt-progress{
            height: 0;
        }
    }
    .my-menu{
        position: absolute;
        right: 0;
        top: 0;
        z-index: 1000;
        width: 80%;
    }
    .mask{
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: .5;
        background: #000;
    }
</style>
<template>
    <div>
        <mt-header fixed :title="state.title">
            <mt-button icon="more" slot="right" @click="isShowToolBar"></mt-button>
        </mt-header>
        <!--进度条-->
        <div class="my-progress" v-show="state.progress.isShow">
            <!--<mt-progress :value="state.progress.num"></mt-progress>-->
        </div>
        <!--play area-->
        <div>
            <play-area></play-area>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import toolBar from './toolbar'
    import playArea from './playArea'
    export default {
        data() {
            return{

            }
        },
        components: {
            toolBar,
            playArea,
        },
        computed: {
            ...mapGetters(['state'])
        },
        methods: {
            ...mapActions({
                isShowToolBar: 'isShowToolBar',
            })
        }
    }
</script>