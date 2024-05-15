import React, {useEffect, useState} from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
} from 'react-router-dom';
import {
    useDispatch,
    useSelector,
} from 'react-redux';
import {addAxiosInterceptors} from 'misc/requests';
import * as pages from 'constants/pages';
import AuthoritiesProvider from 'misc/providers/AuthoritiesProvider';
import DefaultPage from 'pageProviders/Default';
import DishListPage from 'pageProviders/DishList';
import Loading from 'components/Loading';
import LoginPage from 'pageProviders/Login';
import DishDetailPage from 'pageProviders/DishDetail';
import PageContainer from 'pageProviders/components/PageContainer';
import pageURLs from 'constants/pagesURLs';
import SecretPage from 'pageProviders/Secret';
import ThemeProvider from 'misc/providers/ThemeProvider';
import UserProvider from 'misc/providers/UserProvider';

import actionsUser from '../actions/user';
import actionsMenu from '../actions/menu';
import Header from '../components/Header';
import IntlProvider from '../components/IntlProvider';
import MissedPage from '../components/MissedPage';
import SearchParamsConfigurator from '../components/SearchParamsConfigurator';

function App() {
    const dispatch = useDispatch();
    const [state, setState] = useState({
        componentDidMount: false,
    });

    const {
        errors,
        isFailedSignIn,
        isFailedSignUp,
        isFetchingSignIn,
        isFetchingSignUp,
        isFetchingUser,
    } = useSelector((user) => (user));

    useEffect(() => {
        addAxiosInterceptors({
            onSignOut: () => dispatch(actionsUser.fetchSignOut()),
        });
        dispatch(actionsUser.fetchUser());
        setState({
            ...state,
            componentDidMount: true,
        });
    }, []);

    return (
        <UserProvider>
            <AuthoritiesProvider>
                <ThemeProvider>
                    <BrowserRouter>
                        <SearchParamsConfigurator/>
                        {/* This is needed to let first render passed for App's
              * configuration process will be finished (e.g. locationQuery
              * initializing) */}
                        {state.componentDidMount && (
                            <IntlProvider>
                                <Header onLogout={() => dispatch(actionsUser.fetchSignOut())}/>
                                {isFetchingUser && (
                                    <PageContainer>
                                        <Loading/>
                                    </PageContainer>
                                )}
                                {!isFetchingUser && (
                                    <Routes>
                                        <Route
                                            element={<DefaultPage/>}
                                            path={`${pageURLs[pages.defaultPage]}`}
                                        />
                                        <Route
                                            element={<SecretPage/>}
                                            path={`${pageURLs[pages.secretPage]}`}
                                        />
                                        <Route
                                            element={<DishDetailPage
                                                backPagePath={`${pageURLs[pages.menuPage]}`}
                                                onFetchDishData={(dishId) => dispatch(actionsMenu.fetchDishData(dishId))}
                                                onCreateDish={({
                                                                   name,
                                                                   description,
                                                                   categoryId,
                                                                   weight,
                                                                   calories,
                                                                   price,
                                                                   ingredients,
                                                                   dietarySpecifics,
                                                                   cuisines
                                                               }) => dispatch(actionsMenu.createDishData(
                                                    {
                                                        name: name,
                                                        description: description,
                                                        categoryId: categoryId,
                                                        weight: weight,
                                                        calories: calories,
                                                        price: price,
                                                        ingredients: ingredients,
                                                        dietarySpecifics: dietarySpecifics,
                                                        cuisines: cuisines
                                                    }))}
                                                onUpdateDish={(dishId, dishData) => dispatch(actionsMenu.updateDishData(dishId, dishData))}
                                            />}
                                            path={`${pageURLs[pages.menuDetailPage]}`}
                                        />
                                        <Route
                                            element={<DishListPage
                                                menuPagePath={`${pageURLs[pages.menuPage]}`}
                                                isFailedDeleteItem={false}
                                                onFetchDishes={(categoryId,
                                                                minPrice,
                                                                maxPrice,
                                                                page,
                                                                size) => dispatch(actionsMenu.fetchDishesData(categoryId,
                                                    minPrice,
                                                    maxPrice,
                                                    page,
                                                    size))}
                                                onDeleteDish={(dishId) => dispatch(actionsMenu.deleteDishById(
                                                    dishId
                                                ))}
                                            />
                                            }
                                            path={`${pageURLs[pages.menuPage]}`}
                                        ></Route>
                                        <Route
                                            element={(
                                                <LoginPage
                                                    errors={errors}
                                                    isFailedSignIn={isFailedSignIn}
                                                    isFailedSignUp={isFailedSignUp}
                                                    isFetchingSignIn={isFetchingSignIn}
                                                    isFetchingSignUp={isFetchingSignUp}
                                                    onSignIn={({
                                                                   email,
                                                                   login,
                                                                   password,
                                                               }) => dispatch(actionsUser.fetchSignIn({
                                                        email,
                                                        login,
                                                        password,
                                                    }))}
                                                    onSignUp={({
                                                                   email,
                                                                   firstName,
                                                                   lastName,
                                                                   login,
                                                                   password,
                                                               }) => dispatch(actionsUser.fetchSignUp({
                                                        email,
                                                        firstName,
                                                        lastName,
                                                        login,
                                                        password,
                                                    }))}
                                                />
                                            )}
                                            path={`${pageURLs[pages.login]}`}
                                        />
                                        <Route
                                            element={(
                                                <MissedPage
                                                    redirectPage={`${pageURLs[pages.defaultPage]}`}
                                                />
                                            )}
                                            path="*"
                                        />
                                    </Routes>
                                )}
                            </IntlProvider>
                        )}
                    </BrowserRouter>
                </ThemeProvider>
            </AuthoritiesProvider>
        </UserProvider>
    );
}

export default App;
