import firebase from "../../Tools/Firebase";

const setPosts = posts => ({type: 'REFRESH', payload: posts});
const db = firebase.firestore().collection('Movies');

const fetchMyData = dispatch => {
  db.get().then(data => {
    const movies = data.docs.map(doc => doc.data());
    dispatch(setPosts(movies));
  });
};

const addMovieLike = id => (dispatch) => {
  if (!checkIfExist(id)) (
    db.add({
      id: id,
      done: false
    })
      .then(() => {
        fetchMyData(dispatch)
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      })
  )
};
const delMovieLike = id => (dispatch) => {
  db.where("id", "==", id)
    .get()
    .then(data => {
      data.docs.map(doc => doc.ref.delete().then(() => {
        fetchMyData(dispatch)
      }));
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    })
};

const toggleMovieSee = (id,value) => (dispatch) => {
  db.where("id", "==", id)
    .get()
    .then(data => {
      data.forEach(function(result) {
        db.doc(result.id).update({
          done:value
        }).then(() => {
          fetchMyData(dispatch)
        })
          .catch(function (error) {
            console.error("Error editing document: ", error);
          })
      });

    })
    .catch(function (error) {
      console.error("Error finding document: ", error);
    })
};

const checkIfExist = id => {
  db.where("id", "==", id)
    .get()
    .then(function (querySnapshot) {
      return querySnapshot.docs.length;
    })
    .catch(() => true);

};

export {fetchMyData, addMovieLike, delMovieLike, toggleMovieSee};