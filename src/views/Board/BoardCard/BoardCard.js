import React, { Component } from 'react';
import uuid from 'uuid/v1';

import { AppSwitch } from '@coreui/react'
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
} from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle } from '@coreui/coreui/dist/js/coreui-utilities'
import Config from "../../../Config"
import axios from "axios"
class CardBoard extends Component {
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
            <AppSwitch id={"switch" + this.props.id} checked onChange={
              this.testPrint
            } className={'float-right mb-0 mx-1'} variant={'pill'} color={this.props.color} size={'sm'} outline={'alt'} label dataOn={'\u2713'} dataOff={'\u2715'} />
            {this.props.name}
          </CardHeader>
          <CardBody>
            <div className="text-value-lg">Temp:<span className={'float-right mb-0 mx-1'}>{this.props.main.temp}º</span></div>
            <div className="text-value">Country: {this.props.sys.country}</div>
            <div className="text-value-sm">Description: {this.props.weather[0].description}</div>
          </CardBody>
        </Card>
      </Col>


      // <Col className=" col-sm-6 col-md-4 col-xs-12">
      //   <Card className={"text-white bg-" + this.props.color}>
      //     <CardHeader className="text-value-sm">
      //       <AppSwitch id={"switch" + this.props.id} onChange={
      //         this.testPrint
      //       } className={'float-right mb-0 mx-1'} variant={'pill'} color={this.props.color} size={'sm'} outline={'alt'} label dataOn={'\u2713'} dataOff={'\u2715'} />
      //       {this.props.name}
      //     </CardHeader>
      //     <CardBody>
      //       <div className="text-value-lg">City Name: {this.props.name}</div>
      //       <div className="text-value">Country Code: {this.props.country}</div>
      //       <div className="text-value-sm">CityID: {this.props.id}</div>
      //       {/* <div className="text-value-sm">Description: {this.props.weather.weather[0].description}</div> */}
      //     </CardBody>
      //   </Card>
      // </Col>
    );
  }
}
export default CardBoard;