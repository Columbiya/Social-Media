import React, { useEffect, useState } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { BrowserRouter, Redirect, Switch } from 'react-router-dom';
import store from './redux/redux-store';
import { connect } from 'react-redux';
import { initializeApp, setGlobalError } from './redux/app-reducer';
import { Route } from 'react-router-dom';
import NavContainer from './components/Nav/NavContainer';
import Music from './components/Music/Music';
import News from './components/News/News';
import Settings from './components/Settings/Settings';
import UsersContainer from './components/Users/UsersContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import Preloader from './components/сommon/Preloader/Preloder';
import withLazyLoading from './components/hoc/withLazyLoading';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));


const App = (props) => {
    let [mobileMode, setMobileMode] = useState(false);
    useEffect(() => {
        const handleUnhandledErrors = () => {
            props.setGlobalError();
        };

        props.initializeApp();

        window.addEventListener('unhandledrejection', handleUnhandledErrors);

        return () => {
            window.removeEventListener('unhandledrejection', handleUnhandledErrors);
        }
    }, []);

    if (!props.initialized) {
        return <Preloader />
    }

    return (
        <>
            {props.globalError && <div class="global-error">Some error occured.. Try one more time</div>}
            <HeaderContainer setMobileMode={setMobileMode} />

                <div className={'container'}>
                    <main className={'content-wrapper'}>
                        <NavContainer mobileMode={mobileMode} setMobileMode={setMobileMode} />

                        <div className="app-wrapper-content">
                            <Switch>
                                <Route exact path="/"
                                    render={() => (<Redirect to={'/profile'} />)} />
                                <Route path="/profile/:userId?"
                                    render={withLazyLoading(ProfileContainer)} />
                                <Route path="/dialogs"
                                    render={withLazyLoading(DialogsContainer)} />
                                <Route path="/news"
                                    render={() => <News />} />
                                <Route path="/music"
                                    render={() => <Music />} />
                                <Route path="/settings"
                                    render={() => <Settings />} />
                                <Route path="/users"
                                    render={() => <UsersContainer />} />
                                <Route path="/login"
                                    render={() => <Login />} />
                                <Route path="*"
                                    render={() => <div>404 NOT FOUND</div>} />
                            </Switch>
                        </div>
                    </main>
                </div>
        </>
    );

}

const mapDispatchToProps = state => ({
    initialized: state.app.initialized,
    globalError: state.app.globalError
});

const AppContainer = connect(mapDispatchToProps, { initializeApp, setGlobalError })(App);

const FacetookApp = props => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <React.StrictMode>
                    <AppContainer />
                </React.StrictMode>
            </Provider>
        </BrowserRouter>
    );
};

export default FacetookApp;