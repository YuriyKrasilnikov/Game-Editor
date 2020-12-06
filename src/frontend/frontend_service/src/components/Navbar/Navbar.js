import React, {
    useState,
    useEffect,
    useContext,
    useCallback,
} from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useHistory
} from "react-router-dom";

import { 
  makeStyles 
} from '@material-ui/core/styles';

import {
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  ListItem,
  ListItemText,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Fade
}
from '@material-ui/core';

import {
  AccountCircle,
}
from '@material-ui/icons';

import { StatusContext } from '../../grpc/context'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  title: {
    flexGrow: 1,
  },
}));


const Navbar = ( ) => {

  const classes = useStyles();

  const [ status, _ ] = useContext(StatusContext)

  return (
  <>
  <AppBar position="fixed" className={classes.appBar}>
    <Toolbar>
      <Typography variant="h6" noWrap className={classes.title}>
        AppBar
      </Typography>
      { (status && status['nickname']) ? <ProfileMenu nickname={status['nickname']} /> : <Button variant="outlined" color="inherit" href="/oauth2/">Войти</Button> }

    </Toolbar>
  </AppBar>
  <Drawer
    className={classes.drawer}
    variant="permanent"
    classes={{
      paper: classes.drawerPaper,
    }}
  >
    <Toolbar />
    <List>
      <ListItemLink href="/">
        <ListItemText primary="Home" />
      </ListItemLink>
      <ListItemLink href="/admin">
        <ListItemText primary="Admin Panel" />
      </ListItemLink>
    </List>
  </Drawer>
  </>
  );
}

const ListItemLink = ( props ) => {
  return <ListItem button component="a" {...props} />;
}

const ProfileMenu = ( { nickname } ) => {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = ( e ) => {
    setAnchorEl(null);
  };

  const handleOnClick = ( href, newWindow=false ) => ( e ) => {
    if (newWindow){
      window.location.href = href
    } else {   
      history.push( href );
    }
    handleMenuClose(e)
  }

  return (
    <>
      <Button
        edge="end"
        aria-label="account of current user"
        aria-haspopup="true"
        onClick={handleProfileMenuOpen}
        color="inherit"
        endIcon={<AccountCircle />}
      >
        {nickname}
      </Button>
      <Menu
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        keepMounted
        open={isMenuOpen}
        onClose={handleMenuClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={ handleOnClick( "/profile/"+nickname ) }>
          Profile
        </MenuItem>
        <MenuItem onClick={ handleOnClick( "/oauth2/sign_out", true ) }>
          Выход
        </MenuItem>
      </Menu>
    </>
  );
}


export { Navbar };