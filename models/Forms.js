const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FormSchema = new Schema({
  form_id: {
    type: String,
  },
  form_fields: {
    type: Array,
  },
  form_creator: {
    type: String,
  },
  form_title: {
    type: String,
  },
});

const Forms = mongoose.model("Forms", FormSchema);

module.exports = Forms;
