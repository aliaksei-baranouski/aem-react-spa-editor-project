import React, {Component} from 'react';
import {Button, Form} from 'react-bootstrap';

export default class CustomForm extends Component {

    render() {
        return (
            <div>
                <h2>Fill out the form</h2>
                <h3>Have one of our specialists contact you</h3>
                <Form>
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
            </div>
        );
    }
}