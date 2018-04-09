import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Col, Input, Button } from 'reactstrap';

class Create extends Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    static propTypes = {
        create: PropTypes.func.isRequired,
        toggle: PropTypes.func.isRequired,
    };

    state = {
        name: '',
        description: '',
    };

    handleChange(e) {
        const { name, value } = e.target;

        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();
        const { create, toggle } = this.props;
        const { name, description } = this.state;

        toggle();
        create({ name, description });
    }

    render() {
        const { toggle } = this.props;
        const { name, description } = this.state;

        return (
            <Modal size="lg" isOpen>
                <ModalHeader toggle={toggle}>Створити об'єкт</ModalHeader>
                <Form onSubmit={this.handleSubmit}>
                    <ModalBody>
                        <FormGroup row>
                            <Label for="name" xs={4}>Назва</Label>
                            <Col xs={8}>
                                <Input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={name}
                                    onChange={this.handleChange}
                                    placeholder="Введіть назву"
                                    autoFocus
                                    required
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="description" xs={4}>Опис</Label>
                            <Col xs={8}>
                                <Input
                                    type="textarea"
                                    id="description"
                                    name="description"
                                    value={description}
                                    onChange={this.handleChange}
                                    placeholder="Введіть детальний опис"
                                    rows={4}
                                    required
                                />
                            </Col>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary">Зберегти</Button>
                    </ModalFooter>
                </Form>
            </Modal>
        );
    }

}

export default Create;