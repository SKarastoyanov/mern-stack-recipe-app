import { lazy, Suspense, useEffect, useState } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import LoginForm from './components/LoginForm/LoginForm'
import RecipesCollection from './components/RecipeCollection/RecipesCollection';
import RecipeForm from './components/RecipeForm/RecipeForm';
import RecipeView from './components/RecipeView/RecipeView';
import SignUpForm from './components/SignUp/SignUpForm';
import TimedMessages, { ERROR } from './TimedMessages';
import ProfileView from './components/ProfileView/ProfileView';
import UsersCollections from './components/UsersCollections/UsersCollections';
import { PATHS, ROLES } from './Constants';
import Main from './components/Main/Main';
import { logUser } from './state/actions/userActions';
import './App.css'

const About = lazy(() => import('./components/About/About'))

export default function App() {
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.users.loggedUser);
  const [recipeToEdit, setRecipeToEdit] = useState(null);
  const [userToEdit, setUserToEdit] = useState(null);
  const [messages, setMessages] = useState();
  const [errors, setErrors] = useState();

  function clearMessagesAndErors() {
    setMessages(undefined);
    setErrors(undefined);
  }

  const getUserFromStorage = () => {
    const user = window.localStorage.getItem('user');
    if (user) {
      dispatch(logUser(JSON.parse(user)))
    }
  }

  useEffect(() => {
    getUserFromStorage();
  }, [])

  useEffect(() => {
    window.addEventListener('localStorageAuthEvent', getUserFromStorage);
    return () => window.removeEventListener('localStorageAuthEvent', getUserFromStorage)
  }, [])

  return (
    <div className='App-container'>
      <Header setMessages={setMessages} />
      <TimedMessages messages={messages} timeout={10000} key={messages} />
      <TimedMessages messages={errors} type={ERROR} timeout={10000} key={errors} />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path={PATHS.HOME} element={<Main />} />
          <Route path={PATHS.RECIPE_COLLECTION} element={<RecipesCollection />} />
          <Route path={`${PATHS.RECIPE_COLLECTION}/:recipeId`} element={<RecipeView setRecipeToEdit={setRecipeToEdit} />} />
          {loggedUser?.role === ROLES.CHEF
            ? <Route path={PATHS.ADD_RECIPE} element={<RecipeForm setMessages={setMessages} />} />
            : null}
          <Route path={PATHS.EDIT_RECIPE} element={<RecipeForm recipeToEdit={recipeToEdit} />} />
          <Route path={PATHS.LOGIN_FORM} element={<LoginForm />} />
          <Route path={PATHS.SIGN_UP_FORM} element={<SignUpForm />} />
          {loggedUser?.role === ROLES.CHEF
            ? <Route path={PATHS.USERS} exact element={<UsersCollections />} />
            : null}
          <Route path={`${PATHS.USERS}/:userId`} element={<ProfileView setUserToEdit={setUserToEdit} />} />
          <Route path={`${PATHS.USERS}/:userId/:recipeId`} element={<RecipeView setRecipeToEdit={setRecipeToEdit} />} />
          <Route path={PATHS.EDIT_USER} element={<SignUpForm userToEdit={userToEdit} />} />
          {/* Lazy Loaded */}
          <Route path={PATHS.ABOUT} element={<About />} />
          <Route path='*' element={<p>There's nothing here!</p>} />
        </Routes>
      </Suspense>
      <Footer />
      <Outlet />
    </div >
  );
}