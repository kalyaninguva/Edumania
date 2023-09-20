import React from 'react'
import Select from 'react-select'
import {Grid, makeStyles, Button} from '@material-ui/core'
import {useHistory} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(24)
    },
    input: {
        margin: theme.spacing(2)
    }
}))

const Locality = [
    {
        name: 'Vizag',
        schools: [
            {
                value: 'bhashyam',
            },
            {
                value: 'KKR'
            }
        ]
    },
    {
        name: 'tirupati',
        schools: [
            {
                value: 'Narayana'
            }
        ]
    }
]

const FindSchools = () => {

    const classes = useStyles()
    const history = useHistory()

    const [locality, setLocality] = React.useState(null)
    const [school, setSchool] = React.useState(null)
    const [schoollist, setSchoollist] = React.useState([])
    const [error, setError] = React.useState(null)

    const handleLocalityChange = (obj) => {
        setLocality(obj)
        setSchoollist(obj.schools)
        setSchool(null)
    }

    const handleSchoolChange = (obj) => {
        setSchool(obj)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (locality && school){
            localStorage.setItem("school", school)
            localStorage.setItem("locality", locality)
            history.push("/fillDetails", school)
        }
        else{
            setError("all fields are required")
        }
    }

    return (
        <div className={classes.root} >
            <Grid container direction="row" >
                <Grid item xs={4}>

                </Grid>
                <Grid item xs={4}>
                        <Grid container spacing={4} direction="column" justify="center" >
                            {error ? (<h2 style={{color:"white"}} >{error}</h2>): (<h1 style={{color:"white"}}>Find School</h1>) }
                            <form onSubmit={handleSubmit} >
                        <Grid className={classes.input} item xs={12}>
                            <Select
                            style={{color:"black"}}
                            required
                            placeholder="Locality"
                            value={locality}
                            options={Locality}
                            onChange={handleLocalityChange}
                            getOptionLabel={x => x.name}
                            getOptionValue={x => x.name}
                        />
                        </Grid>
                        <Grid className={classes.input} item xs={12} >
                            <Select
                            required
                            style={{color:"black"}}
                            options={schoollist}
                            value={school}
                            onChange={handleSchoolChange}
                            placeholder="School"
                            getOptionLabel={x => x.value}
                            getOptionValue={x => x.value}
                        />
                        </Grid>
                        <Grid className={classes.input} item xs={12}>
                            <Button type="submit" color="inherit" variant="outlined" >Submit</Button>
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

export default FindSchools
