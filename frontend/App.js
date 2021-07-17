import axios from "axios";
import React from "react";
import ReactDOM from "react-dom";
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import { easeQuadInOut } from "d3-ease";
import AnimatedProgressProvider from "./AnimatedProgressProvider";
import Select from "react-select";

function Ip_list(props) {
  return props.ip_datas.map((data) => (
    <div>
      <div
        className="ip"
        style={{ color: props.font_color }}
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

function GPU_id_list(props) {
  return props.gpu_id_list.map((data) => (
    <select>
      {/* <div
        className="gpu_id_list"
        style={{ color: props.font_color, borderColor: props.font_color }}
        // onClick={props.onClick}
      >
        {data}
      </div> */}
      <option value={data}>{data}</option>
    </select>
  ));
}

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      font_color: "#caf0f8",
      ip_datas: [],
      ip_title: "127.0.0.1",
      gpu_id_list: [],
      timestamp_list: "2021/06/29",
      gpu_memory_uses_list: [],
      gpu_memory_all_list: [],
      gpu_utilizations_list: [],
      gpu_temperature_list: [],
      gpu_id: 0,
      timestamp: "2021/06/29",
      gpu_memory_uses: 0,
      gpu_memory_all: 0,
      gpu_utilizations: 0,
      gpu_temperature: 0,
      utilazations_color: "#95D5B2",
      memoryuses_color: "#95D5B2",
      temperature_color: "#95D5B2",
      user_name: "楊仲軒",
      current_page: "home",
    };
    this.fanClick = this.fanClick.bind(this);
    this.fanHover = this.fanHover.bind(this);
    this.arrowfanHover = this.arrowfanHover.bind(this);
    this.arrowfanOut = this.arrowfanOut.bind(this);
    this.arrowfanClick = this.arrowfanClick.bind(this);
    this.zhengClick = this.zhengClick.bind(this);
    this.arrowzhengHover = this.arrowzhengHover.bind(this);
    this.arrowzhengOut = this.arrowzhengOut.bind(this);
    this.arrowzhengClick = this.arrowzhengClick.bind(this);
    this.ipClick = this.ipClick.bind(this);
    this.axios_getdata = this.axios_getdata.bind(this);
  }

  fanHover() {
    let url = `http://140.115.51.115:9999/api/serverInfo/F/`;
    axios
      .get(url)
      .then((response) => response.data)
      .then((data) => {
        this.setState({ ip_datas: data });
        console.log(data);
      });
  }
  fanClick() {
    let url = `http://140.115.51.115:9999/api/serverInfo/F/`;
    this.setState({ font_color: "#CAF0F8", current_page: "server_info" });
    $("#fan_ori").hide();
    $("#zheng_ori").hide();
    $("#fan").show();
    $(".ip_list").show();
    $(".server_count").show();
    $(".arrowfan").show();
    axios
      .get(url)
      .then((response) => response.data)
      .then((data) => {
        this.setState({ ip_datas: data });
        console.log(data);
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
            duration: 300,
          })
          .add({
            targets: [".arrowfan"],
            opacity: [0, 0.4],
            easing: "easeInOutQuad",
            offset: "-=100",
          });
      });
  }
  zhengClick() {
    this.setState({ font_color: "#fec8ff", current_page: "server_info" });
    $("#fan_ori").hide();
    $("#zheng_ori").hide();
    $("#zheng").show();
    $(".ip_list").show();
    $(".server_count").show();
    $(".arrowzheng").show();
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
        duration: 300,
      })
      .add({
        targets: [".arrowzheng"],
        opacity: [0, 0.4],
        easing: "easeInOutQuad",
        offset: "-=100",
      });
  }
  arrowfanHover() {
    anime.timeline().add({
      targets: ".arrowfan",
      scale: [1, 1.2],
      opacity: [0.4, 1],
      easing: "easeInOutQuad",
      duration: 100,
    });
  }
  arrowfanOut() {
    anime.timeline().add({
      targets: ".arrowfan",
      scale: [1.2, 1],
      opacity: [1, 0.4],
      easing: "easeInOutQuad",
      duration: 100,
    });
  }
  arrowfanClick() {
    if (this.state.current_page == "server_info") {
      $(".ip_list").hide();
      $(".server_count").hide();
      $(".arrowfan").hide();
      $("#zheng_ori").show();
      anime
        .timeline()
        .add({
          targets: "#fan",
          scale: [0.7, 1],
          easing: "easeInOutQuad",
          left: ["3%", "30%"],
          top: ["5%", "45%"],
          duration: 600,
        })
        .add({
          targets: [".arrowfan"],
          opacity: [1, 0],
          easing: "easeInOutQuad",
          offset: "-=500",
        });
      sleep(600).then(() => {
        $("#fan_ori").show();
        $("#fan").hide();
      });
    } else if (this.state.current_page == "GPU_info") {
      clearInterval(this.getdata_Interval);
      this.setState({ current_page: "server_info" });
      $("#fan").show();
      $(".ip_list").show();
      $(".server_count").show();
      $(".GPU_info").hide();
      $(".ip_title").hide();
      $(".data_info").hide();
      anime
        .timeline()
        .add({
          targets: [".server_count", ".ip", ".ip_line"],
          opacity: [0, 1],
          easing: "easeInOutQuad",
          delay: function (el, i, l) {
            return i * 80;
          },
          duration: 300,
        })
        .add({
          targets: [".ip_title", ".data_info"],
          opacity: [1, 0],
          easing: "easeInOutQuad",
          offset: "-=300",
        });
    }
  }
  arrowzhengHover() {
    anime.timeline().add({
      targets: ".arrowzheng",
      scale: [1, 1.2],
      opacity: [0.4, 1],
      easing: "easeInOutQuad",
      duration: 100,
    });
  }
  arrowzhengOut() {
    anime.timeline().add({
      targets: ".arrowzheng",
      scale: [1.2, 1],
      opacity: [1, 0.4],
      easing: "easeInOutQuad",
      duration: 100,
    });
  }
  arrowzhengClick() {
    if (this.state.current_page == "server_info") {
      $(".ip_list").hide();
      $(".server_count").hide();
      $(".arrowzheng").hide();
      $("#fan_ori").show();
      anime
        .timeline()
        .add({
          targets: "#zheng",
          scale: [0.7, 1],
          easing: "easeInOutQuad",
          left: ["3%", "55%"],
          top: ["5%", "45%"],
          duration: 600,
        })
        .add({
          targets: [".arrowzheng"],
          opacity: [1, 0],
          easing: "easeInOutQuad",
          offset: "-=500",
        });
      sleep(600).then(() => {
        $("#zheng_ori").show();
        $("#zheng").hide();
      });
    } else if (this.state.current_page == "GPU_info") {
      clearInterval(this.getdata_Interval);
      this.setState({ current_page: "server_info" });
      $("#zheng").show();
      $(".ip_list").show();
      $(".server_count").show();
      $(".GPU_info").hide();
      $(".ip_title").hide();
      $(".data_info").hide();
      anime
        .timeline()
        .add({
          targets: [".server_count", ".ip", ".ip_line"],
          opacity: [0, 1],
          easing: "easeInOutQuad",
          delay: function (el, i, l) {
            return i * 80;
          },
          duration: 300,
        })
        .add({
          targets: [".ip_title", ".data_info"],
          opacity: [1, 0],
          easing: "easeInOutQuad",
          offset: "-=300",
        });
    }
  }
  axios_getdata(query_ip, id) {
    let url = `http://140.115.51.115:9999/api/gpuInfo/${query_ip}/`;
    let gpu_id_list = [];
    let timestamp_list = [];
    let gpu_memory_uses_list = [];
    let gpu_memory_all_list = [];
    let gpu_utilizations_list = [];
    let gpu_temperature_list = [];
    axios
      .get(url)
      .then((response) => response.data)
      .then((data) => {
        data.forEach(function (item) {
          gpu_id_list.push(item.gpu_id);
          timestamp_list.push(item.timestamp);
          gpu_memory_uses_list.push(item.gpu_memory_use);
          gpu_memory_all_list.push(item.gpu_memory_all);
          gpu_utilizations_list.push(item.gpu_utilizations);
          gpu_temperature_list.push(item.gpu_temperature);
        });
        gpu_id_list = gpu_id_list.reverse();
        timestamp_list = timestamp_list.reverse();
        gpu_memory_uses_list = gpu_memory_uses_list.reverse();
        gpu_memory_all_list = gpu_memory_all_list.reverse();
        gpu_utilizations_list = gpu_utilizations_list.reverse();
        gpu_temperature_list = gpu_temperature_list.reverse();

        const gpu_utilizations = gpu_utilizations_list[0];
        const gpu_memory_uses = Math.round(
          (gpu_memory_uses_list[id] * 100) / gpu_memory_all_list[id]
        );
        const gpu_temperature = gpu_temperature_list[id];
        console.log(gpu_utilizations);
        console.log(gpu_memory_uses);
        console.log(gpu_temperature);
        if (gpu_utilizations >= 40 && gpu_utilizations <= 80) {
          this.setState({ utilazations_color: "#FFF3B0" });
        } else if (gpu_utilizations > 80) {
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
        let timestamp = new Date(timestamp_list[id] * 1000);
        console.log(timestamp);
        let now = new Date();
        now = now.getTime();
        let time_difference = (now - timestamp_list[id] * 1000) / 60000;
        if (isNaN(timestamp.getFullYear()) || time_difference >= 30) {
          this.setState({
            ip_title: query_ip,
            gpu_id: "離線",
            timestamp: "離線",
            gpu_memory_uses: 0,
            gpu_utilizations: 0,
            gpu_temperature: 0,
          });
        } else {
          timestamp =
            timestamp.getFullYear() +
            "/" +
            (timestamp.getMonth() + 1) +
            "/" +
            timestamp.getDate() +
            " " +
            timestamp.getHours() +
            ":" +
            timestamp.getMinutes() +
            ":" +
            timestamp.getSeconds();
          this.setState({
            gpu_id_list: gpu_id_list,
            timestamp_list: timestamp_list,
            gpu_memory_uses_list: gpu_memory_uses_list,
            gpu_memory_all_list: gpu_memory_all_list,
            gpu_utilizations_list: gpu_utilizations_list,
            gpu_temperature_list: gpu_temperature_list,

            ip_title: query_ip,
            gpu_id: gpu_id_list[id],
            timestamp: timestamp,
            gpu_memory_uses: Math.round(
              (gpu_memory_uses_list[id] * 100) / gpu_memory_all_list[id]
            ),
            gpu_memory_all: gpu_memory_all_list[id],
            gpu_utilizations: gpu_utilizations_list[id],
            gpu_temperature: gpu_temperature_list[id],
          });
        }
      });
  }
  ipClick(event) {
    this.setState({ current_page: "GPU_info" });
    $("#fan").hide();
    $("#zheng").hide();
    $(".ip_list").hide();
    $(".server_count").hide();
    $(".GPU_info").show();
    $(".ip_title").show();
    $(".data_info").show();
    let query_ip = event.currentTarget.innerHTML;
    this.getdata_Interval = setInterval(
      () => this.axios_getdata(query_ip, 0),
      3000
    );
    anime
      .timeline()
      .add({
        targets: [".gpu_utilizations", ".gpu_memory_uses", ".gpu_temperature"],
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
  }
  changeid(props) {
    let id = props.value;
    clearInterval(this.getdata_Interval);
    this.getdata_Interval = setInterval(
      () => this.axios_getdata(this.state.ip_title, id),
      3000
    );
  }
  render() {
    let server_count = this.state.ip_datas.length;
    let gpu_id_style = {
      option: (styles) => ({
        ...styles,
        color: "#272640",
        fontSize: 16,
        fontWeight: "normal",
      }),
      placeholder: (styles) => ({
        ...styles,
        fontSize: 16,
        fontWeight: "normal",
      }),
      control: (base) => ({
        ...base,
        height: 40,
        fontSize: 16,
      }),
    };
    let gpu_id_options = this.state.gpu_id_list.map((data) => ({
      value: data,
      label: data,
    }));
    return (
      <div>
        <div>
          <div
            id="fan_ori"
            className="family fan_family"
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
            onClick={this.ipClick}
          ></Ip_list>
        </div>
        <div
          className="server_count"
          style={{ color: this.state.font_color, display: "none" }}
        >
          sever數量&emsp;{server_count}
        </div>
        <img
          src="./img/arrow1.png"
          className="arrowfan"
          onMouseOver={this.arrowfanHover}
          onMouseOut={this.arrowfanOut}
          onClick={this.arrowfanClick}
          style={{ display: "none" }}
        />
        <img
          src="./img/arrow2.png"
          className="arrowzheng"
          onMouseOver={this.arrowzhengHover}
          onMouseOut={this.arrowzhengOut}
          onClick={this.arrowzhengClick}
          style={{ display: "none" }}
        />
        <div
          className="ip_title"
          style={{ color: this.state.font_color, display: "none" }}
        >
          {this.state.ip_title}
        </div>
        <div className="data_info" style={{ display: "none" }}>
          <div style={{ color: this.state.font_color }}>ID:</div>
          <Select
            className="gpu_id_list"
            value={{
              label: this.state.gpu_id,
              value: this.state.gpu_id,
            }}
            onChange={(value) => this.changeid(value)}
            options={gpu_id_options}
            styles={gpu_id_style}
          />
          <br />
          <div style={{ color: this.state.font_color }}>
            使用者:&emsp;{this.state.user_name}
          </div>
          <br />
          <div style={{ color: this.state.font_color }}>
            資料更新時間:&emsp;{this.state.timestamp}
          </div>
        </div>
        <div
          className="GPU_info gpu_utilizations"
          style={{ color: this.state.font_color, display: "none" }}
        >
          <AnimatedProgressProvider
            valueStart={0}
            valueEnd={this.state.gpu_utilizations}
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
                  text={`${roundedValue}℃`}
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
