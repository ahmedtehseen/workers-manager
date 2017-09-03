const styles = {
	taskContainer:{
		display: 'flex',
		flexDirection: 'column',
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
		paddingBottom: '0px',
		width: '12em',
		height: '7em',
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
		height: '40px',
		width: '40px',
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
		marginLeft: '2em',
		fontSize: '15px'
	},
	tableBodyContainer: {
		padding: '2em'
	},
	taskHeader: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: '.5em',
		borderBottom: '1px solid #E0E0E0'
	},
	taskText: {
		fontSize: '16px',
		fontWeight: '600',
		margin: '10px',
		marginLeft: '2em',
	}
}

export default styles