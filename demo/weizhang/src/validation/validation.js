import { rules } from '../utils/utils'
import store from '../store/index'

const indexValidation = function(params) {
    if(params.IDCard == ''){
        store.actions.setMsgTip('请输入身份证号')
        return false
    }
    if(params.name == ''){
        store.actions.setMsgTip('请输入车主姓名')
        return false
    }
    if(params.tel == ''){
        store.actions.setMsgTip('请输入手机号码')
        return false
    }
    if(params.password == ''){
        store.actions.setMsgTip('请设置登陆密码')
        return false
    }
    if(!rules.IDCard(params.IDCard){
        store.actions.setMsgTip('请输入正确的身份证号格式')
        return false
    }
    if(!rules.tel(params.tel){
        store.actions.setMsgTip('请输入正确的手机号码格式')
        return false
    }
    if(!rules.password(params.password){
        store.actions.setMsgTip('密码格式为8-16位字符 包含大写字母 小写字母 数字')
        return false
    }
    return true
}

export {
    indexValidation
}
