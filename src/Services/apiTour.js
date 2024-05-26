// // const axios = require("axios");
// import axios from 'axios';
// const baseUrl = "localhost:3000/api/v1/auth/";


//api/v1/tours?duration[lte]=9&sort=price&limit=3&page=1&price[gte]=300&price[lte]=1000&name=the forest hiker

import axios from '../../Axios.config'

export async function getTours(data){
    console.log("DATA >>",data)
    let reqUrl = `tours`
    if(data.duration){
        if(reqUrl === 'tours') reqUrl = 'tours?'
        reqUrl = reqUrl + `duration[lte]=${data.duration}`
    }
    if(data.sort){
        if(reqUrl === 'tours') reqUrl = 'tours?'
        reqUrl = reqUrl + `&sort=${data.sort}`
    }
    if(data.limit){
        if(reqUrl === 'tours') reqUrl = 'tours?'
        reqUrl = reqUrl + `&limit=${data.limit}`
    }
    if(data.page){
        if(reqUrl === 'tours') reqUrl = 'tours?'
        reqUrl = reqUrl + `&page=${data.page}`
    }
    if(data.maxValuePrice){
        if(reqUrl === 'tours') reqUrl = 'tours?'
        reqUrl = reqUrl + `&price[lte]=${data.maxValuePrice}`
    }
    if(data.minValuePrice){
        if(reqUrl === 'tours') reqUrl = 'tours?'
        reqUrl = reqUrl + `&price[gte]=${data.minValuePrice}`
    }
    if(data.name){
        if(reqUrl === 'tours') reqUrl = 'tours?'
        reqUrl = reqUrl + `&name=${data.name}`
    }
    console.log("URL >> ",reqUrl)
    const res = await axios
      .get(reqUrl, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // console.log("getTours successful:", response);
        return response;
      })
      .catch((error) => {
        // console.error("getTours failed:", error);
        return error
      });
      return res;
}


export async function getOneTour(id){
    const res = await axios
      .get(`tours/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // console.log("getOneTour successful:", response);
        return response;
      })
      .catch((error) => {
        // console.error("getOneTour failed:", error);
        return error
      });
      return res;
}

export async function topFiveTours(){
    const res = await axios
      .get(`tours/top-5-cheap`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // console.log("topFiveTours successful:", response);
        return response;
      })
      .catch((error) => {
        // console.error("topFiveTours failed:", error);
        return error
      });
      return res;
}

//tours/5c88fa8cf4afda39709c295d/reviews/
export async function addReview(tourId, review){
    const res = await axios
      .post(`tours/${tourId}/reviews/`,review, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // console.log("addReview successful:", response);
        return response;
      })
      .catch((error) => {
        // console.error("addReview failed:", error);
        return error
      });
      return res;
  }