import mongoose from "mongoose";

const mediaContentSchema = mongoose.Schema(
    {
      title: {
        type: String,
        required: true
      },
      type: {
        type: String,
        enum: ['article', 'video', 'audio', 'image'],
        required: true
      },
      description: {
        type: String,
        required: true
      },
      contentUrl: {
        type: String,
        required: true
      },
      tags: {
        type: [String],
        required: true
      },
      publishDate: {
        type: Date,
        required: true
      },
      views: {
        type: Number,
        default: 0
      },   
      likes: {
        type: Number,
        default: 0
      },
      comments: {
        type: Number,
        default: 0
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }      
    },
    {
        timestamps: true,
    }
);

export const MediaContent = mongoose.model('MediaContent', mediaContentSchema);
