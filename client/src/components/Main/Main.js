import { Link } from 'react-router-dom';

import { PATHS } from '../../Constants';
import './style.css'

const Main = ({ loggedUser }) => {

  return (
    <div className='main-container'>
      <div className='text-container'>
        <h3>Hello friends! Have you ever wondered, <em>'Hmmm, what do we cook today?', </em>
          or maybe you're in a situation: <em>„I have potatoes, cheese and garlic but
            what can I cook with them?“</em>...? This is what motivated me to create this
          cooking application, and if you still wandering what to cook stop wasting
          your time and let me help you!</h3>
        <h3>You can search your desired recipe through the search field or choose
          the ingredients you have and press search button, we will select the
          recipes to cook with them. Bon appetit!</h3>
        <h3>For better experience you can register
          <Link className='link-warning' to={PATHS.SIGN_UP_FORM}> here </Link>
          or by click on 'Sign-up' button.</h3>
      </div>
    </div>
  );
}

export default Main