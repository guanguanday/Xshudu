
import state from './rootState';
export const isShowToolBar = function () {
    state.toolBar.isShow = !state.toolBar.isShow;
}

