import { Promise } from 'es6-promise'
import { convertParams, convertRequestURL, localInfo } from '../utils/utils'
import store from '../store/index'

const orderApi = {
    //获取代金券
    getValidList(orderId){
        return new Promise( (resolve, reject) => {
            $.ajax({
                type:"get",
                url: convertRequestURL("coupon/getValidList.htm"),
                data: convertParams({
                    orderTypeId: 2,
                    uid: localInfo.getUid(),
                    price: 0
                }),
                success:(resp) => {
                    if(resp.code){
                        store.actions.setMsgTip(resp.msg);
                        resolve([])
                        return
                    }

                    let list = resp.data && resp.data.list;
                    if(!list.length){
                        resolve([])
                        return
                    }

                    let voucherBenjin = _.filter(list, item => item.name == 'benjin')[0].list
                    _.each(voucherBenjin,(value,key) => {
                        value.endTime = value.endTime.split(' ')[0];
                        value.canUse = true
                    })

                    resolve(voucherBenjin)
                },
                error() {
                    store.actions.setMsgTip('获取代金券失败！')
                    reject(new Error('获取代金券失败！'));
                }
            });
        })
    },
    //提交订单
    addOrder(params){
        return new Promise( (resolve, reject) => {
            $.ajax({
                url: convertRequestURL("dealService/add.htm"),
                type: 'post',
                data: convertParams(params),
                success:(resp) => {
                    if(resp.code){
                        store.actions.setMsgTip(resp.msg);
                        resolve(false)
                        return
                    }

                    resolve(resp.data.orderId)
                },
                error() {
                    store.actions.setMsgTip('提交订单失败！')
                    reject(new Error('提交订单失败！'));
                }
            });
        })
    }
}


export { orderApi }