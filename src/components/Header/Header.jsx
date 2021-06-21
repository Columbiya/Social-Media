import { NavLink } from 'react-router-dom';
import classes from './Header.module.css';
import logo from '../../assets/images/header/logo.png';
import { useEffect, useRef, useState } from 'react';
import { FaBars } from 'react-icons/fa';
import cn from 'classnames';


const Header = props => {
    let [height, setHeight] = useState(0);
    let menu = useRef(null);

    useEffect(() => {
        if (!props.isAuthorized) return;

        setHeight(menu.current.clientHeight);

        menu.current.style.height = 0;
    }, [props.isAuthorized]);

    const goToProfile = () => {
        props.history.push('/profile');
    }

    const logout = () => {
        props.logout();
    };

    const toggleOpenMenu = event => {
        const element = menu.current;

        if (element.style.height.split('px')[0] === '0') {
            element.style.height = height + 'px';
        }
        else {
            element.style.height = 0;
        }

    };

    const openPhoneSidebar = event => {
        props.setMobileMode(mobileMode => !mobileMode);
    }

    return (
        <>
            <header className={classes.header}>
                <div className="container">
                    <div className={classes.headerContainer}>
                        <img className={classes['app-logo']} src={logo} onClick={goToProfile} alt="logo" />
                        <FaBars className={classes.bars} onClick={openPhoneSidebar} />
                        <nav className={classes.nav}>
                            {props.isAuthorized &&
                                <div className={classes.user} onClick={toggleOpenMenu} onMouseDown={e => e.preventDefault()}>
                                    <img src={props.profilePhoto} className={classes.image} alt="me" />
                                    {props.login}
                                    <div className={cn(classes.userPoppingMenu)} ref={menu}>
                                        <button className={classes.logout} onClick={logout}>Logout</button>
                                    </div>
                                </div>}
                            {!props.isAuthorized && <NavLink className={classes.login} to="/login">Login</NavLink>}
                        </nav>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;