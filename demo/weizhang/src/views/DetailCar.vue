<template>
    <div class="sub-router" id="DetailCar">

        <p class="tips">为了您和他人的信息安全，仅支持绑定本人机动车信息</p>

        <div class="form-box">
            <div class="form__bar">
                <div class="form__item">
                    <p class="form__key">号码类型</p>
                    <ul class="form__value num-type">
                        <li @click='numType = 1'>
                            <i :class="{ active:numType == 1 }"></i><span>小型汽车</span>
                        </li>
                        <li @click='numType = 2'>
                            <i :class="{ active:numType == 2 }"></i><span>大型汽车</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="form__bar">
                <div class="form__item">
                    <p class="form__key">车牌号码</p>
                    <input class="form__value" type="text" placeholder="请输入完整车牌号">
                </div>
            </div>
            <div class="form__bar">
                <div class="form__item">
                    <p class="form__key">发动机号</p>
                    <input class="form__value" type="text" placeholder="请输入发动机号">
                </div>
            </div>
        </div>

        <footer class="footer next">
            <a class="button" @click='goAuth'>下一步</a>
        </footer>

    </div>
</template>

<script>
    import { Promise } from 'es6-promise'
    import store from '../store/index'
    import ga_storage from '../utils/GALocalStorage'
    import { localInfo, getQueryString, rules } from '../utils/utils'
    import { orderApi } from '../api/api'
    import voucher from '../components/Voucher.vue'

    export default {
        data() {
            console.log(this.$route)
            return {
                orderPrice:Number(getQueryString().orderPrice),
                serviceName:getQueryString().serviceName,
                serviceItemName:getQueryString().serviceItemName,
                serviceId:getQueryString().serviceId,
                serviceItemId:getQueryString().serviceItemId,
                voucherList:[],
                voucherSelect:{},
                voucherSelectIndex:-1,
                voucherUsable:0,
                modal_voucher_show:false,
                vehicleLicence:'',
                vehicleType:'',
                vehicleOwner:'',
                numType:1
            }
        },
        route: {
            data(transition) {
                let promise_getValidList = orderApi.getValidList()
                .then(result => {
                    this.voucherList = result
                })
                .catch(error => {
                    console.error(error)
                })
                ga_storage._trackPageview('rescue/views/OrderView', "道路救援提交订单");
                Daze.setTitle('提交订单');
                transition.next()
            }
        },
        computed:{
            realPrice(){
                if(_.isEmpty(this.voucherSelect)){
                    return this.orderPrice
                }
                return this.orderPrice - this.voucherSelect.amount
            },
            storeLocalInfo(){
                return store.state.localInfo
            }
        },
        methods:{
            showvoucherList(){
                this.modal_voucher_show = true
            },
            goAuth(){
                let router = this.$route.router
                router.go({
                    name: 'detailAuth'
                });
            },
            goPay(){
                if(this.vehicleLicence == ''){
                    store.actions.setMsgTip('请输入车牌号码')
                    return
                }
                if(this.vehicleType == ''){
                    store.actions.setMsgTip('请输入车牌类型')
                    return
                }
                if(this.vehicleOwner == ''){
                    store.actions.setMsgTip('请输入车辆所有人')
                    return
                }
                if(!rules.licence(this.vehicleLicence)){
                    store.actions.setMsgTip('请输入正确的车牌号码')
                    return
                }


                store.actions.showLoading()
                let params = {
                    pId: localInfo.getPid(),
                    uid: localInfo.getUid(),
                    userId: localInfo.getUserId(),
                    cityId: this.storeLocalInfo.cityId,
                    serviceItemId : this.serviceItemId,
                    serviceId: this.serviceId,
                    serviceProviderId: 39,
                    price: this.realPrice,
                    descr: `${this.vehicleLicence},${this.vehicleType},${this.vehicleOwner}`
                }
                let promise_addOrder = orderApi.addOrder(params)
                .then(result => {
                    store.actions.hideLoading()
                    if(result){
                        Daze.pushWindow({
                            appId:'10000024',
                            url:`index.html?orderId=${result}&orderPrice=${this.realPrice}`
                        })
                    }
                })
                .catch(error => {
                    console.error(error)
                    store.actions.hideLoading()
                })
            }
        },
        components:{ voucher }
    }
</script>

<style lang="sass">
    @import "../sass/variables";
    @import "../sass/extends";
    @import "../sass/mixins";

    #DetailCar{
        .next{
            padding:16px;
        }
        .num-type{
            display: flex;
            align-items:center;
            justify-content: space-between;
            padding:0;
            li{
                padding:20px 0;
                width:20%;
                flex:1;
                display: flex;
                align-items:center;
                // padding-left: 10px;
                // &:first-child{
                //     padding-left:0;
                // }
            }
            i{
                display: block;
                width: 14px;
                height: 14px;
                border:1px solid $defaultColor;
                border-radius:50%;
                margin-right: 10px;
                &.active{
                    border-color: $orange;
                    background:$orange url(../images/iconfont-appduigou.png) no-repeat center 3px;
                    background-size: 12px 12px;
                    -webkit-background-size: 12px 12px;
                }
            }
        }
    }
</style>


