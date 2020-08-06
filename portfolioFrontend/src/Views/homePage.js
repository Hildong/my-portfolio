import React from 'react';
import '../static/main.css'

class homePage extends React.Component {

    
    componentDidMount() {
        //Get canvas element from the HTML (jsx), equivalent to document.querySelector(); 
        const canvas = this.refs.canvas

        //Get width and height from body 
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let c = canvas.getContext('2d');

        //Array of colors balls can be
        const color = [
            "#6600CC",
            "#FFCC00",
            "#CC0000",
        ]

        //When the browser windows width and height is changed, re init that data and call init to re-calculate the numbers
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init();
        })

        //Create function circle, to calculate size and looks of circle
        function Circle(x, y, dx, dy, radius) {
            this.x = x;
            this.y = y;
            this.dx = dx;
            this.dy = dy;
            this.radius = radius;
            this.color = color[Math.floor(Math.random() * color.length)];

            //Create circles
            this.draw = () => {
                c.beginPath();
                c.arc(this.x, this.y, this.radius, 0, Math.PI * 1, false);
                c.fillStyle = this.color
                c.fill();
                c.stroke(); 
            }

            //This function updates all circles position, making the illusion of them moving around
            this.update = () => {
                this.draw();
                if(this.x + this.radius >= canvas.width || this.x - this.radius <= 0){
                    this.dx = -this.dx;
                }
                if(this.y + this.radius >= canvas.height || this.y - this.radius <= 0){
                    this.dy = -this.dy;
                }
                this.x += this.dx;
                this.y -= this.dy;
            }

        }

        var circleArray = [];

        //Init and create circles from circle function with a loop. I.e number of times loop = number of circles on screen
        function init() {
            circleArray = [];
            for(let i = 0; i < 20; i++){
                let r = Math.floor(Math.random() * 3) + 1 ;
                let x = Math.random() * (window.innerWidth - r*2) + r;
                let y = Math.random() * (window.innerHeight - r*2) + r;
                let dx = (Math.random() - 0.5) * 5;
                let dy = (Math.random() - 0.5) * 5;
                circleArray.push(new Circle(x, y, dx, dy, r));
            }
        }

        //Function to call update function
        function animate(){
            requestAnimationFrame(animate);
            c.clearRect(0, 0, window.innerWidth, window.innerHeight);
            for(let i = 0; i < circleArray.length ; i++){
                circleArray[i].update();
            }
        }

        //Calling both animate and init so circles get created, updates the screen and create illusion of circles moving around
        animate();
        init();
    }


    render() {
        return(
            <div className="home-page-bg-img">
                    <section>
                        <canvas ref="canvas" />
                            <div className="home-page-content">

                                <div className="about-section">
                                    <p className="about-me-text">Hello, my name is <i className="about-me-my-name">Philip Hilding.</i> <br/> I'm a 18 year old fullstack freelance developer.</p>
                                </div>

                                <div className="experience-and-competencies">

                                    <aside className="experience-and-competencies-box work-experiences experiences-box">
                                        <br/>
                                        <h3 className="experiences-header">Work experiences</h3>
                                        <li className="experiences">Mcdonald's 2+ years</li>
                                        <li className="experiences">Frontend freelancing 6+ months</li>
                                        <li className="experiences">Substituted as a TA and have taught programming online</li>
                                    </aside>

                                    <aside className="experience-and-competencies-box competencies-box">
                                        <br/>
                                        <h3 className="competencies-header">Competencies</h3>
                                        <li className="competencies">HTML, CSS, JS (ES6)</li>
                                        <li className="competencies">NodeJS, expressJS, mongoDB, ReactJS</li>
                                        <li className="competencies">Unity Game Dev (C#)</li>
                                        <li className="competencies">Python</li>
                                        <li className="competencies">Dev OP</li>
                                    </aside>

                                    <aside className="experience-and-competencies-box education-box">
                                        <br/>
                                        <h3 className="competencies-header">Education and certifications</h3>
                                        <li className="competencies">IT High school degree, Realgymnasiet Linköping 2020</li>
                                        <li className="competencies">Trained as Mcdonald's <b>instructor</b> 2019</li>
                                        <li className="competencies">Trained as Mcdonald's <b>Guest experience Leader</b> 2019</li>
                                        <li className="competencies">MTA windows operating system fundamentals</li>
                                    </aside>
                                </div>

                            </div>
                    </section>
            </div>
        )
    }
}

export default homePage;