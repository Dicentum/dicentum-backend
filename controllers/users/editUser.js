const User = require("../../models/users");
const ParliamentaryGroup = require("../../models/parliamentaryGroup");
const Image = require("../../models/image");

const checkUserExists = async (id) => {
    const user = await User.findById(id);
    if (!user) {
        throw new Error('User not found');
    }
    return user;
};

const checkEmailExists = async (email, id) => {
    const existingEmail = await User.findOne({ email: email.toString() });
    if (existingEmail && existingEmail._id.toString() !== id) {
        throw new Error('Email is already taken');
    }
};

const updateUserDetails = async (user, details, file) => {
    if ('name' in details) user.name = details.name;
    if ('surname' in details) user.surname = details.surname;
    if ('description' in details) user.description = details.description;
    if ('role' in details) user.role = details.role;
    if ('phone' in details) user.phone = details.phone;
    if ('city' in details) user.city = details.city;
    if ('country' in details) user.country = details.country;

    if (file) {
        if(file.mimetype == 'image/jpg' || file.mimetype == 'image/png' || file.mimetype == 'image/jpeg') {
          //  if(file.mimetype == 'image/jpeg') file.filename = file.filename + '.jpeg';
           // if(file.mimetype == 'image/png') file.filename = file.filename + '.png';
            //if(file.mimetype == 'image/jpg') file.filename = file.filename + '.jpg';
            //console.log(file);
            const image = new Image({
                filename: file.filename,
                path: file.path
            });
            await image.save();
            user.photo = image._id;
        } else {
            throw new Error('Invalid file type');
        }
    }

    if ('parliamentaryGroupRequest' in details) user.parliamentaryGroupRequest = details.parliamentaryGroupRequest;
};

const editUser = async function (req, res) {
    try {
        console.log(req.file);
        const user = await checkUserExists(req.params.id);
        await updateUserDetails(user, req.body, req.file);
        await checkEmailExists(user.email, req.params.id);

        const updatedUser = await user.save();
        return res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Error: "+error });
    }
};

module.exports = { editUser };