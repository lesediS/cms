import AddIcon from "@mui/icons-material/Add";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Dialog,
  DialogContent,
  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import not_found from '../../../assets/courses.svg';
import MoreMenu from "../../moreMenu/MoreMenuCourse";
import NavBar from "../../navbar/NavBar";
import SearchBar from '../../searchbar/SearchBar';
import ViewAs from "../../viewAs/ViewAs";
import AddCourseForm from "../addForm/AddCourse";
import "./Content.css";

function CourseContent() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [openAddCourseDialog, setOpenAddCourseDialog] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [loading, setLoading] = useState(false); // Loading state for spinner

  const { cId } = useParams();

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      setLoading(true); // Start loading spinner
      const result = await axios.get(
        "http://localhost:8080/content-management/courses"
      );
      setTimeout(() => {
        setCourses(result.data);
        setFilteredCourses(result.data); // Initialize filtered courses with all courses
        setLoading(false); // Stop loading spinner
      }, 1500);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setLoading(false); // Stop loading spinner in case of error
    }
  };

  const handleAddCourseClick = () => {
    setOpenAddCourseDialog(true);
  };

  const handleCloseAddCourseDialog = () => {
    setOpenAddCourseDialog(false);
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  const handleSearchSubmit = async (query) => {
    setLoading(true); // Start loading spinner
    const filtered = courses.filter((course) =>
      course.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCourses(filtered);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false); // Stop loading spinner
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/content-management/courses/${courseId}`
      );
      console.log('Course deleted:', response.data);
      // Update courses after deletion
      setCourses(courses.filter(course => course.id !== id));
    } catch (error) {
      console.error('Error deleting course: ', error);
    }
  };

  return (
    <>
      <NavBar />
      <Container maxWidth="lg" className="container">
        <Typography
          variant="h4"
          gutterBottom
          sx={{ textAlign: "left", fontSize: "25px" }}
        >
          Courses
        </Typography>
        <hr />
        <div className="actions">
          <Button
            sx={{ height: "2.5rem", background: "#07406D" }}
            variant="contained"
            color="primary"
            title="Add Course"
            startIcon={<AddIcon />}
            onClick={handleAddCourseClick}
          >
            Add a course
          </Button>
          <SearchBar onSubmit={handleSearchSubmit} />
          <ViewAs onViewModeChange={handleViewModeChange} />
        </div>

        {loading && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <CircularProgress />
          </div>
        )}

        {filteredCourses.length === 0 && !loading && (
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              marginTop: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img src={not_found} alt="" width="120px" />
            No course found
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
                        <MoreMenu cId={course.id} onDelete={() => handleDeleteCourse(course.id)} />
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
                      <MoreMenu cId={course.id} onDelete={() => handleDeleteCourse(course.id)} />
                    </CardContent>
                  </Card>
                )}
              </Grid>
            ))}
          </Grid>
        )}

        <Dialog
          open={openAddCourseDialog}
          onClose={handleCloseAddCourseDialog}
          maxWidth="sm"
          fullWidth
        >
          <DialogContent>
            <AddCourseForm onClose={handleCloseAddCourseDialog} />
          </DialogContent>
        </Dialog>
      </Container>
    </>
  );
}

export default CourseContent;
