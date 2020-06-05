const express = require('express')
const router = express.Router()
const GemModel = require('../models/Gem')

router.get('/gems/add', (req,res)=>{
    res.render('gems/new-gem')
})

router.get('/gems', async(req,res)=>{
    await GemModel.find({}).sort({creationDate:'desc'}).then(concepts =>{
        const ctx= {
            gems:concepts.map(concept=>{
                return{
                    _id: concept._id,
                    title: concept.title,
                    description: concept.description
                }
            })
        }
        res.render('gems/all-gems', {gems:ctx.gems})
    })
})

router.post('/gems/new-gem', async (req,res)=>{
    const { title, description } = req.body
    const errors = []
    console.log("Gem body", req.body)
    if(!title){
        errors.push({text: "Please write a title"})
    }
    if(!description){
        errors.push({text: "Please write a description"})
    }
    if(errors.length > 0){
        res.render('gems/new-gem', {
            errors,
            title,
            description
        })
    }else{
        const newGem = new GemModel({title, description})
        await newGem.save()
        res.redirect('/gems')
    }
})

router.get('/gems/edit/:id', async(req,res)=>{
    const gemDB = await GemModel.findById(req.params.id)
    const gem = {
        _id: gemDB._id,
        title: gemDB.title,
        description: gemDB.description,
        creationDate: gemDB.creationDate
    }
    res.render('gems/edit-gem', {gem})
})

router.put('/gems/edit-gem/:id', async(req, res)=>{
    const { title, description } = req.body
    await GemModel.findByIdAndUpdate(req.params.id, { title, description })
    res.redirect('/gems')
})

router.delete('/gems/delete/:id', async(req, res)=>{
    await GemModel.findByIdAndDelete(req.params.id)
    res.redirect('/gems')
})

module.exports = router