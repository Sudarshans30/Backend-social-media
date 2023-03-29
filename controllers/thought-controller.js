const { Thought, User } = require('../models');


module.exports = {
    // Function to get all of the thoughts by invoking the find() method with no arguments.
    // Then we return the results as JSON, and catch any errors. Errors are sent as JSON with a message and 500 status code
    getThoughts(res, req) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },

    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));

    },

    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $addToSet: { thoughts: thought._id } },
                    { new: true }
                );
            })
            .then((user) =>
                !user
                    ? res.status(404).json({
                        message: 'Thought created, but found no user with that ID',
                    })
                    : res.json('Created the thought'))
            .catch((err) => {
                console.log(err);
            });
    },

    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with thid Id' })
                    : res.json(thought))

            .catch((err) => {
                console.log(err)
                res.status(500).json(err);
            });
    },


    deleteThought(req, res) {
        thought.findOneAndRemove({
            _id: req.params.thoughtId
        })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with this Id' })
                    : User.findOneAndUpdate(
                        { thoughts: req.params.thoughtId },
                        { $pull: { applications: req.params.thoughtId } },
                        { new: true }
                    ))
            .then((user) =>
                !user
                    ? res.status(404).json({
                        message: 'Thought created but no user with this id',
                    })
                    : res.json({ message: 'Thought successfully deleted' }))
            .catch((err) => res.status(500).json(err))
    },
    addTag(req, res) {
        Thought.findOneAndUpdate(

        )
            .then((thought) =>
                !thought
                    ? res.status(400).json({ message: 'No thought with this id' })
                    : res.json(thought))
            .catch((err) => res.status(500).json(err));
    },
    removeTag(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { tags: { tagId: req.params.tagId } } },
            { runValidators: true, new: true }

        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No though with this id' })
                    : res.json(thought))
            .catch((err) => res.status(500).json(err));
    },

};