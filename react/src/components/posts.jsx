import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router';
import Services from '../service';
import config from '../config';

export default class HomePosts extends Component {
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

  render() {
		return (
      <div className="section">
          <Row>
          {
            this.state.data.map( (post, key) => (
              <Col key={key}  xs={4}>
                <div className="post-block">
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
    )
  }
}
