import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { getIsAuthorized } from "../../redux/selectors/auth-selectors";

let mapStateToProps = state => ({
    isAuthorized: getIsAuthorized(state)
});

function withRedirect(Component) { //HOC
    function RedirectComponent(props) {
        if (!props.isAuthorized) return <Redirect to='/login' />

        return <Component {...props} />
    }

    return connect(mapStateToProps)(RedirectComponent);
}

export default withRedirect;