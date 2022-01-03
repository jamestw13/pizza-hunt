const {Schema, model} = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const PizzaSchema = new Schema(
  {
    pizzaName: {
      type: String,
      required: 'A pizza needs a name',
      trim: true,
    },
    createdBy: {
      type: String,
      required: 'A pizza needs a creator',
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal),
    },
    size: {
      type: String,
      required: true,
      enum: ['Personal', 'Small', 'Medium', 'Large', 'Extra Large'],
      default: 'Large',
    },
    toppings: [],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

PizzaSchema.virtual('commentCount').get(function () {
  return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0);
});

const Pizza = model('Pizza', PizzaSchema);

module.exports = Pizza;
