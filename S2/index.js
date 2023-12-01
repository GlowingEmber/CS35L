const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const UserModel = require('./models/user')
const FriendReqModel = require('./models/friendreq')

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://max09lui:T4XEs0OHoUJIcJGF@cluster0.kcdmgrl.mongodb.net/?retryWrites=true&w=majority")



app.post("/login", (req, res) =>{ // API endpoint
    const {name, pw} = req.body;
    UserModel.findOne({name:name})
    .then(user => {
        if(user) {
            if(user.pw === pw){
                res.json(
                    {status:"Success",
                    name:user.name,
                    id: user._id})
            } else{
                res.json(
                    {status:"Wrong Password",
                    user: null})
            }
        } else{
            res.json(
                {status:"No User Exists",
                    user: null}
            )
        }
    })
})

app.get('/checkFriends', (req, res) => {
    try {
        const person1 = req.query.person1;
        const person2 = req.query.person2;
        FriendReqModel.findOne({
            $or: [
                {$and: [{friender: person1},{recipient: person2},{accepted: true}]},
                {$and: [{friender: person2},{recipient: person1},{accepted: true}]}
            ]
        })
        .then(friendship => {
            var result = false;
            if (friendship) { result = true; }
            res.json({results: result})
        })
    } catch (error) {
        res.status(500).json(error);
    }
});

app.get('/getIncomingFriendRequests/:user', async (req, res) => {
    try {
        const user = req.params.user;
        FriendReqModel.find({recipient: user,accepted: false})
        .then(friendRequests => {
            res.json({friendRequests: friendRequests})
        })
    } catch (error) {
        res.status(500).json(error);
    }
});


////////////////////////////
//// WIP
////////////////////////////

  
app.post('/sendFriendRequest', (req, res) => {
    const {friender, recipient, timestamp} = req.body;
    const time_sent = Date.now();
    FriendReqModel.create({friender, recipient, timestamp:time_sent, accepted:false})
            .then(fReq => res.json({
                status: "Success",
                friendRequest: fReq}))
            .catch(err => res.json(err))
    // const {friender, recipient, accepted, timestamp} = req.body;

    /*
    FriendReqModel.find({
        $or: [
            {$and: [{friender: req.params.friender},{recipient: req.params.recipient}]},
            {$and: [{friender: req.params.recipient},{recipient: req.params.friender}]}
        ]
    })
    .then(user => {
        if(user) {
            res.json({
                status: "Failure",
                user: null
            })
        } else{
            UserModel.create({name,pw, color, count:0})
            .then(user => res.json({
                status: "Success",
                user: user}))
            .catch(err => res.json(err))
        }
    })
    */
})


/*
app.get('/checkFriends/:person1/:person2', (req, res) => {
    FriendReqModel.find({
        $or: [
            {$and: [{friender: req.params.person1},{recipient: req.params.person2}]},
            {$and: [{friender: req.params.person2},{recipient: req.params.person1}]}
        ]
    }, function (err, results) {
        if (err) {
            res.json(err);
        } else {
            res.json({"result": false});
        }
    })
})
*/


app.get('/getIncomingFriendRequests/:user_id', async (req, res) => {
    try {
    const incomingFriends = await FriendReqModel.find({recipient: req.params.user_id, accepted: false});
    res.json(incomingFriends);
    } catch (error) {
    res.status(500).json(error);
    }
});

app.get('/getOutgoingFriendRequests/:user_id', async (req, res) => {
    try {
    const incomingFriends = await FriendReqModel.find({friender: req.params.user_id, accepted: false});
    res.json(incomingFriends);
    } catch (error) {
    res.status(500).json(error);
    }
});

app.get('/getFriends/:user_id', async (req, res) => {
    FriendReqModel.find({})
});

/*
app.delete('/deleteFriendRequest/:user_id', async (req, res) => {
  }); 
*/

app.post('/register', (req, res) =>{ // request, response
    const {name, pw, color} = req.body

    UserModel.findOne({name:name})
    .then(user => {
        if(user) {
            res.json({
                status: "Failure",
                user: null
            })
        } else{
            UserModel.create({name,pw, color, count:0})
            .then(user => res.json({
                status: "Success",
                user: user}))
            .catch(err => res.json(err))
        }
    })
})

app.get('/getUserData', async (req, res) => {
    try {
        const _id = req.query; // Modify the query parameter to "_id"
        const query = _id ? { _id } : {};
        
        const user = await UserModel.findOne(query);
        res.json(user);
    } catch (error) {
      res.status(500).json(error);
    }
});

app.get('/getUserId', async (req, res) => {
    try {
        const { name } = req.query;
        const query = name ? { name } : {};
        
        const user = await UserModel.findOne(query);
        res.json({
            id:user._id
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

app.put('/updateUserCount/:id', async (req, res) => {
    try {
        const { id } = req.params; // Get the ID of the user to update from the URL parameter
        const { count } = req.body; // Get the new count value from the request body

        // Use Mongoose to update the count field for the specified user
        const updatedUser = await UserModel.findByIdAndUpdate(id, { $set: { count } }, { new: true });

        res.json(updatedUser);
    } catch (error) {
        res.status(500).json(error);
    }
});

app.put('/updateUserColor/:id', async (req, res) => {
    try {
        const { id } = req.params; // Get the ID of the user to update from the URL parameter
        const { color } = req.body; // Get the new count value from the request body

        // Use Mongoose to update the count field for the specified user
        const updatedUser = await UserModel.findByIdAndUpdate(id, { $set: { color } }, { new: true });

        res.json(updatedUser);
    } catch (error) {
        res.status(500).json(error);
    }
});

app.delete('/deleteDocument/:id', async (req, res) => {
    const { id } = req.params; // Get the ID from the URL parameter
  
    try {
      const deletedDocument = await UserModel.findByIdAndDelete(id);
      if (!deletedDocument) {
        return res.status(404).json({ error: 'Document not found' });
      }
      res.json({ message: 'Document deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  });


  app.put('/updateUserBio/:id', async (req, res) => {
    try {
        const { id } = req.params; // Get the ID of the user to update from the URL parameter
        const { bio } = req.body; // Get the new bio value from the request body

        // Use Mongoose to update the bio field for the specified user
        const updatedUser = await UserModel.findByIdAndUpdate(id, { $set: { bio } }, { new: true });

        res.json(updatedUser);
    } catch (error) {
        res.status(500).json(error);
    }
});

app.put('/updateProfilePicture/:id', async (req, res) => {
    try {
        const { id } = req.params; // Get the ID of the user to update from the URL parameter
        const { profilepicture } = req.body; // Get the new bio value from the request body

        // Use Mongoose to update the bio field for the specified user
        const updatedUser = await UserModel.findByIdAndUpdate(id, { $set: { profilepicture } }, { new: true });

        res.json(updatedUser);
    } catch (error) {
        res.status(500).json(error);
    }
});

app.listen(3001, () =>{ // Start on this port
    console.log("server is running")
})