const Note = require("../models/notes")
const mongoose = require("mongoose")



exports.dashpage = async (req, res) => {



let perPage = 12;
let page = req.query.page || 1;

const locals = {
  title: "Dashboard",
  description: "Free NodeJS Notes App.",
};

try {
  // Mongoose "^7.0.0 Update
  const notes = await Note.aggregate([
    { $sort: { updatedAt: -1 } },
    { $match: { user: new mongoose.Types.ObjectId('6464e569a42e9142bc76bbb3') } },
    {
      $project: {
        title: { $substr: ["$title", 0, 30] },
        body: { $substr: ["$body", 0, 100] },
      },
    }
  ])
  .skip(perPage * page - perPage)
  .limit(perPage)
  .exec();

  const count = await Note.count();
  
  res.render('dashboard/dash', {
    userName: req.user.firstName,
    locals,
    notes,
    layout: "../views/layouts/dashboard",
    current: page,
    pages: Math.ceil(count / perPage)
  });

}
catch (error) {
        console.log(error);
      }
  } 


// using this note  was working  but when i change with above code it will show create new note

// this code u use earlier in video and later change

// const locals = {
//   title:"dashboad",
//   description:"free node js app"
// }
//    

// try{
//   const notes =  await Note.find({})
//   console.log(notes);
//   res.render('dashboard/dash', {
//     userName: req.user.firstName,
//     locals,
//     notes,
//     layout: "../views/layouts/dashboard",
//   });
//   }