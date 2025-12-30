const Imagekit = require('imagekit');

const imagekit = new Imagekit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function uploadfile(file, fileName) {

    const response = await imagekit.upload({
        file: file,
        fileName: fileName,
        folder: "post"
    });
    return response;
}

module.exports = uploadfile;