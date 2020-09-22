import React, { Component , } from "react";
import { FormGroup, Label, Input } from "reactstrap";



export default class Login extends Component {
    render() {
       
    
        
        function handleSubmit(event) {
            event.preventDefault()
            console.log(event.target.elements.exampleEmail.value);
            
          }
       return (
           
            <form onSubmit={handleSubmit}>
                <h3>Sign In</h3>
                <FormGroup>
                    <Label for="exampleEmail">Email</Label>
                    <Input type="email" id="exampleEmail" placeholder="Email"/>
                </FormGroup>

                <FormGroup>
                    <Label for="examplePassword">Password</Label>
                    <Input type="password" name="password" id="examplePassword" placeholder="Password"/>
                </FormGroup>

                <FormGroup check>
                    <Label check>
                        <Input type="checkbox" /> Remember me
                    </Label>
                </FormGroup>


                <button type="submit" className="btn btn-primary btn-block" >Submit</button>

                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </form>
        );
    }
}
