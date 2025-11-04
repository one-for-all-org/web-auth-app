import User from "../models/user.model.js";

const checkEmail = async (email) => {
    const existingUser = await User.findOne({ where: { email } });
    return !!existingUser;
};

export default checkEmail;
