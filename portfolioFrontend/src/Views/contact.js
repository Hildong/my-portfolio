import React from 'react';
import axios from 'axios';
import '../static/main.css'

class contactPage extends React.Component {

    //Init constructor for state objects and functions
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            msg: ""
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.checkIfInputIsEmpty = this.checkIfInputIsEmpty.bind(this);
    }

    //Create function to handle inputs when they're changed, and change the value of changed state key
    handleInputChange(event) {
        const target = event.target;
        const value = target.name === 'name' ? target.value : target.name === 'email' ? target.value : target.name === "msg" && target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
      }

      //Create function to check if users went in to "Inspect" and removed "required" or type="email". In that case alert a warning
      checkIfInputIsEmpty() {
        //Regular expression which I use to see if type="email" is changed or removed in else if below
        let emailRegex = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(this.state.name === "" || this.state.name === " " || this.state.email === "" || this.state.email === " " || this.state.msg === "" || this.state.msg === " ") {
            alert("Fields can't be empty")
        } else if(!emailRegex.test(this.state.email)) {
            alert("Please enter a valid email");
        } else {
            //Create object of the state keys
            const data = {
                name: this.state.name,
                email: this.state.email,
                msg: this.state.msg
            }

            //Use axios to send data from form
            axios.post('http://www.philiphilding.com/mail', data)
                .then(res => {
                    console.log(res);
                })

            alert("Thanks for reaching out, I will read your message as soon as possible!")
        }
      }

    render() {
        return(
            <div>
                <section className="light-or-dark">
                    <section className="get-in-touch">
                        <form className="contact-form" onSubmit={this.checkIfInputIsEmpty}>
                            <h1 className="contact-header">Get in touch</h1>
                            <div className="contact-inputs-box">
                                <input className="contact-input" name="name" onChange={this.handleInputChange} type="text" placeholder="Name" required/>

                                <input className="contact-input contact-client-email" onChange={this.handleInputChange} name="email" type="email" placeholder="Email" required/>

                                <textarea className="contact-input-msg" name="msg" onChange={this.handleInputChange} placeholder="Message" required/>

                                <button className="submit-btn" ref="submit" type="submit">Send</button>
                            </div>
                        </form>
                    </section>
                </section>
            </div>
        )
    }
}

export default contactPage;