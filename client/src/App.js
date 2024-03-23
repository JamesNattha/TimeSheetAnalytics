// project import
import Routes from 'routes';

import ThemeCustomization from 'themes';
import Locales from 'components/Locales';

// import RTLLayout from 'components/RTLLayout';
import ScrollTop from 'components/ScrollTop';
import Snackbar from 'components/@extended/Snackbar';
import BlockedRoute from './blockroute';
import { Navigate } from 'react-router';



// auth provider
// import { FirebaseProvider as AuthProvider } from 'contexts/FirebaseContext';
import { ApiProvider as AuthProvider } from 'contexts/ApiContext';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => {
  return (
    <ThemeCustomization>
      {/* <RTLLayout> */}
      <Locales>
        <ScrollTop> 
          <AuthProvider >
            <>
              <Routes />
              <Snackbar />
            </>
          </AuthProvider>
        </ScrollTop>
      </Locales>
      {/* </RTLLayout> */}
    </ThemeCustomization>
  );
};

export default App;
