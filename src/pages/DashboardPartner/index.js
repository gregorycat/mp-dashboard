import { connect } from 'react-redux';

import { loadAllPartners, loadAllExtensions } from 'src/ducks/extensions/thunk';
import { extensionListSelector, extensionsSelector, partnerListSelector, partnersSelector, partnersExtensionSelector} from 'src/ducks/extensions/selector';
import { userTokenSelector, } from 'src/ducks/user/selector';
import { DashboardPartner } from './DashboardPartner';

const mapStateToProps = (state, ownProps) => {
    const extensionsList = extensionListSelector(state);
    const { isLoading: isExtensionsLoading} = extensionsSelector(state);
    const partnersList = partnerListSelector(state);
    const { isLoading: isPartnersLoading} = partnersSelector(state);
    const token = userTokenSelector(state);
    
    return { partnersList, extensionsList, isPartnersLoading, isExtensionsLoading, token, ...ownProps };
};

const mapDispatchToProps = {
    loadAllPartners,
    loadAllExtensions,
};

const ConnectedDashboardPartner = connect(mapStateToProps, mapDispatchToProps)(DashboardPartner);

export { ConnectedDashboardPartner as DashboardPartner };