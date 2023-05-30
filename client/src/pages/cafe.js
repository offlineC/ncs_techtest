import CafeTable from "../components/cafetable";
import { Link } from 'react-router-dom'
function Cafe() {
    return (<>
        <div><Link to="/add">Add New Cafe</Link></div>
        <CafeTable></CafeTable>
    </>);
}

export default Cafe;