import React, { Component } from "react";
import { FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios';

export default class SignUp extends Component {


    handleSubmit = e => {
        e.preventDefault();
        const data = {
            first_name: this.firstName,
            last_name: this.lastName,
            email: this.email,
            password: this.password,
            password_confirm: this.confirmPassword
        }
        axios.post('contacts', data).then(
            res => {
                console.log(res.body)
            }
        ).catch(
            err => {
                console.log(err);
            }
        )
        console.log(data);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Sign Up</h3>

                <FormGroup>
                    <Label for="firstName">First name</Label>
                    <Input type="text" id="firstName" placeholder="First name"
                        onChange={e => this.firstName = e.target.value} />
                </FormGroup>

                <FormGroup>
                    <Label for="lastName">Last name</Label>
                    <Input type="text" id="lastName" placeholder="Last name"
                        onChange={e => this.lastName = e.target.value} />
                </FormGroup>

                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="email" id="email" placeholder="Email"
                        onChange={e => this.email = e.target.value} />
                </FormGroup>

                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input type="password" id="password" placeholder="Password"
                        onChange={e => this.password = e.target.value} />
                </FormGroup>

                <FormGroup>
                    <Label for="confirmPassword">Confirm Password</Label>
                    <Input type="password" id="confirmPassword" placeholder="Confirm Password"
                        onChange={e => this.confirmPassword = e.target.value} />
                </FormGroup>

                <Button className="btn btn-primary btn-block">Login</Button>

            </form>
        );
    }
}