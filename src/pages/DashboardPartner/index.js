import { connect } from 'react-redux';

import { loadAllPartners, loadAllExtensions, loadAllAvailableExtensions } from 'src/ducks/extensions/thunk';
import { extensionListSelector, extensionsSelector, availableExtensionListSelector, availableExtensionsSelector, partnerListSelector, partnersSelector, partnersExtensionSelector} from 'src/ducks/extensions/selector';
import { userTokenSelector, } from 'src/ducks/user/selector';
import { DashboardPartner } from './DashboardPartner';

const mapStateToProps = (state, ownProps) => {
    const extensionsList = extensionListSelector(state);
    const { isLoading: isExtensionsLoading} = extensionsSelector(state);
    const availableExtensionsList = availableExtensionListSelector(state);
    const { isLoading: isAvailableExtensionLoading} = availableExtensionsSelector(state);
    const partnersList = partnerListSelector(state);
    const { isLoading: isPartnersLoading} = partnersSelector(state);
    const token = userTokenSelector(state);
    
    return { partnersList, extensionsList, availableExtensionsList, isPartnersLoading, isExtensionsLoading, isAvailableExtensionLoading, token, ...ownProps };
};

const mapDispatchToProps = {
    loadAllPartners,
    loadAllExtensions,
    loadAllAvailableExtensions,
};

const ConnectedDashboardPartner = connect(mapStateToProps, mapDispatchToProps)(DashboardPartner);

export { ConnectedDashboardPartner as DashboardPartner };