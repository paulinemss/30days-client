import axios from "axios";

function internalServerError(err) {
  console.log("err:", err.response.data);
  if (err.response && err.response.data && err.response.data.errorMessage) {
    return {
      status: false,
      errorMessage: err.response.data.errorMessage,
    };
  }
  return {
    status: false,
    errorMessage: "Internal server error. Please check your server",
  };
}

function successStatus(res) {
  return {
    status: true,
    data: res.data,
  };
}

const mainService = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}`,
});

export function getCourses() {
  return mainService
    .get('/courses')
    .then(successStatus)
    .catch(internalServerError)
}

export function getOneCourse(id) {
  return mainService
    .get(`/courses/${id}`)
    .then(successStatus)
    .catch(internalServerError)
}

export function createNewCourse(course) {
  return mainService
    .post('/courses/create', course)
    .then(successStatus)
    .catch(internalServerError)
}

export function editCourse(course, id) {
  return mainService
    .put(`/courses/edit/${id}`, course)
    .then(successStatus)
    .catch(internalServerError)
}

export function hideCourse(id, course) {
  return mainService
    .put(`/courses/delete/${id}`, course)
    .then(successStatus)
    .catch(internalServerError)
}

export function likeCourse(courseId, likes) {
  return mainService
    .put(`/courses/like/${courseId}`, { likes }, {
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    })
    .then(successStatus)
    .catch(internalServerError)
}

export function getChallenges(id) {
  return mainService
    .get(`/challenges/${id}`)
    .then(successStatus)
    .catch(internalServerError)
}

export function getOneChallenge(challengeId) {
  return mainService
    .get(`/challenges/page/${challengeId}`, {
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    })
    .then(successStatus)
    .catch(internalServerError)
}

export function updateChallenge(challenge, id) {
  return mainService
    .put(`/challenges/update/${id}`, challenge)
    .then(successStatus)
    .catch(internalServerError)
}

export function restartChallenge(challenge, id) {
  return mainService
    .put(`/challenges/restart/${id}`, challenge)
    .then(successStatus)
    .catch(internalServerError)
}

export function deleteChallenge(challengeId) {
  return mainService
    .delete(`/challenges/delete/${challengeId}`)
    .then(successStatus)
    .catch(internalServerError)
}

export function startChallenge(course, id) {
  return mainService
    .post(`/challenges/start/${id}`, course)
    .then(successStatus)
    .catch(internalServerError)
}