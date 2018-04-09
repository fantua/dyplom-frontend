import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import { Modal, ModalHeader, ModalBody, FormGroup, Label, Col, Input, Badge, Table } from 'reactstrap';

const LabelXS = 4;
const InputXS = 8;

const Info = ({ id, params, toggle }) => (
    <Modal size="lg" isOpen>
        <ModalHeader toggle={toggle}>Параметрування контроллера</ModalHeader>
            <ModalBody>
                <FormGroup row>
                    <Label xs={LabelXS}>
                        <strong>Protocol</strong>
                    </Label>
                    <Col xs={InputXS}>
                        <Input plaintext><mark>{_get(params, 'protocol', '').toUpperCase()}</mark></Input>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label xs={LabelXS}>
                        <strong>Partner Address</strong>
                    </Label>
                    <Col xs={InputXS}>
                        <Input plaintext><mark>{_get(params, 'host')}</mark></Input>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label xs={LabelXS}>
                        <strong>Partner Port</strong>
                    </Label>
                    <Col xs={InputXS}>
                        <Input plaintext><mark>{_get(params, 'port')}</mark></Input>
                    </Col>
                </FormGroup>
                <h5 className="mt-5">Доступні методи комунікації</h5>
                <hr />
                <FormGroup row>
                    <Col xs={12}>
                        <Table size="sm" bordered striped>
                            <thead>
                            <tr>
                                <th scope="col">Local Port</th>
                                <th className="text-center" scope="col">Значення</th>
                                <th scope="col">Опис</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td><code>{_get(params, 'statsPort') + id}</code></td>
                                <td className="text-center"><Badge color="info">&lt;integer&gt;</Badge></td>
                                <td>Збір статистичної інформації.</td>
                            </tr>
                            <tr>
                                <td><code>{_get(params, 'crashPort') + id}</code></td>
                                <td className="text-center">––</td>
                                <td>Оповіщення про аварійну ситуацію.</td>
                            </tr>
                            </tbody>
                        </Table>
                    </Col>
                </FormGroup>
            </ModalBody>
    </Modal>
);

Info.propTypes = {
    id: PropTypes.number.isRequired,
    params: PropTypes.shape({
        host: PropTypes.string.isRequired,
        port: PropTypes.number.isRequired,
        protocol: PropTypes.string.isRequired,
        crashPort: PropTypes.number.isRequired,
        statsPort: PropTypes.number.isRequired,
    }),
    toggle: PropTypes.func.isRequired,
};

export default Info;