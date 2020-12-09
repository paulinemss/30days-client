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