const roleRestriction = (...allowedRoles)=>{
    return (req, res, next) => {
        const userRole = req.userAuth?.role; // Assuming `req.user` contains the user data from a decoded JWT
        if (!userRole) {
            return res.status(403).json({ message: "Access denied. No role found." });
        }
        if (allowedRoles.includes(userRole)) {
            next(); // User has one of the allowed roles, proceed to the route
        } else {
            res.status(403).json({ message: "Access denied. Insufficient permissions." });
        }
    };
} 

module.exports = roleRestriction;