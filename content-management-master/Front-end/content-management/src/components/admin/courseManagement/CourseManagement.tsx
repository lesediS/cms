import { Card, CardContent, CardMedia, Container, Grid, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import iconImage from '../../../assets/hacker.jpeg';
import NavBar from "../../navbar/NavBar";
import './CourseManagement.css'; // Assuming the CSS is updated accordingly

function CourseManagement() {
    return (
        <>
            <NavBar />
            <Container className="container">
                <Typography variant="h4" gutterBottom className="course-header" sx={{ textAlign: 'left', fontSize: '25px' }}>
                    Course Management
                </Typography>
                <hr className="course-divider" />

                <Grid container spacing={3} justifyContent="center">
                    <Grid item xs={5} md={3}>
                        <Card className="course-card">
                            <RouterLink to="/site-admin/course-management/module-content" className="image-link">
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={iconImage}
                                    alt="Modules"
                                    className="card-image" />
                            </RouterLink>
                            <CardContent>
                                <Typography variant="h5" component="div" className="card-caption">
                                    Modules
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    
                    <Grid item xs={5} md={3}>
                        <Card className="course-card">
                            <RouterLink to="/site-admin/course-management/course-content" className="image-link">
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={iconImage}
                                    alt="Courses"
                                    className="card-image" />
                            </RouterLink>
                            <CardContent>
                                <Typography variant="h5" component="div" className="card-caption">
                                    Courses
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

export default CourseManagement;
