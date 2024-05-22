import { Card, CardContent, CardMedia, CircularProgress, Container, Grid, Typography } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import not_found from '../../assets/courses.svg'
import GroupingDropdown from "../grouping/GroupingDropdown"
import MoreMenu from "../moreMenu/MoreMenuCourse"
import NavBar from "../navbar/NavBar"
import SearchBar from '../searchbar/SearchBar'
import SortDropdown from "../sort/SortDropdown"
import ViewAs from "../viewAs/ViewAs"
import './CourseScreen.css'

function CourseScreen() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [loading, setLoading] = useState(false); // State for the spinner

  useEffect(() => {
    loadCourses();
  }, []);
    useEffect(() => {
        loadModules();
    }, []);

  const loadCourses = async () => {
    try {
      setLoading(true); // Start the spinner
      const result = await axios.get("http://localhost:8080/content-management/courses");
      // Simulate a loading delay of 1.5 seconds
      setTimeout(() => {
        setCourses(result.data);
        setFilteredCourses(result.data); // Initialize filtered courses with all courses
        setLoading(false); // Stop the spinner
      }, 1500);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setLoading(false); // Stop the spinner in case of an error
    }
  };
    const loadModules = async () => {
        try {
            setLoading(true); // Start the spinner
            const result = await axios.get("http://localhost:8080/content-management/modules");
            // Simulate a loading delay of 1.5 seconds
            setTimeout(() => {
                setModules(result.data);
                setFilteredModules(result.data); // Initialize filtered courses with all courses
                setLoading(false); // Stop the spinner
            }, 1500);
        } catch (error) {
            console.error("Error fetching courses:", error);
            setLoading(false); // Stop the spinner in case of an error
        }
    };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  const handleSearchSubmit = async (query) => {
    setLoading(true); // Start loading spinner
    const filtered = courses.filter(course =>
      course.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCourses(filtered);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulating delay (remove in production)
    setLoading(false); // Stop loading spinner
  };



  return (
    <>
      <NavBar />
      <Container maxWidth="lg" className='container'>
        <div className="top-controls">
          <div className="course-overview">
            <Typography variant="h4" gutterBottom sx={{ textAlign: 'left', fontSize: '25px' }}>
              Course Overview
            </Typography>
            <hr />
          </div>
          <div className="actions">
            <GroupingDropdown />
            <SearchBar onSubmit={handleSearchSubmit} />
            <SortDropdown />
            <ViewAs onViewModeChange={handleViewModeChange} />
          </div>
        </div>

        {loading && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <CircularProgress />
          </div>
        )}

        {filteredCourses.length === 0 && !loading && (
          <Typography variant="h6" sx={{ textAlign: 'center', marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src={not_found} alt="" width="120px" />
            Not found
          </Typography>
        )}

        {!loading && (
          <Grid container spacing={2} marginTop={3}>
            {filteredCourses.map((course, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={viewMode === "grid" ? 4 : 12}
                key={index}
              >
                {viewMode === "list" ? (
                  <Card
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "flex-start",
                      cursor: "pointer",
                    }}
                    className="list-card"
                  >
                    <CardMedia
                      component="img"
                      image={course.courseImageURL}
                      alt="Course Image"
                      sx={{ width: 170, height: 120, objectFit: "cover" }}
                      className="card-content-wrapper"
                    />
                    <CardContent
                      sx={{
                        flexGrow: 1,
                        paddingLeft: 2,
                        position: "relative",
                      }}
                    >
                      <div>
                        <Typography
                          variant="h5"
                          component="div"
                          className="list-name"
                        >
                          {course.name}
                        </Typography>
                        <Typography className="list-desc">
                          {course.description}
                        </Typography>
                      </div>

                      <div className="list-more-menu">
                        <MoreMenu />
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card sx={{ maxWidth: 250, cursor: "pointer" }}>
                    <CardMedia
                      component="img"
                      image={course.courseImageURL}
                      alt="Course Image"
                      sx={{ height: 150, objectFit: "cover" }}
                    />
                    <CardContent
                      sx={{ textAlign: "left", position: "relative" }}
                    >
                      <Typography
                        variant="h5"
                        component="div"
                        className="grid-name"
                      >
                        {course.name}{" "}
                      </Typography>
                      <Typography>{course.description}</Typography>
                      <MoreMenu />
                    </CardContent>
                  </Card>
                )}
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </>
  )
}

export default CourseScreen
