import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// project import
import config from 'config';
import useAuth from 'hooks/useAuth';
import { useRecoilState } from 'recoil';
import { roleState } from '../../recoil';

// ==============================|| GUEST GUARD ||============================== //

const GuestGuard = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [auth,setAuth]= useRecoilState(roleState)
  let defaultPath = config.defaultPath;
  
// fix dui i sus
  useEffect(() => {
    let isLogin = localStorage.getItem('isLoggedIn');
    if (isLogin) {
      if (window.location.pathname != '/login') {
        if (defaultPath != window.location.pathname) {
          navigate(window.location.pathname, { replace: true });
        } else {
          navigate(defaultPath, { replace: true });
        }
      }
    }
  }, [isLoggedIn, navigate,auth?.role]);

  return children;
};

GuestGuard.propTypes = {
  children: PropTypes.node
};

export default GuestGuard;
