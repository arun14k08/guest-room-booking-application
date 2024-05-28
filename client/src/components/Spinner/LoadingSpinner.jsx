import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const LoadingSpinner = () => {
    return (
        <div className="mx-auto">
            <Box sx={{ display: "flex" }}>
                <CircularProgress />
            </Box>
        </div>
    );
};

export default LoadingSpinner;
