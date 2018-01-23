import state from '../vuex/rootState'

export default {
    sdArr: [],
    errorArr: [],
    blankNum: state.level.num,
    backupSdArr: [],
    init:function(){
        let beginTime = new Date().getTime();
        this.createSdArr();
        console.log("数独生成完毕，耗时："+((new Date().getTime())-beginTime)/1000+"秒！");
        this.createBlank(this.blankNum);
        return {
            sdArr: this.sdArr,
            sdArrBac: this.backupSdArr
        }
    },
    reset:function(){
        //重置程序。
        this.errorArr = [];
        let beginTime = new Date().getTime();
        this.createSdArr();
        console.log("数独生成完毕，耗时："+((new Date().getTime())-beginTime)/1000+"秒！");
        this.createBlank(this.blankNum);
    },
    createSdArr:function(){
        //生成数独数组。
        try{
            this.sdArr = [];
            this.setThird(2,2);
            this.setThird(5,5);
            this.setThird(8,8);
            let allNum = [1,2,3,4,5,6,7,8,9];
            outerfor:
                for(let i=1;i<=9;i++){
                    innerfor:
                        for(let j=1;j<=9;j++){
                            if(this.sdArr[parseInt(i+''+j)]){
                                continue innerfor;
                            }
                            let XArr = this.getXArr(j,this.sdArr);
                            let YArr = this.getYArr(i,this.sdArr);
                            let thArr = this.getThArr(i,j,this.sdArr);
                            let arr = getConnect(getConnect(XArr,YArr),thArr);
                            let ableArr = arrMinus(allNum,arr);

                            if(ableArr.length == 0){
                                this.createSdArr();
                                return;
                                break outerfor;
                            }

                            let item;
                            //如果生成的重复了就重新生成。
                            do{
                                item = ableArr[getRandom(ableArr.length)-1];
                            }while((inArray(item, arr)));

                            this.sdArr[parseInt(i+''+j)] = item;
                        }
                }
        }catch(e){
            //如果因为超出浏览器的栈限制出错，就重新运行。
            // that.createSdArr();
        }
    },
    getXArr:function(j,sdArr){
        //获取所在行的值。
        let arr = [];
        for(let a =1;a<=9;a++){
            if(this.sdArr[parseInt(a+""+j)]){
                arr.push(sdArr[parseInt(a+""+j)])
            }
        }
        return arr;
    },
    getYArr:function(i,sdArr){
        //获取所在列的值。
        let arr = [];
        for(let a =1;a<=9;a++){
            if(sdArr[parseInt(i+''+a)]){
                arr.push(sdArr[parseInt(i+''+a)])
            }
        }
        return arr;
    },
    getThArr:function(i,j,sdArr){
        //获取所在三宫格的值。
        let arr = [];
        let cenNum = this.getTh(i,j);
        let thIndexArr = [cenNum-11,cenNum-1,cenNum+9,cenNum-10,cenNum,cenNum+10,cenNum-9,cenNum+1,cenNum+11];
        for(let a =0;a<9;a++){
            if(sdArr[thIndexArr[a]]){
                arr.push(sdArr[thIndexArr[a]]);
            }
        }
        return arr;
    },
    getTh:function(i,j){
        //获取所在三宫格的中间位坐标。
        let cenArr = [22,52,82,25,55,85,28,58,88];
        let index = (Math.ceil(j/3)-1) * 3 +Math.ceil(i/3) -1;
        let cenNum = cenArr[index];
        return cenNum;
    },
    setThird:function(i,j){
        //为对角线上的三个三宫格随机生成。
        let numArr = [1,2,3,4,5,6,7,8,9];
        let sortedNumArr= numArr.sort(function(){return Math.random()-0.5>0?-1:1});
        let cenNum = parseInt(i+''+j);
        let thIndexArr = [cenNum-11,cenNum-1,cenNum+9,cenNum-10,cenNum,cenNum+10,cenNum-9,cenNum+1,cenNum+11];
        for(let a=0;a<9;a++){
            this.sdArr[thIndexArr[a]] = sortedNumArr[a];
        }
    },
    createBlank:function(num){
        //生成指定数量的空白格子的坐标。
        let blankArr = [];
        let numArr = [1,2,3,4,5,6,7,8,9];
        let item;
        this.backupSdArr = this.backupSdArr.concat(this.sdArr);
        for(let a =0;a<num;a++){
            do{
                item = parseInt(numArr[getRandom(9) -1] +''+ numArr[getRandom(9) -1]);
            }while(inArray(item, blankArr));
            blankArr.push(item);
            this.backupSdArr[item] = undefined;
        }
    },
    checkRes:function(){
        //检测用户输入结果。检测前将输入加入数组。检测单个的时候将这一个的值缓存起来并从数组中删除，检测结束在赋值回去。
        let blankArr = this.blankArr,len = this.blankArr.length,x,y,dom,done,temp;
        this.getInputVals();
        this.errorArr.length = 0;
        for(let i =0;i<len;i++){
            x = parseInt(blankArr[i]/10);
            y = blankArr[i]%10;
            temp = this.backupSdArr[blankArr[i]];
            this.backupSdArr[blankArr[i]] = undefined;
            this.checkCell(x,y);
            this.backupSdArr[blankArr[i]] = temp;

        }
        done = this.isAllInputed();
        if(this.errorArr.length == 0 && done ){
            alert('you win!');
        }else{
            if(!done){
                alert("你没有完成游戏！");
            }
            this.showErrors();
        }
    },
    checkCell:function(i,j){
        //检测一个格子中输入的值，在横竖宫里是否已存在。
        let index = parseInt(i+''+j);
        let backupSdArr = this.backupSdArr;
        let XArr = this.getXArr(j,backupSdArr);
        let YArr = this.getYArr(i,backupSdArr);
        let thArr = this.getThArr(i,j,backupSdArr);
        let arr = getConnect(getConnect(XArr,YArr),thArr);
        let val = parseInt($(".sdli").eq(j-1).find(".sdspan").eq(i-1).html());
        if($.inArray(val, arr)>-1){
            this.errorArr.push(index);
        }
    },
}

//生成随机正整数
function getRandom(n){
    return Math.floor(Math.random()*n+1)
}

//两个简单数组的并集。
function getConnect(arr1,arr2){
    let i,len = arr1.length,resArr = arr2.slice();
    for(i=0;i<len;i++){
        if(!inArray(arr1[i], arr2)){
            resArr.push(arr1[i]);
        }
    }
    return resArr;
}

//两个简单数组差集，arr1为大数组
function　arrMinus(arr1,arr2){
    let resArr = [],len = arr1.length;
    for(let i=0;i<len;i++){
        if(!inArray(arr1[i], arr2)){
            resArr.push(arr1[i]);
        }
    }
    return resArr;
}

//判断数组是否存在某个值
function inArray(value, arr) {
    for (let i=0; i<arr.length; i++){
        if (arr[i] == value){
            return true;
        } else {
            continue;
        }
    }
    return false;
}