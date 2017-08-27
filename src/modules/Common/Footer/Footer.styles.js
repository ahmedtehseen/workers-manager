const styles = {
  footer: {
  	display: 'flex',
  	flexDirection: 'row',
  	justifyContent: 'space-between',
  	color: 'rgba(0, 0, 0, 0.87)',
    backgroundColor: '#fff',
  	position: 'fixed',
    bottom: '0',
    height: '55px',
    width: '100%',
    zIndex: '1300',
    boxShadow: ' 0px -1px 5px 0px rgba(0,0,0,0.3)',
  },
  footerLeft: {
  	display: 'flex',
  	flexDirection: 'row',
  	alignItems: 'center'
  },
  logo: {
  	width: '110px',
  	height: '40px',
  	marginLeft: '1em'
  },
  text: {
  	color: '#9E9E9E',
  	fontSize: '12px',
  },
  footerLink: {
  	display: 'flex',
  	flexDirection: 'row',
  	justifyContent: 'space-around',
  	alignItems: 'center',
  	width: '25em',
  	marginRight: '4em'
  },
  divider: {
		height: '12px',
		width: '1px',
		backgroundColor: '#9E9E9E',
	},
	link: {
		textDecoration: 'none',
		fontSize: '12px'
	}
};

export default styles;