const {
	tokens: { secretKey }
} = require('../app.config');
const Notification = require('../models/notification');

exports.getNotifications = async (req,res) => {
    const userID = req.params.userID;
    try {
        const notifications = await Notification.find({userID: userID}).exec();
        res.status(200).json({notifications})
    } catch (err) {
        res.json(400).json(`Error: ${err}`);
    }
};

exports.addNotification = async(req,res) => {
    const newNotification = new Notification(req.body);
    try {
        await newNotification.save();
        res.status(200).json({
            message: 'Notification saved succesfuly',
            newNotification
        })
    } catch (err) {
        res.status(400).json({
            message: 'Failed to saved Notification',
            error: err
        })
    }

};

exports.deleteNotification = async (req,res) => {
        
    const id = req.params.notificationID;
    Notification.updateOne({ _id: id },{$set: {'readed': true}}).exec()
    .then(result => {
         res.status(200).json({
              message: 'Notification deleted sucessfully.',
              deleted: true,
              result: result
         });
    })
    .catch(err => {
         res.status(400).json({
              message: 'Notification not found.',
              error: err
         })
    })
}