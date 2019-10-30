const {
    model,
    Schema,
    Schema: {
        Types: { ObjectId }
    }
} = require('mongoose');

const NOTIFICATION = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    type: {
        type: String
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    url: {
        type: String
    },
    readed: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = model('Notification', NOTIFICATION);
