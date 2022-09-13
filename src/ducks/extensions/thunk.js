import { version } from 'react-dom';
import * as extensionApi from '../../api/extension';
import * as partnerApi from '../../api/partner';
import * as versionApi from '../../api/version';
import { extensionListSelector, partnersExtensionSelector, partnerSelector, extensionSelector } from './selector';
import { actions } from './slice';

const loadExtensions = (token, cursor) => async (dispatch) => {
    try {
        dispatch(actions.setIsLoadingExtensions({ loading: true }));
        const data = await extensionApi.getExtensions({ token, cursor });

        dispatch(actions.addExtensions(data));
    } catch (error) {
        console.log(error);

    } finally {
        dispatch(actions.setIsLoadingExtensions({ loading: false }));
    }
}

const fetchExtensions = async (extensions, token, cursor) => {
    const data = await extensionApi.getExtensions({ token, cursor });

    extensions.push(...data.items);

    if (data.more) {
        return fetchExtensions(data.items, token, data.cursor);
    }

    return extensions;
}

const loadAllExtensions = (token) => async (dispatch) => {
    try {
        dispatch(actions.setIsLoadingExtensions({ loading: true }));

        const data = await fetchExtensions([], token, undefined);

        dispatch(actions.addAllExtensions(data));
    } catch (error) {
        console.log(error);

    } finally {
        dispatch(actions.setIsLoadingExtensions({ loading: false }));
    }
}

const fetchPartners = async (partners, token, cursor) => {
    const data = await partnerApi.getPartners({ token, cursor });

    partners.push(...data.partners);

    if (data.more) {
        return fetchPartners(data.partners, token, data.cursor);
    }

    return partners;
}

const loadAllPartners = (token) => async (dispatch, getState) => {
    try {
        dispatch(actions.setIsLoadingPartners({ loading: true }));

        const data = await fetchPartners([], token, undefined);
        const state = getState();
        data.forEach((entry) => {
            const extensions = partnersExtensionSelector(state, { partnerId: entry.id });
            entry.extensions = extensions;
        })

        dispatch(actions.addAllPartners(data));
    } catch (error) {
        console.log(error);

    } finally {
        dispatch(actions.setIsLoadingPartners({ loading: false }));
    }
}

const fetchExtensionVersions = async (version, token, extensionId, cursor) => {
    const data = await extensionApi.getExtensionVersions({ token, extensionId, cursor });

    version.push(...data.items);

    if (data.more) {
        return fetchExtensionVersions(data.items, token, data.cursor);
    }

    return version;
}

const fetchExtensionsVersions = async (extensions, token, partnerId, dispatch) => {
    for (const extension of extensions) {
        const data = await fetchExtensionVersions([], token, extension.id, undefined);
        dispatch(actions.addAllVersions({data, partnerId, extensionId: extension.id }));
    };
}

const loadPartnerVersions = (token, partnerId) => async (dispatch, getState) => {
    try {
        dispatch(actions.setIsLoadingVersions({ loading: true }));

        const partner = partnerSelector(getState(), { partnerId });

        await fetchExtensionsVersions(partner.extensions, token, partnerId, dispatch);
        
        dispatch(actions.setPartnerVersionDefined({ loaded: true, partnerId}))
    } catch (error) {
        console.log(error);
        
    } finally {
        dispatch(actions.setIsLoadingVersions({ loading: false }));
    }
}

/* 
const loadAllVersions = (token) => async (dispatch) => {
    try {
        dispatch(actions.setIsLoadingVersions({ loading: true }));

        const data = await fetchVersions([], token, undefined);

        dispatch(actions.addAllVersions(data));
    } catch (error) {
        console.log(error);

    } finally {
        dispatch(actions.setIsLoadingVersions({ loading: false }));
    }
} */

const loadExtensionsVersions = (token) => async (dispatch, getState) => {
    try {
        dispatch(actions.setIsLoadingVersions({ loading: true }));

        const extensionList = extensionListSelector(getState());

        extensionList.forEach(async (extension) => {
            const data = await fetchExtensionVersions([], token, extension.id, undefined);

            dispatch(actions.addExtensionVersions({ data, extensionId: extension.id }));
            dispatch(actions.addAllVersions(data));
        });
    } catch (error) {
        console.log(error);

    } finally {
        dispatch(actions.setIsLoadingVersions({ loading: false }));
    }
}

const loadExtensionVersions = (token, extensionId) => async (dispatch, getState) => {
    try {
        dispatch(actions.setIsLoadingVersions({ loading: true }));

        const extension = extensionSelector(getState(), { extensionId });
        
        if (!extension) {
            throw new Error(`No exxtenion found with this id : ${extensionId}`);
        }

        const data = await fetchExtensionVersions([], token, extension.id, undefined);

        dispatch(actions.addExtensionVersions({ data, extensionId: extension.id }));
        dispatch(actions.addAllVersions(data));
    } catch (error) {
        console.log(error);

    } finally {
        dispatch(actions.setIsLoadingVersions({ loading: false }));
    }
}

const fetchVersionReviews = async (reviews, token, extensionId, versionId, cursor) => {
    const data = await versionApi.getVersionReview({ token, extensionId, versionId, cursor });

    reviews.push(...data.reviews);

    if (data.more) {
        return fetchVersionReviews(data.reviews, token, extensionId, versionId, data.cursor);
    }

    return reviews;
}

const loadExtensionReview = (token, extensionId) => async (dispatch, getState) => {
    try {
        dispatch(actions.setIsLoadingExtensionReviews({ loading: true }));

        const extension = extensionSelector(getState(), { extensionId });

        extension.versions.forEach(async (version) => {
            const data = await fetchVersionReviews([], token, extension.id, version.id, undefined);

            dispatch(actions.addExtensionVersionReviews({ data, extensionId: extension.id, versionId: version.id }));
            dispatch(actions.addReviews(data));
        });
    } catch (error) {
        console.log(error);
    } finally {
        dispatch(actions.setIsLoadingVersions({ loading: false }));
    }
}


export { 
    loadExtensions, 
    loadAllExtensions, 
    loadExtensionsVersions, 
    loadExtensionVersions, 
    loadAllPartners, 
    loadPartnerVersions, 
    loadExtensionReview 
};