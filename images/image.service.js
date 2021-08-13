const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Image = db.Image;
const User = db.User;

module.exports = {
    authenticate,
    getAll,
    getAllImgs,
    getById,
    create,
    update,
    delete: _delete
};

async function authenticate({ username, password }) {
    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.hash)) {
        const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });
        return {
            ...user.toJSON(),
            token
        };
    }
}

async function getAll() {
    return await User.find();
}
async function getAllImgs() {
    return await Image.find();
}

async function getById(id) {
    return await Image.findById(id);
}

async function create(imageParam) {
    // validate
    if (await Image.findOne({ filename: imageParam.filename })) {
        throw 'Imagename "' + imageParam.filename + '" is already exist';
    }

    const image = new Image(imageParam);

    // hash password
    if (imageParam.password) {
        image.hash = bcrypt.hashSync(imageParam.password, 10);
    }

    // save image
    await image.save();
}

async function update(id, imageParam) {
    const image = await Image.findById(id);

    // validate
    if (!image) throw 'image not found';
    if (image.filename !== imageParam.filename && await Image.findOne({ filename: imageParam.filename })) {
        throw 'filename "' + imageParam.filename + '" is already taken';
    }

    // hash password if it was entered
    if (imageParam.password) {
        imageParam.hash = bcrypt.hashSync(imageParam.password, 10);
    }

    // copy imageParam properties to image
    Object.assign(image, imageParam);

    await image.save();
}

async function _delete(id) {
    await Image.findByIdAndRemove(id);
}