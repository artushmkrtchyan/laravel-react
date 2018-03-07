import React, { Component } from 'react';
import { NavBar } from '../components/navbar.jsx';
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
                  <div className="section-1">
                      <Row>
          		    		{
          		  				this.state.data.map( (post, key) => (
          	              <Col key={key}  xs={4}>
          		      				<div className="lists-1">
          										<Link to={"post/"+post.id}>
          				        					<div className="item-title"><span dangerouslySetInnerHTML={{__html: post.title}}></span> </div>
          				            </Link>
          										<Link to={"post/"+post.id}>
          				        					<div className="item-img"><img src={config.img_url+'posts/'+post.image} alt="" /></div>
          				            </Link>
          										<Link to={"post/"+post.id}>
          				                  <div className="item-excerpt"><span dangerouslySetInnerHTML={{__html: post.content}}></span> </div>
          				            </Link>
          		      				</div>
          	              </Col>
          		  				))
          		    		}
          	         </Row>
                  </div>
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
