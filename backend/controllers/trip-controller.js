// const TripDetails = require("../model/tripdetails");
// const createtrip = async (req, res) => {
//     console.log("Create trip request body:\n", req.body);
//     try {
//         const userid = req.userId;
//         const { title, destination, date, budget, description } = req.body;
//         const leader = userid;
//         const members = [userid];
//         const newTrip = new TripDetails({
//             title,
//             destination,
//             leader,
//             members,
//             date,
//             budget,
//             description
//         });
//         await newTrip.save();
//         res.status(201).json({ message: "Trip created successfully", trip: newTrip })
//     }
//     catch (err) {
//         console.error("Create trip error:", err);
//         res.status(500).json({ message: "Server error" });
//     }
// };
// const gettrips = async (req, res) => {
//     try {
//         const userId = req.userId;

//         const trips = await TripDetails.find({
//             $or: [
//                 { leader: userId },
//                 { "members.user": userId }
//             ]
//         })
//             .populate("leader", "name")
//             .populate("members.user", "name");

//         res.status(200).json({
//             message: "Trips fetched successfully",
//             trips
//         });

//     } catch (err) {
//         console.error("Get trips error:", err);
//         res.status(500).json({
//             message: "Server error"
//         });
//     }
// };
// //get trip by id
// const getTripusers = async (req, res) => {
//     try {
//         const { tripId } = req.params;

//         const trip = await TripDetails.findById(tripId)
//             .populate("members.user", "name");

//         if (!trip) {
//             return res.status(404).json({
//                 message: "Trip not found"
//             });
//         }

//         const members = trip.members.map(member => ({
//             id: member.user._id,
//             name: member.user.name
//         }));

//         return res.status(200).json({
//             message: "Trip members fetched successfully",
//             members
//         });

//     } catch (err) {
//         console.error("Get trip users error:", err);

//         return res.status(500).json({
//             message: "Server error"
//         });
//     }
// };

// const joinTripByInvite = async (req, res) => {
//     try {
//         const { tripId } = req.params;
//         const { inviteCode } = req.body;
//         const userId = req.userId;

//         const trip = await TripDetails.findById(tripId);

//         if (!trip) {
//             return res.status(404).json({
//                 message: "Trip not found"
//             });
//         }

//         // Check invite code
//         if (trip.inviteCode !== inviteCode) {
//             return res.status(400).json({
//                 message: "Invalid invitation code"
//             });
//         }

//         // Check if user is already leader
//         if (trip.leader.toString() === userId) {
//             return res.status(400).json({
//                 message: "Leader is already part of this trip"
//             });
//         }

//         // Check if already a member
//         const alreadyMember = trip.members.some(
//             member => member.user.toString() === userId
//         );

//         if (alreadyMember) {
//             return res.status(400).json({
//                 message: "User already joined this trip"
//             });
//         }

//         // Add member
//         trip.members.push({
//             user: userId,
//             status: "approved" // or "pending"
//         });

//         await trip.save();

//         return res.status(200).json({
//             message: "Successfully joined trip",
//             trip
//         });

//     } catch (err) {
//         console.error("Join Trip Error:", err);

//         return res.status(500).json({
//             message: "Server Error"
//         });
//     }
// };
// module.exports = {
//     createtrip,
//     gettrips,
//     joinTripByInvite,
//     getTripusers
// }
const TripDetails = require("../model/tripdetails");

// Create Trip
const createtrip = async (req, res) => {
    try {
        const userId = req.userId;
        const { title, destination, date, budget, description } = req.body;

        const newTrip = new TripDetails({
            title,
            destination,
            leader: userId,
            members: [
                {
                    user: userId,
                    status: "approved"
                }
            ],
            date,
            budget,
            description
        });

        await newTrip.save();

        return res.status(201).json({
            message: "Trip created successfully",
            trip: newTrip
        });

    } catch (err) {
        console.error("Create trip error:", err);

        return res.status(500).json({
            message: "Server error"
        });
    }
};

// Get all trips of logged-in user
const gettrips = async (req, res) => {
    try {
        const userId = req.userId;

        const trips = await TripDetails.find({
            $or: [
                { leader: userId },
                { "members.user": userId }
            ]
        })
            .populate("leader", "name")
            .populate("members.user", "name");

        return res.status(200).json({
            message: "Trips fetched successfully",
            trips
        });

    } catch (err) {
        console.error("Get trips error:", err);

        return res.status(500).json({
            message: "Server error"
        });
    }
};

// Get members of a trip
const getTripusers = async (req, res) => {
    try {
        const { tripId } = req.params;

        const trip = await TripDetails.findById(tripId)
            .populate("members.user", "name");

        if (!trip) {
            return res.status(404).json({
                message: "Trip not found"
            });
        }
        console.log("Trip members fetched:", trip.members);

        return res.status(200).json({
            message: "Trip members fetched successfully",
            members: trip.members
        });
        console.log(JSON.stringify(trip.toObject(), null, 2));
        const alreadyMember = trip.members.some(
            member => member.user.toString() === userId.toString()
        );

        if (alreadyMember) {
            return res.status(400).json({
                message: "User is already a member of this trip."
            });
        }

    } catch (err) {
        console.error("Get trip users error:", err);

        return res.status(500).json({
            message: "Server error"
        });
    }
};

// Join Trip
const joinTripByInvite = async (req, res) => {
    try {
        const { tripId } = req.params;
        const { inviteCode } = req.body;
        const userId = req.userId;

        const trip = await TripDetails.findById(tripId);

        if (!trip) {
            return res.status(404).json({
                message: "Trip not found"
            });
        }
        console.log("Trip code:", trip.inviteCode);
        trip.members.forEach(member => {
            console.log("Member ID:", member);
        });

        if (trip.inviteCode !== inviteCode) {
            return res.status(400).json({
                message: "Invalid invitation code"
            });
        }

        if (trip.leader.toString() === userId) {
            return res.status(400).json({
                message: "Leader is already a member of this trip"
            });
        }

        const alreadyMember = trip.members.some(member =>
            member.user && member.user.equals(userId)
        );

        if (alreadyMember) {
            return res.status(400).json({
                message: "User already joined this trip"
            });
        }

        trip.members.push({
            user: userId,
            status: "approved"
        });

        await trip.save();

        return res.status(200).json({
            message: "Successfully joined trip"
        });

    } catch (err) {
        console.error("Join Trip Error:", err);

        return res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = {
    createtrip,
    gettrips,
    getTripusers,
    joinTripByInvite
};