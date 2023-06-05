import React, { useState } from 'react'
import { AppBar, Tab, Tabs, Toolbar, Typography } from '@mui/material'
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined'
import { NavLink } from 'react-router-dom'

const Header = () => {
    const [value, setValue] = useState()

    return (
        <div>
            <AppBar sx={{ backgroundColor: "#232F3D" }} position="sticky">
                <Toolbar>
                    <Typography>
                        <AutoStoriesOutlinedIcon />
                    </Typography>
                    <Tabs
                        sx={{ ml: "auto" }}
                        textColor="inherit"
                        indicatorColor="primary"
                        value={value}
                        onChange={(e, val) => setValue(val)}
                    >
                        {/* в адресной строке появится /add, /books, /about */}
                        <Tab 
                            LinkComponent={NavLink} 
                            to="/add" 
                            label="Add product"
                            value={0} 
                        />
                        <Tab 
                            LinkComponent={NavLink} 
                            to="/books" 
                            label="Books"
                            value={1} 
                            />
                    </Tabs>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header