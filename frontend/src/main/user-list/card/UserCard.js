import React from 'react'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import {
    Avatar,
    makeStyles,
    CardContent,
    Typography,
    CardHeader,
    CardActions,
    IconButton,
} from '@material-ui/core'
import { RiAccountCircleLine } from 'react-icons/ri'

import DeleteUser from './DeleteUser'
import EditUserInfo from './EditUserInfo'
import SelectUser from './SelectUser'

const useStyles = makeStyles({
    avatarSize: {
        width: '80px',
        height: '80px',
    },
    cardContainer: {
        width: '100%',
        height: '120px',
        display: 'flex',
    },
})

function UserCard({ user, checkAllUsers, setCheckAllUsers }) {
    const classes = useStyles()

    return (
        <>
                <Card className={classes.cardContainer}>
                    <CardHeader
                        avatar={
                            <Avatar
                                className={classes.avatarSize}
                                alt="user avatar"
                                src={null}
                            />
                        }
                    />
                    <CardContent>
                        <Typography>{`${user.firstName} ${user.lastName}`}</Typography>
                        <Typography>{user.description}</Typography>
                    </CardContent>
                    <CardActions>
                        <SelectUser userId={user._id} checkAllUsers={checkAllUsers} setCheckAllUsers={setCheckAllUsers}/>
                        <IconButton aria-label="profil-detail">
                            <RiAccountCircleLine />
                        </IconButton>
                        <EditUserInfo user={user} />
                        <DeleteUser userId={user._id} />
                    </CardActions>
                </Card>
        </>
    )
}

UserCard.propTypes = {
    user: PropTypes.shape({
        _id: PropTypes.string,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        picture: PropTypes.string,
        description: PropTypes.string,
        email: PropTypes.string,
    }).isRequired,
    checkAllUsers: PropTypes.bool.isRequired,
    setCheckAllUsers: PropTypes.func.isRequired
}

export default UserCard
