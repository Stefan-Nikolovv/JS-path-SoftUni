import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/authContext';
import { useContext } from 'react';
export const Header = () => {

  const { user } = useContext(UserContext);
   
    return (
        <header>
        <nav>
          <Link className="active" to="/">
            Home
          </Link>
          
          <Link to="/catalog">All Listings</Link>
          <Link to="/search">By Brand</Link>
          {/* Guest users */}

          {user.email
          ?
          <div id="profile">
          <Link to="/mylist">My Listings</Link>
          <Link to="/create">Create Listing</Link>
          <Link to="/logout">Logout</Link>
        </div>
        :
          <div id="guest">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
          }
          
        </nav>
      </header>
    );
};