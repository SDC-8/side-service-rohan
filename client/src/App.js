import React from "react";
import Sidebar from "./components/sideBar.js";
import TopBar from "./components/form.js";
//import SoldHomes from "./components/botForm.js";
import ReactDOM from "react-dom";
import axios from "axios";
import Loadable from "react-loadable";

function Loading() {
  return <h3>Loading...</h3>;
}

const SoldHomes = Loadable({
  loader: () => import("./components/botForm.js"),
  loading: Loading
});

//Put the overall module in here
export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      topBar: [],
      botBar: []
    };
  }

  componentDidMount() {
    let sideId = Number(window.location.pathname.replace(/\//, ""));
    if (sideId === 1) {
      axios.get(`http://localhost:3002/api/sidebar/${sideId}`).then(posts => {
        this.setState({
          topBar: [
            "posts.data[0]",
            "posts.data[0]",
            "posts.data[0]",
            "posts.data[0]",
            "posts.data[0]",
            "posts.data[0]"
          ],
          botBar: posts.data.rows
        });
      });
    }
    axios.get(`http://localhost:3002/api/sidebar/${sideId}`).then(posts => {
      console.log("App.js line 30", posts.data.rows);
      this.setState({
        topBar: [
          "posts.data[0]",
          "posts.data[0]",
          "posts.data[0]",
          "posts.data[0]",
          "posts.data[0]",
          "posts.data[0]"
        ],
        botBar: posts.data.rows
      });
    });
  }

  render() {
    return (
      <div>
        <aside id="ASIDE_1">
          <div id="DIV_2">
            <TopBar topInfo={this.state.topBar} />
            <SoldHomes botInfo={this.state.botBar} />
          </div>
        </aside>
      </div>
    );
  }
}
