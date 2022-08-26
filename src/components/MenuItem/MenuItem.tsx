import classes from './MenuItem.module.scss';

import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import { ListItem, ListItemIcon, ListItemText } from '@mui/material';

interface MyNavLinkProps {
    data: {
        index: number
        text: string
    }
}

const MyNavLink = ({ data }: MyNavLinkProps) => {
    const icons: any = {
        1: <LightbulbOutlinedIcon />,
        2: <NotificationsNoneOutlinedIcon />,
        3: <EditOutlinedIcon />,
        4: <ArchiveOutlinedIcon />,
        5: <DeleteOutlinedIcon />
    }

    return (
        <div className={classes.link}>
            <ListItem className={classes.listItem}>
                <ListItemIcon className={classes.icon}>
                    {
                        icons[data.index]
                    }
                </ListItemIcon>
                <ListItemText primary={data.text} />
            </ListItem>
        </div>
    );
}

export default MyNavLink;