import classes from './../Dialogs.module.css';
import Picture from './Picture/Picture';
import cn from 'classnames';

const Message = props => {
    if (!props.fromMe) {
        return (
            <div className={classes.message + " " + classes.right}>
                <Picture fromMe={props.fromMe} />
                <div className={classes.text + " " + classes.textRight}>
                    {props.message}
                </div>

            </div>
        );
    }
    else {
        return (
            <div className={ cn(classes.message, { [classes.right]: !props.fromMe } ) }>
                <Picture fromMe={props.fromMe} profilePhoto={props.profilePhoto} />
                <div className={ cn(classes.text, { [classes.textRight]: !props.fromMe } ) }>
                    {props.message}
                </div>
            </div>
        );
    }


};

export default Message;