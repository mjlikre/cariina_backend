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
  private: {
    type: Boolean,
    default: false
  },
  styles: {
    type: Object,
    default: {
      theme: null,
      logo: null,
      font_size: null 
    }
  }
});

const Forms = mongoose.model("Forms", FormSchema);

module.exports = Forms;
