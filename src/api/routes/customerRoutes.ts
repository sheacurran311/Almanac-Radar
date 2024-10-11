import express from 'express';
import { 
  registerCustomer, 
  getCustomer, 
  updateCustomer, 
  getCustomerTransactions,
  getCustomerRewards,
  getCustomerCampaigns,
  getCustomerStatus,
  getCustomerAvailableRewards,
  getCustomerLevel,
  activateCustomer,
  deactivateCustomer,
  getCustomerPurchases
} from '../controllers/CustomerController';
import { authenticateJWT } from '../middleware/auth';

const router = express.Router();

router.post('/register', registerCustomer);
router.get('/:customerId', authenticateJWT, getCustomer);
router.put('/:customerId', authenticateJWT, updateCustomer);
router.get('/:customerId/transactions', authenticateJWT, getCustomerTransactions);
router.get('/:customerId/rewards', authenticateJWT, getCustomerRewards);
router.get('/:customerId/campaigns', authenticateJWT, getCustomerCampaigns);
router.get('/:customerId/status', authenticateJWT, getCustomerStatus);
router.get('/:customerId/available-rewards', authenticateJWT, getCustomerAvailableRewards);
router.get('/:customerId/level', authenticateJWT, getCustomerLevel);
router.post('/:customerId/activate', authenticateJWT, activateCustomer);
router.post('/:customerId/deactivate', authenticateJWT, deactivateCustomer);
router.get('/:customerId/purchases', authenticateJWT, getCustomerPurchases);

export default router;