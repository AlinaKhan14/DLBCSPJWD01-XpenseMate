const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const supportController = require('../controllers/supportController');
const { requireAuth } = require('../middleware/auth');
const { validateExpense, validatePayment, validateBudgetGoal } = require('../middleware/validators');
const expenseController = require('../controllers/expenseController');
const paymentController = require('../controllers/paymentController');
const budgetGoalController = require('../controllers/budgetGoalController');
const dashboardController = require('../controllers/dashboardController');
const passport = require('passport'); 
const utilityController = require('../controllers/utility_controller');

// Public routes (no authentication required)
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.post('/auth/forgot-password', authController.forgotPassword);
router.post('/auth/reset-password/:token', authController.resetPassword);
router.get('/verify-email/:token', authController.verifyEmail);
router.post('/auth/refresh-token', authController.refreshToken);

// Google OAuth routes
router.post('/auth/google-oauth', authController.googleOAuth);

// Add after other public routes
router.post('/subscribe-newsletter', utilityController.subscribeEmail);


// get profile
router.get('/user/me', requireAuth, authController.getUser);
// Protected routes (authentication required)
router.post('/support/submit', requireAuth, supportController.submitSupportRequest);


// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<  Expense routes  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Create a new expense
router.post('/create-expense', requireAuth,validateExpense, expenseController.createExpense);
// Get all expenses with pagination and filters
router.get('/expenses', requireAuth,expenseController.getAllExpenses);
// Get monthly expense summary
router.get('/expense/summary/monthly', requireAuth,expenseController.getMonthlySummary);
// Get a single expense by ID
router.get('/expense/:id', requireAuth,expenseController.getExpenseById);
// Update an expense
router.put('/expense/:id', requireAuth,validateExpense, expenseController.updateExpense);
// Delete an expense
router.delete('/expense/:id', requireAuth,expenseController.deleteExpense);


// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<  Expense routes  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<  Payment routes  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Create a new payment
router.post('/create-payment', requireAuth, validatePayment, paymentController.createPayment);
// Get all payments with pagination and filters
router.get('/payments', requireAuth, paymentController.getPayments);
// Get monthly payment summary
router.get('/payment/summary/monthly', requireAuth, paymentController.getMonthlySummary);
// Get a single payment by ID
router.get('/payment/:id', requireAuth, paymentController.getPaymentById);
// Update a payment
router.put('/payment/:id', requireAuth, validatePayment, paymentController.updatePayment);
// Delete a payment
router.delete('/payment/:id', requireAuth, paymentController.deletePayment);

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<  Payment routes  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<  Budget Goals routes  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Create a new budget goal
router.post('/create-budget-goal', requireAuth, validateBudgetGoal, budgetGoalController.createBudgetGoal);
// Get all budget goals with pagination and filters
router.get('/budget-goals', requireAuth, budgetGoalController.getBudgetGoals);
// Get monthly budget goals summary
router.get('/budget-goal/summary/monthly', requireAuth, budgetGoalController.getMonthlySummary);
// Get a single budget goal by ID
router.get('/budget-goal/:id', requireAuth, budgetGoalController.getBudgetGoalById);
// Update a budget goal
router.put('/budget-goal/:id', requireAuth, validateBudgetGoal, budgetGoalController.updateBudgetGoal);
// Delete a budget goal
router.delete('/budget-goal/:id', requireAuth, budgetGoalController.deleteBudgetGoal);
// Get budget goal progress
router.get('/budget-goal/:id/progress', requireAuth, budgetGoalController.getBudgetGoalProgress);
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<  Budget Goals routes  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


/// <<<<<<<<<<<<<<<<<<<<<<<<<<< Dashboard Stats API's >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


router.get('/expenses/weekly-stats', requireAuth, dashboardController.getWeeklyStats);
router.get('/dashboard/budget-goals', requireAuth, dashboardController.getBudgetGoalsWithExpenses);
router.get('/dashboard/budget-goals/stats', requireAuth, dashboardController.getBudgetGoalsStats);
router.get('/dashboard/expense/stats', requireAuth, dashboardController.getWeeklyExpenseAnalytics);
router.get('/dashboard/activity', requireAuth, dashboardController.getUserActivityByPeriod);



module.exports = router;