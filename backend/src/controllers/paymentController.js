const Payment = require('../models/Payment');
const logger = require('../utils/logger');
const { validateObjectId } = require('../utils/validators');

const paymentController = {
  // @desc    Create new payment
  // @route   POST /api/payments
  // @access  Private
  createPayment: async (req, res) => {
    try {
      const { name, amount, date, payer, payment_type, custom_payment_type, notes } = req.body;
      
      const payment = new Payment({
        user_id: req.user._id,
        name,
        amount,
        date,
        payer,
        payment_type,
        custom_payment_type,
        notes
      });
      await payment.save();
      res.status(201).json(payment);
    } catch (error) {
      logger.error('Error creating payment:', { error: error.message });
      res.status(500).json({ error: 'Failed to create payment' });
    }
  },

  // @desc    Get all payments for a user with pagination and filters
  // @route   GET /api/payments
  // @access  Private
  getPayments: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      // Build filter object
      const filter = { user_id: req.user._id, is_deleted: false };

      // Add date range filter if provided
      if (req.query.startDate && req.query.endDate) {
        filter.date = {
          $gte: new Date(req.query.startDate),
          $lte: new Date(req.query.endDate)
        };
      }

      // Add payment type filter if provided
      if (req.query.payment_type) {
        filter.payment_type = req.query.payment_type;
      }

      // Get total count for pagination
      const total = await Payment.countDocuments(filter);

      // Get payments with pagination
      const payments = await Payment.find(filter)
        .sort({ created_at: -1 })
        .skip(skip)
        .limit(limit);

      res.json({
        payments,
        total,
        page,
        totalPages: Math.ceil(total / limit)
      });
    } catch (error) {
      logger.error('Error fetching payments:', { error: error.message });
      res.status(500).json({ error: 'Failed to fetch payments' });
    }
  },

  // @desc    Get single payment by ID
  // @route   GET /api/payments/:id
  // @access  Private
  getPaymentById: async (req, res) => {
    try {
      const payment = await Payment.findOne({
        _id: req.params.id,
        user_id: req.user._id,
        is_deleted: false
      });

      if (!payment) {
        return res.status(404).json({ error: 'Payment not found' });
      }

      res.json(payment);
    } catch (error) {
      logger.error('Error fetching payment:', { error: error.message });
      res.status(500).json({ error: 'Failed to fetch payment' });
    }
  },

  // @desc    Update a payment
  // @route   PUT /api/payments/:id
  // @access  Private
  updatePayment: async (req, res) => {
    try {
      const { name, amount, date, payer, payment_type, custom_payment_type, notes } = req.body;

      const payment = await Payment.findOneAndUpdate(
        { _id: req.params.id, user_id: req.user._id, is_deleted: false },
        {
          name,
          amount,
          date,
          payer,
          payment_type,
          custom_payment_type,
          notes,
          updated_at: new Date()
        },
        { new: true, runValidators: true }
      );

      if (!payment) {
        return res.status(404).json({ error: 'Payment not found' });
      }

      res.json(payment);
    } catch (error) {
      logger.error('Error updating payment:', { error: error.message });
      res.status(500).json({ error: 'Failed to update payment' });
    }
  },

  // @desc    Delete a payment (soft delete)
  // @route   DELETE /api/payments/:id
  // @access  Private
  deletePayment: async (req, res) => {
    try {
      const payment = await Payment.findOneAndUpdate(
        { _id: req.params.id, user_id: req.user._id, is_deleted: false },
        { is_deleted: true, updated_at: new Date() },
        { new: true }
      );

      if (!payment) {
        return res.status(404).json({ error: 'Payment not found' });
      }

      res.json({ message: 'Payment deleted successfully' });
    } catch (error) {
      logger.error('Error deleting payment:', { error: error.message });
      res.status(500).json({ error: 'Failed to delete payment' });
    }
  },

  // @desc    Get monthly payment summary
  // @route   GET /api/payments/summary/monthly
  // @access  Private
  getMonthlySummary: async (req, res) => {
    try {
      const year = parseInt(req.query.year) || new Date().getFullYear();

      const summary = await Payment.aggregate([
        {
          $match: {
            user_id: req.user._id,
            date: {
              $gte: new Date(`${year}-01-01T00:00:00.000Z`),
              $lte: new Date(`${year}-12-31T23:59:59.999Z`),
            },
            is_deleted: false
          },
        },
        {
          $group: {
            _id: { $month: '$date' },
            totalAmount: { $sum: '$amount' },
            payments: { $push: '$name' }
          },
        },
        {
          $sort: { '_id': 1 },
        },
      ]);

      res.json(summary);
    } catch (error) {
      logger.error('Error fetching monthly summary:', { error: error.message });
      res.status(500).json({ error: 'Failed to fetch monthly summary' });
    }
  },

  // @desc    Get payments by date ranges
  // @route   GET /api/payments/date-range
  // @access  Private
  getPaymentsByDateRange: async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
      const user_id = req.user._id;

      if (!startDate || !endDate) {
        return res.status(400).json({ error: 'Start date and end date are required' });
      }

      const payments = await Payment.find({
        user_id,
        date: {
          $gte: new Date(startDate),
          $lte: new Date(endDate)
        },
        is_deleted: false
      });

      res.json(payments);
    } catch (error) {
      logger.error('Error fetching payments by date range:', { error: error.message });
      res.status(500).json({ error: 'Failed to fetch payments by date range!' });
    }
  }
};

module.exports = paymentController; 