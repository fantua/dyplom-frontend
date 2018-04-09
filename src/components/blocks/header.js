import _get from 'lodash/get';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Icon from '../library/icon';
import { Nav, UncontrolledDropdown as Dropdown, DropdownToggle, DropdownItem, DropdownMenu } from 'reactstrap';

class Header extends Component {

    static propTypes = {
        user: PropTypes.shape({
            username: PropTypes.string.isRequired,
        }),
        className: PropTypes.string.isRequired,
        fetchUser: PropTypes.func.isRequired,
        logout: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        const { className, user, logout } = this.props;

        return (
            <header className={className}>
                <nav className="navbar navbar-expand navbar-light bg-light rounded">
                    <Link className="navbar-brand" to="/">Water Systems</Link>
                    <Nav navbar className="mr-auto">
                        <NavLink className="nav-item nav-link" to="/" exact>Головна</NavLink>
                        <NavLink className="nav-item nav-link" to="/objects">Об'єкти</NavLink>
                    </Nav>
                    <Nav navbar>
                        <Dropdown nav>
                            <DropdownToggle nav caret>Аккаунт</DropdownToggle>
                            <DropdownMenu className="dropdown-menu-right">
                                <DropdownItem disabled><Icon name="user" /> {_get(user, 'username')}</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={logout}>Вийти</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </Nav>
                </nav>
            </header>
        );
    }

}

export default Header;