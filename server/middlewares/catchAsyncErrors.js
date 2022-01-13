//Solution 1
// module.exports = func => (req, res, next) =>{
//     Promise.resolve(func(req, res, next))
//     .catch(e=>next(e))
// }


module.exports = (func) => { 
    return (req, res, next) =>{
        const asynFunc = new Promise((resolve, reject)=>{
            resolve(func(req, res, next))
        })
        asynFunc.catch(e=> next(e))
    }
}


//Solution 2
// module.exports = (func) => { 
//     return async (req, res, next2) =>{
//         try {
   
//             await func(req, res, next2)
   
//         } catch (error) {

//             next2(error)
//         }
       
//     }
// }





