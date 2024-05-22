import { Container, Typography } from "@mui/material";
import AddToPlaylistBtn from "../add-to-playlist/AddToPlaylistBtn";
import DropDown from '../drop-down/DropDown';
import NavBar from "../std-navbar/StdNavBar";
import Videos from '../yt-videos/Videos';
import './my-unit.css';


const Unit = () => {
    return (
        <>
            <NavBar />
            <Container className="container">
                <Typography variant="h4" gutterBottom className="unit-header" sx={{ textAlign: 'left', fontSize: '25px' }}>
                    Object-Oriented Programming
                </Typography>
                <hr className="unit-divider" />

                <div className="controls">
                    <DropDown />
                    <AddToPlaylistBtn />
                </div>

                <div>
                    <Videos />
                </div>
            </Container>
        </>
    );
}

export default Unit;
