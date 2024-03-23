import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// material-ui
import { ButtonBase } from '@mui/material';

// project import
// import LogoMain from './LogoMain';
import LogoMain from './MainMain';
import LogoIcon from './LogoIcon';
import config from 'config';
import { useRecoilState } from 'recoil';
import { roleState } from '../../recoil';
// ==============================|| MAIN LOGO ||============================== //

const LogoSection = ({ reverse, isIcon, sx, to }) => {
  let path = config.defaultPath;

  return (
    <ButtonBase disableRipple component={Link} to={!to ? path : to} sx={sx}>
      {isIcon ? <LogoIcon /> : <LogoMain reverse={reverse} />}
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
