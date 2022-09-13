import { getInstance, BASE_URL } from './constants';


export const getAllVersions = async ({ token, cursor, since }) => {
    let param = '';

    if (cursor) {
        param = `&cursor=${cursor}`;
    }

    if (since) {
        param = `${param}&since=${since}`;
    }
    
    const { data } = await getInstance({ token }).get(`${BASE_URL}/v2/extension-versions?maxResults=100${param}`);

    if (data) {
        return {
            versions: data.items,
            more: data.more,
            cursor: data.cursor
        }
    }

    return {};
}

export const getExtensionVersions = async ({ token, extensionId, cursor }) => {
    let param = '';

    if (cursor) {
        param = `&cursor=${cursor}`;
    }

    const { data } = await getInstance({ token }).get(`${BASE_URL}/v2/extensions/${extensionId}/versions?maxResults=100${param}`);

    if (data) {
        return {
            versions: data.items,
            more: data.more,
            cursor: data.cursor
        }
    }

    return {};
}

export const getVersionReview = async ({ token, extensionId, versionId, cursor}) => {
    let param = '';

    if (cursor) {
        param = `&cursor=${cursor}`;
    }

    const { data } = await getInstance({ token }).get(`${BASE_URL}/v2/extensions/${extensionId}/versions/${versionId}/reviews?maxResults=100${param}`);

    if (data) {
        return {
            reviews: data.items,
            more: data.more,
            cursor: data.cursor
        }
    }

    return {};
}