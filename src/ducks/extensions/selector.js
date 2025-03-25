import { createSelector } from 'reselect';
import { filter, find } from 'lodash';

/*
 * Extensions
 */
const extensionsStateSelector = (state) => state.extensions;

export const extensionsSelector = createSelector([extensionsStateSelector], (ext) => ext.extensions);
export const extensionListSelector = createSelector([extensionsSelector], (extensions) => extensions ? extensions.items : []);
export const extensionSelector = (state, {extensionId}) => {
    const list = extensionListSelector(state);
    const extension = find(list, (extension) => extension.id === extensionId);

    return extension;
}

export const availableExtensionsSelector = createSelector([extensionsStateSelector], (ext) => ext.availableExtensions);
export const availableExtensionListSelector = createSelector([availableExtensionsSelector], (extensions) => extensions ? extensions.items : []);

/**
 * Providers
 */
export const providersSelector = createSelector([extensionsStateSelector], (ext) => ext.providers);
export const providerListSelector = createSelector([providersSelector], (providers) => providers ? providers.items : []);

/*
 * Micro-apps
 */
export const microAppsSelector = createSelector([extensionsStateSelector], (ext) => ext.microApps);
export const microAppListSelector = createSelector([microAppsSelector], (microApps) => microApps ? microApps.items : []);


export const availableMicroAppsSelector = createSelector([extensionsStateSelector], (ext) => ext.availableMicroApps);
export const availableMicroAppListSelector = createSelector([availableMicroAppsSelector], (microApps) => microApps ? microApps.items : []);

/*
 * Widgets
 */
export const widgetsSelector = createSelector([extensionsStateSelector], (ext) => ext.widgets);
export const mwidgetListSelector = createSelector([widgetsSelector], (widget) => widget ? widget.items : []);


export const availableWidgetsSelector = createSelector([extensionsStateSelector], (ext) => ext.availableWidgets);
export const availableWidgetListSelector = createSelector([availableWidgetsSelector], (widgets) => widgets ? widgets.items : []);



/*
 * Publishers
 */
export const partnersExtensionSelector = (state, { partnerId }) => {
    const list = extensionListSelector(state);
    const partnersExtensions = filter(list, (extension) => extension.partnerId === partnerId )

    return partnersExtensions;
}


export const partnersSelector = createSelector([extensionsStateSelector], (part) => part.partners);
export const partnerListSelector = createSelector([partnersSelector], (partners) => partners ? partners.items : []);
export const partnerSelector = (state, {partnerId}) => {
    const list = partnerListSelector(state);
    const partner = find(list, (partner) => partner.id === partnerId);

    return partner;
}

export const versionsSelector = createSelector([extensionsStateSelector], (ver) => ver.versions);
export const versionsListSelector = createSelector([versionsSelector], (versions) => versions.items);

export const reviewsSelector = createSelector([extensionsStateSelector], (rev) => rev.reviews);
export const reviewsListSelector = createSelector([reviewsSelector], (reviews) => reviews.items);



