import { Router } from 'express'
import { PropertyController } from '../controllers/PropertyController'
import { authenticate } from '../middleware/auth'

const router = Router()

router.post('/tokenize', authenticate, PropertyController.tokenizeProperty)
router.get('/listings', PropertyController.getListings)
router.post('/verify', authenticate, PropertyController.verifyProperty) 