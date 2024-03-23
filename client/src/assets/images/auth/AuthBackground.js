// material-ui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import BackgroundLogo from '../undefined/TimesheetBackgroung.png';

// ==============================|| AUTH BLUR BACK SVG ||============================== //

const AuthBackground = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        backgroundImage: `url(${require('assets/images/undefined/Background.png')})`,
        position: 'absolute',
        zIndex: -1,
        bottom: 0
      }}
    >
      <img src={BackgroundLogo} alt="Undefined" width="60px" height="70px" />
    </Box>
  );
};

export default AuthBackground;
