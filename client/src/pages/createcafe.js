import { useState, useEffect } from "react"
import axios from 'axios'
import { TextField, Button } from '@mui/material'

function CreateCafe() {
    const [CafeData, setCafeData] = useState([]);

    const handleChange = (e) => {
        setCafeData({
            ...CafeData,
            [e.target.name]: e.target.value.trim()
        });

    };

    const handleSubmit = (event) => {
        event.preventDefault();
        let fd = CafeData;
        if (!('logo' in fd)) {
            fd.logo = '';
        }
        axios.post(`http://localhost:8000/cafes/`, CafeData).then((res)=>{
            alert('Created');
        }).catch((err)=>{
            console.log(err)
        })

        // Handle form submission logic here
    };


    return (
        <form onSubmit={handleSubmit} style={{ padding: 30 }}>
            <TextField
                label="Name"
                variant="filled"
                fullWidth
                onChange={handleChange}
                required
                name="name"

            />
            <br /><br />
            <TextField
                label="Description"
                variant="filled"
                fullWidth
                onChange={handleChange}
                required
                name="description"
            />
            <br /><br />
            <TextField
                label="Location"
                variant="filled"
                fullWidth
                onChange={handleChange}
                required
                name="location"
            />
            <br /><br />
            <TextField
                label="Logo"
                variant={CafeData?.Logo == '' ? 'outlined' : 'filled'}
                placeholder="Enter url of image"
                fullWidth
                onChange={handleChange}
                name="logo"
            />
            <br /><br />
            <Button type="submit" variant="contained" color="primary">
                Submit
            </Button>
        </form>
    )
}

export default CreateCafe;