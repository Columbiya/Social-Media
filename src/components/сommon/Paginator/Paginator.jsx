import React, { useState } from 'react';
import classes from './Paginator.module.css';
import cn from 'classnames';
import { Button } from '../FormControls/FormControls';

const Paginator = ({totalCount, perPage, page: currentPage, switchPage, portionSize = 5}) => {
    let pagesAmount = Math.ceil(totalCount / perPage);
    let pages = [];

    for (let i = 1; i <= pagesAmount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesAmount / portionSize);
    let initialPortion = Math.ceil(currentPage / portionSize);
    let [portionNumber, setPortionNumber] = useState(initialPortion);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    return (
        <div className={classes.sandwichPanel} onMouseDown={e => e.preventDefault()}>
            {portionNumber > 1 &&
            <Button className={cn(classes.arrowLeft, classes.filled)} onClick={() => setPortionNumber(currentPortion => currentPortion - 1)} text={'Влево'} />}
            {pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                    .map(page => (
                    <span className={cn(classes.pageItem, {
                        [classes.active]: page === currentPage
                    })}
                        onClick={e => switchPage(page)} key={page}>{page}</span>))}
            {portionNumber < portionCount &&
            <Button className={cn(classes.filled, classes.arrowRight)} onClick={() => setPortionNumber(currentPortion => currentPortion + 1)} text={'Вправо'} />}
        </div>
    )
};

export default Paginator;

