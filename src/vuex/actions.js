export const changeMsg = ({commit}) => {
    commit({
        type: 'isShowToolBar',
        msg: '我是修改后的数据'
    })
}
export const isShowToolBar = function ({commit}) {
    commit('isShowToolBar')
}