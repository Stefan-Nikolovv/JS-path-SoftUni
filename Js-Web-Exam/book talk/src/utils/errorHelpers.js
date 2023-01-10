 

exports.errorHelper = (error) => {
   let errMessage = error;

    if(error.errors) {
        let errorArray = [];
       errMessage = Object.values(error.errors).forEach(x => errorArray.push(x.message));
       
       errMessage = errorArray;
    };

    return errMessage;
};