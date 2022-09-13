import { getInstance, BASE_URL } from './constants';

export const getPartners = async ({ token, cursor, since }) => {
    let param = '';

    if (cursor) {
        param = `&cursor=${cursor}`;
    }

    if (since) {
        param = `${param}&since=${since}`;
    }
    
    const { data } = await getInstance({ token }).get(`${BASE_URL}/v2/partners?maxResults=100${param}`);

    if (data) {
        return {
            partners: data.items,
            more: data.more,
            cursor: data.cursor
        }
    }

    return {};
}