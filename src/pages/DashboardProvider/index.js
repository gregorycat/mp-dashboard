import { connect } from 'react-redux';

import { loadProviders, loadAllExtensions } from 'src/ducks/extensions/thunk';
import { extensionsSelector, providerListSelector, extensionListSelector } from 'src/ducks/extensions/selector';
import { userTokenSelector, } from 'src/ducks/user/selector';
import { DashboardProvider } from './DashoardProvider';

const mapStateToProps = (state, ownProps) => {
    const providerList = providerListSelector(state);
    const extensionList  = extensionListSelector(state);
    const { isLoading: isProvidersLoading } = extensionsSelector(state);
    const { isLoading: isExtensionsLoading } = extensionsSelector(state);
    const token = userTokenSelector(state);

    return { providerList, isProvidersLoading, extensionList, isExtensionsLoading, token,...ownProps };
};

const mapDispatchToProps = {
    loadProviders,
    loadAllExtensions,
};

const ConnectedDashboardProvider = connect(mapStateToProps, mapDispatchToProps)(DashboardProvider);

export { ConnectedDashboardProvider as DashboardProvider };