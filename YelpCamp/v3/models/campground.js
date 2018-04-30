var mongoose = require('mongoose');

// ==================== SCHEMA ==================== \\
var campSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comments: [
        {
           type: mongoose.Schema.Types.ObjectId,
           ref: "comment"
        } 
    ]
});

module.exports = mongoose.model('campground', campSchema);