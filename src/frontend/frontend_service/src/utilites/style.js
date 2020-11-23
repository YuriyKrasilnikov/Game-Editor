import { createMuiTheme } from '@material-ui/core/styles';

import {
  purple,
  green
} from '@material-ui/core/colors';


const theme = createMuiTheme({
  overrides: {
    MuiGrid: {
      root: {
        position: 'relative'
      },
    },
  },
});

export { theme }