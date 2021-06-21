import React from 'react';
import classes from './Preloader.module.css';
import cn from 'classnames';

const Preloader = props => {
    return (
        <div className={classes.preloader}>
            <div className={cn(classes['lds-roller'], {
                [classes.regularHeight]: props.insteadOf === 'status'
            })}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default Preloader;