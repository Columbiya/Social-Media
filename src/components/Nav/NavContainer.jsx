import { connect } from "react-redux";
import Nav from "./Nav";

const mapStateToProps = state => {
    return {
        friends: state.sidebar
    }
};

const NavContainer = connect(mapStateToProps, null)(Nav);

export default NavContainer;