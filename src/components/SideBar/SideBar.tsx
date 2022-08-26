import * as React from 'react';
import classes from './SideBar.module.scss';
import logo from '../../assets/images/logo.png';

import { styled, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import MyNavLink from '../MenuItem/MenuItem';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    })
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

interface SearchCard {
    searchQuery: string
    setSearchQuery: any
}

export default function MiniDrawer({ searchQuery, setSearchQuery }: SearchCard) {
    const [open, setOpen] = React.useState(false);
    const [inFocus, setInFocus] = React.useState(false);

    const links: { index: number, text: string }[] = [
        { index: 1, text: 'Notes' },
        { index: 2, text: 'Reminders' },
        { index: 3, text: 'Edit Labels' },
        { index: 4, text: 'Archive' },
        { index: 5, text: 'Bin' }
    ]



    const handleDrawer = () => {
        setOpen(!open);
    };

    return (
        <>
            <CssBaseline />
            <AppBar open={open} style={{ boxShadow: 'none' }}>
                <Toolbar className={classes.navbar}>

                    <div className={classes.firstGroup}>
                        <IconButton
                            aria-label="open drawer"
                            onClick={handleDrawer}
                            edge="start"
                            className={classes.burger}
                        >
                            <MenuIcon />
                        </IconButton>

                        <div className={classes.orgname}>
                            <div className={classes.logo}>
                                <img className={classes.logoImg} src={logo} alt="logo" />
                            </div>
                            <div className={classes.name}>Keep</div>
                        </div>
                    </div>

                    <label
                        className={classes.searchbar}
                        style={{
                            backgroundColor: inFocus ? 'white' : '',
                            boxShadow: inFocus ? 'rgba(65,69,73,0.3) 0 1px 1px 0, rgba(65,69,73,0.15) 0 1px 3px 1px' : '',
                            transition: '0.2s linear'
                        }}
                        onFocus={() => setInFocus(true)}
                        onBlur={() => setInFocus(false)}
                    >
                        <div className={classes.searchIcon}>
                            <svg focusable="false" height="24px" viewBox="0 0 24 24" width="24px" xmlns="http://www.w3.org/2000/svg" fill='gray'>
                                <path d="M20.49,19l-5.73-5.73C15.53,12.2,16,10.91,16,9.5C16,5.91,13.09,3,9.5,3S3,5.91,3,9.5C3,13.09,5.91,16,9.5,16 c1.41,0,2.7-0.47,3.77-1.24L19,20.49L20.49,19z M5,9.5C5,7.01,7.01,5,9.5,5S14,7.01,14,9.5S11.99,14,9.5,14S5,11.99,5,9.5z"></path><path d="M0,0h24v24H0V0z" fill="none"></path>
                            </svg>
                        </div>
                        <input
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className={classes.search}
                            type="text"
                            placeholder='Search'
                        />
                    </label>

                    <div className={classes.secondGroup}>

                        <div className={classes.trio}>
                            <div className={classes.refresh}>
                                <svg baseProfile="tiny" height="35px" version="1.1" viewBox="0 0 32 32" width="35px" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill='gray'>
                                    <g id="Guides__x26__Forms" /><g id="Icons"><path d="M24,13V7.369L21.899,9.47c-1.537-1.54-3.657-2.495-6.005-2.495c-4.694,0-8.5,3.806-8.5,8.5s3.806,8.5,8.5,8.5   c3.159,0,5.91-1.727,7.375-4.286l-1.737-0.993c-1.122,1.955-3.226,3.278-5.638,3.278c-3.584,0-6.5-2.916-6.5-6.5   c0-3.584,2.916-6.5,6.5-6.5c1.792,0,3.414,0.732,4.59,1.91L18.369,13H24z" /></g>
                                </svg>
                            </div>

                            <div className={classes.viewType}>
                                <svg width='20px' height='20px' viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill='gray'><path d="M0 0h9v9H0V0zm2 2v5h5V2H2zm-2 9h9v9H0v-9zm2 2v5h5v-5H2zm9-13h9v9h-9V0zm2 2v5h5V2h-5zm-2 9h9v9h-9v-9zm2 2v5h5v-5h-5z" /></svg>
                            </div>

                            <div className={classes.settings}>
                                <svg width="26" height="26" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M11.49 3.17C11.11 1.61 8.88999 1.61 8.50999 3.17C8.45326 3.40442 8.34198 3.62213 8.18522 3.80541C8.02845 3.9887 7.83063 4.13238 7.60784 4.22477C7.38505 4.31716 7.1436 4.35564 6.90313 4.33709C6.66266 4.31854 6.42997 4.24347 6.22399 4.118C4.85199 3.282 3.28199 4.852 4.11799 6.224C4.65799 7.11 4.17899 8.266 3.17099 8.511C1.60999 8.89 1.60999 11.111 3.17099 11.489C3.40547 11.5458 3.62322 11.6572 3.80651 11.8141C3.98979 11.971 4.13343 12.1689 4.22573 12.3918C4.31803 12.6147 4.35639 12.8563 4.33766 13.0968C4.31894 13.3373 4.24367 13.5701 4.11799 13.776C3.28199 15.148 4.85199 16.718 6.22399 15.882C6.42993 15.7563 6.66265 15.6811 6.90318 15.6623C7.14371 15.6436 7.38527 15.682 7.60817 15.7743C7.83108 15.8666 8.02904 16.0102 8.18592 16.1935C8.34281 16.3768 8.45419 16.5945 8.51099 16.829C8.88999 18.39 11.111 18.39 11.489 16.829C11.546 16.5946 11.6575 16.377 11.8144 16.1939C11.9713 16.0107 12.1692 15.8672 12.3921 15.7749C12.6149 15.6826 12.8564 15.6442 13.0969 15.6628C13.3373 15.6815 13.57 15.7565 13.776 15.882C15.148 16.718 16.718 15.148 15.882 13.776C15.7565 13.57 15.6815 13.3373 15.6628 13.0969C15.6442 12.8564 15.6826 12.6149 15.7749 12.3921C15.8672 12.1692 16.0107 11.9713 16.1939 11.8144C16.377 11.6575 16.5946 11.546 16.829 11.489C18.39 11.11 18.39 8.889 16.829 8.511C16.5945 8.45419 16.3768 8.34281 16.1935 8.18593C16.0102 8.02904 15.8666 7.83109 15.7743 7.60818C15.682 7.38527 15.6436 7.14372 15.6623 6.90318C15.681 6.66265 15.7563 6.42994 15.882 6.224C16.718 4.852 15.148 3.282 13.776 4.118C13.5701 4.24368 13.3373 4.31895 13.0968 4.33767C12.8563 4.35639 12.6147 4.31804 12.3918 4.22574C12.1689 4.13344 11.971 3.9898 11.8141 3.80651C11.6572 3.62323 11.5458 3.40548 11.489 3.171L11.49 3.17ZM9.99999 13C10.7956 13 11.5587 12.6839 12.1213 12.1213C12.6839 11.5587 13 10.7956 13 10C13 9.20435 12.6839 8.44129 12.1213 7.87868C11.5587 7.31607 10.7956 7 9.99999 7C9.20434 7 8.44128 7.31607 7.87867 7.87868C7.31606 8.44129 6.99999 9.20435 6.99999 10C6.99999 10.7956 7.31606 11.5587 7.87867 12.1213C8.44128 12.6839 9.20434 13 9.99999 13Z" fill="gray" />
                                </svg>

                            </div>
                        </div>

                        <div className={classes.apps}>
                            <svg width='28px' height='28px' focusable="false" viewBox="0 0 24 24" fill='gray'><path d="M6,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM16,6c0,1.1 0.9,2 2,2s2,-0.9 2,-2 -0.9,-2 -2,-2 -2,0.9 -2,2zM12,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2z"></path>
                            </svg>
                        </div>

                        <div className={classes.profile}>
                            <div className={classes.circle}>
                                N
                            </div>
                        </div>
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open} className={classes.drawer}>
                <List className={classes.list}>
                    {
                        links.map(link =>
                            <MyNavLink data={link} key={link.index} />
                        )
                    }
                </List>
            </Drawer>
        </>
    );
}
