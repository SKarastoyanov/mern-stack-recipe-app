const express = require('express');
const router = express.Router();

//User Model
const Recipe = require('../../models/Recipe');

//@route GET api/resipes
//@desc Get All Resipes
//@Acces Public
router.get('/', (req, res) => {
    Recipe.find()
        .then(recipes => res.json(recipes))
});

//@route GET api/resipes/id
//@desc Get Resipe By Id
//@Acces Public
router.get('/:id', (req, res) => {
    const { id: _id } = req.params;
    Recipe.findById(_id)
        .then(recipe => res.json(recipe))
});

//@route POST api/recipes
//@desc  Create A Recipe
//@Acces Private
router.post('/', (req, res) => {
    const newRecipe = new Recipe({
        chefId: req.body.chefId,
        title: req.body.title,
        content: req.body.content,
        cookingTime: req.body.cookingTime,
        ingredients: req.body.ingredients,
        imageUrl: req.body.imageUrl,
        description: req.body.description,
        tags: req.body.tags
    });

    newRecipe.save().then(recipe => res.json(recipe));
});

//@route DELETE api/recipes/:id
//@desc Delete a Recipe
//@Acces Public
router.delete('/:id', (req, res) => {
    Recipe.findById(req.params.id)
        .then(recipe => recipe.remove().then(() => res.json({ success: true })))
        .catch(error => res.status(404).json({ success: false }));
})

//@route PUT api/recipes/:id
//@desc Update an Recipe
//@Acces Public
router.put('/:id', (req, res) => {
    const { id: _id } = req.params;
    const {
        id,
        chefId,
        title,
        content,
        cookingTime,
        ingredients,
        imageUrl,
        description,
        tags,
        modified = new Date()
    } = req.body;

    const newRecipe = {
        _id,
        chefId,
        title,
        content,
        cookingTime,
        ingredients,
        imageUrl,
        description,
        tags,
        modified
    };

    Recipe.findByIdAndUpdate(_id, newRecipe)
        .then(res.json({ newRecipe, success: true, msg: 'Recipe Updated' }))
        .catch(res.json({ newRecipe, success: false, msg: 'Failed to update recipe' }));
})

module.exports = router;