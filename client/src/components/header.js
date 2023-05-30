import * as React from 'react'
import { Link } from 'react-router-dom'
function Header() {
    return (<>
        <header>
            <Link to="/cafes">Cafes</Link>
            <Link to="/employees">Employees</Link>
        </header>
    </>);
}

export default Header;