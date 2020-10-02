import React, { Component } from "react";
import { Modal, ModalHeader, FormGroup, ModalFooter, Label, Input, ModalBody, Table, Button } from 'reactstrap';
import axios from "axios";


export default class Users extends Component {

  state = {
    contacts: [],
    newContactData: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      password_confirm: ''
    },
    editContactData: {
      id: '',
      first_name: '',
      last_name: '',
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
    })
  }


  toggleEditContactModal() {
    this.setState({
      editContactModal: !this.state.editContactModal
    })
  }

  addContact() {
    axios.post('contacts', this.state.newContactData).then((response) => {
      let { contacts } = this.state;
      contacts.push(response.data);

      this.setState({
        contacts, newContactModal: false, newContactData: {
          first_name: '',
          last_name: '',
          email: '',
          password: ''
        }
      })
    })
  }
  updateContact() {
    let { first_name, last_name, email, password } = this.state.editContactData;

    axios.put('contacts/' + this.state.editContactData.id, {
      first_name, last_name, email, password
    }).then((response) => {
      console.log(response.data);
      this._refreshList()
      this.setState({
        editContactModal: false, editContactData: { id: '', first_name: '', last_name: '', email: '', password: '' }
      })
    })
  }
  editContact(id, first_name, last_name, email, password) {
    this.setState({
      editContactData: { id, first_name, last_name, email, password }, editContactModal: !this.state.editContactModal
    })
  }
  deleteContact(id) {
    axios.delete('contacts/' + id).then((response) => {
      this._refreshList()
    })
  }
  _refreshList() {
   
    axios.get('contacts').then((response) => {
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
          <td>{contact.first_name}</td>
          <td>{contact.last_name}</td>
          <td>{contact.email}</td>
          <td>{contact.password}</td>
          <td>
            <Button color="success" size="sm" className="mr-2" onClick={this.editContact.bind(this, contact.id, contact.first_name, contact.last_name, contact.email, contact.password)}>Edit</Button>
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
              <Label for="first_name">First name</Label>
              <Input id="first_name" value={this.state.newContactData.first_name} onChange={(e) => {
                let { newContactData } = this.state;
                newContactData.first_name = e.target.value
                this.setState({ newContactData })
              }} />
            </FormGroup>
            <FormGroup>
              <Label for="last_name">Last name</Label>
              <Input id="last_name" value={this.state.newContactData.last_name} onChange={(e) => {
                let { newContactData } = this.state;
                newContactData.last_name = e.target.value
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
              <Label for="password">Password</Label>
              <Input id="password" value={this.state.newContactData.password} onChange={(e) => {
                let { newContactData } = this.state;
                newContactData.password = e.target.value
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
              <Label for="first_name">First name</Label>
              <Input id="first_name" value={this.state.editContactData.first_name} onChange={(e) => {
                let { editContactData } = this.state;
                editContactData.first_name = e.target.value
                this.setState({ editContactData })
              }} />
            </FormGroup>
            <FormGroup>
              <Label for="last_name">Last name</Label>
              <Input id="last_name" value={this.state.editContactData.last_name} onChange={(e) => {
                let { editContactData } = this.state;
                editContactData.last_name = e.target.value
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
              <Label for="password">Password</Label>
              <Input id="password" value={this.state.editContactData.password} onChange={(e) => {
                let { editContactData } = this.state;
                editContactData.password = e.target.value
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
              <th>First name</th>
              <th>Last name</th>
              <th>Email</th>
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

