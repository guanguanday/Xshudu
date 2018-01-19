<template>
    <div>
        <x-header>
            <span>overwrite-left</span>
            <x-icon slot="overwrite-left" type="navicon" size="35" style="fill:#fff;position:relative;top:-8px;left:-3px;"></x-icon>
        </x-header>
        {{gettersMsg}}
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import {XHeader, Drawer}  from 'vux'
    export default {
        data() {
            return{

            }
        },
        components: {
            XHeader,
        },
        computed: {
            ...mapGetters(['gettersMsg'])
        },
    }
</script>