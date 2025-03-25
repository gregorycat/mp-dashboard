import { getInstance, BASE_URL } from './constants';

export const getProviders = async ({token}) => {

    const { data } = await getInstance({ token }).get(`${BASE_URL}/v2/providers?maxResults=100`);

    if (data && data.items) {
        return data.items;
    }

    return [];
}