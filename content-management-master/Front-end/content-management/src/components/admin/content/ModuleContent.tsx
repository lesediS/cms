import AddIcon from '@mui/icons-material/Add';
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
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import not_found from '../../../assets/courses.svg';
import MoreMenu from '../../moreMenu/MoreMenuModule';
import NavBar from '../../navbar/NavBar';
import SearchBar from '../../searchbar/SearchBar';
import ViewAs from '../../viewAs/ViewAs';
import AddModuleForm from '../addForm/AddModule';
import './Content.css';

function ModuleContent() {
  const [modules, setModules] = useState([]);
  const [filteredModules, setFilteredModules] = useState([]);
  const [openAddModuleDialog, setOpenAddModuleDialog] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [loading, setLoading] = useState(false); // Loading state for spinner

  const { moduleId } = useParams();

  useEffect(() => {
    loadModules();
  }, []);

  const loadModules = async () => {
    try {
      setLoading(true); // Start the spinner
      const result = await axios.get("http://localhost:8080/content-management/modules");
      setTimeout(() => {
        setModules(result.data);
        setFilteredModules(result.data); // Initialize filtered modules with all modules
        setLoading(false);
      }, 1500);
    } catch (error) {
      console.error("Error fetching modules:", error);
      setLoading(false);
    }
  };

  const handleAddModuleClick = () => {
    setOpenAddModuleDialog(true);
  };

  const handleCloseAddModuleDialog = () => {
    setOpenAddModuleDialog(false);
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  const handleSearchSubmit = async (query) => {
    setLoading(true); // Start loading spinner
    const filtered = modules.filter(module =>
      module.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredModules(filtered);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulating delay (remove in production)
    setLoading(false); // Stop loading spinner
  };

  return (
    <>
      <NavBar />
      <Container maxWidth="lg" className='container' >
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'left', fontSize: '25px' }}>
          Modules
        </Typography>
        <hr />
        <div className="actions">
          <Button
            sx={{ height: '2.5rem', background: '#07406D' }}
            variant="contained"
            color="primary"
            title="Add Module"
            startIcon={<AddIcon />}
            onClick={handleAddModuleClick}
          >
            Add a Module
          </Button>
          <SearchBar onSubmit={handleSearchSubmit} />
          <ViewAs onViewModeChange={handleViewModeChange} />
        </div>

        {loading && ( // Display spinner while loading
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <CircularProgress />
          </div>
        )}

        {filteredModules.length === 0 && !loading && (
          <Typography variant="h6" sx={{ textAlign: 'center', marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src={not_found} alt="" width="120px" />
            No module found
          </Typography>
        )}

        {!loading && (
          <Grid container spacing={2} marginTop={3}>
            {filteredModules.map((module, index) => (
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
                      image={module.moduleImageURL}
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
                          {module.name}
                        </Typography>
                        <Typography className="list-desc">
                          {module.description}
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
                      image={module.moduleImageURL}
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
                        {module.name}{" "}
                      </Typography>
                      <Typography>{module.description}</Typography>
                      <MoreMenu />
                    </CardContent>
                  </Card>
                )}
              </Grid>
            ))}
          </Grid>
        )}

        <Dialog open={openAddModuleDialog} onClose={handleCloseAddModuleDialog} maxWidth="sm" fullWidth>
          <DialogContent>
            <AddModuleForm onClose={handleCloseAddModuleDialog} />
          </DialogContent>
        </Dialog>
      </Container>
    </>
  );
}

export default ModuleContent;
