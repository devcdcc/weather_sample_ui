import React, { Component } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Badge,
  Button,
  ButtonDropdown,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Progress,
  Row,
  Table,
} from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'
import BoardCard from './BoardCard';
import * as $ from "jquery"
import axios from "axios"
// const Widget03 = lazy(() => import('../Widgets/Widget03'));
// localStorage.setItem("a","asdasdasdasdas")
let a = localStorage.getItem("a")
let wsUri = "ws://localhost:9000/ws";
var output;
var websocket = {};
// let a = "###########"// localStorage.getItem("a")
// Card Chart 1
class Board extends Component {

  constructor(props) {
    super(props);
    this.defaultWeather = {
      color: "info",
      name: "Moscow",
      sys: { country: "RU" },
      weather: [{
        description: "clear sky"
      }],
      main: {
        temp: -1
      }

    }

    this.state = { data: [] }
    this.queueMessage = this.queueMessage.bind(this);
  }

  colors = ["primary", "success", "danger", "warning", "dark"]
  currentColor = -1
  getNextColor = () => {
    this.currentColor += 1
    if (this.currentColor >= this.colors.length)
      this.currentColor = 0
    return this.colors[this.currentColor]
  }
  testWebSocket = () => {
    // console.log(websocket)
    if (!websocket.OPEN) {
      websocket = new WebSocket(wsUri);

      websocket.onopen = (evt) => {
        this.onOpen(evt)
      };
      websocket.onclose = (evt) => {
        this.onClose(evt)
      };
      websocket.onmessage = (evt) => {
        this.onMessage(evt)
      };
      websocket.onerror = (evt) => {
        this.onError(evt)
      };
    }
  }
  onOpen = (evt) => {
    console.log("Connected")
    this.writeToScreen("CONNECTED");
    // doSend("WebSocket rocks");
  }

  onClose = (evt) => {
    this.writeToScreen("DISCONNECTED");
  }

  onMessage = (evt) => {
    // console.log(".")
    this.queueMessage(JSON.parse(evt.data))
    this.writeToScreen(evt.data);
    this.doSend("ok")
  }

  onError = (evt) => {
    this.writeToScreen('<span style="color: red;">ERROR:</span> ' + evt.data);
  }

  doSend = (message) => {
    this.writeToScreen("SENT: " + message);
    websocket.send(message);
  }

  writeToScreen = (message) => {
    // alert(message)
    // console.info(message)
    // var pre = document.createElement("p");
    // pre.style.wordWrap = "break-word";
    // pre.innerHTML = message;
    // output.appendChild(pre);
  }


  queueMessage = (message) => {
    if (message.deleted) {
      console.log(message)
      this.setState(oldData => {
        let rs =
          oldData.data.filter(element => element.key != message.deleted)
        console.log(rs)
        return {
          data: rs
        }
      })
    } else
      this.setState(oldData => {
        let oldWeather = oldData.data.find(weather => weather.key == message.id)
        var newData;
        if (oldWeather) {
          var newE = {
            ...oldWeather,
            color: this.getNextColor(),
            key: message["id"]
          };
          // console.log(newE)
          return {
            data: oldData.data.map(currenTeather =>
              //   {


              //   if (currenTeather.id ) return newE
              //   else return currenTeather
              // }
              (currenTeather.key == newE.id ? newE : currenTeather)
            )
          }
        } else {
          var newE = {
            ...message,
            color: this.getNextColor(),
            key: message["id"]
          };
          // console.log(newE)
          return { data: [...oldData.data, newE] }
        }
      })
  }

  render() {
    setInterval(this.testWebSocket, 6000);

    var data = this.state.data.map(
      (weather) =>
        <BoardCard color={weather.color} main={weather.main} sys={weather.sys} weather={weather.weather} name={weather.name} country={weather.country} key={weather.id} id={weather.id} />
    )

    return (
      <div className="animated fadeIn">
        <Row>
          {data}
        </Row>
      </div>
    );
  }
}

export default Board;
