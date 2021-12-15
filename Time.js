import firebase from "firebase";

function toDateString(time) {
    const date = new Date(time.seconds * 1000);
    const dateString = `${date.getFullYear().toString()}/${
      (date.getMonth() + 1).toString().padStart(2, '0')}/${
      date.getDate().toString().padStart(2, '0')}  ${
      date.getHours().toString().padStart(2, '0')}:${
      date.getMinutes().toString().padStart(2, '0')}:${
      date.getSeconds().toString().padStart(2, '0')}`;
  
    return dateString;
}

let arr = [];
  
async function getLastestTime() {
    arr = [];
    const db = firebase.firestore();
    const timeRef = db.collection('time');
    const querySnapshot = await timeRef.orderBy('time', 'desc').limit(1).get();
    if (querySnapshot.size) {
        querySnapshot.forEach((doc) => {
        // console.log(toDateString(doc.data().time));
        arr.push(toDateString(doc.data().time));
        });
    }
    else {
        // console.log("Time queue is empty.");
        arr.push("Time queue is empty.");
    }
    return arr;
}

async function getAllTimes() {
    arr = [];
    const db = firebase.firestore();
    const timeRef = db.collection('time');
    const querySnapshot = await timeRef.orderBy('time', 'desc').get();
    if (querySnapshot.size) {
        querySnapshot.forEach((doc) => {
        // console.log(toDateString(doc.data().time));
        arr.push(toDateString(doc.data().time));
        });
    }
    else {
        // console.log("Time queue is empty.");
        arr.push("Time queue is empty.");
    }
    return arr;
}


function addCurrentTime() {
    const db = firebase.firestore();
    const timeRef = db.collection('time');
    const addTime = {
        time: firebase.firestore.Timestamp.now()
    };
    timeRef.add(addTime);
}

async function deleteEarliestTime() {
    const db = firebase.firestore();
    const timeRef = db.collection('time');
    const querySnapshot = await timeRef.orderBy('time').limit(1).get();
    if (querySnapshot.size) {
        querySnapshot.forEach((doc) => {
        doc.ref.delete();
        })
    }
    else {
        // console.log("Time queue is empty.");
        arr = [];
        arr.push("Time queue is empty.");
        return arr;
    }
}

export default {
    getLastestTime,
    getAllTimes,
    addCurrentTime,
    deleteEarliestTime,
};