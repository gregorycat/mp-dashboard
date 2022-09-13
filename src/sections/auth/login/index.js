import { connect } from 'react-redux';

import { login } from 'src/ducks/user/thunk';
import { connectedUserSelector, loginLoadingSelector } from 'src/ducks/user/selector';
import { LoginForm } from './LoginForm';

const mapStateToProps = (state) => {
    const isLoading = loginLoadingSelector(state);
    const { token } = connectedUserSelector(state);

    return { isLoading, token };
};

const mapDispatchToProps = {
    login,
};

const ConnectedLoginForm = connect(mapStateToProps, mapDispatchToProps)(LoginForm);

export { ConnectedLoginForm as LoginForm };