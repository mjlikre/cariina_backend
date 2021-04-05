const db = require("./../models");
const uuid = require("uuid");
module.exports = {
  createForm: async (req, res) => {
    try {
      formData = {
        form_id: uuid.v4(),
        form_creator: req.user,
        form_title: "New Form",
        form_fields: [
          { label: "New Question", type: 0, options: ["option1"], index: 0 },
        ],
      };
      await db.Forms.create(formData, async (err, result) => {
        if (err) throw err;
        await db.Forms.find({ form_creator: req.user }, (err1, result1) => {
          if (err1) throw err1;
          res.send({ success: true, data: result1, authenticated: true });
        });
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, authenticated: true });
    }
  },
  fetchFormFill: async (req, res) => {
    try {
      const { form_id } = req.params;
      await db.Forms.findOne({ form_id: form_id }, (err, result) => {
        if (err) throw err;
        res.send({ success: true, data: result, authenticated: true });
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, authenticated: true });
    }
  },
  fetchFormEdit: async (req, res) => {
    try {
      const { form_id } = req.params;
      await db.Forms.findOne({ form_id: form_id, form_creator: req.user }, (err, result) => {
        if (err) throw err;
        res.send({ success: true, data: result, authenticated: true });
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, authenticated: true });
    }
  },
  fetchAllForms: async (req, res) => {
    try {
      await db.Forms.find({ form_creator: req.user }, (err, result) => {
        if (err) throw err;
        res.send({ success: true, data: result, authenticated: true });
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, authenticated: true });
    }
  },
  saveFormData: async (req, res) => {
    try {
      const { form_fields_answer, form_creator, form_title } = req.body;
      await db.FormAnswer.create(
        {
          form_id: req.params.form_id,
          form_fields_answer: form_fields_answer,
          form_creator: form_creator,
          form_title: form_title,
        },
        (err, result) => {
          if (err) throw err;
          console.log(result);
          res.json({ success: true });
        }
      );
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false });
    }
  },
  editForm: async (req, res) => {
    try {
      const { form_fields, form_title } = req.body;
      await db.Forms.findOneAndUpdate(
        { form_id: req.params.form_id, form_creator: req.user },
        { $set: { form_fields: form_fields, form_title: form_title } },
        { new: true },
        async (err, result) => {
          if (err) throw err;
          await db.Forms.find({ form_creator: req.user }, (err1, result1) => {
            if (err1) throw err1;
            res.send({ success: true, data: result1, authenticated: true });
          });
        }
      );
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, authenticated: true });
    }
  },
  filledForms: async (req, res) => {
    try {
      await db.FormAnswer.find({ form_creator: req.user, form_id: req.params.form_id }, (err, result) => {
        if (err) throw err;
        res.json({ success: true, data: result, authenticated: true });
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, authenticated: true });
    }
  },
  deleteForm: async (req, res) => {
    try {
      await db.Forms.deleteOne(
        { form_id: req.params.form_id, form_creator: req.user },
        async (err, result) => {
          if (err) throw err;
          await db.Forms.find({ form_creator: req.user }, (err1, result1) => {
            if (err1) throw err1;
            res.send({ success: true, data: result1, authenticated: true });
          });
        }
      );
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, authenticated: true });
    }
  },
  changeFormStyle: async(req, res) => {
    try {
      await db.Forms.findOneAndUpdate(
        { form_id: req.params.form_id, form_creator: req.user },
        { $set: { styles: req.body } },
        async (err, result) => {
          if (err) throw err;
          await db.Forms.find({ form_creator: req.user }, (err1, result1) => {
            if (err1) throw err1;
            res.send({ success: true, data: result1, authenticated: true });
          });
        }
      );
    }catch(e) {
      console.log(e)
      res.status(500).json({ success: false, authenticated: true });
    }
  }
};


