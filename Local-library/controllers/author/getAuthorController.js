const Author = require('../../models/author');
const { ResourceNotFoundError } = require('../../shared');

const authorList = (req, res, next) => {
  Author.find()
    .sort({'familyName': 1})
    .exec()
    .then(authors => {
      res.status(200).json({data: authors});
    }).catch(error => next(error));
};

const authorDetail = (req, res, next) => {
  Author.findById(req.params.id)
    .exec()
    .then(author => {
      if(author === null) {
        const error = new ResourceNotFoundError('Author not found');
        return next(error);
      }
      res.status(200).json({data: author});
    }).catch(error => next(error));
};

module.exports = {
  authorList,
  authorDetail
};