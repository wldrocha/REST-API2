const fs = require('fs');
const path = require('path');
const base64Img = require('base64-img');
const cluster = require('cluster');


exports.getExtension = function (file, name) {
    let extension = file.split('.').pop();
    let fileName = `${name}.${extension}`;
    return fileName;
};

exports.decode64 = (fileName, imagesCode64) => {
    return new Promise((resolve, reject) => {
        base64Img.img(imagesCode64, 'public/images', fileName, function (err, filePath) {
            if (filePath) {
                resolve((filePath));
            }
            else {
                reject(err);
            }
        });
    })
};

exports.cluster = (req, res) => {
    if (cluster.isMaster) {
        console.log('I am master');
        cluster.fork();
        cluster.fork();
    } else if (cluster.isWorker) {
        console.log('I am worker #' + cluster.worker.id);
        res.status(200).json({
            message: 'Api is running in cluster.',
            worker: 'I am worker #' + cluster.worker.id
        });
    }
};

exports.uploadImages = (pictures, userID, route) => {
    return new Promise(function (resolve, reject) {
        var newPictures = [];
        pictures.forEach((picture, i) => {
            let uploadPath = path.normalize(process.cwd() + `/public/${route}/`);

            // In case the '/uploads' directory doesn't exist
            if (!fs.existsSync(uploadPath)) {
                fs.mkdirSync(uploadPath);
            }

            // Decoding the base64 image
            var base64Image = picture.img.replace(/^data:image\/[a-z]+;base64,/, "");
            // let data = Buffer.from(base64Image, 'base64');

            // Creating the name for the file --> random + userID + timestamp + extension
            let filename = Math.floor((Math.random() * 9999999) + 1111111).toString() + '-' + userID + '-' + new Date().getTime().toString() + '.' + picture.filetype;

            // Writing the image to filesystem
            fs.writeFile(uploadPath + filename, base64Image, 'base64', function (err) {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        error: 'Cannot upload the image. Sorry.'
                    });
                }
                console.log('SAVED ON HD');
                let newImg = {
                    img: filename
                }
                newPictures.push(newImg);
            })
            if (i == pictures.length - 1) {
                setTimeout(() => resolve(newPictures), 100);
            }
        });
    })
}