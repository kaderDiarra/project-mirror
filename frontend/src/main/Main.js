import React from 'react'
import { Container, Grid, makeStyles } from '@material-ui/core'

import UserList from './user-list/UserList'
import CreateUser from './create-user/CreateUser'
import OrderConfiguration from './order-config/OrderConfiguration'
import History from './history/History'

const useStyles = makeStyles({
        root: {
            marginLeft: 100,
            marginTop: 100,
        }
})

function Main() {
    const classes = useStyles()

    return (
        <div className={classes.root} >
            <Grid container spacing={10}>
                <Grid item xs={6} lg={6}>
                    <UserList />
                </Grid>
                <Grid item xs={3} lg={3}>
                    <CreateUser />
                    <OrderConfiguration />
                </Grid>
                {/*<Grid item xs={3} lg={3}>
                    <History />
    </Grid>*/}
            </Grid>
        </div>
    )
}

export default Main
