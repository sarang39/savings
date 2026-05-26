const TripDetails = require("../model/tripdetails");
const createtrip = async (req, res) => {
    console.log("Create trip request body:\n", req.body);
    try {
        const userid = req.userId;
        const { title, destination, date, budget, description } = req.body;
        const leader = userid;
        const members = [userid];
        const newTrip = new TripDetails({
            title,
            destination,
            leader,
            members,
            date,
            budget,
            description
        });
        await newTrip.save();
        res.status(201).json({ message: "Trip created successfully", trip: newTrip })
    }
    catch (err) {
        console.error("Create trip error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

const gettrips = async (req, res) => {
    try {
        const userId = req.userId;
        const trips = await TripDetails.find({
            $or: [
                { leader: userId },
                { members: { $in: [userId] } }
            ]
        })
            .populate("leader", "name")
            .populate("members", "name"); res.status(200).json({ message: "Trips fetched successfully", trips });
    } catch (err) {
        console.error("Get trips error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    createtrip,
    gettrips
}