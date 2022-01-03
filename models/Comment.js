const {Schema, model, Types} = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReplySchema = new Schema(
  {
    // Custom id for reply
    replyId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    replyBody: {
      type: String,
      required: 'Reply must contain text.',
      trim: true,
    },
    writtenBy: {
      type: String,
      required: 'A reply needs a replier.',
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal),
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const CommentSchema = new Schema(
  {
    writtenBy: {
      type: String,
      required: 'A comment needs a commenter.',
      trim: true,
    },
    commentBody: {
      type: String,
      required: 'A comment needs text.',
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal),
    },
    replies: [ReplySchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

CommentSchema.virtual('replyCount').get(function () {
  return this.replies.length;
});

const Comment = model('Comment', CommentSchema);

module.exports = Comment;
