import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import MessageBar from '../../containers/library/message-bar';

const GRID = { offset: 3, size: 6 };

class Login extends Component {

    constructor(props) {
        super(props);

        this.handleLogin = this.handleLogin.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    static propTypes = {
        fetchLogin: PropTypes.func.isRequired,
    };

    state = {
        email: '',
        password: '',
    };

    handleChange(e) {
        const { name, value } = e.target;

        this.setState({ [name]: value });
    }

    handleLogin(e) {
        e.preventDefault();
        const { email, password } = this.state;

        this.props.fetchLogin(email, password);
    }

    render() {
        const { email, password } = this.state;

        return (
            <Container className="mt-5">
                <Row>
                    <Col xs={GRID}>
                        <h2 className="text-center">Авторизація</h2>
                        <hr />
                        <MessageBar />
                        <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Label for="email">E-mail:</Label>
                                <Input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={this.handleChange}
                                    placeholder="Введіть e-mail"
                                    required />
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Пароль:</Label>
                                <Input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={this.handleChange}
                                    placeholder="Введіть пароль"
                                    required
                                />
                            </FormGroup>
                            <Button color="primary">Увійти</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }

}

export default Login;