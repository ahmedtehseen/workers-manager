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
          .doc(uid)
          .set({ email, password, name, role, timestamp, uid });
        return res.send({ success: true, data: user, error: null });
      })
      .catch(error => {
        res.send({ success: false, data: null, error });
      });
  });
});

exports.deleteNote = functions.https.onCall((data, context) => {
  if (!(context.auth && context.auth.token && context.auth.token.admin)) {
    throw new functions.https.HttpsError(
      "permission-denied",
      "Must be an administrative user to initiate delete."
    );
  }
  const path = data.path;
  return firebase_tools.firestore
    .delete(path, {
      project: "430323187832",
      recursive: true,
      yes: true,
      token: functions.config().fb.token
    })
    .then(() => {
      return { result: "All done" };
    });
});
