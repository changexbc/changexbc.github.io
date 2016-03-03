<template>
    <div id='illegal-index'>

        <div class='router-inner illegal-index-view' v-show="!$loadingRouteData" transition="fade">
            <div class="wrapper">

                <header class="header">
                    <ul class="advantage">
                        <li>
                            <img src="../images/hdpic1.png">
                            <span>无需排队</span>
                        </li>
                        <li>
                            <img src="../images/hdpic2.png">
                            <span>及时处理</span>
                        </li>
                        <li>
                            <img src="../images/hdpic3.png">
                            <span>无服务费</span>
                        </li>
                    </ul>
                    <p class="tips">支持拥有本地机动车和驾驶证的个人用户进行网上注册</p>
                </header>

                <section class="main">
                    <div class="form-box">
                        <div class="form__bar">
                            <div class="form__item">
                                <p class="form__key">身份证号</p>
                                <input class="form__value" type="tel" placeholder="请输入15或18位身份证号" v-model='IDCard'>
                            </div>
                        </div>
                        <div class="form__bar">
                            <div class="form__item">
                                <p class="form__key">车主姓名</p>
                                <input class="form__value" type="text" placeholder="请输入真实姓名">
                            </div>
                        </div>
                        <div class="form__bar">
                            <div class="form__item">
                                <p class="form__key">手机号码</p>
                                <input class="form__value" type="text" placeholder="请输入手机号码">
                            </div>
                        </div>
                        <div class="form__bar">
                            <div class="form__item arrow">
                                <p class="form__key">注册城市</p>
                                <div class="form__value no-padding">
                                    <select
                                        v-el:car-info-area
                                        v-mobiscroll-select-group="storeLocalInfo.cityName"
                                        :value='storeLocalInfo.cityName'>
                                        <optgroup
                                            v-for="optgroup in storeLocalInfo.cityList"
                                            :label='optgroup.name' >
                                            <option
                                                v-for='option in optgroup.info'
                                                :value="option.city_name"
                                                :selected="option.city_name == storeLocalInfo.cityName">
                                                {{ option.city_name }}
                                            </option>
                                        </optgroup>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="form__bar">
                            <div class="form__item">
                                <p class="form__key">设置密码</p>
                                <input class="form__value" type="password" placeholder="请设置登录密码"
                                    @focus='tips_pwd = true'
                                    @blur='tips_pwd = false'>
                            </div>
                        </div>
                    </div>
                </section>

                <p class="form-tips" v-if='tips_pwd == true'>8-16位字符 包含大写字母 小写字母 数字</p>

                <footer class="footer register">
                    <a class="button" @click='goPage'>立即注册</a>
                </footer>

            </div>

        </div>
    </div>

</template>

<script>
    import { Promise } from 'es6-promise'
    import store from '../store/index'
    import ga_storage from '../utils/GALocalStorage'
    import { localInfo, getQueryString, rules } from '../utils/utils'
    import { orderApi } from '../api/api'
    import { mobiscrollSelectGroup } from '../directives/directive-mobiscroll'

    export default {
        data() {
            return {
                vehicleLicence:'',
                vehicleType:'',
                vehicleOwner:'',
                tips_pwd:false
            }
        },
        route: {
            data(transition) {
                ga_storage._trackPageview('illegal/views/IndexView', "违章自助处理");
                Daze.setTitle('违章自助处理');
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
                    name: 'detail'
                });
            }
        },
        directives: {
            mobiscrollSelectGroup
        }
    }
</script>

<style lang="sass">
    @import "../sass/variables";
    @import "../sass/extends";
    @import "../sass/mixins";

    .illegal-index-view{
        .header{
            background-color: #FFF;
            .advantage{
                padding:14px 0;
                display:flex;
                li{
                    width:30%;
                    flex:1;
                    text-align:center;
                    span{
                        font-size:12px;
                        display:block;
                        padding-top: 8px;
                    }
                    img{
                        width:56px;
                        height:56px;
                    }
                }
            }
            .tips{
                background-color: #ffe9bf;
                color:$red;
            }
        }
        .main{

        }
        .form-tips{
            @extend %font-footnote;
            padding-top: 8px;
            text-align:center;
        }
        .footer{
            padding:16px;
        }
    }
</style>


