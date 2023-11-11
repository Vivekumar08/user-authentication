// mongodb queires global service
exports.create = async (model, body) => {
    return await model.create(body);
};
// create Many
exports.createMany = async (model, body) => {
    return await model.insertMany(body, {validateBeforeSave: true});
};

// find and filter
exports.find = async (model, filter = {}, pagination = {}, sort = {}, projection = {}) => {
    return await model.find(filter, projection).sort(sort).skip(pagination.skip).limit(pagination.limit);
};

exports.findOne = async (model, filter, projection = {}) => {
    return await model.findOne(filter, projection);
};

exports.findByID = async (model, id) => {
    return await model.findById(id);
};

exports.countDocuments = async (model, filter) => {
    return await model.countDocuments(filter);
};

// updates
exports.bulkWrite = async (model, body) => {
    return await model.bulkWrite(body);
}


exports.findOneAndUpdate = async (model, filter, body) => {
    return await model.findOneAndUpdate(filter, body, { new: true, useFindAndModify: false });
};

exports.findOneAndUpdateArray = async (model, filter, body, arrayFilters) => {
    return await model.findOneAndUpdate(filter, body, arrayFilters);
};

exports.findOneAndUpsert = async (model, filter, body) => {
    return await model.findOneAndUpdate(filter, body, { new: true, upsert: true, runValidators: true, context: "query", setDefaultsOnInsert: true });
};

exports.updateMany = async (model, filter, body) => {
    return await model.updateMany(filter, body, { new: true });
};

// delete
exports.findOneAndDelete = async (model, filter) => {
    return await model.findOneAndDelete(filter);
};

exports.deleteMany = async (model, filter) => {
    return await model.deleteMany(filter);
};

// aggregation
exports.aggregate = async (model, query) => {
    return await model.aggregate(query).collation({ locale: 'en_US', strength: 1 });
};

//distinct values
exports.distinct = async (model, field, query = {}, options = {}) => {
    return await model.distinct(field, query);
};
