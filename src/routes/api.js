import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as CONSTANTS from '../constants'
import * as RootNavigation from './RootNavigation';

export async function getApiTokenStorage() {
    try {
        const data = await AsyncStorage.getItem('@apitoken:key')
        return data
    } catch (error) {
        console.error(error)
    }
}

export async function getApiToken() {
    try {
        let reqdata = `grant_type=client_credentials&client_id=${CONSTANTS.CLIENT_ID}&client_secret=${CONSTANTS.CLIENT_SECRET}`
        const response = await axios({
            method: 'POST',
            url: 'https://www.soe.rs.gov.br/soeauth-hml/connect/token',
            data: (reqdata),
        })
        return response.data
    } catch (error) {
        console.error(error)
        return Promise.reject(error)
    }
}

const apiFetch = axios.create({})

apiFetch.interceptors.request.use(async (config) => {
    const token = await getApiTokenStorage().catch((e) => console.error(e))
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

apiFetch.interceptors.response.use(
    response => {
        return response
    }, error => {
        if (error.response.status = 401) {
            RootNavigation.navigate('Error401')
        } else if (error.response.status = 403) {
            RootNavigation.navigate('Error401')
        }
        return Promise.reject(error)
    })

export default apiFetch