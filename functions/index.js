const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });
admin.initializeApp();

const firestore = admin.firestore();

exports.authenticateUsers = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const { email, password, name, role, timestamp } = req.body;
    admin
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        const { uid } = user;
        firestore
          .collection("users")
          .doc(`users/${uid}`)
          .set({ email, password, name, role, timestamp, uid });
        return res.json({ success: true, data: user, error: null });
      })
      .catch(error => {
        res.json({ success: false, data: null, error });
      });
  });
});
