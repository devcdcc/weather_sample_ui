import React, { ReactDOM, Component } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { AppSwitch } from '@coreui/react'
import {
  Badge,
  Button,
  ButtonDropdown,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Row,
} from 'reactstrap';
import CountryCard from './CountryCard';
import Config from "../../Config"
import * as $ from "jquery"
import axios from "axios"
// const Widget03 = lazy(() => import('../Widgets/Widget03'));

class Countries extends Component {
  constructor(props) {
    super(props);

    this.state = { data: [] }
    this.updateViewCountries = this.updateViewCountries.bind(this);
  }

  colors = ["primary", "success", "danger", "warning", "dark"]
  currentColor = -1
  getNextColor = () => {
    this.currentColor += 1
    if (this.currentColor >= this.colors.length)
      this.currentColor = 0
    return this.colors[this.currentColor]
  }
  // upserArray(inArray, newE){

  //   let inArray = []
  //   let out = inArray.find(obj=>obj.key == newE.key)
  //   if(out){
  //     obj["color"]
  //     obj["name"]
  //     obj["count"]
  //     obj["color"]
  //   }
  //   {
  //     color: "danger",
  //     name: "Moscow",
  //     country: "ES",
  //     id: 127260,
  //     key:127260
  //   }
  // }
  // {
  //   color: "danger",
  //   name: "Moscow",
  //   country: "ES",
  //   id: 127260,
  //   key: 127260
  // }
  findCities = () => {
    let _vm = this
    this.currentColor = this.colors.length
    axios.get(
      Config.url.findCities,
      {
        params: { q: $("#q").val() }
      }
    ).then(function (response) {
      //handle success
      if (response.data) {
        _vm.updateViewCountries(response.data)
      }
      console.log(response);
    }).catch(function (response) {
      //handle error
      console.log(response);
    });
  }
  updateViewCountries = (countries) => {
    console.log(countries)
    this.setState(oldData => ({
      data: countries.map((country=>({
        ...country,
        color: this.getNextColor(),
        key : countries["id"]
      })))
    }))
  }
  render() {

    var data = this.state.data.map(
      (city) =>
        <CountryCard color={city.color} name={city.name} country={city.country} key={city.id} id={city.id} />
    )
    return (
      <div>

        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <Button disabled onClick={this.findCities} type="button" color="primary"><i className="fa fa-search"></i> Search</Button>
          </InputGroupAddon>
          <Input onChange={this.findCities} id={"q"} type="text" name="input1-group2" placeholder="Username" autoFocus />
        </InputGroup>
        <br/>
        <br/>
        <div className="animated fadeIn">
          <Row id="data_container">
            {data}
          </Row>
        </div>
      </div>
    );
  }
}

export default Countries;
