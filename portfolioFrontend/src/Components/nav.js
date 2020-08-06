import React from 'react';
import '../static/main.css'
import homeIcon from '../static/pictures/home.png';
import projectsIcon from '../static/pictures/code.png';
import contactIcon from '../static/pictures/mail.png';
import githubIcon from '../static/pictures/github.png';
import linkedinIcon from '../static/pictures/linkedin.png';
//import pictureOfMe from '../static/pictures/me2.png'
import { Link } from 'react-router-dom';

class navbar extends React.Component {
    render() {
        return(
            <div>
                <nav className="navigation-bar">
                    {/*<img className="my-picture" alt="Philip Hilding" src={pictureOfMe}/>*/}
                    <p className="myName">Philip <br/> Hilding</p>
                    <hr className="navbar-space-line"/>
                    <ul>
                    <hr className="navlink-line"/>
                        <Link to="/">
                            <li className="nav-link">
                                <img alt="Home page icon" className="nav-link-icon" src={homeIcon}/><br/><br/>
                                Home
                            </li>
                            <hr className="navlink-line"/>
                        </Link>
                        <Link to="/projects">
                            <li className="nav-link">
                                <img alt="Home page icon" className="nav-link-icon" src={projectsIcon}/><br/><br/>
                                Projects
                            </li>
                            <hr className="navlink-line"/>
                        </Link>
                        <Link to="/contact">
                            <li className="nav-link">
                                <img alt="Home page icon" className="nav-link-icon" src={contactIcon}/><br/><br/>
                                Contact
                            </li>
                            <hr className="navlink-line"/>
                        </Link>
                        <a href="https://github.com/Hildong" target="_blank" rel="noopener noreferrer"><li className="nav-link">
                            <img alt="Home page icon" className="nav-link-icon" src={githubIcon}/><br/><br/>
                            Github
                        </li></a>
                        <hr className="navlink-line"/>
                        <a href="https://www.linkedin.com/in/philip-hilding/" target="_blank" rel="noopener noreferrer"><li className="nav-link">
                            <img alt="Home page icon" className="nav-link-icon" src={linkedinIcon}/><br/><br/>
                            LinkedIn
                        </li></a>
                        <hr className="navlink-line"/>
                    </ul>
                    <p className="copyright-text">Philip hilding &#169; {new Date().getFullYear()}</p>
                    
                </nav>
            </div>
        )
    }
}

export default navbar;