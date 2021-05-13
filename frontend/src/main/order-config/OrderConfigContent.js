import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Paper, makeStyles, } from '@material-ui/core'

import { tradingOrderReq } from '../../routes/route'
import { SYMBOLS, TYPES, } from '../../constant/constants'
import Controls from '../../components/controls/Controls'
import SideButton from './SideButton'
import { Form, useForm } from '../../components/useForm'
import { valideSymbol, valideSide, valideAmount, valideType } from '../../utils/validateForm'


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#FFFFFF',
        width: '85%',
        height: '85%',
        margin: '0 auto',
        position: 'relative',
        top: '7%'
    },
}))

function OrderConfigContent() {
    const classes = useStyles();
    const clientsId = useSelector((state) => state.selectedUsers)
    const dispatch = useDispatch()
    const { values, setValues, errors, setErrors, handleInputChange } = useForm({
        symbol: '',
        type: '',
        amount: '',
        side: '',
    })

    const handleSubmit = async (e, validate, values) => {
        e.preventDefault()
        if (!validate())
            return
        try {
            const result = await tradingOrderReq({
                clientsId: [...clientsId],
                symbol: values.symbol,
                type: values.type,
                quoteOrderQty: values.amount,
                side: values.side,
            })
            console.log(result.data)
        } catch (error) {
            console.log(error)
        }
    }

    const validate = () => {
        const temp = {}
        temp.symbol = valideSymbol(values.symbol)
        temp.type = valideType(values.type)
        temp.amount = valideAmount(values.amount)
        temp.side = valideSide(values.side)

        setErrors({...temp})
        return (Object.values(temp).every(elem => elem === ""))
    }

    return (
        <Paper className={classes.root}>
            <Form onSubmit={(e) => handleSubmit(e, validate, values)} >
                <Controls.Select
                    items={[...SYMBOLS]}
                    selectTitle="Pair"
                    onChange={handleInputChange}
                    name="symbol"
                    value={values.symbol}
                />
                <Controls.Select
                    items={[...TYPES]}
                    selectTitle="Type"
                    onChange={handleInputChange}
                    name="type"
                    value={values.type}
                />
                {/*<Controls.OutlinedInput
                    name="amount"
                    label="Amount"
                    value={values.amount}
                    onChange={handleInputChange}
                    endAdornment={<InputAdornment position="end">USDT</InputAdornment>}
                    error={values.amount}
                />*/}
                <Controls.AmountInput
                    name="amount"
                    helper="Amount"
                    value={values.amount}
                    onChange={handleInputChange}
                    error={errors.amount}
                />
                <SideButton
                    value={values.side}
                    onClick={(e) => {
                        const { name, value } = e.currentTarget
                        setValues({...values, [name]: value })
                     }}
                    name="side"
                />
                <Controls.Button
                    text="TRADE"
                    type="submit"
                    onClick={null}
                />
            </Form>
        </Paper>
    )
}

export default OrderConfigContent
