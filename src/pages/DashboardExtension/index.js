import { connect } from 'react-redux';

import { loadAllExtensions, loadAllAvailableExtensions, loadExtensionsVersions } from 'src/ducks/extensions/thunk';
import { availableExtensionListSelector, availableExtensionsSelector, extensionListSelector, extensionsSelector, versionsListSelector, versionsSelector } from 'src/ducks/extensions/selector';
import { userTokenSelector, } from 'src/ducks/user/selector';
import { DashoardExtension } from './DashoardExtension';

const mapStateToProps = (state, ownProps) => {
    const extensionsList = extensionListSelector(state);
    const { isLoading: isExtensionsLoading } = extensionsSelector(state);
    const availableExtensionsList = availableExtensionListSelector(state);
    const { isLoading: isAvailableExtension } = availableExtensionsSelector(state);
    const versionsList = versionsListSelector(state);
    const { isLoading: isVersionLoading} = versionsSelector(state);
    const token = userTokenSelector(state);

    return { extensionsList, isExtensionsLoading, availableExtensionsList, isAvailableExtension, token, versionsList, isVersionLoading,...ownProps };
};

const mapDispatchToProps = {
    loadAllExtensions,
    loadAllAvailableExtensions,
    loadExtensionsVersions,
};

const ConnectedDashoardExtension = connect(mapStateToProps, mapDispatchToProps)(DashoardExtension);

export { ConnectedDashoardExtension as DashoardExtension };