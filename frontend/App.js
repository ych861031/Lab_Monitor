import axios from "axios";
import React from "react";
import ReactDOM from "react-dom";
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import { easeQuadInOut } from "d3-ease";
import AnimatedProgressProvider from "./AnimatedProgressProvider";

function Ip_list(props) {
  return props.ip_datas.map((data) => (
    <div>
      <div
        className="ip"
        style={{ color: props.font_color }}
        onMouseOver={props.onMouseOver}
        onClick={props.onClick}
      >
        {data.ip}
      </div>
      <div
        className="ip_line"
        style={{ backgroundColor: props.font_color }}
      ></div>
    </div>
  ));
}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      font_color: "#caf0f8",
      ip_datas: [],
      ip_title: "127.0.0.1",
      gpu_id: 0,
      timestamp: "2021/06/29",
      gpu_memory_uses: 0,
      gpu_memory_all: 0,
      gpu_utilazations: 0,
      gpu_temperature: 0,
      utilazations_color: "#95D5B2",
      memoryuses_color: "#95D5B2",
      temperature_color: "#95D5B2",
      user_name: "楊仲軒",
    };
    this.fanClick = this.fanClick.bind(this);
    this.fanHover = this.fanHover.bind(this);
    this.zhengClick = this.zhengClick.bind(this);
    this.ipClick = this.ipClick.bind(this);
    this.ipHover = this.ipHover.bind(this);
  }

  fanHover() {
    let url = `https://140.115.51.115:9999/api/serverInfo/F/`;
    axios
      .get(url)
      .then((response) => response.data)
      .then((data) => {
        this.setState({ ip_datas: data });
        console.log(data);
      });
  }
  fanClick() {
    $("#fan_ori").hide();
    $("#zheng_ori").hide();
    $("#fan").show();
    $(".ip_list").show();
    $(".server_count").show();
    anime
      .timeline()
      .add({
        targets: "#fan",
        scale: [1, 3],
        easing: "easeInOutQuad",
        duration: 600,
      })
      .add({
        targets: "#fan",
        scale: [3, 0.7],
        easing: "easeInOutQuad",
        left: ["30%", "3%"],
        top: ["45%", "5%"],
        duration: 250,
      })
      .add({
        targets: [".server_count", ".ip", ".ip_line"],
        opacity: [0, 1],
        easing: "easeInOutQuad",
        delay: function (el, i, l) {
          return i * 80;
        },
      });
  }
  zhengClick() {
    this.setState({ font_color: "#fec8ff" });
    $("#fan_ori").hide();
    $("#zheng_ori").hide();
    $("#zheng").show();
    $(".ip_list").show();
    $(".server_count").show();
    anime
      .timeline()
      .add({
        targets: "#zheng",
        scale: [1, 3],
        easing: "easeInOutQuad",
        duration: 600,
      })
      .add({
        targets: "#zheng",
        scale: [3, 0.7],
        easing: "easeInOutQuad",
        left: ["55%", "3%"],
        top: ["45%", "5%"],
        duration: 250,
      })
      .add({
        targets: [".server_count", ".ip", ".ip_line"],
        opacity: [0, 1],
        easing: "easeInOutQuad",
        delay: function (el, i, l) {
          return i * 80;
        },
      });
  }
  ipHover(event) {
    let query_ip = event.currentTarget.innerHTML;
    let url = `https://140.115.51.115:9999/api/gpuInfo/${query_ip}/`;
    axios
      .get(url)
      .then((response) => response.data)
      .then((data) => {
        this.setState({
          gpu_id: data.gpu_id,
          timestamp: data.timestamp,
          gpu_memory_uses: data.gpu_memory_uses,
          gpu_memory_all: data.gpu_memory_all,
          gpu_utilazations: data.gpu_utilazations,
          gpu_temperature: data.gpu_temperature,
        });
        console.log(
          // data.gpu_id,
          // data.timestamp,
          // data.gpu_memory_uses,
          // data.gpu_memory_all,
          // data.gpu_utilazations,
          // data.gpu_temperature
          data
        );
      });
  }
  ipClick(event) {
    $("#fan").hide();
    $("#zheng").hide();
    $(".ip_list").hide();
    $(".server_count").hide();
    $(".GPU_info").show();
    $(".ip_title").show();
    $(".data_info").show();
    anime
      .timeline()
      .add({
        targets: [".gpu_utilazations", ".gpu_memory_uses", ".gpu_temperature"],
        scale: [0, 1],
        easing: "easeInOutQuad",
        duration: 500,
      })
      .add({
        targets: [".ip_title", ".data_info"],
        opacity: [0, 1],
        easing: "easeInOutQuad",
        offset: "-=250",
      });
    const gpu_utilazations = 20;
    const gpu_memory_uses = 50;
    const gpu_temperature = 90;
    this.setState({
      gpu_utilazations: gpu_utilazations,
      gpu_memory_uses: gpu_memory_uses,
      gpu_temperature: gpu_temperature,
      ip_title: event.currentTarget.innerHTML,
      //gpu_id,user_name,timestamp
    });
    if (gpu_utilazations >= 40 && gpu_utilazations <= 80) {
      this.setState({ utilazations_color: "#FFF3B0" });
    } else if (gpu_utilazations > 80) {
      this.setState({ utilazations_color: "#FF758F" });
    }
    if (gpu_memory_uses >= 40 && gpu_memory_uses <= 80) {
      this.setState({ memoryuses_color: "#FFF3B0" });
    } else if (gpu_memory_uses > 80) {
      this.setState({ memoryuses_color: "#FF758F" });
    }
    if (gpu_temperature >= 40 && gpu_temperature <= 80) {
      this.setState({ temperature_color: "#FFF3B0" });
    } else if (gpu_temperature > 80) {
      this.setState({ temperature_color: "#FF758F" });
    }
  }
  render() {
    // let data = [
    //   "127.115.51.89",
    //   "127.115.51.90",
    //   "127.115.51.91",
    //   "127.115.51.92",
    // ];
    let server_count = this.state.ip_datas.length;
    return (
      <div>
        <div>
          <div
            id="fan_ori"
            className="family fan_family"
            onMouseOver={this.fanHover}
            onClick={this.fanClick}
          >
            范家
          </div>
          <div
            id="fan"
            className="family fan_title"
            style={{ display: "none" }}
          >
            范家
          </div>
          <div
            id="zheng_ori"
            className="family zheng_family"
            onClick={this.zhengClick}
          >
            鄭家
          </div>
          <div
            id="zheng"
            className="family zheng_title"
            style={{ display: "none" }}
          >
            鄭家
          </div>
        </div>
        <div className="ip_list" style={{ display: "none" }}>
          <Ip_list
            ip_datas={this.state.ip_datas}
            font_color={this.state.font_color}
            onMouseOver={this.ipHover}
            onClick={this.ipClick}
          ></Ip_list>
        </div>
        <div
          className="server_count"
          style={{ color: this.state.font_color, display: "none" }}
        >
          sever數量&emsp;{server_count}
        </div>
        <div
          className="ip_title"
          style={{ color: this.state.font_color, display: "none" }}
        >
          {this.state.ip_title}
        </div>
        <div
          className="data_info"
          style={{ color: this.state.font_color, display: "none" }}
        >
          ID:&emsp;{this.state.gpu_id}
          <br />
          使用者:&emsp;{this.state.user_name}
          <br />
          資料更新時間:&emsp;{this.state.timestamp}
        </div>
        <div
          className="GPU_info gpu_utilazations"
          style={{ color: this.state.font_color, display: "none" }}
        >
          <AnimatedProgressProvider
            valueStart={0}
            valueEnd={this.state.gpu_utilazations}
            duration={1.4}
            easingFunction={easeQuadInOut}
          >
            {(value) => {
              const roundedValue = Math.round(value);
              return (
                <CircularProgressbarWithChildren
                  circleRatio={0.7}
                  value={value}
                  strokeWidth={5}
                  text={`${roundedValue}%`}
                  styles={buildStyles({
                    pathTransition: "none",
                    rotation: 0.65,
                    strokeLinecap: "butt",
                    textSize: "12px",
                    pathTransitionDuration: 0.5,
                    pathColor: this.state.utilazations_color,
                    textColor: this.state.font_color,
                    trailColor: `rgba(173, 181, 189, 0.95)`,
                  })}
                >
                  <div className="GPU_datil">GPU使用率</div>
                </CircularProgressbarWithChildren>
              );
            }}
          </AnimatedProgressProvider>
        </div>
        <div
          className="GPU_info gpu_memory_uses"
          style={{ color: this.state.font_color, display: "none" }}
        >
          <AnimatedProgressProvider
            valueStart={0}
            valueEnd={this.state.gpu_memory_uses}
            duration={1.4}
            easingFunction={easeQuadInOut}
          >
            {(value) => {
              const roundedValue = Math.round(value);
              return (
                <CircularProgressbarWithChildren
                  circleRatio={0.7}
                  value={value}
                  strokeWidth={5}
                  text={`${roundedValue}%`}
                  styles={buildStyles({
                    pathTransition: "none",
                    rotation: 0.65,
                    strokeLinecap: "butt",
                    textSize: "12px",
                    pathTransitionDuration: 0.5,
                    pathColor: this.state.memoryuses_color,
                    textColor: this.state.font_color,
                    trailColor: `rgba(173, 181, 189, 0.95)`,
                  })}
                >
                  <div className="GPU_datil">內存使用率</div>
                </CircularProgressbarWithChildren>
              );
            }}
          </AnimatedProgressProvider>
        </div>
        <div
          className="GPU_info gpu_temperature"
          style={{ color: this.state.font_color, display: "none" }}
        >
          <AnimatedProgressProvider
            valueStart={0}
            valueEnd={this.state.gpu_temperature}
            duration={1.4}
            easingFunction={easeQuadInOut}
          >
            {(value) => {
              const roundedValue = Math.round(value);
              return (
                <CircularProgressbarWithChildren
                  circleRatio={0.7}
                  value={value}
                  strokeWidth={5}
                  text={`${roundedValue}%`}
                  styles={buildStyles({
                    pathTransition: "none",
                    rotation: 0.65,
                    strokeLinecap: "butt",
                    textSize: "12px",
                    pathTransitionDuration: 0.5,
                    pathColor: this.state.temperature_color,
                    textColor: this.state.font_color,
                    trailColor: `rgba(173, 181, 189, 0.95)`,
                  })}
                >
                  <div className="GPU_datil">GPU溫度</div>
                </CircularProgressbarWithChildren>
              );
            }}
          </AnimatedProgressProvider>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
