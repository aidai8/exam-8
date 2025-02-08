import {AppBar, Box, Button, Toolbar, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";


const NavBar = () => {
    return (
        <Box sx={{flexGrow: 1, mb: 5}}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        color="inherit"
                        component={NavLink}
                        to='/'
                        sx={{ flexGrow: 1, textDecoration: 'none' }}
                    >
                        Quotes
                    </Typography>
                    <Button color="inherit" component={NavLink} to='/'>Quotes</Button>
                    <Button color="inherit" component={NavLink} to='/add-quote'>Submit new quote</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default NavBar;