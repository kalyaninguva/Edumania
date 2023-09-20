import React from 'react'
import {Grid, TextField, makeStyles, Select, MenuItem, createMuiTheme, MuiThemeProvider} from '@material-ui/core'
import {useHistory} from 'react-router-dom'

const theme = createMuiTheme({
    palette:{
      primary : {
        main:"#000000",
      }
    }
  })

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(4),
        color: "white"
    },
    input: {
        margin: theme.spacing(3)
    }
}))

const FillDetails = () => {

    const classes = useStyles()
    const history = useHistory()
    const [name, setName] = React.useState(null)
    const [father, setFather] = React.useState(null)
    const Locality = history.location.state
    const school=Locality.value
    const [sec, setSec] = React.useState(null)
    const [roll, setRoll] = React.useState(null)
    const [phone, setPhone] = React.useState(null) 
    const [feetype, setFeetype] = React.useState(null)
    const [amount, setAmount] = React.useState(null)

    function isDate(val) {
        // Cross realm comptatible
        return Object.prototype.toString.call(val) === '[object Date]'
    }
    
    function isObj(val) {
        return typeof val === 'object'
    }
    
    function stringifyValue(val) {
        if (isObj(val) && !isDate(val)) {
        return JSON.stringify(val)
        } else {
        return val
        }
    }
    
    function buildForm({ action, params }) {
        const form = document.createElement('form')
        form.setAttribute('method', 'post')
        form.setAttribute('action', action)
    
        Object.keys(params).forEach(key => {
        const input = document.createElement('input')
        input.setAttribute('type', 'hidden')
        input.setAttribute('name', key)
        input.setAttribute('value', stringifyValue(params[key]))
        form.appendChild(input)
        })
    
        return form
    }
    
    function post(details) {
        const form = buildForm(details)
        document.body.appendChild(form)
        form.submit()
        form.remove()
    }

    const getData=(data)=>
    {
        return fetch(`http://localhost:5000/api/payment`,{
            method:"POST",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        }).then(response=>response.json()).catch(err=>console.log(err))
    }

    const makePayment = () =>{
        getData({amount:100,email:"abc@gmail.com"}).then(response=>{
            var information = {
                action : "https://securegw-stage.paytm.in/order/process",
                params : response
            }
            post(information)
        })
    }

    const handlePayment = (e) => {
        e.preventDefault()
        makePayment()
    }

    return (
        <div className={classes.root} >
            <Grid container direction='row' >
                <Grid item xs={4}>

                </Grid>
                <Grid item xs={4}>
                    <Grid container spacing={2} direction="column" justify="center">
                        <form onSubmit={handlePayment} >
                            <Grid className={classes.input} item xs={12}>
                                <TextField
                                    variant="outlined"
                                    label="name of the student"
                                    size="small" 
                                    value={name}
                                    onChange={(e) => {setName(e.target.value)}}
                                    fullWidth
                                />
                            </Grid>
                            <Grid className={classes.input} item xs={12}>
                                <TextField
                                    variant="outlined"
                                    label="Father name"
                                    size="small" 
                                    value={father}
                                    onChange={(e) => {setFather(e.target.value)}}
                                    fullWidth
                                />
                            </Grid>
                            <Grid className={classes.input} item xs={12}>
                                <TextField
                                    disabled
                                    variant="outlined"
                                    label="School"
                                    size="small" 
                                    value={school}
                                    fullWidth
                                />
                            </Grid>
                            <Grid className={classes.input} item xs={12}>
                                <TextField
                                    variant="outlined"
                                    label="Class and Section"
                                    size="small" 
                                    value={sec}
                                    onChange={(e) => {setSec(e.target.value)}}
                                    fullWidth
                                />
                            </Grid>
                            <Grid className={classes.input} item xs={12}>
                                <TextField
                                    variant="outlined"
                                    label="Roll number"
                                    size="small" 
                                    value={roll}
                                    onChange={(e) => {setRoll(e.target.value)}}
                                    fullWidth
                                />
                            </Grid>
                            <Grid className={classes.input} item xs={12}>
                                <TextField
                                    variant="outlined"
                                    label="Phone number"
                                    size="small"
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => {setPhone(e.target.value)}}
                                    fullWidth
                                />
                            </Grid>
                            <Grid className={classes.input} item xs={12}>
                                <h2>FeeType</h2> <p/>
                                <Select
                                    value={feetype}
                                    onChange={(e) => setFeetype(e.target.value)}
                                >
                                    <MenuItem value={'Sports'} >Sports</MenuItem>
                                    <MenuItem value={'Books'} >Books</MenuItem>
                                    <MenuItem value={'Academics'} >Academics</MenuItem>
                                </Select>
                            </Grid>
                            <Grid className={classes.input} item xs={12}>
                                <TextField
                                        variant="outlined"
                                        label="Amount"
                                        size="small"
                                        type="number"
                                        value={amount}
                                        onChange={(e) => {setAmount(e.target.value)}}
                                        fullWidth
                                    />
                            </Grid>
                            <Grid item xs={12}>
                                <button type='submit'>pay using paytm</button>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
                <Grid item xs={4}>

                </Grid>
            </Grid>
        </div>
    )
}

export default FillDetails
