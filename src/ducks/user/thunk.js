import * as api from '../../api/login';
import { actions } from './slice';

const login = (email, password) => async (dispatch) => {
    try {
        dispatch(actions.setIsLoadingLogin({ loading: true }));
        const data = await api.loginToLumapps({email, password});
        
        dispatch(actions.setUserToken(data));
    } catch (error) {
        dispatch(actions.setUserToken(undefined));
        
    } finally {
        dispatch(actions.setIsLoadingLogin({ loading: false }));
    }
}

const getUserInfo = (baseUrl, token) => async (dispatch) => {

    try {
        const data = await api.getUserInfo(baseUrl, token);
        
        dispatch(actions.setUserInfo(data));
    } catch (error) {
        console.log(error);
        
    } finally {
       
    }
}

export { login, getUserInfo };