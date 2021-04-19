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
        seconds: 10,
        error: null,
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
        this.myInterval = setInterval(() => {
            this.setState(({seconds}) => ({
                seconds: seconds - 1
            }))
        }, 1000)
        setTimeout(function () {
            self.hideModal();
        }, 10000);
        self.setState({seconds: 10});
    };

    hideModal = () => {
        this.setState({isOpen: false});
        clearInterval(this.myInterval);
    };


    handleFormChange(e) {
        let customer = this.state.customer;
        customer[e.target.id] = e.target.value;
        this.setState({customer: customer});
    };

    handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("/bin/salesforce", {
                method: 'POST',
                body: JSON.stringify(this.state.customer),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw Error(response.statusText);
            }
        } catch (error) {
            this.setState({error: error});
            console.error('Error:', error);
        }

        this.showModal();
        e.target.reset();
    };

    render() {
        if (FormWithModalEditConfig.isEmpty(this.props)) {
            return null;
        }

        return (
            <div>
                <h2>{this.props.heading}</h2>
                <h3>{this.props.subheading}</h3>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="firstname">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder="First Name" pattern="^[A-Za-z]+$"
                                      onChange={this.handleFormChange.bind(this)} required/>
                    </Form.Group>
                    <Form.Group controlId="lastname">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Last Name" pattern="^[A-Za-z]+$"
                                      onChange={this.handleFormChange.bind(this)} required/>
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" placeholder="Email Address" pattern="[^@]+@[^\.]+\..+"
                                      onChange={this.handleFormChange.bind(this)} required/>
                    </Form.Group>
                    <Form.Group controlId="phone">
                        <Form.Label>Phone Number (US phone format)</Form.Label>
                        <Form.Control type="tel" placeholder="Phone Number (US phone format)" pattern="^[0-9]{7,11}$"
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

                <Modal
                    size="lg"
                    show={this.state.isOpen}
                    onHide={() => void 0}>
                    <Modal.Header>
                        <div>
                            {this.state.error ? (
                                <Modal.Title>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                         className="bi bi-exclamation-square" viewBox="0 0 16 16">
                                        <path
                                            d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                                        <path
                                            d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
                                    </svg>
                                    &nbsp;Something went wrong!
                                </Modal.Title>
                            ) : (
                                <Modal.Title>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                         className="bi bi-check-square" viewBox="0 0 16 16">
                                        <path
                                            d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                                        <path
                                            d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z"/>
                                    </svg>
                                    &nbsp;Successfully sent!
                                </Modal.Title>
                            )}
                        </div>
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
                    <Modal.Footer>
                        <p><small>This popup will close automatically after {this.state.seconds} seconds.</small></p>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default MapTo('wknd-spa-react/components/form-with-modal')(FormWithModal, FormWithModalEditConfig);
