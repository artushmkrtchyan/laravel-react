import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router';
import Services from '../service';
import config from '../config';

export default class HomeProducts extends Component {
    constructor(props) {
        super(props);

        this.state = {
          count: 3,
          data: []
        }

    }

    componentWillMount() {
      Services.productsCount(this.state.count)
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
            this.state.data.map( (product, key) => (
              <Col key={key}  xs={4}>
                <div className="product-block">
                  <Link to={"product/"+product.id}>
                        <div className="item-title"><span dangerouslySetInnerHTML={{__html: product.name}}></span> </div>
                        <div className="item-code-price">
                          <span className="item-code">code: {product.code} </span>
                          <span className="item-price"> price: {product.price}</span>
                        </div>
                  </Link>
                  <Link to={"product/"+product.id}>
                        <div className="item-img"><img src={config.img_url+'products/'+product.image} alt="" /></div>
                  </Link>
                  <Link to={"product/"+product.id}>
                        <div className="item-excerpt"><span dangerouslySetInnerHTML={{__html: product.description}}></span> </div>
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
