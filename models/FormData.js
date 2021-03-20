const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FormAnswerSchema = new Schema({
  form_id: {
    type: String,
  },
  date_answered: {
    type: Number,
  },
  form_fields_answer: {
    type: Array,
  },
  form_creator: {
    type: String,
  },
  form_title: {
    type: String
  }
});

const FormAnswer = mongoose.model("FormAnswer", FormAnswerSchema);

module.exports = FormAnswer;
