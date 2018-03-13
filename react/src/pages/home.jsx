import React, { Component } from 'react';
import { NavBar } from '../components/navbar.jsx';
import HomePosts from '../components/posts.jsx';
import HomeProducts from '../components/products.jsx';
import { Grid, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router';
import Services from '../service';
import config from '../../config';

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
          count: 3,
          show:false,
          showModal:false,
          data: []
        }

        this.onButtonClick = this.onButtonClick.bind(this);
    }

    componentWillMount() {
      Services.postsCount(this.state.count)
      .then( res => {
  			this.setState({data: res.data})
  		}).catch(error => {
        this.setState({data: error})
      })
    }

    onButtonClick(event) {
    	if(this.state.show){
        	this.setState({show:false});
        }else {
        	this.setState({show:true});
        }
    }

    render() {
        let show = this.state.show;

        return (
            <Grid>
              <NavBar></NavBar>
              <div className="main-container home-page">
                  <HomePosts></HomePosts>
                  <HomeProducts></HomeProducts>
                  <div className="bootstrap-test">
                      <Button bsStyle="primary" bsSize="small" onClick={this.onButtonClick}>Something</Button>
                  </div>
                  {
                      show ? "asdasdasdasdasd" : "chka"
                  }
              </div>
            </Grid>
        );
    }
}
