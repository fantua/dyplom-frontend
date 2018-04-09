import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Col, Input, Button } from 'reactstrap';
import { formatDateTime } from '../../utils';

const LabelXS = 4;
const InputXS = 8;

class Edit extends Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    static propTypes = {
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
        updatedAt: PropTypes.string.isRequired,
        edit: PropTypes.func.isRequired,
        toggle: PropTypes.func.isRequired,
    };

    state = {
        name: this.props.name,
        description: this.props.description,
    };

    handleChange(e) {
        const { name, value } = e.target;

        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();
        const { id, edit, toggle } = this.props;
        const { name, description } = this.state;

        toggle();
        edit(id, { name, description });
    }

    render() {
        const { id, createdAt, updatedAt, toggle } = this.props;
        const { name, description } = this.state;

        return (
            <Modal size="lg" isOpen>
                <ModalHeader toggle={toggle}>Редагувати об'єкт</ModalHeader>
                <Form onSubmit={this.handleSubmit}>
                    <ModalBody>
                        <FormGroup row>
                            <Label xs={LabelXS}>ID</Label>
                            <Col xs={InputXS}>
                                <Input type="text" plaintext>{id}</Input>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="name" xs={LabelXS}>Назва</Label>
                            <Col xs={InputXS}>
                                <Input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={name}
                                    onChange={this.handleChange}
                                    placeholder="Введіть назву"
                                    required
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="description" xs={LabelXS}>Опис</Label>
                            <Col xs={InputXS}>
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
                        <FormGroup row>
                            <Label xs={LabelXS}>Створено</Label>
                            <Col xs={InputXS}>
                                <Input type="text" plaintext>{formatDateTime(createdAt)}</Input>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label xs={LabelXS}>Останнє редагування</Label>
                            <Col xs={InputXS}>
                                <Input type="text" plaintext>{formatDateTime(updatedAt)}</Input>
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

export default Edit;