import React from 'react';
import '../static/main.css'

class projectPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            late: [],
            all: true,
            web: false,
            frontend: false,
            fullstack: false,
            reactjs: false,
            nodejs: false,
            mongodb: false
        }

        let checkedTags = [];
        let removeChild = false;
        this.componentDidMount = this.componentDidMount.bind(this);
        this.closeAndOpenBigProjectDiv = this.closeAndOpenBigProjectDiv.bind(this)
        this.handleChange = this.handleChange.bind(this);
        this.test = this.test.bind(this);
    }

    test() {
        console.log("testing")
    }

    componentDidMount() {
        console.log("es")
        fetch('http://www.philiphilding.com/projectdata')
        .then(response => {
            return response.json();
        })
        .then(data => {
            const projectData = data.ProjectData;
            this.setState({late: projectData})
            console.log(this.state.late)
        }) 
        const bigProjectDiv = this.refs.bigProjectDiv
        bigProjectDiv.style.display = "none";
        this.checkedTags = ["all"]
    }

    handleChange({target}){
        let stateName = target.name
        if(this.state[stateName] === true) {
            this.setState({
                [stateName]: false
            })
            const indexOfItem = this.checkedTags.indexOf(stateName)
            if(indexOfItem > -1) {
                this.checkedTags.splice(indexOfItem, 1)
            }
            console.log(this.checkedTags)
        } else {
            this.setState({
                [stateName]: true
            })
            this.checkedTags.push(stateName)
            console.log(this.checkedTags)
        }
    }

    closeAndOpenBigProjectDiv(variable) {
        const bigProjectDiv = this.refs.bigProjectDiv
        if(bigProjectDiv.style.display === "none") {
            //Make big project div visable
            bigProjectDiv.style.display = "inline-block";

            const bigProjectDivImg = this.refs.bigProjectDivImg;
            const bigProjectDivName = this.refs.bigProjectDivName;
            const bigProjectDivDesc = this.refs.bigProjectDivDesc;
            const bigProjectDivGithub = this.refs.bigProjectDivGithub;
            const bigProjectDivWebsite = this.refs.bigProjectDivWebsite;
            const bigProjectDivTagDiv = this.refs.bigProjectDivTagDiv;

            //console.log(variable.projectName)

            bigProjectDivImg.style.background = `linear-gradient(0deg, rgba(20, 20, 20, 0.8), rgba(20, 20, 20, 0.8)), url(../static/pictures/${variable.projectName}.png)`
            bigProjectDivImg.style.backgroundSize = "cover"
            
            bigProjectDivName.innerHTML = variable.projectName;

            bigProjectDivDesc.innerHTML = variable.projectDescription;

            bigProjectDivGithub.href = variable.githubLink;
            bigProjectDivWebsite.href = variable.websiteLink;


            let projectTagsArray = variable.projectTags
            for(let i = 0; i < projectTagsArray.length; i++) {
                console.log(projectTagsArray[i])
                let para = document.createElement("div");
                let node = document.createTextNode(projectTagsArray[i]);
                para.appendChild(node);
                let element = bigProjectDivTagDiv

                //Style the tags
                para.style.color = "white"
                para.style.display = "inline-block"
                para.style.backgroundColor = "rgb(204, 0, 153)"
                para.style.marginTop = ".2rem"
                para.style.marginLeft = "10px"
                para.style.width = "7rem"
                para.style.height = "1.7rem"
                para.style.borderRadius = "10px"
                para.style.fontSize = "1.4rem"
                para.style.fontWeight = "300"
                para.style.fontFamily = "Monospace"
                para.style.textTransform = "capitalize"
                para.style.textAlign = "center"

                //Delete data from previously viewed project that's left in element variable
                if(this.removeChild) {
                    element.innerHTML = ""
                    this.removeChild = false;
                }
                element.appendChild(para);
            }
            this.removeChild = true;
        } else {
            bigProjectDiv.style.display = "none";
        }
    }

    render() {
        return(
            <div>
                <section className="light-or-dark">
                    <div className="project-page-content">
                        <div ref="bigProjectDiv" className="big-project-div">
                            <button onClick={this.closeAndOpenBigProjectDiv} className="big-project-div-exit">X</button>
                            <img ref="bigProjectDivImg" className="big-project-div-img"/>
                            <h1 ref="bigProjectDivName" className="big-project-div-name"></h1>
                            <div className="big-project-links">
                                <a target="_blank" className="project-link github" ref="bigProjectDivGithub">GITHUB</a>
                                <a target="_blank" className="project-link website" ref="bigProjectDivWebsite">VISIT</a>
                            </div>
                            <p ref="bigProjectDivDesc" className="big-project-div-desc"></p>
                            <hr className="bigProjectDivDescBorder" />
                            <div ref="bigProjectDivTagDiv" className="bigProjectDivTags">
                                <p className="bigProjectDivTag"></p>
                            </div>
                        </div>
                        <aside className="projects-filter">
                            <h1 className="project-filter-header">Filter</h1>
                            <label className="project-filter-label">All </label>
                            <input type="checkbox" onClick={this.handleChange} name="all" checked={this.state.all}/>
                            <label className="project-filter-label">Web </label>
                            <input type="checkbox" onClick={this.handleChange} name="web" checked={this.state.web}/>
                            <label className="project-filter-label">Frontend </label>
                            <input type="checkbox" onClick={this.handleChange} name="frontend" checked={this.state.frontend}/>
                            <label className="project-filter-label">Fullstack </label>
                            <input type="checkbox" onClick={this.handleChange} name="fullstack" checked={this.state.fullstack}/>
                            <label className="project-filter-label">ReactJS </label>
                            <input type="checkbox" onClick={this.handleChange} name="reactjs" checked={this.state.reactjs}/>
                            <label className="project-filter-label">NodeJS </label>
                            <input type="checkbox" onClick={this.handleChange} name="nodejs" checked={this.state.nodejs}/>
                            <label className="project-filter-label">MongoDB </label>
                            <input type="checkbox" onClick={this.handleChange} name="mongodb" checked={this.state.mongodb}/>
                        </aside>
                        <section className="projects-div">
                            {
                                this.state.late.map(x => {
                                    if(this.state.all) {
                                        return <div onClick={() => this.closeAndOpenBigProjectDiv(x)} className="project-div">
                                        <img className="project-div-img" alt="project pic" src={`../static/pictures/${x.projectName}.png`}/>
                                        <h1>{x.projectName}</h1>
                                        <p className="project-desc">{x.projectDescription.substr(0, 30)}<br />{x.projectDescription.substr(31, 56)}...<br/><br/><i>Click to read more</i></p>
                                    </div>
                                    } else {
                                        for(let i = 0; i < x.projectTags.length; i++) { 
          
                                            // Loop for array2 
                                            for(let j = 0; j < this.checkedTags.length; j++) { 
                                                  
                                                // Compare the element of each and 
                                                // every element from both of the 
                                                // arrays 
                                                if(x.projectTags[i] === this.checkedTags[j]) { 
                                                  
                                                    return <div onClick={() => this.closeAndOpenBigProjectDiv(x)} className="project-div">
                                                                <img className="project-div-img" alt="project pic" src={`../static/pictures/${x.projectName}.png`}/>
                                                                <h1>{x.projectName}</h1>
                                                                <p className="project-desc">{x.projectDescription.substr(0, 30)}<br />{x.projectDescription.substr(31, 56)}...<br/><i>Click to read more</i></p>
                                                            </div>
                                                } 
                                            } 
                                        } 
                                    }
                                })
                            }
                        </section>
                    </div>
                </section>
            </div>
        )
    }
}

export default projectPage;