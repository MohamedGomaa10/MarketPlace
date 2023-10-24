import React, { FC } from 'react';

// Styles
import './Error404.css';

const Error404:FC = () => {
	return (
		<React.Fragment>
			<section className='Error404'>
				<h1>404</h1>
				<p>Opps, Page not found</p>
				<span className='subtitle2'>The link might be corrupted</span>
				<span className='subtitle3'>Or the page may have been removed</span>
			</section>
		</React.Fragment>
	)
}

export default Error404;
