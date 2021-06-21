import React, { Suspense } from 'react';
import Preloader from '../сommon/Preloader/Preloder';

function withLazyLoading(Element) {
    return function(props) {
        return (
            <Suspense fallback={<Preloader />}>
                <Element {...props} />
            </Suspense>
        );
    }
}

export default withLazyLoading;