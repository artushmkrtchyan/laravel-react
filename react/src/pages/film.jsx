import React, { Component } from 'react';
import {Grid, Col, Row, ListGroup, ListGroupItem } from 'react-bootstrap';
import YouTube from 'react-youtube';
import Services from '../service'
import { NavBar } from '../components/navbar.jsx';
import Footer from '../components/footer.jsx';
import config from '../config';

export default class Film extends Component {

	constructor(props) {
			super(props);

			this.state = {
        filmID: this.props.params.filmId,
				error: '',
        data: {
          image: 'no.png'
        }
			}
		}

	componentWillMount() {
		Services.film(this.state.filmID)
		.then( res => {
        if(res.success){
    			this.setState({data: res.data})
        }else{
					this.setState({error: res.message})
				}
		}).catch(error => {
      this.setState({error: error})
    })
	}

  render() {
    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        autoplay: 0
      }
    };
		return (
        <Grid>
	        <NavBar></NavBar>
	        	<div className="post-section">
							{this.state.error ?
	              <ListGroup className="error-mesage">
	                <ListGroupItem bsStyle="danger"><span dangerouslySetInnerHTML={{__html: this.state.error}}></span></ListGroupItem>
	              </ListGroup>
								:
		          	<Row>
	                  <Col xs={9}>
	                    <h2 className="post-title">{this.state.data.title}</h2>
	                    <span className="date">Year: {this.state.data.year}</span><hr/>
                      <div className="film-excerpt"><span dangerouslySetInnerHTML={{__html: this.state.data.description}}></span> </div>
                      {
                        this.state.data.youtube_id ?
                        <div className="videoWrapper">
                          <YouTube
                            videoId={this.state.data.youtube_id}
                            opts={opts}
                          />
              					</div>
                        : ''
                      }
                      {
                        this.state.data.vidio_embed ?
                        <div className="videoWrapper">
            					         <span dangerouslySetInnerHTML={{__html: this.state.data.vidio_embed}}></span>
            					   </div>
                       : ''
                     }
	                  </Col>
		          	</Row>
							}
		        </div>
						<Footer></Footer>
        </Grid>
    );
  }
}
