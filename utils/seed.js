const { connect } = require('mongoose');
const connection = require('../config/connection');
const { User, Thought } = require('../models');

connection.on('error',(err) => err);
connection.once('open', async () => {
    console.log('Connected to MongoDB');
    await User.deleteMany();
    await Thought.deleteMany();
    const dbUserData = require('./userData.json');
    const dbThoughtData = require('./thoughtData.json');
    const users = await User.create(dbUserData);
    const thoughts = await Thought.create(dbThoughtData);
    const user = users[0];
    const thought = thoughts[0];
    await User.updateMany({}, { $set: { friends: [user._id] } });
    await Thought.updateMany({}, { $set: { username: user.username, userId: user._id } });
    console.log('Database seeded');
    process.exit(0);

        
})