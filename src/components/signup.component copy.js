import React, { Component } from "react";
import { FormGroup,  Label, Input,  Button } from 'reactstrap';
import axios from 'axios';

export default class SignUp extends Component {
    state = {
        contacts: [],
        friend: [],
        newContactData: {
            name: '',
            phone: '',
            age: '',
            email: '',
            password: ''
        },
        newContactModal: false,
        editContactModal: false
    }
    async componentWillMount() {
        this._refreshList()

    }

    toggleNewContactModal() {
        this.setState({
          newContactModal: !this.state.newContactModal
        }, console.log(!this.newContactModal))
      }
      addContact() {
        axios.post('http://localhost:3001/contacts', this.state.newContactData).then((response) => {
          let { contacts } = this.state;
          contacts.push(response.data);
    
          this.setState({
            contacts, newContactModal: false, newContactData: {
              name: '',
              phone: '',
              age: '',
              email: '',
              password: ''
            }
          })
        })
      }
      _refreshList() {
        axios.get('http://localhost:3001/contacts').then((response) => {
          this.setState({
            contacts: response.data
          })
        })
      }
    

    render() {
        return (
            <form>
                <h3>Sign Up</h3>

                <FormGroup>
                    <Label for="nameUser">Full name</Label>
                    <Input type="text" id="nameUser" placeholder="Full name" value={this.state.newContactData.name} onChange={(e) => {
                        let { newContactData } = this.state;
                        newContactData.name = e.target.value
                        this.setState({ newContactData })
                    }} />
                </FormGroup>
                <FormGroup>
                    <Label for="phoneUser">Phone</Label>
                    <Input type="text" id="phoneUser" placeholder="Phone" value={this.state.newContactData.phone} onChange={(e) => {
                        let { newContactData } = this.state;
                        newContactData.phone = e.target.value
                        this.setState({ newContactData })
                    }} />
                </FormGroup>
                <FormGroup>
                    <Label for="age">Age</Label>
                    <Input id="age" placeholder="Age" value={this.state.newContactData.age} onChange={(e) => {
                        let { newContactData } = this.state;
                        newContactData.age = e.target.value
                        this.setState({ newContactData })
                    }} />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleEmail">Email</Label>
                    <Input type="email" id="exampleEmail" placeholder="Email" value={this.state.newContactData.email} onChange={(e) => {
                        let { newContactData } = this.state;
                        newContactData.email = e.target.value
                        this.setState({ newContactData })
                    }} />
                </FormGroup>
                <FormGroup>
                <Label for="examplePassword">Password</Label>
                    <Input type="password" name="password" id="examplePassword" placeholder="Password" value={this.state.newContactData.password} onChange={(e) => {
                        let { newContactData } = this.state;
                        newContactData.password = e.target.value
                        this.setState({ newContactData })
                    }} />
                </FormGroup>
                <Button color="primary" type="submit"  className="btn btn-primary btn-block" href="/" onClick={this.addContact.bind(this)}>Sign Up</Button>{' '}
                <p className="forgot-password text-right">
                    Already registered <a href="sign-in">sign in?</a>
                </p>
                
            </form>
        );
    }
}