import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export const Loading = () => {
    return(
        <>
        <Box sx={{ display: 'flex', width: '25px', height: '25px' }}>
            <CircularProgress color='inherit' sx={{width: "25px !important", height: '25px !important'}}/>
        </Box>
        </>
    )
}