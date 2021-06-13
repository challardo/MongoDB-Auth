import {Router} from 'express'
const router = Router()

router.get('/tarjetas', (req, res) =>{
res.render('pages/tarjetas');

});
export default router;