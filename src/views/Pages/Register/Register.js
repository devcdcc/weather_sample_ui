import React, { Component } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader, Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import Config from "../../../Config"
import * as $ from "jquery"
import axios from "axios"

class Register extends Component {

  constructor(props) {
    super(props);
    this.text = {
      success: "",
      danger: ""
    }
    this.state = {
      success: false,
      danger: false,
    };
    this.toggleSuccess = this.toggleSuccess.bind(this);
    this.toggleDanger = this.toggleDanger.bind(this);
  }
  myClass = this
  toggleDanger() {
    this.setState({
      danger: !this.state.danger,
    });
  }

  toggleSuccess() {
    this.setState({
      success: !this.state.success,
    });
  }
  registerRequest = (event) => {
    let _vm = this
    let form = document.querySelector("loginForm")
    // let formData = new FormData(form)
    console.log($("#loginForm").serialize())
    $("*", "#loginForm").prop('disabled', true);
    // event.preventDefault()
    // if ($("#password").val() == $("repeatPassword").val() && $("repeatPassword").val().length > 3)
      axios.get(
        Config.url.register,
        {
          params: { id: $("#id").val(), password: $("#password").val() }
        }
      )
        .then(function (response) {
          if (response.data.success) {
            _vm.text.success = JSON.stringify(response.data)
            _vm.toggleSuccess()
          } else {
            _vm.text.danger = JSON.stringify(response.data)
            _vm.toggleDanger()
          }
          console.log(response);
        })
        .catch(function (response) {
          let out = {
            statusText: response.response["statusText"],
            status: response.response["status"]
          }
          _vm.text.danger = JSON.stringify(out)
          _vm.toggleDanger()
        })
        .then(function () {
        });
    $("*", "#loginForm").prop('disabled', false);
    event.preventDefault()
  }
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardFooter className="p-4">
                  <Row>
                    <Col xs="12" sm="6">
                      <Button className="btn-facebook mb-1" block><span>facebook</span></Button>
                    </Col>
                    <Col xs="12" sm="6">
                      <Button className="btn-twitter mb-1" block><span>twitter</span></Button>
                    </Col>
                  </Row>
                </CardFooter>
                <CardBody className="p-4">
                  <Form method="GET" id="loginForm" >
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" id="id" placeholder="Username" autoComplete="username" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" id="password" placeholder="Password" autoComplete="new-password" />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" id="repeatPassword" placeholder="Repeat password" autoComplete="new-password" />
                    </InputGroup>
                    <Button color="success" onClick={this.registerRequest} block>Create Account</Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
        <Modal isOpen={this.state.danger} toggle={this.toggleDanger}
          className={'modal-danger ' + this.props.className}>
          <ModalHeader toggle={this.toggleDanger}>Something is wrong</ModalHeader>
          <ModalBody>
            The registration can't be processed.
            <br />
            {this.text.danger}
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.toggleDanger}>Accept</Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.success} toggle={this.toggleSuccess}
          className={'modal-success ' + this.props.className}>
          <ModalHeader toggle={this.toggleSuccess}>Successfull Registered</ModalHeader>
          <ModalBody>
            Contratulations, the registration was successfull.
            <br />
            {this.text.success}
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={() => window.location = "/"}>Accept</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default Register;
