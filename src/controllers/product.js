const {
    tokens: { secretKey }
} = require('../app.config');
const { verify } = require('jsonwebtoken');
const Product = require('../models/product');
const { uploadImages } = require('./globalController');

exports.getProduct = async (req, res) => {
    let { id } = req.params;
    try {
        let product = await Product.findOne({ '_id': id });
        res.status(200).json({
            product
        });
    } catch (error) {
        res.status(500).json({
            message: 'Ocurrio un problema en el servidor',
            error
        });
    }

};

exports.listAll = async (req, res) => {

    try {
        let products = await Product.find();
        res.status(200).json({
            products
        });
    } catch (error) {
        res.status(401).json({
            message: 'No tienes autorización para seguir',
            error
        });
    }
};

/* add one Product */
exports.addProduct = async (req, res) => {

    if (req.headers && req.headers.authentication) {
        var authentication = req.headers.authentication,
            decoded;
        try {
            decoded = verify(authentication.split(' ')[1], secretKey);
        } catch (e) {
            return res.status(401).send('Unauthorized.');
        }

        let images = '';
        if (req.body.pictures) {
            try {
                images = await uploadImages(req.body.pictures, decoded.userId, 'products')
                console.log(images)
            } catch (error) {
                console.log('error', error)
            }

        }
        let product = {
            name: req.body.name,
            code: req.body.code,
            description: req.body.description,
            pictures: images,
            price: req.body.price,
            quantity: req.body.quantity,
            supplier: req.body.supplier,
            size: req.body.size[0]
        }
        const newProduct = new Product(product);

        product = await newProduct.save()
            .then(result => {
                res.status(201).json({
                    message: 'Product saved successfuly.',
                    newProduct: product
                });
            }).catch(err => {
                res.status(400).json({
                    message: 'Failed to save Product.',
                    error: err
                });
            });
    }

};

/* Update product */
exports.updateProduct = (req, res) => {
    const id = req.params.productID;
    Product.update({ _id: id }, {
        $set: {
            name: req.body.name,
            price: req.body.price
        }
    }).exec()
        .then(result => {
            res.status(200).json({
                message: 'Product updated sucessfully.',
                result: result
            });
        })
        .catch(err => {
            res.status(400).json({
                message: 'Product not found.',
                error: err
            })
        });
};
/* add comments to product */
// exports.addComment = async (req, res) => {
//     if (req.headers && req.headers.authentication) {
//         var authentication = req.headers.authentication,
//             userID, decoded;
//         try {
//             decoded = jwt.verify(authentication.split(' ')[1], config.tokens.secretKey);
//         } catch (e) {
//             return res.status(401).send('Unauthorized.');
//         }

//         let comment = {
//             user: decoded.userId,
//             comment: req.body.comment,
//             rating: req.body.rating
//         }
//         let productID = req.params.productID;
//         Product.update({ _id: productID }, { $push: { comments: comment } }).exec()
//             .then(result => {
//                 Product.findById(productID)
//                     .then(product => {
//                         let notification = new Notification({
//                             userID: product.userID,
//                             type: 'Comment',
//                             description: comment.comment,
//                             title: 'Has recibido un comentario en tu producto ' + product.name,
//                             url: 'product/details/' + product._id
//                         })
//                         notification.save()
//                             .then(result => {
//                                 let userN = await User.findOne({ '_id': product.userID })
//                                 notificationsController.addNotificationPushFCM(notification, product.userID, userN.pushToken)
//                                     .then(async response => {
//                                         console.log('NOTIFICATIONS_' + product.userID);
//                                         global.io.emit('NOTIFICATIONS_' + product.userID, notification);
//                                         res.status(200).json({
//                                             message: 'Added comment sucessfully.',
//                                             userID: decoded.userId,
//                                             comment
//                                         });
//                                     });
//                             })
//                             .catch(err => {
//                                 res.status(400).json({
//                                     message: 'Failed to saved Notification',
//                                     error: err
//                                 })
//                             });
//                     })
//             })
//             .catch(err => {
//                 res.status(400).json({
//                     message: 'Product not found.',
//                     error: err
//                 })
//             });
//     }
// };

// /* update question of product */
// exports.updateComment = (req, res) => {
//     if (req.headers && req.headers.authentication) {
//         var authentication = req.headers.authentication,
//             decoded;
//         try {
//             decoded = jwt.verify(authentication.split(' ')[1], config.tokens.secretKey);
//         } catch (e) {
//             return res.status(401).send('Unauthorized.');
//         }

//         let question = {
//             user: decoded.userId,
//             question: req.body.question,
//         }
//         const productID = req.params.productID;
//         const commentID = req.body.commentID

//         Product.updateOne({ _id: productID, "comments._id": commentID }, { $set: { 'questions.$question': question } })
//             .then(result => {
//                 res.status(200).json({
//                     message: 'added question sucessfully.',
//                     result: result
//                 });
//             })
//             .catch(err => {
//                 res.status(400).json({
//                     message: 'Product not found.',
//                     error: err
//                 })
//             });
//     }
// }
// /* add questions to product */
// exports.addQuestion = async (req, res) => {
//     if (req.headers && req.headers.authentication) {
//         var authentication = req.headers.authentication,
//             decoded;
//         try {
//             decoded = jwt.verify(authentication.split(' ')[1], config.tokens.secretKey);
//         } catch (e) {
//             return res.status(401).send('Unauthorized.');
//         }

//         let question = {
//             user: decoded.userId,
//             question: req.body.question
//         }
//         let productID = req.params.productID;
//         Product.update({ _id: productID }, { $push: { questions: question } }).exec()
//             .then(result => {
//                 Product.findById(productID)
//                     .then(product => {
//                         let notification = new Notification({
//                             userID: product.userID,
//                             type: 'Question',
//                             description: question.question,
//                             title: 'Alguien a preguntado en tu producto ' + product.name,
//                             url: 'product/details/' + product._id
//                         })
//                         notification.save()
//                             .then(result => {
//                                 let userN = await User.findOne({ '_id': product.userID })
//                                 notificationsController.addNotificationPushFCM(notification, product.userID, userN.pushToken)
//                                     .then(async response => {
//                                         console.log('NOTIFICATIONS_' + product.userID);
//                                         global.io.emit('NOTIFICATIONS_' + product.userID, notification)
//                                         res.status(200).json({
//                                             message: 'Added question sucessfully.',
//                                             userID: decoded.userId,
//                                             question
//                                         });
//                                     });

//                             })
//                             .catch(err => {
//                                 res.status(400).json({
//                                     message: 'Failed to saved Notification',
//                                     error: err
//                                 })
//                             });
//                     })
//             })
//             .catch(err => {
//                 res.status(400).json({
//                     message: 'Product not found.',
//                     error: err
//                 })
//             });
//     }
// };

// exports.addAnswerQuestion = async (req, res) => {
//     if (req.headers && req.headers.authentication) {
//         var authentication = req.headers.authentication,
//             decoded;
//         try {
//             decoded = jwt.verify(authentication.split(' ')[1], config.tokens.secretKey);
//         } catch (e) {
//             return res.status(401).send('Unauthorized.');
//         }

//         const questionID = req.params.questionID;
//         const answer = req.body.answer;
//         Product.findOneAndUpdate({ 'questions._id': questionID }, { $set: { 'questions.$.answer.answer': answer } }).exec()
//             .then(result => {
//                 Product.findOne({ 'questions._id': questionID })
//                     .then(product => {
//                         let question = product.questions.find(question => {
//                             return question._id == questionID;
//                         });
//                         let notification = new Notification({
//                             userID: product.userID,
//                             type: 'Answer',
//                             description: answer,
//                             title: 'Han respondido a tu pregunta en el producto ' + product.name,
//                             url: 'product/details/' + product._id
//                         })
//                         notification.save()
//                             .then(result => {
//                                 let userN = await User.findOne({ '_id': product.userID })
//                                 notificationsController.addNotificationPushFCM(notification, product.userID, userN.pushToken)
//                                     .then(async response => {
//                                         console.log('NOTIFICATIONS_' + question.user);

//                                         global.io.emit('NOTIFICATIONS_' + question.user, notification)
//                                         res.status(200).json({
//                                             message: 'Added answer sucessfully.',
//                                             userID: decoded.userId,
//                                             answer
//                                         });
//                                     });

//                             })
//                             .catch(err => {
//                                 res.status(400).json({
//                                     message: 'Failed to saved Notification',
//                                     error: err
//                                 })
//                             });
//                     })
//             })
//             .catch(err => {
//                 res.status(400).json({
//                     message: 'Product not found.',
//                     error: err
//                 })
//             });
//     }
// };

