import axios from '../../Axios.config'

export async function signUp(userData) {
  const res = await axios
    .post('auth/signUp', userData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
    // console.log("Signup successful:", response);
      return response;
    })
    .catch((error) => {
    //   console.error("Signup failed:", error);
      return error
    });
    return res;
}

export async function logIn(userData) {
    const res = await axios
      .post('auth/login', userData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
          // console.log("logIn successful:", response);
          return response;
        })
        .catch((error) => {
            // console.error("logIn failed:", error);
            return error
        });
    
    // console.log(res)
      return res;
  }

export async function logOut() {
  localStorage.removeItem('user')
  localStorage.removeItem('jwt')
    const res = await axios
      .get('auth/logout', {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
          // console.log("logOut successful:", response);
          return true;
        })
        .catch((error) => {
            // console.error("logOut failed:", error);
            return false
        });
    //   console.log(document.cookie.jwt)
    // console.log(res)
      return res;
  }


export async function getUser() {
    const res = await axios
      .get('auth/me', {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        //   console.log("getUser successful:", response);
          return response;
        })
        .catch((error) => {
            // console.error("getUser failed:", error);
            return error
        });

      return res;
}


export async function addUserImage(photo, id){
  // console.log(photo)
  const formData = new FormData();
  formData.append('photo', photo);

  const res = await axios
    .patch(`auth/uploadImageForSignUp/${id}`,formData, {
      headers: {
        "Content-Type": "'multipart/form-data'",
      },
    })
    .then((response) => {
      // console.log("addImage successful:", response);
      return response;
    })
    .catch((error) => {
      // console.error("addImage failed:", error);
      return error
    });
    return res;
}


export async function EditUserImage(photo, id){
  // console.log(photo)
  const formData = new FormData();
  formData.append('photo', photo);

  const res = await axios
    .patch(`auth/profilePic`,formData, {
      headers: {
        "Content-Type": "'multipart/form-data'",
      },
    })
    .then((response) => {
      // console.log("addImage successful:", response);
      return response;
    })
    .catch((error) => {
      // console.error("addImage failed:", error);
      return error
    });
    return res;
}

export async function updateUser(userData){
  const res = await axios
    .patch('auth/updateMe', userData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      // console.log("updateUser successful:", response);
      return response;
    })
    .catch((error) => {
      // console.error("updateUser failed:", error);
      return error
    });
    return res;
}


export async function updatePassword(userData){
  const res = await axios
    .patch('auth/updatePassword', userData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      // console.log("updatePassword successful:", response);
      return response;
    })
    .catch((error) => {
      // console.error("updatePassword failed:", error);
      return error
    });
    return res;
}


export async function getBooking(){
  const res = await axios
    .get('auth/getBooking', {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      // console.log("getBooking successful:", response);
      return response;
    })
    .catch((error) => {
      // console.error("getBooking failed:", error);
      return error
    });
    return res;

}

export async function getWishList(){
  const res = await axios
    .get('auth/getWishList', {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      // console.log("getBooking successful:", response);
      return response;
    })
    .catch((error) => {
      // console.error("getBooking failed:", error);
      return error
    });
    return res;

}

export async function removeTourFromBooking(TourId){
  const res = await axios
    .patch('auth/removeBooking',TourId, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      // console.log("removeTourFromBooking successful:", response);
      return response;
    })
    .catch((error) => {
      // console.error("removeTourFromBooking failed:", error);
      return error
    });
    return res;
}

export async function removeTourFromWishList(TourId){
  const res = await axios
    .patch('auth/removeWishList',TourId, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      // console.log("removeTourFromWishList successful:", response);
      return response;
    })
    .catch((error) => {
      // console.error("removeTourFromWishList failed:", error);
      return error
    });
    return res;
}

export async function getReviews(){
  const res = await axios
    .get('reviews/getMyReviews', {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      // console.log("getReviews successful:", response);
      return response;
    })
    .catch((error) => {
      // console.error("getReviews failed:", error);
      return error
    });
    return res;
}

export async function removeReview(reviewId){
  const res = await axios
    .delete(`reviews/${reviewId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      // console.log("removeReview successful:", response);
      return response;
    })
    .catch((error) => {
      // console.error("removeReview failed:", error);
      return error
    });
    return res;
}

export async function editReview(reviewId, review){
  const res = await axios
    .patch(`reviews/${reviewId}`, review, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      // console.log("editReview successful:", response);
      return response;
    })
    .catch((error) => {
      // console.error("editReview failed:", error);
      return error
    });
    return res;
}

export async function IsInMyWishList (tourId){
  const res = await axios
    .get(`auth/checkWishList/${tourId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      // console.log("IsInMyWishList successful:", response);
      return response;
    })
    .catch((error) => {
      // console.error("IsInMyWishList failed:", error);
      return error
    });
    return res;
}

export async function addToWishList(tourId){
  const res = await axios
    .patch('auth/addWishList', tourId,{
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      // console.log("addToWishList successful:", response);
      return response;
    })
    .catch((error) => {
      // console.error("addToWishList failed:", error);
      return error
    });
    return res;
}

export async function IsInMyBooking (tourId){
  const res = await axios
    .get(`auth/checkBooking/${tourId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      // console.log("IsInMyBooking successful:", response);
      return response;
    })
    .catch((error) => {
      // console.error("IsInMyBooking failed:", error);
      return error
    });
    return res;
}

export async function addToBooking(tourId){
  const res = await axios
    .patch('auth/addBooking', tourId,{
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      // console.log("addToBooking successful:", response);
      return response;
    })
    .catch((error) => {
      // console.error("addToBooking failed:", error);
      return error
    });
    return res;
}