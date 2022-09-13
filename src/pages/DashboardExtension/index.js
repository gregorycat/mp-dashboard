import { connect } from 'react-redux';

import { loadAllExtensions, loadExtensionsVersions } from 'src/ducks/extensions/thunk';
import { extensionListSelector, extensionsSelector, versionsListSelector, versionsSelector } from 'src/ducks/extensions/selector';
import { userTokenSelector, } from 'src/ducks/user/selector';
import { DashoardExtension } from './DashoardExtension';

const mapStateToProps = (state, ownProps) => {
    const extensionsList = extensionListSelector(state);
    const { isLoading: isExtensionsLoading} = extensionsSelector(state);
    const versionsList = versionsListSelector(state);
    const { isLoading: isVersionLoading} = versionsSelector(state);
    const token = userTokenSelector(state);

    return { extensionsList, isExtensionsLoading, token, versionsList, isVersionLoading,...ownProps };
};

const mapDispatchToProps = {
    loadAllExtensions,
    loadExtensionsVersions,
};

const ConnectedDashoardExtension = connect(mapStateToProps, mapDispatchToProps)(DashoardExtension);

export { ConnectedDashoardExtension as DashoardExtension };