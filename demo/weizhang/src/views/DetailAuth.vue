<template>
    <div class="sub-router" id="DetailCar">

        <p class="tips">绑定机动车需要手机验证机动车信息</p>

        <div class="form-box">
            <div class="form__bar">
                <div class="form__item">
                    <p class="form__key">手机号码</p>
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

        <p class="tips">手机验证码正以短信形式发送给手机136****2233，三分钟内正确输入有效</p>

        <footer class="footer next">
            <a class="button" @click='goPage'>下一步</a>
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
                store.actions.setRegisterStep(2)
                Daze.setTitle('绑定机动车');
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
                    name: 'detailLicense'
                });
            }
        },
        components:{  }
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
    }
</style>


