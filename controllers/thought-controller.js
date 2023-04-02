
const { User, Thought } = require('../models');

module.exports = {
   
      getThoughts(req, res) {
        Thought.find()
          .sort({ createdAt: -1 })
          .then(dbThoughtData => {
            res.json(dbThoughtData);
          })
          .catch(err => {
            console.log(err);
            res.status(500).json(err);
          });
      },
    
      getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
          .then(dbThoughtData => {
            if (!dbThoughtData) {
              return res.status(404).json({ message: 'No thought with this id' });
            }
            res.json(dbThoughtData);
          })
          .catch(err => {
            console.log(err);
            res.status(500).json(err);
          });
      },
    
      createThought(req, res) {
        Thought.create(req.body)
          .then(dbThoughtData => {
            return User.findOneAndUpdate(
              { _id: req.body.userId },
              { $push: { thoughts: dbThoughtData._id } },
              { new: true }
            );
          })
          .then(dbUserData => {
            if (!dbUserData) {
              return res.status(404).json({ message: 'Thought created but no user with this id found' });
            }
            res.json({ message: 'Thought successfully created' });
          })
          .catch(err => {
            console.log(err);
            res.status(500).json(err);
          });
      },
    
      updateThought(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $set: req.body },
          { runValidators: true, new: true }
        )
          .then(dbThoughtData => {
            if (!dbThoughtData) {
              res.status(404).json({ message: 'No thought with this id' });
            }
            res.json(dbThoughtData);
          })
          .catch(err => {
            console.log(err);
            res.status(500).json(err);
          });
      },
      deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
        .then((thought) =>
            !thought
            ? res.status(404).json({ message: 'No thought with that ID' })
            : res.json({ message: 'thought  deleted!' })
        )
        
        .catch((err) => res.status(500).json(err));
    },

    addReaction(req, res) {

        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { reactions: req.body } },
            { new: true, runValidators: true }
        )
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    return res.status(404).json({ message: 'No thought with this id' });
                }
                res.json(dbThoughtData);
            })
            .catch((err) => res.json(err));


    },
    deleteReaction(req, res) {


        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        )
            .then((dbThoughtData) => res.json(dbThoughtData))
            .catch((err) => res.json(err));

        }
    };
  

