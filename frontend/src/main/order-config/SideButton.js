import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles, Button } from '@material-ui/core'

const useStyles = makeStyles((props) => ({
    test: {
        display: 'flex',
        margin: 10,
        //justifyContent: 'space-between',
        '& .MuiButton-root': {
            color: '#000000',
            fontWeight: 600,
            fontSize: 16,
            //backgroundColor: '#ECECF4',
            width: 85,
            height: 45,
        },
        '& .MuiButton-root:hover': {
            backgroundColor: '#F2CD31',
        }
    },
    buyButton: ({ selected }) => ({
        backgroundColor: selected === 'BUY' ? '#F2CD31' : '#ECECF4',
        borderRadius: '10px 0px 0px 10px',
        borderRightStyle: 'solid',
        borderRightWidth: 1,
        borderRightColor: '#000000'
    }),
    sellButton: ({ selected }) => ({
        backgroundColor: selected === 'SELL' ? '#F2CD31' : '#ECECF4',
        borderRadius: '0px 10px 10px 0px',
        borderLeftStyle: 'solid',
        borderLeftWidth: 1,
        borderLeftColor: '#000000'
    }),
}))

function SideButton({ value, onClick, name }) {
    const classes = useStyles({selected: value})

    return (
        <div className={classes.test} >
            <Button
                onClick={onClick}
                className={classes.buyButton}
                value="BUY"
                name={name}
            >
                BUY
            </Button>
            <Button
                onClick={onClick}
                className={classes.sellButton}
                value="SELL"
                name={name}
            >
                SELL
            </Button>
        </div>
    )
}

SideButton.propTypes = {
    value: PropTypes.string,
    onClick: PropTypes.func,
    name: PropTypes.string,
}

export default SideButton
