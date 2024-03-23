import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer } from 'react';
import { useRecoilState } from 'recoil';
import { roleState } from 'recoil/index';

// action - state management
import { LOGIN, LOGOUT } from 'store/reducers/actions';
import authReducer from 'store/reducers/auth';

// api
import api from '_api';

// const
const initialState = {
  isLoggedIn: false,
  isInitialized: false,
  role: null,
  user: null
};

// ==============================|| FIREBASE CONTEXT & PROVIDER ||============================== //
const ApiContext = createContext(null);

export const ApiProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [auth, setAuth] = useRecoilState(roleState);
  useEffect(() => {
    api.login.onAuthApi().then((user) => {
      if (user.data.isStatus) {
        localStorage.setItem('isLoggedIn', true);
        dispatch({
          type: LOGIN,
          payload: {
            isLoggedIn: true,
            user: {
              role: user.data.users.role,
              email: user.data.users.username,
              name: user.data.users.username || 'Ha Oh',
              group: user.data.users.group
              // role: user.data.users.role || null
            }
          }
        });
      } else {
        localStorage.setItem('isLoggedIn', false);
        dispatch({
          type: LOGOUT
        });
        setAuth({ role: null });
      }
    });
  }, [dispatch]);

  const apiLogin = async (values) => {
    const login = await api.login.userLogin(values);
    if (login) {
      localStorage.setItem('isLoggedIn', true);
      dispatch({
        type: LOGIN,
        payload: {
          isLoggedIn: true,
          user: {
            role: login.role,
            email: login.username,
            name: login.username || 'Ha Oh',
            group: login.group
            // role: user.role || 'UI/UX Designer'
          }
        }
      });
      setAuth({ role: login.role });
    }
    return login;
  };

  // useEffect(() => {
  //   console.log('auth:', auth);
  // }, [auth]);

  const apiLogout = () => {
    localStorage.setItem('isLoggedIn', false);
    localStorage.removeItem('accessToken');
    dispatch({
      type: LOGOUT
    });
    setAuth({ role: null });
  };

  return (
    <ApiContext.Provider
      value={{
        ...state,
        apiLogin,
        apiLogout
      }}
    >
      {' '}
      {children}{' '}
    </ApiContext.Provider>
  );
};

ApiProvider.propTypes = {
  children: PropTypes.node
};

export default ApiContext;
