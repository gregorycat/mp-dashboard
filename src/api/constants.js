import axios from 'axios';

export const BASE_URL = 'https://go-shared-services.api.lumapps.com';

export const GET_TOKEN_URL = 'https://login.lumapps.com/v1/urls?slug=lumapps&nextUrl=/v1/get-token';
export const LOGIN_URL = 'https://login.lumapps.com/v1/login/email';

export const getInstance = ({ token }) => {
    return axios.create({
        headers: {
            authorization: `Bearer ${token}`,
        },
    });
};