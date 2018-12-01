import React, { Component } from 'react'

// Components
import Header from './Header'
import Hero from './Hero'
import ValueProp from './ValueProp'
import Signup from './Signup'
import Footer from './Footer'

class Landing extends Component {
	render() {
		return (
			<div>
				<Header />
				<ValueProp />
				<Signup />
				<Footer />
			</div>
		)
	}
}

export default Landing