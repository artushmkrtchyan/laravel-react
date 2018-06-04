import React, { Component } from 'react';
import {Col, Row } from 'react-bootstrap';
import { Link } from 'react-router';
import Services from '../service'
import { NavBar } from '../components/navbar.jsx';
import Footer from '../components/footer.jsx';
import config from '../config';

export default class Products extends Component {

	constructor(props) {
			super(props);

			this.state = {
        		data: []
			}
		}

	componentWillMount() {

		Services.products()
		.then( res => {
			this.setState({data: res.data.data})
		})
	}

  render() {
		return (

        <div className="container">
        <NavBar></NavBar>
        	<div className="products-section">
	          	<Row>
	    		{
	  				this.state.data.map( (product, key) => (
	           <Col key={key}  xs={3}>
	      				<div id={"product_"+product.id} className="product-item">
                  <div className="product-code">Code: {product.code}</div>
    							<Link to={"product/"+product.id}>
            					<div className="product-title"><span dangerouslySetInnerHTML={{__html: product.name}}></span></div>
                  </Link>
                  <Link to={"product/"+product.id}>
            					<div className="product-img"><img src={config.img_url+'products/'+product.image} alt="" /></div>
                  </Link>
                  <Link to={"product/"+product.id}>
                    	<div className="product-excerpt"><span dangerouslySetInnerHTML={{__html: product.description}}></span></div>
                  </Link>
	      				</div>
              </Col>
	  				))
	    		}
	          	</Row>
	        </div>
					<Footer></Footer>
        </div>
    );
  }
}
