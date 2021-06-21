import { NavLink } from 'react-router-dom';
import Friend from './Friend/Friend';
import classes from './Nav.module.css';
import { FaHome, FaCommentAlt, FaUserFriends, FaRegNewspaper, FaMusic } from 'react-icons/fa';
import { BsFillGearFill } from "react-icons/bs";
import cn from 'classnames';

const Nav = props => {
    let friends = props.friends.map(friend => <Friend name={friend.name} key={friend.id} />);

    return (
        <>
            <nav className={cn(classes.nav, {
                [classes.active]: props.mobileMode
            })}>
                <div className={classes.wrapper}>
                    <ul>
                        <NavItem setMobileMode={props.setMobileMode} Icon={FaHome} url={'/profile'} text={'Profile'} />
                        <NavItem setMobileMode={props.setMobileMode} Icon={FaCommentAlt} url={'/dialogs'} text={'Messages'} />
                        <NavItem setMobileMode={props.setMobileMode} Icon={FaUserFriends} url={'/users'} text={'Users'} />
                        <NavItem setMobileMode={props.setMobileMode} Icon={FaRegNewspaper} url={'/news'} text={'News'} />
                        <NavItem setMobileMode={props.setMobileMode} Icon={FaMusic} url={'/music'} text={'Music'} />
                        <NavItem setMobileMode={props.setMobileMode} Icon={BsFillGearFill} url={'/settings'} text={'Settings'} />
                    </ul>
                    <div className={classes.friendsBlock}>
                        <h2 className={classes.friendsTitle}>Friends:</h2>
                        <div className={classes.friends}>
                            {friends}
                        </div>
                    </div>

                </div>
            </nav>
        </>
    );
};

const NavItem = ({ Icon, url, text, setMobileMode }) => {
    return (
        <li>
            <NavLink onClick={() => setMobileMode(mode => !mode)} className={classes.link} to={url} activeClassName={classes.active}>
                <Icon className={classes.icon} />
                {text}
            </NavLink>
        </li>
    );
};

export default Nav;