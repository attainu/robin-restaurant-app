const router = require('express').Router();
const menuController = require('./../controllers/menuController');


router.route('/bestseller').get(menuController.bestseller, menuController.getAllmenu);

router
    .route('/')
    .get(menuController.getAllmenu)
    .post(menuController.postNewIem);

router
    .route('/:id')
    .get(menuController.itemById)
    .delete(menuController.deleteItem)
    .patch(menuController.updateItem);

//+++=====================================-------==========--------=============================+++//

module.exports = router;
