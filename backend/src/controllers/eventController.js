const Event = require('../models/Event');

// Get all events for a school
exports.getEvents = async (req, res) => {
    try {
        const events = await Event.find({ schoolId: req.user.schoolId })
            .sort({ eventDate: -1 });
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get single event
exports.getEvent = async (req, res) => {
    try {
        const event = await Event.findOne({ _id: req.params.id, schoolId: req.user.schoolId });
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create event
exports.createEvent = async (req, res) => {
    try {
        const event = new Event({ ...req.body, schoolId: req.user.schoolId });
        await event.save();
        res.status(201).json(event);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update event
exports.updateEvent = async (req, res) => {
    try {
        const event = await Event.findOneAndUpdate(
            { _id: req.params.id, schoolId: req.user.schoolId },
            req.body,
            { new: true, runValidators: true }
        );
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.json(event);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete event
exports.deleteEvent = async (req, res) => {
    try {
        const event = await Event.findOneAndDelete({ _id: req.params.id, schoolId: req.user.schoolId });
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.json({ message: 'Event deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
