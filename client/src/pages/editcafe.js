import { useState, useEffect } from "react"
import { useParams } from "react-router"
import axios from 'axios'
import { TextField, Button } from '@mui/material'

function EditCafe() {
    const { id } = useParams();
    const [CafeData, setCafeData] = useState([]);

    const getCafeData = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/cafes?id=${id}`);
            if (res.data !== null) {
                setCafeData(res.data[0]);
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getCafeData();
    }, [id]);

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
        axios.put(`http://localhost:8000/cafes/${id}`, CafeData).then((res)=>{
            alert('updated');
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
                value={CafeData?.name || ''}
                InputLabelProps={{ shrink: true }}

            />
            <br /><br />
            <TextField
                label="Description"
                variant="filled"
                fullWidth
                onChange={handleChange}
                required
                name="description"
                value={CafeData?.description || ''}
                InputLabelProps={{ shrink: true }}
            />
            <br /><br />
            <TextField
                label="Location"
                variant="filled"
                fullWidth
                onChange={handleChange}
                required
                name="location"
                value={CafeData?.location || ''}
                InputLabelProps={{ shrink: true }}
            />
            <br /><br />
            <TextField
                label="Logo"
                variant={CafeData?.Logo == '' ? 'outlined' : 'filled'}
                placeholder="Enter url of image"
                fullWidth
                onChange={handleChange}
                name="logo"
                value={CafeData?.logo || ''}
                defaultValue={CafeData?.logo}
            />
            <br /><br />
            <Button type="submit" variant="contained" color="primary">
                Submit
            </Button>
        </form>
    )
}

export default EditCafe;