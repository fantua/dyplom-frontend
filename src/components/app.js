import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Container } from 'reactstrap';
import MessageBar from '../containers/library/message-bar';
import Header from '../containers/blocks/header';
import Objects from '../containers/objects';
import ObjectView from '../containers/objects/view';
import Footer from './blocks/footer';
import Main from './main';

class App extends Component {

    static propTypes = {
        fetchObjectsParams: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.fetchObjectsParams();
    }

    render() {
        return (
            <Container className="app-container">
                <Header className="mb-3" />
                <MessageBar className="mb-3" />
                <section className="content mb-3">
                    <Switch>
                        {/*<Route exact path="/" component={Main} />*/}
                        <Route exact path="/objects" component={Objects} />
                        <Route exact path="/objects/:id" component={ObjectView} />
                        <Redirect to="/objects" />
                    </Switch>
                </section>
                <Footer />
            </Container>
        );
    }

}

export default App;