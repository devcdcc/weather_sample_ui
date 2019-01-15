import React, { Component } from 'react';
import { AppSwitch } from '@coreui/react'
import {
  Card,
  CardBody,
  CardHeader,
  Col
} from 'reactstrap';
import Config from "../../../Config"
import * as $ from "jquery"
import axios from "axios"
class CountryCard extends Component {
  constructor(props) {
    super(props);
  }
  testPrint = () => {
    let _vm = this
    // var x = false
    // if (document.getElementById("switch" + this.props.id).checked)
    //   x = true
    
    let url = document.getElementById("switch" + this.props.id).checked
      ? Config.url.addToBoard : Config.url.removeFromBoard;

    // let url = Config.url.session
    axios.get(
      url,
      {
        params: { cityId: _vm.props.id }
      }
    ).then(function (response) {
      //handle success
      if (response.data) {
        // _vm.updateViewCountries(response.data)
      }
      console.log(response);
    }).catch(function (response) {
      //handle error
      console.log(response);
    });
  }
  render() {
    return (
      <Col className=" col-sm-6 col-md-4 col-xs-12">
        <Card className={"text-white bg-" + this.props.color}>
          <CardHeader className="text-value-sm">
            <AppSwitch id={"switch" + this.props.id} onChange={
              this.testPrint
            } className={'float-right mb-0 mx-1'} variant={'pill'} color={this.props.color} size={'sm'} outline={'alt'} label dataOn={'\u2713'} dataOff={'\u2715'} />
            {this.props.name}
          </CardHeader>
          <CardBody>
            <div className="text-value-lg">City Name: {this.props.name}</div>
            <div className="text-value">Country Code: {this.props.country}</div>
            <div className="text-value-sm">CityID: {this.props.id}</div>
            {/* <div className="text-value-sm">Description: {this.props.weather.weather[0].description}</div> */}
          </CardBody>
        </Card>
      </Col>
    );
  }
}
export default CountryCard;