import { Card, CardContent, CardMedia, Container, Grid, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import enrollImage from '../../../assets/image.jpg';
import manageImage from '../../../assets/image2.jpg';
import NavBar from "../../navbar/NavBar";
import './AdminPage.css';

function AdminPage() {
    return (
        <><NavBar /><Container className="container">
            <Typography variant="h4" gutterBottom className="admin-header" sx={{ textAlign: 'left', fontSize: '25px' }}>
                Site Administration
            </Typography>
            <hr className="admin-divider" />

            <Grid container spacing={3} justifyContent="center">
                <Grid item xs={5} md={3}>
                    <Card className="admin-card">
                        <RouterLink to="/site-admin/student-enrollment" className="image-link">
                            <CardMedia
                                component="img"
                                height="140"
                                image={enrollImage}
                                alt="Student Enrollment"
                                className="card-image" />
                        </RouterLink>
                        <CardContent>
                            <Typography variant="h5" component="div" className="card-caption" noWrap={false} lines={2}>
                                Student Enrollment
                            </Typography>

                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={5} md={3}>
                    <Card className="admin-card">
                        <RouterLink to="/site-admin/course-management" className="image-link">
                            <CardMedia
                                component="img"
                                height="140"
                                image={manageImage}
                                alt="Course Management"
                                className="card-image" />
                        </RouterLink>
                        <CardContent>
                            <Typography variant="h5" component="div" className="card-caption">
                                Course Management
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container></>
    );
}

export default AdminPage;
