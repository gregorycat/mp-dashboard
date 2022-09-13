import { getInstance, BASE_URL } from './constants';


export const getExtensions = async ({ token, cursor, since, categories, status, hasVersion, partnerId })=> {
    let param = '';

    if (cursor) {
        param = `&cursor=${cursor}`;
    }

    if (categories) {
        param = `${param}&categories=${categories}`;
    }

    if (since) {
        param = `${param}&since=${since}`;
    }
    
    if (status) {
        param = `${param}&versionStatus=${status}`;
    }

    if (hasVersion) {
        param = `${param}&hasVersion=true`;
    }

    if (partnerId) {
        param = `$partnerIds=${partnerId}`;
    }

    const { data } = await getInstance({ token }).get(`${BASE_URL}/v2/extensions?maxResults=100${param}`);

    if (data) {
        return {
            items: data.items,
            more: data.more,
            cursor: data.cursor
        }
    }

    return {};
};

export const getExtensionVersions = async ({ token, cursor, extensionId }) => {
    let param = '&sort=created_at';

    if (cursor) {
        param = `&cursor=${cursor}`;
    }

    const { data } = await getInstance({ token }).get(`${BASE_URL}/v2/extensions/${extensionId}/versions?maxResults=100${param}`);

    if (data) {
        return {
            items: data.items,
            more: data.more,
            cursor: data.cursor
        }
    }
}

export const getVersions = async ({ token, cursor }) => {
    let param = '';

    if (cursor) {
        param = `&cursor=${cursor}`;
    }

    const { data } = await getInstance({ token }).get(`${BASE_URL}/v2/extensions-versions?maxResults=100${param}`);

    if (data) {
        return {
            items: data.items,
            more: data.more,
            cursor: data.cursor
        }
    }

}