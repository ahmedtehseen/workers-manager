const styles = {
	taskContainer:{
		display: 'flex',
		flexDirection: 'column',
		justifyContent: '	',
		width: '80%',
		marginLeft: '15%',
		marginRight: '5%',
		marginTop: '5%'
	},
	statusContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: '2em 2em 2em',
	},
	card: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		paddingBottom: '0',
		width: '150px',
		height: '100px',
	},
	cardText: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	iconContainer: {

	},
	icon: {
		height: '40',
		width: '40',
		marginRight: '1em'
	},
	text: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center'
	},
	heading: {
		fontSize: '30px',
		fontWeight: '500',
	},
	tableContainer: {
		display: 'flex',
		flexDirection: 'column',
		// justifyContent: 'space-between',
		margin: '0 2em 80px',
		backgroundColor: '#fff',
		boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.44)',
	},
	tableHeader: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderBottom: '1px solid #E0E0E0'
	},
	tableText: {
		color: '#9E9E9E',
		marginLeft: '2em'
	},
	tableBodyContainer: {
		padding: '2em'
	}
}

export default styles