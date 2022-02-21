const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');

const Track = mongoose.model('Track');

const router = express.Router();
//make sure user is signed in
router.use(requireAuth);
// request all the tracks by using user._id and send back tracks
router.get('/tracks', async (req, res) => {
    const tracks = await Track.find({ userId: req.user._id });

    res.send(tracks);
});
//post a track by inputing a name, location and user._id
router.post('/tracks', async (req, res) => {
    const { name, locations } = req.body;

    if (!name || !locations) {
        return res
            .status(422)
            .send({ error: 'You must provide a name and locations' });
    }

    try {
        const track = new Track({ name, locations, userId: req.user._id });
        await track.save();
        res.send(track);
    } catch (err) {
        res.status(422).send({ error: err.message });
    }
});

module.exports = router;