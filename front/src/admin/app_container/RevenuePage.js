import {Button, IconButton, Stack, TextField} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import * as React from "react";
import Paper from "@mui/material/Paper";

export default function RevenuePage() {
    return (
        <Paper sx={{width: '100%', overflow: 'hidden'}}>
            <div style={{display: "flex", justifyContent: "space-between", margin: "1rem 3rem 1rem 3rem"}}>
                <h1>Doanh thu</h1>
                {/*<Stack direction="row" spacing={2}>*/}
                {/*    <TextField label="Tìm kiếm" variant="outlined" size="small" value={searchTerm}*/}
                {/*               onChange={(e) => handleSearch(e.target.value)}*/}
                {/*               slotProps={{*/}
                {/*                   input: {*/}
                {/*                       endAdornment: (searchTerm && ( // Conditionally render the clear icon*/}
                {/*                           (<IconButton onClick={clearSearch}>*/}
                {/*                               <ClearIcon/>*/}
                {/*                           </IconButton>)))*/}
                {/*                   }*/}
                {/*               }}*/}
                {/*    />*/}
                {/*</Stack>*/}
            </div>
        </Paper>
    )
}

