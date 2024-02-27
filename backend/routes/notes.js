const express = require('express')
const router = require('express').Router();
const fetchUser = require('../middleware/fetchuser')
const { check, validationResult } = require('express-validator');
const Notes = require('../models/Notes');
//Route 1: fetch  all notes using: Get api/notes/fetchallnotes. Login required
router.get('/fetchallnotes', fetchUser, async (req, res) => {
    const notes = await Notes.find({ user: req.user.id })
    res.json(notes)
})

//Route 2: adding notes: Get api/notes/addNote. Login required
router.post('/addNote', fetchUser, [
    check('title', 'Enter a valid title').isLength({ min: 3 }),
    check('description', 'Description must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {

    try {
        const { title, description, tag, } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Notes({
            title,
            description,
            tag,
            user: req.user.id
        })
        const saveNote = await note.save()
        res.json(saveNote)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }

})

//Route 3: updating notes: PUT api/notes/updateNote. Login required
router.put('/updateNote/:id', fetchUser, async (req, res) => {

    const {title,description, tag} = req.body;
//create a new note
    const newNote = {};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};
//find the note to be updated and update it
    //note not present
    let note = await Notes.findById(req.params.id);
    if(!note){
        res.status(404).send("Not Found")
    }
    //user not same
    if(note.user.toString()!== req.user.id){
        return res.status(401).send("Not allowed")
    }

    note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
    res.json(note);
})

//Route 4: delete notes: DELETE api/notes/deleteNote. Login required
router.delete('/deleteNote/:id', fetchUser, async (req, res) => {

//find the note to be updated and update it
try {
    //note not present

    let note = await Notes.findById(req.params.id);
    if(!note){
        res.status(404).send("Not Found")
    }
    //user not same
    if(note.user.toString()!== req.user.id){
        return res.status(401).send("Not allowed")
    }

    note = await Notes.findByIdAndDelete(req.params.id)
    res.json({"Sucess": "Note deleted!!", note:note });
} catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occurred");
}
})



module.exports = router