import { lazy, Suspense, useEffect, useState } from 'react';
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

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
import { PATHS } from './Constants';
import './App.css'

const Main = lazy(() => import('./components/Main/Main'))
const About = lazy(() => import('./components/About/About'))

export default function App() {
  const [recipeToEdit, setRecipeToEdit] = useState(null);
  const [userToEdit, setUserToEdit] = useState(null);
  const [messages, setMessages] = useState();
  const [errors, setErrors] = useState();
  const [loggedUser, setLoggedUser] = useState(null)

  function clearMessagesAndErors() {
    setMessages(undefined);
    setErrors(undefined);
  }


  const handleLogin = (loginData) => {
    // axios.get(`${API_BASE_URL}/api/users`)
    //     .

    //   .then(res => res.forEach(element => {
    //     if (element.loginName === loginData.loginName && element.password === loginData.password) {
    //       let user = {
    //         id: element.id,
    //         firstName: element.firstName,
    //         lastName: element.lastName,
    //         loginName: element.loginName,
    //         img: element.img,
    //         gender: element.gender,
    //         role: element.role,
    //         status: element.status,
    //         introduction: element.introduction,
    //         ownRecipes: element.ownRecipes,
    //         favourites: element.favourites,
    //         registrationDate: element.registrationDate,
    //         modified: element.modified
    //       }
    //       window.localStorage.setItem('user', JSON.stringify(user));
    //       const event = new Event('localStorageAuthEvent')
    //       window.dispatchEvent(event);
    //       setMessages(`${user.loginName} logged in successfully!`);
    //       navigate(constants.HOME)
    //     } else {
    //       setErrors('INCORRECT LOGIN NAME OR PASSWORD!')
    //     }
    //   }))
    //   .catch(err => console.log(err))
  }

  const getItemsFromStorage = () => {
    const user = window.localStorage.getItem('user');
    if (user) {
      setLoggedUser(JSON.parse(user))
    } else {
      setLoggedUser(null)
    }
  }

  useEffect(() => {
    window.addEventListener('localStorageAuthEvent', getItemsFromStorage);
    return () => window.removeEventListener('localStorageAuthEvent', getItemsFromStorage)
  }, [])

  return (
    <div className='App-container'>
      <Header loggedUser={loggedUser} setMessages={setMessages} />
      <TimedMessages messages={messages} timeout={10000} key={messages} />
      <TimedMessages messages={errors} type={ERROR} timeout={10000} key={errors} />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path={PATHS.RECIPE_COLLECTION} element={<RecipesCollection />} />
          <Route path={`${PATHS.RECIPE_COLLECTION}/:recipeId`} element={<RecipeView setRecipeToEdit={setRecipeToEdit} />} />
          <Route path={PATHS.ADD_RECIPE} element={<RecipeForm />} />
          <Route path={PATHS.EDIT_RECIPE} element={<RecipeForm recipeToEdit={recipeToEdit} />} />        
          <Route path={PATHS.LOGIN_FORM} element={<LoginForm onSubmitLogin={handleLogin} />} />
          <Route path={PATHS.SIGN_UP_FORM} element={<SignUpForm />} />
          <Route path={PATHS.USERS} exact element={<UsersCollections />} />
          <Route path={`${PATHS.USERS}/:userId`} element={<ProfileView setUserToEdit={setUserToEdit}/>} />  
          <Route path={PATHS.EDIT_USER} element={<SignUpForm userToEdit={userToEdit}/>} />
          {/* Lazy Loaded */}
          <Route path={PATHS.HOME} element={<Main />} />
          <Route path={PATHS.ABOUT} element={<About />} />
          <Route path='*' element={<p>There's nothing here!</p>} />
        </Routes>
      </Suspense>
      <Footer />
      <Outlet />
    </div >
  );
}