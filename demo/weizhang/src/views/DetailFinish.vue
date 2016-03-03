<template>
    <div class="sub-router" id="DetailFinish">

        <div class="finish-img">
            <img src="../images/finish.png">
        </div>

        <p class='congratulation'>恭喜您注册成功！</p>

        <footer class="footer next goIndex">
            <a class="button transparent" @click='goPage'>立即前往查办违章</a>
        </footer>

    </div>
</template>

<script>
    import { Promise } from 'es6-promise'
    import store from '../store/index'
    import ga_storage from '../utils/GALocalStorage'
    import { localInfo, getQueryString, rules } from '../utils/utils'
    import { orderApi } from '../api/api'

    export default {
        data() {
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
                store.actions.setRegisterStep(4)
                Daze.setTitle('注册完成');
                transition.next()
            }
        },
        computed:{
            storeLocalInfo(){
                return store.state.localInfo
            }
        },
        methods:{
            goPage(){
                let router = this.$route.router
                router.go({
                    name: 'record'
                });
            }
        }
    }
</script>

<style lang="sass">
    @import "../sass/variables";
    @import "../sass/extends";
    @import "../sass/mixins";

    #DetailFinish{
        .next{
            padding:16px;
        }
        .finish-img{
            padding-top: 25px;
            text-align: center;
            img{
                width: 128px;
            }
        }
        .congratulation{
            padding: 16px;
            text-align: center;
            color: $importColor;
        }
        .goIndex{
            display: flex;
            justify-content: center;
            .button{
                width:180px;
                border-radius:20px;
            }
        }
    }
</style>


