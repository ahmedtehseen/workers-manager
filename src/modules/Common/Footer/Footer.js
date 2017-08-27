import React, { Component } from 'react';

// styles 
import styles from './Footer.styles';

class FooterComponent extends Component {
	render() {
		return (
			<footer style={styles.footer}>
				<div style={styles.footerLeft}>
					<img src={`${process.env.PUBLIC_URL}/logo.jpg`} alt='logo' style={styles.logo}/>
					&nbsp;&nbsp;&nbsp;
					<p style={styles.text}>© Copyright: All Rights Reserved.</p>
				</div>
				<div style={styles.footerLink}>
					<a href='#' style={styles.link}>Privacy Terms</a>
					<div style={styles.divider}/>
					<a href='#' style={styles.link}>How to use?</a>
					<div style={styles.divider}/>
					<a href='#' style={styles.link}>Support</a>
				</div>
			</footer>
		)
	}
}

export let Footer =  FooterComponent