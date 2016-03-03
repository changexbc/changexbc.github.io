<template>
    <div class="sub-router" id="DetailLicense">

        <p class="tips">为了您和他人的信息安全，仅支持绑定本人驾驶证信息</p>

        <div class="form-box">
            <div class="form__bar">
                <div class="form__item">
                    <p class="form__key">档案编号</p>
                    <input class="form__value" type="text" placeholder="请输入完整车牌号">
                </div>
            </div>
            <div class="form__bar">
                <div class="form__item">
                    <p class="form__key">手机验证码</p>
                    <input class="form__value" type="tel" placeholder="请输入验证码">
                </div>
            </div>
        </div>

        <p class="tips">手机验证码将发送到<a>驾驶证档案登记的手机号码上</a>，若无法获取请前往注册地车管所咨询办理</p>

        <footer class="footer next">
            <a class="button" @click='goPage'>注册完成</a>
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

            }
        },
        route: {
            data(transition) {
                store.actions.setRegisterStep(3)
                Daze.setTitle('绑定驾驶证');
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
                    name: 'detailFinish'
                });
            }
        }
    }
</script>

<style lang="sass">
    @import "../sass/variables";
    @import "../sass/extends";
    @import "../sass/mixins";

    #DetailLicense{
        .next{
            padding:16px;
        }
    }
</style>


