const db = require("./../models")
const uuid = require("uuid")
module.exports = {
    createForm: async(req, res) => {
        console.log(req.body)
        try{
            const {data, timeCreated} = req.body
            formData = {
                "form_id": uuid.v4(),
                "form_creator": req.user,
                "date_created": timeCreated,
                "form_fields": data,
            }
            await db.Forms.create(formData, (err, result) => {
                if (err) throw err;
                res.send({success: true, authenticated: true})
                
            })
        }catch(err){
            console.log(err)
            res.status(500).json({success: false, authenticated: true})
        }
        
    },
    fetchForm: async (req, res) => {
        try{
            const {form_id} = req.body
            await db.Forms.findOne({"form_id": form_id}, (err, result) => {
                if (err) throw err;
                res.send({success: true, data: result, authenticated: true})
            })
        }catch(err){
            console.log(err)
            res.status(500).json({success: false, authenticated: true})
        }
    },
    fetchAllForms: async (req, res) => {
        try{
            const {id} = req.user
            await db.Forms.find({"form_creator": id}, (err, result) => {
                if (err) throw err;
                res.send({success: true, data: result, authenticated: true})
            })
        }catch(err){
            console.log(err)
            res.status(500).json({success: false, authenticated: true})
        }
    },
    saveFormData: async (req, res) => {
        try{
            const {form_id, data} = req.body
            await db.FormAnswer.insert({"form_id": form_id, data}, (err, result) => {
                if (err) throw err;
                res.json({success: true})
            })
        }catch(err){
            console.log(err)
            res.status(500).json({success: false, authenticated: true})
        }
    },
    editForm: async(req, res) => {
        try{
            const {form_id, data} = req.body
            await db.Forms.findOneAndUpdate({"form_id": form_id, "form_creator" :req.user.id }, {$set:{form_fields: data}}, {new: true},(err, result) => {
                if (err) throw (err);
                res.json({success: true, data: result, authenticated: true})
            })
        }catch(err){
            console.log(err)
            res.status(500).json({success: false, authenticated: true})
        }
    },
    filledForms: async(req, res) => {
        try{
            await db.FormAnswer.find({"form_owner": req.user.id}, (err, result) => {
                if (err) throw err;
                res.json({success: true, data: result, authenticated: true})
            })
        }catch(err){
            console.log(err)
            res.status(500).json({success: false, authenticated: true})
        }
    }
    
}
