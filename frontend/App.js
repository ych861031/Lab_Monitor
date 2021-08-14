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
        onClick={props.onClick}
        onMouseOver={props.onMouseOver}
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

function GpuInfo(props) {
  let color_list = props.color_list;
  let gpu_id_list = props.gpu_id_list;
  let gpu_memory_uses_list = props.gpu_memory_uses_list;
  let gpu_memory_all_list = props.gpu_memory_all_list;
  let gpu_utilizations_list = props.gpu_utilizations_list;
  let gpu_temperature_list = props.gpu_temperature_list;
  let gpu_item_list = [];
  props.gpu_id_list.forEach(function (item) {
    gpu_item_list.push([
      gpu_id_list[item],
      gpu_utilizations_list[item],
      Math.round(
        (gpu_memory_uses_list[item] * 100) / gpu_memory_all_list[item]
      ),
      gpu_temperature_list[item],
    ]);
  });
  return gpu_id_list.map((item) => (
    <div className="GPU_block_item" style={{ borderColor: props.font_color }}>
      <div className="id_circle" style={{ color: props.font_color }}>
        id&ensp;{item}
      </div>
      <div
        className="GPU_info gpu_utilizations"
        style={{ color: props.font_color }}
      >
        <AnimatedProgressProvider
          valueStart={0}
          valueEnd={gpu_item_list[item][1]}
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
                  pathColor: color_list[item][0],
                  textColor: props.font_color,
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
        style={{ color: props.font_color }}
      >
        <AnimatedProgressProvider
          valueStart={0}
          valueEnd={gpu_item_list[item][2]}
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
                  pathColor: color_list[item][1],
                  textColor: props.font_color,
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
        style={{ color: props.font_color }}
      >
        <AnimatedProgressProvider
          valueStart={0}
          valueEnd={gpu_item_list[item][3]}
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
                  pathColor: color_list[item][2],
                  textColor: props.font_color,
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
  ));
}

function Ip_register(props) {
  let data_list = [
    ["140.115.51.0", "000", "140.115.51.3", "333"],
    ["140.115.51.1", "111", "140.115.51.4", "444"],
    ["140.115.51.2", "222", "140.115.51.5", "555"],
  ];
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th className="table_ip">IP</th>
          <th className="table_user">User</th>
          <th className="table_ip">IP</th>
          <th className="table_user">User</th>
        </tr>
      </thead>
      <tbody>
        {data_list.map((data) => (
          <tr>
            <td className="table_item">{data[0]}</td>
            <td className="table_item">{data[1]}</td>
            <td className="table_item">{data[2]}</td>
            <td className="table_item">{data[3]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
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
      timestamp_list: [],
      gpu_memory_uses_list: [],
      gpu_memory_all_list: [],
      gpu_utilizations_list: [],
      gpu_temperature_list: [],
      timestamp: "- - -",
      color_list: [],
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
    this.iphover = this.iphover.bind(this);
    this.axios_getdata = this.axios_getdata.bind(this);
    this.arrowzIPHover = this.arrowzIPHover.bind(this);
    this.arrowIPOut = this.arrowIPOut.bind(this);
    this.arrowIPClick = this.arrowIPClick.bind(this);
    this.arrowIPClick_back = this.arrowIPClick_back.bind(this);
  }

  fanHover() {
    let url = `http://140.115.51.102:9999/api/serverInfo/F/`;
    axios
      .get(url)
      .then((response) => response.data)
      .then((data) => {
        this.setState({ ip_datas: data });
        console.log(data);
      });
  }
  fanClick() {
    let url = `http://140.115.51.102:9999/api/serverInfo/F/`;
    this.setState({ font_color: "#CAF0F8", current_page: "server_info" });
    $("#fan_ori").hide();
    $("#zheng_ori").hide();
    $(".ip_arrow").hide();
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
            offset: "-=200",
            duration: 100,
          });
      });
  }
  zhengClick() {
    this.setState({ font_color: "#fec8ff", current_page: "server_info" });
    $("#fan_ori").hide();
    $("#zheng_ori").hide();
    $(".ip_arrow").hide();
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
        offset: "-=200",
        duration: 100,
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
      $(".ip_arrow").show();
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
        })
        .add({
          targets: [".server_count", ".ip", ".ip_line"],
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
      this.setState({
        ip_title: "127.0.0.1",
        timestamp: "- - -",
        gpu_id_list: [],
        timestamp_list: [],
        gpu_memory_uses_list: [],
        gpu_memory_all_list: [],
        gpu_utilizations_list: [],
        gpu_temperature_list: [],
        color_list: [],
      });
      this.setState({ current_page: "server_info" });
      $("#fan").show();
      $(".ip_list").show();
      $(".server_count").show();
      $(".GPU_block").hide();
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
          duration: 100,
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
      $(".ip_arrow").show();
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
        })
        .add({
          targets: [".server_count", ".ip", ".ip_line"],
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
      this.setState({
        ip_title: "127.0.0.1",
        timestamp: "- - -",
        gpu_id_list: [],
        timestamp_list: [],
        gpu_memory_uses_list: [],
        gpu_memory_all_list: [],
        gpu_utilizations_list: [],
        gpu_temperature_list: [],
        color_list: [],
      });
      this.setState({ current_page: "server_info" });
      $("#zheng").show();
      $(".ip_list").show();
      $(".server_count").show();
      $(".GPU_block").hide();
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
          duration: 100,
        });
    }
  }
  axios_getdata(query_ip) {
    let url = `http://140.115.51.102:9999/api/gpuInfo/${query_ip}/`;
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

        let color_list = [];
        let utilazations_color = "#95D5B2";
        let memoryuses_color = "#95D5B2";
        let temperature_color = "#95D5B2";
        gpu_id_list.forEach(function (item) {
          const gpu_utilizations = gpu_utilizations_list[item];
          const gpu_memory_uses = Math.round(
            (gpu_memory_uses_list[item] * 100) / gpu_memory_all_list[item]
          );
          const gpu_temperature = gpu_temperature_list[item];
          if (gpu_utilizations < 40) {
            utilazations_color = "#95D5B2";
          } else if (gpu_utilizations >= 40 && gpu_utilizations <= 80) {
            utilazations_color = "#FFF3B0";
          } else if (gpu_utilizations > 80) {
            utilazations_color = "#FF758F";
          }
          if (gpu_memory_uses < 40) {
            memoryuses_color = "#95D5B2";
          } else if (gpu_memory_uses >= 40 && gpu_memory_uses <= 80) {
            memoryuses_color = "#FFF3B0";
          } else if (gpu_memory_uses > 80) {
            memoryuses_color = "#FF758F";
          }
          if (gpu_temperature < 40) {
            temperature_color = "#95D5B2";
          } else if (gpu_temperature >= 40 && gpu_temperature <= 80) {
            temperature_color = "#FFF3B0";
          } else if (gpu_temperature > 80) {
            temperature_color = "#FF758F";
          }
          color_list.push([
            utilazations_color,
            memoryuses_color,
            temperature_color,
          ]);
        });
        this.setState({ color_list: color_list });
        let timestamp = new Date(timestamp_list[0] * 1000);
        console.log(timestamp);
        let now = new Date();
        now = now.getTime();
        let time_difference = (now - timestamp_list[0] * 1000) / 60000;
        if (isNaN(timestamp.getFullYear()) || time_difference >= 30) {
          this.setState({
            ip_title: query_ip,
            timestamp: "離線",
            gpu_id_list: [],
            timestamp_list: [],
            gpu_memory_uses_list: [],
            gpu_memory_all_list: [],
            gpu_utilizations_list: [],
            gpu_temperature_list: [],
            color_list: [],
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
            timestamp: timestamp,
          });
        }
      });
  }
  iphover(event) {
    let query_ip = event.currentTarget.innerHTML;
    this.axios_getdata(query_ip);
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
    $(".GPU_block").show();
    let query_ip = event.currentTarget.innerHTML;
    this.axios_getdata(query_ip);
    this.getdata_Interval = setInterval(
      () => this.axios_getdata(query_ip),
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
  arrowzIPHover() {
    anime.timeline().add({
      targets: [".ip_arrow", ".ip_arrow_back"],
      scale: [1, 1.2],
      opacity: [0.4, 1],
      easing: "easeInOutQuad",
      duration: 100,
    });
  }
  arrowIPOut() {
    anime.timeline().add({
      targets: [".ip_arrow", ".ip_arrow_back"],
      scale: [1.2, 1],
      opacity: [1, 0.4],
      easing: "easeInOutQuad",
      duration: 100,
    });
  }
  arrowIPClick() {
    $(".ip_register").show();
    $(".ip_arrow_back").show();
    $("#fan_ori").hide();
    $("#zheng_ori").hide();
    $(".ip_arrow").hide();
  }

  arrowIPClick_back() {
    $(".ip_register").hide();
    $(".ip_arrow_back").hide();
    $("#fan_ori").show();
    $("#zheng_ori").show();
    $(".ip_arrow").show();
  }
  render() {
    let server_count = this.state.ip_datas.length;
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
        <div
          className="ip_arrow"
          onMouseOver={this.arrowzIPHover}
          onMouseOut={this.arrowIPOut}
          onClick={this.arrowIPClick}
        >
          IP
        </div>
        <img
          src="./img/arrow3.png"
          className="ip_arrow_back"
          onMouseOver={this.arrowzIPHover}
          onMouseOut={this.arrowIPOut}
          onClick={this.arrowIPClick_back}
          style={{ display: "none" }}
        />
        <div className="ip_register" style={{ display: "none" }}>
          <Ip_register></Ip_register>
        </div>

        <div className="ip_list" style={{ display: "none" }}>
          <Ip_list
            ip_datas={this.state.ip_datas}
            font_color={this.state.font_color}
            onClick={this.ipClick}
            // onMouseOver={this.iphover}
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
          <div style={{ color: this.state.font_color }}>
            使用者:&emsp;{this.state.user_name}
          </div>
          <br />
          <div style={{ color: this.state.font_color }}>
            資料更新時間:&emsp;{this.state.timestamp}
          </div>
        </div>
        <div className="GPU_block" style={{ display: "none" }}>
          <GpuInfo
            font_color={this.state.font_color}
            // utilazations_color={this.state.utilazations_color}
            // memoryuses_color={this.state.memoryuses_color}
            // temperature_color={this.state.temperature_color}
            color_list={this.state.color_list}
            gpu_id_list={this.state.gpu_id_list}
            gpu_memory_uses_list={this.state.gpu_memory_uses_list}
            gpu_memory_all_list={this.state.gpu_memory_all_list}
            gpu_utilizations_list={this.state.gpu_utilizations_list}
            gpu_temperature_list={this.state.gpu_temperature_list}
          ></GpuInfo>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
