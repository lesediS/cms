import { Container, Typography } from "@mui/material";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import StdNavBar from '../std-navbar/StdNavBar';
import './my-module.css';

const MyModule = () => {

    const [units, setUnits] = useState([]);

    useEffect(() => {
        // Fetch unit data from backend on component mount
        fetch('/api/units') // Replace with your API endpoint
            .then(response => response.json())
            .then(data => setUnits(data));
    }, []);

    return (
        <>
            <StdNavBar />

            <Container className="container">
                <Typography variant="h4" gutterBottom className="course-header" sx={{ textAlign: 'left', fontSize: '25px' }}>
                    Java
                </Typography>
                <hr className="unit-divider" />

                <div>
                    <Typography variant='h5' marginBottom='2em'>
                        <p className='about'>About this module <br /></p>
                        <p className='body'>Add module description from backend.
                            Java is a high-level, class-based, object-oriented programming language that is designed to have as few implementation dependencies as possible.</p>
                    </Typography>
                </div>

                <div>
                    <Typography variant='h6' component={Link} to="/unit" sx={{ textAlign: 'left', margin: '4em 43em 0em 0em', textDecoration: 'none' }}>Object-Oriented Programming</Typography>
                    <div>
                        <p className='body'>Add unit description from backend.<br />
                            Object-oriented programming is a programming paradigm based on the concept of objects, which can contain data and code: data in the form of fields, and code in the form of procedures.
                            In OOP, computer programs are designed by making them out of objects that interact with one another.</p>
                    </div>


                    <Typography variant='h6' component={Link} to="/unit" sx={{ padding: '4em 43em 0em 0em', textDecoration: 'none' }}>Java SE Programmer 1 (OCA)</Typography>
                    <div>
                        <p className='body'>Add unit description from backend.<br />
                            This official Oracle Certified Associate (OCA) Java SE 11 Programmer Fundamentals course enables anyone with little or no programming experience to begin to learn programming using the Java programming language.</p>
                    </div>

                </div>

                {/* {units.map(unit => (
                    <div key={unit.id}>
                        <Typography variant='h6' component={Link} to={`/unit/${unit.id}`} sx={{ padding: '4em 43em 0em 0em', textDecoration: 'none' }}>
                            {unit.title}
                        </Typography>
                        <div>
                            <p className='body'>{unit.description}<br /></p>
                        </div>
                    </div>
                ))} */}
            </Container>
        </>
    )
}

export default MyModule
