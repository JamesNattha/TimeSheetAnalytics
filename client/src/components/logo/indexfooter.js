import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// material-ui
import { ButtonBase } from '@mui/material';

// project import
import LogoFooter from './underIcon';

import config from 'config';
import { useRecoilState } from 'recoil';
import { roleState } from '../../recoil';
// ==============================|| MAIN LOGO ||============================== //

const LogoSection = ({ reverse, isIcon, sx, to }) => {
  const [auth,setAuth]= useRecoilState(roleState)
  let path = config.defaultPath;
  // if (!auth || !auth.role) {
  //   path = config.defaultPath;
  // } else if (auth.role === 'admin') {
  //   path = config.defaultPathAdmin
  // } else if (auth.role === 'manager') {
  //   path = config.defaultPathManager
  // } else if (auth.role === 'employee') {
  //   path = config.defaultPathEmployee
  // } else if (auth.role === 'management') {
  //   path = config.defaultPathManager
  // }

  return(
    <ButtonBase disableRipple component={Link} to={!to ? path : to} sx={sx}>
        <LogoFooter/>
    </ButtonBase>
  );
};

LogoSection.propTypes = {
  reverse: PropTypes.bool,
  isIcon: PropTypes.bool,
  sx: PropTypes.object,
  to: PropTypes.string
};

export default LogoSection;
