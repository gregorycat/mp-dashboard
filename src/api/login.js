import axios from 'axios';
import { LOGIN_URL, getInstance } from './constants';

export const loginToLumapps = async ({ email, password }) => {
    try {
        const { data } = await axios.post(LOGIN_URL, {
            email,
            password,
        });
        
        localStorage.setItem('MP_DASHBOARD_TOKEN', data[0].token);
        localStorage.setItem('MP_DASHBOARD_REFRESH_TOKEN', data[0].refreshToken);
        
        return data[0];
    } catch (exception) {
        console.log(exception);
        return { error: true, message: 'User not found' };
    }
};

export const getUserInfo = async (baseUrl, token) => {
    const { data } = await getInstance({ token }).get(`${baseUrl}/v1/user/directory/get`);

    return data;
};