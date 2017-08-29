var functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


exports.authenticateUser = functions.https.onRequest((request, response) => {
	cors(request, response, () => {
		let body = request.body;
		const { email, password, name, role, timestamp } = body
		admin.auth().createUser({
			email,
			password
		}).then((user) => {
			const { uid } = user;
			admin.database().ref(`/users/${uid}`).set({ email, name, role, timestamp, uid })
			response.json({ success: true, data: user, error: null })
		}).catch((error) => {
			response.json({ success: false, data: null, error })
		})
	})
})