import CafeTable from "../components/cafetable"
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'


function Cafe() {
    return (<>
        <div style={{margin: 10}}>
            <Button component={Link} to="/createcafe" variant="contained" color="primary">
                Create Cafe
            </Button>
        </div>
        <CafeTable></CafeTable>
    </>);
}

export default Cafe;