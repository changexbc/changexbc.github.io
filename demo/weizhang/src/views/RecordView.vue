<template>
    <div id='illegal-record'>

        <div class='router-inner illegal-record-view' v-show="!$loadingRouteData" transition="fade">
            <div class="wrapper">

                <header class="header">

                </header>

                <section class="main">
                    <loading-process
                        class="process-loading"
                        :loaded.sync='info_loaded'></loading-process>

                    <tab-box class="process-type" v-show="info_loaded" transition="fade">
                        <tab name='在线处理'>
                            <footer class="footer" >
                                <a class="button" @click='goPage'>回到首页</a>
                            </footer>
                        </tab>
                        <tab name='窗口处理'>
                            窗口处理内容
                        </tab>
                    </tab-box>
                </section>

            </div>


        </div>
    </div>

</template>

<script>
    import { Promise } from 'es6-promise'
    import store from '../store/index'
    import ga_storage from '../utils/GALocalStorage'
    import loadingProcess from '../components/LoadingProcess.vue'
    import tabBox from '../components/TabBox.vue'
    import tab from '../components/Tab.vue'

    export default {
        data() {
            return {
                info_loaded:false,
                processType:1
            }
        },
        route: {
            data(transition) {
                Daze.setTitle('违章记录');
                transition.next()
                setTimeout(() => {
                    this.info_loaded = true
                },3000)
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
                    name: 'index'
                });
            }
        },
        directives: {

        },
        components: {
            tabBox,
            tab,
            loadingProcess
        }
    }
</script>

<style lang="sass">
    @import "../sass/variables";
    @import "../sass/extends";
    @import "../sass/mixins";

    .illegal-record-view{
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
            padding:0 8px;
            position: relative;
        }
        .process-loading{
            position: absolute;
            top:0;
            left:50%;
            transform:translate(-50%,0);
        }
        .process-type{
            padding-top:20px;
            transition:opacity ease .4s .2s;
        }
        .footer{
            margin:16px;
            padding-top:300px;
        }
    }
</style>


