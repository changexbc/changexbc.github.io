<template>
    <div id='illegal-detail'>

        <div class='router-inner illegal-detail-view' v-show="!$loadingRouteData" transition="fade">
            <div class="wrapper">

                <header class="header">
                    <div class="registration-process">
                        <div class="registration-process__num" :class='step'>
                            <span><i>1</i></span>
                            <span><i>2</i></span>
                            <span><i>3</i></span>
                            <span><i>4</i></span>
                            <em class="registration-process__line--default"></em>
                            <em class="registration-process__line--finish"></em>
                        </div>
                        <div class="registration-process__text">
                            <span>用户信息</span>
                            <span>绑定机动车</span>
                            <span>绑定驾驶证</span>
                            <span>注册完成</span>
                        </div>
                    </div>
                </header>

                <section class="main">
                    <router-view class="router" transition="fade-down" transition-mode="out-in" keep-alive></router-view>
                </section>

        </div>
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
                Daze.setTitle('绑定机动车');
                transition.next()
            }
        },
        computed:{
            step(){
                return {
                    'step1':store.state.localInfo.registerStep == 1,
                    'step2':store.state.localInfo.registerStep == 2,
                    'step3':store.state.localInfo.registerStep == 3,
                    'step4':store.state.localInfo.registerStep == 4
                }
            },
            storeLocalInfo(){
                return store.state.localInfo
            }
        },
        methods:{

        }
    }
</script>

<style lang="sass">
    @import "../sass/variables";
    @import "../sass/extends";
    @import "../sass/mixins";

    $green: #9bc200;
    .illegal-detail-view{
        header{
            background-color: #FFF
        }
        .registration-process{
            padding:16px 0;
        }
        .registration-process__num{
            display: flex;
            position: relative;
            font-size:12px;
            &.step2{
                span:first-child{
                    i{
                        background-color: $green
                    }
                }
                span:nth-child(2){
                    i{
                        background-color: $orange
                    }
                }
                .registration-process__line--finish{
                    width:37.5%;
                }
            }
            &.step3{
                span:first-child{
                    i{
                        background-color: $green
                    }
                }
                span:nth-child(2){
                    i{
                        background-color: $green
                    }
                }
                span:nth-child(3){
                    i{
                        background-color: $orange
                    }
                }
                .registration-process__line--finish{
                    width:62.5%;
                }
            }
            &.step4{
                span:first-child{
                    i{
                        background-color: $green
                    }
                }
                span:nth-child(2){
                    i{
                        background-color: $green
                    }
                }
                span:nth-child(3){
                    i{
                        background-color: $green
                    }
                }
                span:nth-child(4){
                    i{
                        background-color: $orange
                    }
                }
                .registration-process__line--finish{
                    width:87.5%;
                }
            }
            &:before{
                content:'';
                position:absolute;
                z-index:2;
                width:12.5%;
                left:0;
                height:100%;
                background-color: #FFF
            }
            &:after{
                content:'';
                position:absolute;
                z-index:2;
                width:12.5%;
                right:0;
                height:100%;
                background-color: #FFF
            }
            span{
                position: relative;
                z-index:3;
                display: block;
                width: 20%;
                flex:1;
                text-align: center;
            }
            i{
                display: inline-block;
                width:16px;
                line-height:16px;
                text-align: center;
                background-color: $defaultColor;
                color:#fff;
                border-radius:50%;
                transition:background-color ease .3s;
            }
            em{
                position: absolute;
                top:50%;
                left:0;
                width:100%;
                border-top:2px solid #ccc;
                margin-top:-1px;
            }
            .registration-process__line--finish{
                border-color:$green;
                transition: width ease .5s;
            }
        }
        .registration-process__text{
            display: flex;
            span{
                display: block;
                flex:1;
                width:20%;
                text-align: center;
                font-size:12px;
                color:$importColor;
                padding-top: 10px;
            }
        }
        .main{
            position:relative;
        }
    }
</style>


