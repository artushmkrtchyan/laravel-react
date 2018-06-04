import React, { Component } from 'react';
import { NavBar } from '../components/navbar.jsx';
import Footer from '../components/footer.jsx';
import HomePosts from '../components/posts.jsx';
import HomeProducts from '../components/products.jsx';
import { Grid, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router';
import Services from '../service';
import config from '../config';

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
          count: 3,
          data: []
        }

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
        return (
            <Grid>
                <NavBar></NavBar>
                <div className="main-container home-page">
                    <HomePosts></HomePosts>
                    <HomeProducts></HomeProducts>
                </div>
                <Footer></Footer>
            </Grid>
        );
    }
}
