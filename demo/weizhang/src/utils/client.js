import store from '../store/index'
import { localInfo, getQueryString } from '../utils/utils'

const client = {
    initializeAll(callback, needCity ,needLogin) {

        needLogin
        ? Daze.login( (resp) => {
            if (Number(resp.isSuccess)) {
                let pid = Number(resp.pid)
                let uid = Number(resp.uid)
                let userId = Number(resp.userId)
                if (pid) {
                    localInfo.setGlobalData('pid', pid)
                }
                if (uid) {
                    localInfo.setGlobalData('uid', uid)
                }
                if (userId) {
                    localInfo.setGlobalData('userId', userId)
                }

                needCity ? this.getAppCityInfo(callback) : callback()
            }
        })
        : needCity ? this.getAppCityInfo(callback) : callback()
    },
    getSystem() {
        let system = ''

        if (!Daze.dazeClientVersion) {
            return system
        }

        if (Daze.dazeClientVersion.indexOf('android') >= 0) {
            system = 'android'
        }
        else if (Daze.dazeClientVersion.indexOf('iOS') >= 0) {
            system = 'ios'
        }

        return system
    },
    getVersion() {
        if (Daze.dazeClientVersion) {
            console.log(Daze.dazeClientVersion)
            return Daze.dazeClientVersion.split('_').slice(-1)[0];
        }
        else {
            return '';
        }
    },
    compareVersion(latestVersion) {
        let result
        let system = this.getSystem()
        if (!latestVersion) {
            return false;
        }

        if (system == 'android') {
            console.log(this.getVersion())
            if(this.getVersion() < latestVersion){
                result = false
            }
            else{
                result = true
            }
        }
        else if(system == 'ios'){
            let curVersion = Daze.dazeClientVersion.split('_').slice(-1)[0];
            let latestVersionArray = latestVersion.split('.');
            let curVersionArray = curVersion.split('.');
            let len = latestVersionArray.length;
            result = true;

            for (let i = 0; i < len; i++) {
                if (curVersionArray[i] < latestVersionArray[i]) {
                    result = false;
                    break;
                }
                else if (curVersionArray[i] > latestVersionArray[i]) {
                    break;
                }
            }
        }

        console.log(result)

        return result;
    },
    getAppCityInfo(callback){
        let cityId = getQueryString().cityId || ''
        let cityName = getQueryString().cityName
        let system = this.getSystem()

        if(cityId == '' || cityId == '{{cityId}}' ){
            setTimeout(() => {
                if(system == 'ios'){
                    Daze.geolocation.getSelectCity({},(city) => {
                        // console.log(city)
                        store.actions.setCity({
                            id:city.cityId,
                            name:city.city
                        })
                        callback && callback()
                    })
                }
                else{
                    // console.log(Daze)
                    Daze.geolocation.geolocation({},(city) => {
                        // console.log(city)
                        store.actions.setCity({
                            id:city.id,
                            name:city.city
                        })
                        callback && callback()
                    })
                }
            },200)
        }
        else{
            store.actions.setCity({
                id:cityId,
                name:cityName
            })
            callback()
        }

    }
}

export default client