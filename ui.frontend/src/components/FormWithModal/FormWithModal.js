import React, {Component} from 'react';
import {Button, Form, Modal} from 'react-bootstrap';

export default class FormWithModal extends Component {
    state = {
        isOpen: false
    };

    showModal = () => {
        this.setState({isOpen: true});
        const self = this;
        setTimeout(function() {
            self.hideModal();
        }, 10000);
    };

    hideModal = () => {
        this.setState({isOpen: false});
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
                        <Form.Control type="text" placeholder="First Name" required/>
                    </Form.Group>
                    <Form.Group controlId="lastname">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Last Name" required/>
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" placeholder="Email Address" required/>
                    </Form.Group>
                    <Form.Group controlId="phone">
                        <Form.Label>Phone Number (US phone format)</Form.Label>
                        <Form.Control type="tel" placeholder="Phone Number (US phone format)" required/>
                    </Form.Group>
                    <Form.Group controlId="productinterest">
                        <Form.Label>How did you hear about us?</Form.Label>
                        <Form.Control as="select" required>
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
                        <Modal.Title>Large Modal</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Collected Data</Modal.Body>
                </Modal>
            </div>
        );
    }
}