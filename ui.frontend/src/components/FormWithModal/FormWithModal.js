import React, {Component} from 'react';
import {Button, Form, Modal, Table} from 'react-bootstrap';
import {MapTo} from '@adobe/aem-react-editable-components';

export const FormWithModalEditConfig = {
    emptyLabel: 'FormWithModal',

    isEmpty: function (props) {
        return !props || !props.heading || props.heading.trim().length < 1;
    }
};

class FormWithModal extends Component {
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
        //TODO: Reset form
    };

    render() {
        if(FormWithModalEditConfig.isEmpty(this.props)) {
            return null;
        }

        return (
            <div>
                <h2>{this.props.heading}</h2>
                <h3>{this.props.subheading}</h3>
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

                <Button variant="secondary" onClick={() => this.showModal()}> {/*TODO: remove it*/}
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

export default MapTo('wknd-spa-react/components/form-with-modal')(FormWithModal, FormWithModalEditConfig);
