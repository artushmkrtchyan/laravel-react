import React, { Component } from 'react';
import {Col, Row, Grid } from 'react-bootstrap';
import { Link } from 'react-router';
import Services from '../service'
import Footer from '../components/footer.jsx';
import { NavBar } from '../components/navbar.jsx';
import config from '../config';

export default class Films extends Component {

	constructor(props) {
			super(props);

			this.state = {
        		data: []
			}
		}

	componentWillMount() {

		Services.films()
		.then( res => {
			this.setState({data: res.data.data})
		}).catch(error => {
      this.setState({data: error})
    })
	}

  render() {
		return (

      <Grid>
        <NavBar></NavBar>
        	<div className="films-section">
	        	<Row>
		    		{
		  				this.state.data.map( (film, key) => (
	              <Col key={key}  xs={4}>
		      				<div id={"film_"+film.id} className="film-item">
										<Link to={"films/"+film.id}>
				        					<div className="film-title"><span dangerouslySetInnerHTML={{__html: film.title}}></span> </div>
				            </Link>
										<Link to={"films/"+film.id}>
				        					<div className="film-img"><img src={config.img_url+'films/'+film.image} alt="" /></div>
				            </Link>
										<Link to={"films/"+film.id}>
				                  <div className="film-excerpt"><span dangerouslySetInnerHTML={{__html: film.description.substring(0, 200)}}></span> </div>
				            </Link>
		      				</div>
	              </Col>
		  				))
		    		}
	         </Row>
        </div>
				<Footer></Footer>
      </Grid>
    );
  }
}
