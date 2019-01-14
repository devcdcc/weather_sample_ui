import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Config from "../../../Config"
import { Link } from 'react-router-dom';
import * as $ from "jquery"
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import axios from "axios"
class Login extends Component {
  loginRequest = function (event) {
    let form = document.querySelector("loginForm")
    // let formData = new FormData(form)
    console.log($("#loginForm").serialize())
    $("*", "#loginForm").prop('disabled', true);

    event.preventDefault()
    axios.get(
      Config.url.login,
      {
        params: { id: $("#id").val(), password: $("#password").val() }
      }
    )
      .then(function (response) {
        //handle success
        if (response.data.success) {
          localStorage.setItem("user", JSON.stringify(response.data))
          window.location = "/"
          return (<Redirect to="/" />);
        }
        console.log(response);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      })
      .then(function () {
        $("*", "#loginForm").prop('disabled', false);
      });
    event.preventDefault()
  }
  render() {

    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form method="GET" id="loginForm" action={Config.url.login} onSubmit={this.loginRequest}>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" id="id" placeholder="Username" autoComplete="username" />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" id="password" placeholder="Password" autoComplete="current-password" />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button type="submit" color="primary" className="px-4">Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                      <Link to="/register">
                        <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
