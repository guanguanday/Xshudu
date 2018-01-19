export const changeMsg = function ({commit}) {
    commit({
        type: 'mutationsMsg',
        msg: '我是修改后的数据'
    })
}