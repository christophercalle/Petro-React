import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "./App.css";
import Pagination from "react-js-pagination";
import logo from "./petro.png";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      activeStep: 0,
      activePage: 1,
      itemsPerPage: 5,
      list: []
    };
  }
  componentDidMount = () => {
    this.getDataFromServer();
  };

  getDataFromServer = () => {
    axios
      .get("http://localhost:4000/petro")
      .then(response => {
        console.log(response.data);
        this.setState({
          ...this.state,
          list: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  handlePageChange = pageNumber => {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
  };

  addListItem = () => {
    
        axios
          .post("http://localhost:4000/petro/add", {
            item_title: this.state.title,
            item_description: this.state.description
          })
          .then(response => {
            console.log("when data add", response.data);
            this.getDataFromServer();
          })
          .catch(error => {
            console.log(error);
          });
      
  };
  deleteItem = id => {
    axios
      .get(`http://localhost:4000/petro/delete/${id}`)
      .then(response => {
        console.log(response.data);
        if (response.data.success == true) {
          let updatedList = this.state.list.filter(item => {
            return item._id !== id;
          });
          this.setState({
            ...this.state,
            list: updatedList
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  render() {
    const { classes } = this.props;
    const { list, activePage, itemsPerPage } = this.state;
    const indexOfLastItems = activePage * itemsPerPage;
    const indexOfFirstItems = indexOfLastItems - itemsPerPage;
    const currentItems = list.slice(indexOfFirstItems, indexOfLastItems);

    const renderItems = currentItems.map((item, key) => {
      return (
        <div key={key} style={{marginBottom:20}}>
          <label><b style={{fontSize:17}}>Title:</b> <i style={{fontSize:17}}>{item.item_title}</i></label>
         <br /> <label><b style={{fontSize:20}}>Description:</b> <i style={{fontSize:17}}>{item.item_description}</i></label>
         <br /> <button onClick={() => this.deleteItem(item._id)} style={{padding:'10px 20px 10px 20px',background:'#fff',color:'#064ECA',border:0}}>Delete</button>
        </div>
      );
    });

    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg bg-light">
            <a
              className="navbar-brand"
              href="https://insidepetroleum.com"
              target="_blank"
            >
              <img
                src={logo}
                width="85"
                height="50"
                alt="InsidePetroleum.com"
              />
            </a>
            <Link to="/" className="navbar-brand">
              IP Project App
            </Link>
            <div className="collpase nav-collapse">
              <ul className="navbar-nav mr-auto">
                {/* <li className="navbar-item">
                  <Link to="/" className="nav-link">Items</Link>
                </li> */}
              </ul>
            </div>
          </nav>

          <div style={{ marginTop: 20 }}>
            <center>
              <div style={{width:300,marginBottom:20}}>
                <div>
                  <label style={{float:'left'}}>Title</label>
                <br />
                <input
                  style={{width:'100%'}}
                  type="text"
                  value={this.state.title}
                  name='title'
                  onChange={this.handleChange}
                />
                </div>

                <div style={{margin:'10px 0px 10px 0px'}}>
                 <label style={{float:'left'}}>Description</label>
                <br />
                <input
                  style={{width:'100%'}}
                  type="text"
                  value={this.state.description}
                  name='description'
                  onChange={this.handleChange}
                /> 
                </div>


                <button onClick={this.addListItem} style={{padding:'10px 20px 10px 20px',background:'#fff',color: '#064ECA' , border:0}}>Submit</button>
                
                
              </div>
            </center>

                <div>

              {renderItems}
                </div>
              <Pagination
                activePage={this.state.activePage}
                itemsCountPerPage={5}
                totalItemsCount={this.state.list.length}
                pageRangeDisplayed={3}
                onChange={this.handlePageChange}
              />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
