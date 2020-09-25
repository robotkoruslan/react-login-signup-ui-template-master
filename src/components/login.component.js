import React, { Component , } from "react";
import { FormGroup, Label, Input } from "reactstrap";
import axios from 'axios';


export default class Login extends Component {
    handleSubmit = e => {
        e.preventDefault();
        const data = {
            email: this.email,
            password: this.password
        }
        
        axios.get('register', {
            params: {
                email: data.email,
                password: data.password
            }
        })
        .then(function (response) {
            console.dir(response.data);
          })
            .catch(err => {
                console.log(err);
            })
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
             <h3>Login</h3>

             <FormGroup>
                 <Label>Email</Label>
                 <Input type="email" className="" placeholder="Email" 
                 onChange={e => this.email = e.target.value}/>
             </FormGroup>

             <FormGroup>
                 <Label>Password</Label>
                 <Input type="password" className="" placeholder="Password" 
                 onChange={e => this.password = e.target.value}/>
             </FormGroup>

             <FormGroup>
                 <Label>Confirm Password</Label>
                 <Input type="password" className="" placeholder="Confirm Password" 
                 onChange={e => this.confirmPassword = e.target.value}/>
             </FormGroup>
             <button className="btn btn-primary btn-block">Login</button>
         </form> 
     )
 }
}

// https://www.youtube.com/watch?v=XWj18K4Uhg8