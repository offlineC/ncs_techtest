import * as React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components';
import { AppBar, Toolbar, Typography } from '@mui/material';
const StyledLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;
function Header() {
    return (<>
            <AppBar position="static">
                <Toolbar>
                    <header>
                        <Typography variant="h6" display={'inline-block'} marginRight={5}>
                            <StyledLink to="/cafes">Cafes</StyledLink>
                        </Typography>
                        <Typography variant="h6" display={'inline-block'}>
                            <StyledLink to="/employees">Employees</StyledLink>
                        </Typography>
                    </header>
                </Toolbar>
            </AppBar>
    </>);
}

export default Header;