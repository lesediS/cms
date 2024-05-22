import { Container, Link, Typography } from '@mui/material';
import { useEffect } from 'react';
import { Link as RouterLink, useLocation } from "react-router-dom";

function ErrorPage() {
    const location = useLocation();

    useEffect(() => {
        document.title = `Page Not Found`;
    }, [location]);

    return (
        <Container sx={{ pt: 3, border: '1px solid rgba(0, 0, 0, 0.12)' }}>
            <Typography variant="h1" gutterBottom>
                404 Not Found
            </Typography>
            <Typography>
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </Typography>
            <Typography>
                Please <Link component={RouterLink} to="/">Click here</Link> to go back to the homepage.
            </Typography>
        </Container>
    );
}

export default ErrorPage;
