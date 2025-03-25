import { createSlice, current } from '@reduxjs/toolkit';
import { find } from 'lodash';

const getExtensionList = (state) => state.extensions.items;
const getExtension = (state, extensionId) => {
    const extensions = getExtensionList(state);

    if (!extensions) {
        throw new Error('Entry extensions.items not available')
    }
    return find(extensions, (extension) => extension.id === extensionId)
}

const getPartners = (state) =>  state.partners; 
const getPartnerList = (state) => {
    const partners = getPartners(state);
    
    if (!partners) {
        throw new Error('Entry partners not available');
    }
    
    return partners.items;
}
const getPartner = (state, partnerId) => {
    const list = getPartnerList(state);
    if (!list) {
        throw new Error('Entry partners.items not available');
    }

    return find(list, (partner) => partner.id === partnerId)
}

const getPartnerExtension = (state, partnerId, extensionId) => {
    const partner = getPartner(state,partnerId);

    return find(partner.extensions, (extension) => extension.id === extensionId)
}

const getVersionList = (state) => state.versions.items;
const getVersion = (state, versionId) => {
    const versions = getVersionList(state);

    if (!versions) {
        throw new Error('Entry versions.items not available')
    }
    return find(versions, (version) => version.id === versionId)

}

export const initialState = {
    providers: {
        isLoading: false,
        items: [],
    },
    extensions: {
        isLoading: false,
        items: [],
        cursor: undefined,
        more: false
    },
    availableExtensions: {
        isLoading: false,
        items: [],
        cursor: undefined,
        more: false
    },
    microApps: {
        isLoading: false,
        items: [],
        cursor: undefined,
        more: false
    },
    widgets: {
        isLoading: false,
        items: [],
        cursor: undefined,
        more: false
    },
    availableMicroApps: {
        isLoading: false,
        items: [],
        cursor: undefined,
        more: false
    },
    availableWidgets: {
        isLoading: false,
        items: [],
        cursor: undefined,
        more: false
    },
    versions: {
        isLoading: false,
        items: [],
        cursor: undefined,
        more: false
    },
    partners: {
        isLoading: false,
        items: [],
        cursor: undefined,
        more: false
    },
    reviews: {
        isLoading: false,
        items: [],
        cursor: undefined,
        more: false
    }
};

const { actions, reducer } = createSlice({
    name: 'extensions',
    initialState,
    reducers: {
        //Providers Loding
        setIsLoadingProviders: (state, action) => {
            const { payload } = action;
            const { loading } = payload;

            state.providers.isLoading = loading;
        },
         // set providers
         addProviders: (state, action) => {
            const { payload: providers } = action;
            state.providers.items = providers;
        },
        //Extension loading
        setIsLoadingExtensions: (state, action) => {
            const { payload } = action;
            const { loading } = payload;

            state.extensions.isLoading = loading;
        },
        
        // set extensions
        addExtensions: (state, action) => {
            const { payload: extensions } = action;
            state.extensions.items.push(...extensions.items);
            state.extensions.cursor = extensions.cursor;
            state.extensions.more = extensions.more;
        },
        //Add allExtension
        addAllExtensions: (state, action) => {
            const { payload: extensions } = action;
            state.extensions.items = extensions;
            state.extensions.cursor = undefined;
            state.extensions.more = false;

            const microApps = [];
            const widgets = [];

            for (const extension of extensions) {
                if (extension.category === 'micro_app') {
                    microApps.push(extension);
                    
                }
                if (extension.category === 'widget') {
                    widgets.push(extension);
                }
            }
            state.microApps.items = microApps;
            state.widgets.items = widgets;
        },

        // Available extension loading
        setIsLoadingAvailableExtensions: (state, action) => {
            const { payload } = action;
            const { loading } = payload;

            state.availableExtensions.isLoading = loading;
        },

        //Set available extensions
        addAvailableExtensions: (state, action) => {
            const { payload: extensions } = action;

            state.availableExtensions.items.push(...extensions.items);
            state.availableExtensions.cursor = extensions.cursor;
            state.availableExtensions.more = extensions.more;
        },

        addAllAvailableExtensions: (state, action) => {
            const { payload: extensions } = action;
            state.availableExtensions.items = extensions;
            state.availableExtensions.cursor = undefined;
            state.availableExtensions.more = false;

            const availableMicroApps = [];
            const availableWidgets = [];

            for (const extension of extensions) {
                if (extension.category === 'micro_app') {
                    availableMicroApps.push(extension);
                    
                }
                if (extension.category === 'widget') {
                    availableWidgets.push(extension);
                }
            }
            state.availableMicroApps.items = availableMicroApps;
            state.availableWidgets.items = availableWidgets;
        },

        //Partners loading
        setIsLoadingPartners: (state, action) => {
            const { payload } = action;
            const { loading } = payload;

            state.partners.isLoading = loading;
        },
         //Add all partners
         addAllPartners: (state, action) => {
            const { payload: partners } = action;
            state.partners.items = partners;
            state.partners.cursor = undefined;
            state.partners.more = false;
        },
        //Extension loading
        setIsLoadingVersions: (state, action) => {
            const { payload } = action;
            const { loading } = payload;

            state.versions.isLoading = loading;
        },
        addExtensionVersions: (state, action) => {
            const { payload } = action;
            const { data, extensionId} = payload;

            const list = getExtensionList(state);

            const extension =  find(list, (extension) => extension.id === extensionId);

            if (data && extension) {
                extension.versionLoaded = true;
                extension.versions = data;
            }
        },
        addPartnerExtensionVersions: (state, action) => {
            const { payload } = action;
            const { data, extensionId, partnerId} = payload;

            const partner = getPartner(state, partnerId);
            const extension =  find(partner.extensions, (extension) => extension.id === extensionId);

            if (data && extension) {
                extension.versions = data.items;
            }
        },
        //Add all versions
        addAllVersions: (state, action) => {
            const { payload: versions } = action;
            const { data, extensionId, partnerId } = versions;

            const partner = getPartner(state, partnerId);

            if (partner) {
                const extension =  getPartnerExtension(state, partnerId, extensionId);
                
                if (data && extension) {
                    extension.versions = data;
                }
            }

            state.versions.items.push(...data);
            state.versions.cursor = undefined;
            state.versions.more = false;
        },
        //Set partner version defined
        setPartnerVersionDefined: (state, action) => {
            const { payload } = action;
            const { loaded, partnerId} = payload;

            const partner = getPartner(state, partnerId);

            partner.versionsLoaded = loaded
        },
        //Add extension version review
        addExtensionVersionReviews: (state, action) => {
            const { data, versionId, extensionId } = action.payload;

            const extension = getExtension(state, extensionId);
            const version = getVersion(state, versionId);
            
            if (extension && extension.reviews) {
                extension.reviews.push(...data);
            } else if (extension) {
                extension.reviews = data;
            }
            
            if (extension && extension.versions) {
                const extensionVersion = find(extension.versions, (version) => version.id === versionId)
                
                if (extensionVersion) {
                    extensionVersion.reviews = data;
                }
            }

            if (version) {
                version.reviews = data;
            }
        },
        //Add reviews
        addReviews: (state, action) => {
            const { payload: reviews } = action;
            
            state.reviews.items.push(...reviews);
        },
        //Set is loading reviews
        setIsLoadingExtensionReviews: (state, action) => {
            const { payload } = action;
            const { loading } = payload;

            state.reviews.isLoading = loading;
        }
    }
});

export { actions, reducer };