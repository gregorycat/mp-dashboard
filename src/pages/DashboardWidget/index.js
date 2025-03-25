import { connect } from 'react-redux';

import { loadAllExtensions, loadAllAvailableExtensions, loadExtensionsVersions } from 'src/ducks/extensions/thunk';
import { availableMicroAppListSelector, availableExtensionsSelector, microAppListSelector, extensionsSelector, versionsListSelector, versionsSelector } from 'src/ducks/extensions/selector';
import { userTokenSelector, } from 'src/ducks/user/selector';
import { DashoardMicroApp } from './DashoardMicroApp';

const mapStateToProps = (state, ownProps) => {
    const microAppList = microAppListSelector(state);
    const { isLoading: isExtensionsLoading } = extensionsSelector(state);
    const availableMicroAppsList = availableMicroAppListSelector(state);
    const { isLoading: isAvailableExtension } = availableExtensionsSelector(state);
    const token = userTokenSelector(state);

    return { microAppList, isExtensionsLoading, availableMicroAppsList, isAvailableExtension, token,...ownProps };
};

const mapDispatchToProps = {
    loadAllExtensions,
    loadAllAvailableExtensions,
    loadExtensionsVersions,
};

const ConnectedDashoardMicroApp = connect(mapStateToProps, mapDispatchToProps)(DashoardMicroApp);

export { ConnectedDashoardMicroApp as DashoardMicroApp };