import { firestore } from "firebase";

// get realtime users information
export const getRealTimeUsers = (uid) => async (dispatch) => {
  dispatch({ type: "GET_REALTIME_USERS_REQUEST" });
  const db = firestore();
  const unsubscribe = db.collection("users").onSnapshot((querySnapshot) => {
    const users = [];
    querySnapshot.forEach(function (doc) {
      if (doc.data().uid !== uid) {
        users.push(doc.data());
      }
    });
    dispatch({
      type: "GET_REALTIME_USERS_SUCCESS",
      payload: {
        users,
      },
    });
  });
  return unsubscribe;
};

// update Realtime Messages
export const updateMessage = (messageObj) => async (dispatch) => {
  const db = firestore();
  db.collection("conversations")
    .add({
      ...messageObj,
      isViewed: false,
      createdAt: new Date(),
    })
    .then((data) => {
      dispatch({ type: "USER_GET_REALTIME_MESSAGES" });
    })
    .catch((err) => console.log(err));
};

// get Realtime conversation
export const getReatTimeConversations = (user) => async (dispatch) => {
  const db = firestore();
  db.collection("conversations")
    .where("user_uid_1", "in", [user.uid_1, user.uid_2])
    .orderBy("createdAt", "asc")
    .onSnapshot(
      (querySnapshot) => {
        const conversations = [];
        querySnapshot.forEach((doc) => {
          if (
            (doc.data().user_uid_1 === user.uid_1 &&
              doc.data().user_uid_2 === user.uid_2) ||
            (doc.data().user_uid_1 === user.uid_2 &&
              doc.data().user_uid_2 === user.uid_1)
          ) {
            conversations.push(doc.data());
          }
        });
        if (conversations.length > 0) {
          dispatch({
            type: "GET_REALTIME_MESSAGES",
            payload: { conversations },
          });
        } else {
          dispatch({
            type: "GET_REALTIME_MESSAGES_FAILURE",
            payload: { conversations },
          });
        }
      },
      (err) => console.log(err)
    );
};
