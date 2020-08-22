"use strict";
module.exports = (app) => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const crawelSchema = new Schema({
        id: mongoose.Schema.ObjectId,
        reptileName: String,
        hash: String,
        url: String,
        author: String,
        cover: String,
        title: String,
        heat: String,
        tag: String,
        bigType: String,
        createDate: String,
    });

    return mongoose.model("Crawel", crawelSchema);
};
