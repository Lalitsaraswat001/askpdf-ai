const mongoose = require("mongoose");

const pdfSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
      required: true,
    },

    filepath: {
      type: String,
      required: true,
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Pdf", pdfSchema);