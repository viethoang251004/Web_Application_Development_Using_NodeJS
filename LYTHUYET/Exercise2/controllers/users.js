const User = require("../model/users")

const read_user = async (req, res, next) => {
    try {
        const users = await User.find(); 
        res.json(users);
    } catch (err) {
        next(err); 
    }
};


const read_user_by_id = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id); 
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        res.json(user);
    } catch (err) {
        next(err);
    }
};


const add_user = async (req, res, next) => {
    try {
        const newUser = new User(req.body); 
        const savedUser = await newUser.save(); 
        res.status(201).json(savedUser);
    } catch (err) {
        next(err); 
    }
};


const put_user = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body, 
            { new: true, runValidators: true } 
        );
        if (!updatedUser) {
            return res.status(404).json({ msg: "User not found" });
        }
        res.json(updatedUser);
    } catch (err) {
        next(err);
    }
};

const delete_user = async (req, res, next) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id); 
        if (!deletedUser) {
            return res.status(404).json({ msg: "User not found" });
        }
        res.json({ msg: "User deleted" });
    } catch (err) {
        next(err);
    }
};


module.exports = {
    read_user,
    read_user_by_id,
    add_user,
    put_user,
    delete_user
}