import React, {Component} from 'react';
import {Button, Form, Modal, Table} from 'react-bootstrap';

export default class FormWithModal extends Component {
    state = {
        isOpen: false,
        customer: {
            firstname: "",
            lastname: "",
            email: "",
            phone: "",
            productinterest: ""
        }
    };

    showModal = () => {
        this.setState({isOpen: true});
        const self = this;
        setTimeout(function () {
            self.hideModal();
        }, 10000);
    };

    hideModal = () => {
        this.setState({isOpen: false});
    };

    handleFormChange(e) {
        let customer = this.state.customer;
        customer[e.target.id] = e.target.value;
        this.setState({customer: customer});
    };


    handleSubmit = (e) => {
        e.preventDefault();
        //TODO: Send the form
        this.showModal();

        // const { firstName, lastName, email } = this.state;
        // const data = {
        //     firstName,
        //     lastName,
        //     email
        // };
        // axios
        //     .post("/api/AddForm", data, {
        //         headers: { "Content-Type": "application/json" }
        //     })
        //     .then(res => {
        //         console.log(res.data);
        //         this.setState({
        //             message: res.data.message
        //         });
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     });
    };

    render() {
        return (
            <div>
                <h2>Fill out the form</h2>
                <h3>Have one of our specialists contact you</h3>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="firstname">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder="First Name" onChange={this.handleFormChange.bind(this)}
                                      required/>
                    </Form.Group>
                    <Form.Group controlId="lastname">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Last Name" onChange={this.handleFormChange.bind(this)}
                                      required/>
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" placeholder="Email Address"
                                      onChange={this.handleFormChange.bind(this)} required/>
                    </Form.Group>
                    <Form.Group controlId="phone">
                        <Form.Label>Phone Number (US phone format)</Form.Label>
                        <Form.Control type="tel" placeholder="Phone Number (US phone format)"
                                      onChange={this.handleFormChange.bind(this)} required/>
                    </Form.Group>
                    <Form.Group controlId="productinterest">
                        <Form.Label>How did you hear about us?</Form.Label>
                        <Form.Control as="select" onChange={this.handleFormChange.bind(this)} required>
                            <option></option>
                            <option>Google</option>
                            <option>Fleetcor</option>
                            <option>Friend</option>
                        </Form.Control>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>

                <Button variant="primary" onClick={() => this.showModal()}>
                    SHOW
                </Button>

                <Modal
                    size="lg"
                    show={this.state.isOpen}
                    onHide={() => void 0}>
                    <Modal.Header>
                        <Modal.Title>Successfully sent!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Table bordered>
                            <tbody>
                            <tr>
                                <td>First Name</td>
                                <td>{this.state.customer.firstname}</td>
                            </tr>
                            <tr>
                                <td>Last Name</td>
                                <td>{this.state.customer.lastname}</td>
                            </tr>
                            <tr>
                                <td>Email Address</td>
                                <td>{this.state.customer.email}</td>
                            </tr>
                            <tr>
                                <td>Phone Number</td>
                                <td>{this.state.customer.phone}</td>
                            </tr>
                            <tr>
                                <td>How did you hear about us</td>
                                <td>{this.state.customer.productinterest}</td>
                            </tr>
                            </tbody>
                        </Table>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}