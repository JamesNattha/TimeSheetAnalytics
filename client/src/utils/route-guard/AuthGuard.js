import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// project import
import useAuth from 'hooks/useAuth';

// ==============================|| AUTH GUARD ||============================== //

const AuthGuard = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    let isLogin = localStorage.getItem('isLoggedIn');
    if (!isLogin || isLogin == 'false') {
      navigate('login', { replace: true });
    }
  }, [isLoggedIn, navigate]);

  return children;
};

AuthGuard.propTypes = {
  children: PropTypes.node
};

export default AuthGuard;
