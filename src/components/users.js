import React, { Component } from "react";
import { Modal, ModalHeader, FormGroup, ModalFooter, Label, Input, ModalBody, Table, Button } from 'reactstrap';
import axios from "axios";


export default class Users extends Component {
    
        state = {
          contacts: [],
          friend: [],
          newContactData: {
            name: '',
            phone: '',
            age: '',
            email: '',
            friends: ''
          },
          editContactData: {
            id: '',
            name: '',
            phone: '',
            age: '',
            email: '',
            friends: ''
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
      
      
        toggleEditContactModal() {
          this.setState({
            editContactModal: !this.state.editContactModal
          })
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
                friends: ''
              }
            })
          })
        }
        updateContact() {
          let { name, phone, age, email, friends } = this.state.editContactData;
      
          axios.put('http://localhost:3001/contacts/' + this.state.editContactData.id, {
            name, phone, age, email, friends
          }).then((response) => {
            console.log(response.data);
            this._refreshList()
            this.setState({
              editContactModal: false, editContactData: { id: '', name: '', phone: '', age: '', email: '', friends: '' }
            })
          })
        }
        editContact(id, name, phone, age, email, friends) {
          this.setState({
            editContactData: { id, name, phone, age, email, friends }, editContactModal: !this.state.editContactModal
          })
        }
        deleteContact(id) {
          axios.delete('http://localhost:3001/contacts/' + id).then((response) => {
            this._refreshList()
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
          let contacts = this.state.contacts.map((contact) => {
            return (
              <tr key={contact.id}>
                <td>{contact.id}</td>
                <td>{contact.name}</td>
                <td>{contact.phone}</td>
                <td>{contact.age}</td>
                <td>{contact.email}</td>
                <td>{contact.friends}</td>
                <td>
                  <Button color="success" size="sm" className="mr-2" onClick={this.editContact.bind(this, contact.id, contact.name, contact.phone, contact.age, contact.email,contact.friends)}>Edit</Button>
                  <Button color="danger" size="sm" onClick={this.deleteContact.bind(this, contact.id)}>Delete</Button>
                </td>
              </tr>
            )
          })
          return (
            <div className="App container">
              <h1>Contacts App</h1>
      
              <Button className='my-3' color="primary" onClick={this.toggleNewContactModal.bind(this)}>Add Contact</Button>
              <Modal isOpen={this.state.newContactModal} toggle={this.toggleNewContactModal.bind(this)}>
      
                <ModalHeader toggle={this.toggleNewContactModal.bind(this)}>Add a new contact</ModalHeader>
                <ModalBody>
                  <FormGroup>
                    <Label for="name">Full name</Label>
                    <Input id="name" value={this.state.newContactData.name} onChange={(e) => {
                      let { newContactData } = this.state;
                      newContactData.name = e.target.value
                      this.setState({ newContactData })
                    }} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="phone">Phone</Label>
                    <Input id="phone" value={this.state.newContactData.phone} onChange={(e) => {
                      let { newContactData } = this.state;
                      newContactData.phone = e.target.value
                      this.setState({ newContactData })
                    }} />
                  </FormGroup>
      
                  <FormGroup>
                    <Label for="age">Age</Label>
                    <Input id="age" value={this.state.newContactData.age} onChange={(e) => {
                      let { newContactData } = this.state;
                      newContactData.age = e.target.value
                      this.setState({ newContactData })
                    }} />
                  </FormGroup>
      
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input id="email" value={this.state.newContactData.email} onChange={(e) => {
                      let { newContactData } = this.state;
                      newContactData.email = e.target.value
                      this.setState({ newContactData })
                    }} />
                  </FormGroup>
      
                  <FormGroup>
                    <Label for="friends">Friends</Label>
                    <Input id="friends" value={this.state.newContactData.friends} onChange={(e) => {
                      let { newContactData } = this.state;
                      newContactData.friends = e.target.value
                      this.setState({ newContactData })
                    }} />
                  </FormGroup>
      
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={this.addContact.bind(this)}>Add contact</Button>{' '}
                  <Button color="secondary" onClick={this.toggleNewContactModal.bind(this)}>Cancel</Button>
                </ModalFooter>
              </Modal>
      
              <Modal isOpen={this.state.editContactModal} toggle={this.toggleEditContactModal.bind(this)}>
                <ModalHeader toggle={this.toggleEditContactModal.bind(this)}>Edit a new contact</ModalHeader>
                <ModalBody>
                  <FormGroup>
                    <Label for="name">Full name</Label>
                    <Input id="name" value={this.state.editContactData.name} onChange={(e) => {
                      let { editContactData } = this.state;
                      editContactData.name = e.target.value
                      this.setState({ editContactData })
                    }} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="phone">Phone</Label>
                    <Input id="phone" value={this.state.editContactData.phone} onChange={(e) => {
                      let { editContactData } = this.state;
                      editContactData.phone = e.target.value
                      this.setState({ editContactData })
                    }} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="age">Age</Label>
                    <Input id="age" value={this.state.editContactData.age} onChange={(e) => {
                      let { editContactData } = this.state;
                      editContactData.age = e.target.value
                      this.setState({ editContactData })
                    }} />
                  </FormGroup>
      
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input id="email" value={this.state.editContactData.email} onChange={(e) => {
                      let { editContactData } = this.state;
                      editContactData.email = e.target.value
                      this.setState({ editContactData })
                    }} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="friends">Friends</Label>
                    <Input id="friends" value={this.state.editContactData.friends} onChange={(e) => {
                      let { editContactData } = this.state;
                      editContactData.friends = e.target.value
                      this.setState({ editContactData })
                    }} />
                  </FormGroup>
      
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={this.updateContact.bind(this)}>Update contact</Button>{' '}
                  <Button color="secondary" onClick={this.toggleEditContactModal.bind(this)}>Cancel</Button>
                </ModalFooter>
              </Modal>
      
              <Table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Full name</th>
                    <th>Phone number</th>
                    <th>Age</th>
                    <th>Email</th>
                    <th>Friends</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts}
                </tbody>
              </Table>
            </div>
          );
        }
      }

      