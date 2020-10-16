import { auth, firestore } from "firebase";

export * from "./userAction";

// Sign Up Action Creator
export const signup = (user) => async (dispatch) => {
  const db = firestore();

  dispatch({ type: "USER_LOGIN_REQUEST" });

  auth()
    .createUserWithEmailAndPassword(user.email, user.password)
    .then((data) => {
      const currentUser = auth().currentUser;
      currentUser
        .updateProfile({
          displayName: `${user.firstName} ${user.lastName}`,
        })
        .then(() => {
          // updated users name successfully
          db.collection("users")
            .doc(data.user.uid)
            .set({
              firstName: user.firstName,
              lastName: user.lastName,
              uid: data.user.uid,
              createdAt: new Date(),
              isOnline: true,
            })
            .then(() => {
              // user information saved in database
              const loggedInUser = {
                firstName: user.firstName,
                lastName: user.lastName,
                uid: data.user.uid,
                createdAt: new Date(),
                email: user.email,
              };
              localStorage.setItem("user", JSON.stringify(loggedInUser));
              console.log("user Logged In Successfully");
              dispatch({
                type: "USER_LOGIN_SUCCESS",
                payload: { user: loggedInUser },
              });
            })
            .catch((err) => {
              console.log(err);
              dispatch({
                type: "USER_LOGIN_FAILURE",
                payload: { error: err.message },
              });
            });
        })
        .catch((err) => console.log(err.message));
    })
    .catch((err) => console.log(err.message));
};

// Log In Action Creator
export const login = (user) => async (dispatch) => {
  dispatch({ type: "USER_LOGIN_REQUEST" });

  const db = firestore();
  auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then((data) => {
      db.collection("users")
        .doc(data.user.uid)
        .update({
          isOnline: true,
        })
        .then(() => {
          const name = data.user.displayName.split(" ");
          const firstName = name[0];
          const lastName = name[1];
          const loggedInUser = {
            firstName,
            lastName,
            uid: data.user.uid,
            loggedInAt: new Date(),
            email: data.user.email,
          };
          localStorage.setItem("user", JSON.stringify(loggedInUser));
          dispatch({
            type: "USER_LOGIN_SUCCESS",
            payload: { user: loggedInUser },
          });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => {
      dispatch({ type: "USER_LOGIN_FAILURE", payload: { error: err.message } });
    });
};

// isLoggedIn Action Creator
export const isLoggedIn = () => async (dispatch) => {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  if (user) {
    dispatch({
      type: "USER_LOGIN_SUCCESS",
      payload: { user },
    });
  } else {
    dispatch({
      type: "USER_LOGIN_FAILURE",
      payload: { error: "Please Log in Again" },
    });
  }
};
// Logout Action creator
export const logout = (uid) => async (dispatch) => {
  dispatch({ type: "USER_LOGOUT_REQUEST" });
  const db = firestore();
  db.collection("users")
    // .where("uid", "==", uid)
    .doc(uid)
    .update({
      isOnline: false,
    })
    .then(() => {
      auth()
        .signOut()
        .then(() => {
          localStorage.clear();
          dispatch({ type: "USER_LOGOUT_SUCCESS" });
        })
        .catch((err) => {
          dispatch({ type: "USER_LOGOUT_FAILURE", payload: { error: err } });
        });
    })
    .catch();
};
