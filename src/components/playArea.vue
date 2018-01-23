
<style lang="less">
    .play-wrap{
        padding: 30px 10px 10px 10px;
        table{
            border: 1px solid black;
            width: 100%;
            tr{
                td{
                    border: 1px solid #eee;
                    vertical-align: middle;
                    text-align: center;
                }
            }
        }
        .border-bottom{
            border-bottom: 1px solid black;
        }
        .border-right{
            border-right: 1px solid black;
        }
        .oper{
            margin-top: 20px;
        }
        .mint-button{
            margin: 10px;
        }
        .bold{
            font-weight: bold;
        }
        .red{
            color: red;
        }
        .green{
            color: green;
        }
    }
</style>
<template>
    <div class="play-wrap">
        <table cellpadding="0" cellspacing="0">
            <tr v-for="i in 9">
                <td :height="tdHeight" v-for="j in 9" @click="handleClick(i, j)" :class="[{'border-right': j==3 || j==6}, {'border-bottom': i==3 || i==6}, {'red':!sdBac[i+''+j]}]">{{sdMap[i+''+j]}}</td>
            </tr>
        </table>
        <div class="oper">
            <mt-button :type="i == currentNum ? 'primary' : 'default'" v-for="i in 9" @click.native="activeNum(i)">{{i}}</mt-button>
            <mt-button type="danger" @click.native="rePlay">重玩本关</mt-button>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import SD from '../assets/getMap'
    import { MessageBox } from 'mint-ui';
    export default {
        data() {
            return {
                tdHeight: 0,
                currentNum: 0,
                sdMap: [],
                sdFull: [], //完整数独
                sdBac: [], //lalalala
                remain: 100,
            }
        },
        computed: {
            ...mapGetters(['state'])
        },
        mounted: function () {
            let tdWidth = window.getComputedStyle(document.getElementsByTagName('td')[0], null).width;
            this.tdHeight = tdWidth;
            this.remain = this.state.level.num;
            let sd = SD.init();
            this.sdFull = this.sdFull.concat(sd.sdArr);
            this.sdMap = this.sdMap.concat(sd.sdArrBac);
            this.sdBac = this.sdBac.concat(sd.sdArrBac);
        },
        methods: {
            activeNum(i) {
                this.currentNum = i;
            },
            rePlay() {
                this.sdMap = [];
                console.log(this.sdFull)
                this.sdMap = this.sdMap.concat(this.sdBac);
            },
            handleClick(i, j) {
                if (!this.sdBac[i+''+j]){
                    let result = this.checkCell(i, j);
                    this.sdMap.splice(i+''+j, 1, this.currentNum);
                    if (result) {
                        // this.$store.dispatch()
                        this.remain--;
                    }
                    console.log(this.remain)
                    if (this.remain == 0){
                        MessageBox('success');
                    }
                }
            },
            checkCell(i, j) {
                //检查行
                for (let m=0; m<9; m++){
                    if (this.sdMap[i+''+m] == this.currentNum && m != j) {
                        console.log(this.sdMap[i+''+m]);
                        return false;
                    } else {
                        continue;
                    }
                }
                //检查列
                for (let n=0; n<9; n++) {
                    if (this.sdMap[n+''+j] == this.currentNum && i != n) {
                        return false;
                    } else {
                        continue;
                    }
                }
                //检查方框
                let cenArr = [22,52,82,25,55,85,28,58,88];
                let index = (Math.ceil(j/3)-1) * 3 +Math.ceil(i/3) -1;
                let cenNum = cenArr[index];
                let thIndexArr = [cenNum-11,cenNum-1,cenNum+9,cenNum-10,cenNum,cenNum+10,cenNum-9,cenNum+1,cenNum+11];
                if (this.inArray(this.currentNum, thIndexArr)) {
                    return false;
                }
                return true;
            },
            inArray(value, arr) {
                for (let i=0; i<arr.length; i++){
                    if (arr[i] == value){
                        return true;
                    } else {
                        continue;
                    }
                }
                return false;
            }
        }
    }
</script>