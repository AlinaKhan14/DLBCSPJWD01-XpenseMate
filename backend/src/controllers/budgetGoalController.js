const { error } = require('winston');
const BudgetGoal = require('../models/BudgetGoal');
const Category = require('../models/Category');
const logger = require('../utils/logger');
const { validateObjectId } = require('../utils/validators');

const budgetGoalController = {
  // Create a new budget goal
  createBudgetGoal: async (req, res) => {
    try {
      const { name, amount, date,duration, category_id,category, detail, status } = req.body;

      const categoryDoc = await Category.findById(category_id);
      if (!categoryDoc) {
        logger.error(`Category not found for ID: ${category_id}`);
        return res.status(400).json({ error: 'Category not found' });
      }

      const budgetGoal = new BudgetGoal({
        user_id: req.user._id,
        name,
        amount,
        date,
        category_id,
        category,
        duration,
        detail,
        status: status || 'active'
      });

      await budgetGoal.save();
      await budgetGoal.populate('category_id', 'name type');
      res.status(201).json(budgetGoal);
    } catch (error) {
      logger.error('Error creating budget goal:', error);
      res.status(500).json({ error: 'Failed to create budget goal' });
    }
  },

  // Get all budget goals with pagination and filters
  getBudgetGoals: async (req, res) => {
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

      // Add category filter if provided
      if (req.query.category_id) {
        filter.category_id = req.query.category_id;
      }

      // Add status filter if provided
      if (req.query.status) {
        filter.status = req.query.status;
      }

      // Get total count for pagination
      const total = await BudgetGoal.countDocuments(filter);

      // Get budget goals with pagination
      const budgetGoals = await BudgetGoal.find(filter)
        .populate('category_id', 'name type')
        .sort({ created_at: -1 })
        .skip(skip)
        .limit(limit);



        logger.info('yes get in fetching goeals :', budgetGoals);


      res.json({
        budgetGoals,
        total,
        page,
        totalPages: Math.ceil(total / limit)
      });
    } catch (error) {
      logger.error('Error fetching budget goals:', error);
      res.status(500).json({ error: 'Failed to fetch budget goals' });
    }
  },

  // Get a single budget goal by ID
  getBudgetGoalById: async (req, res) => {
    try {
      const budgetGoal = await BudgetGoal.findOne({
        _id: req.params.id,
        user_id: req.user._id,
        is_deleted: false
      }).populate('category_id', 'name type');

      if (!budgetGoal) {
        return res.status(404).json({ error: 'Budget goal not found' });
      }

      res.json(budgetGoal);
    } catch (error) {
      logger.error('Error fetching budget goal:', error);
      res.status(500).json({ error: 'Failed to fetch budget goal' });
    }
  },

  // Update a budget goal
  updateBudgetGoal: async (req, res) => {
    try {
      const { name, amount, date, category_id, detail, status } = req.body;

      // Validate category if provided
      if (category_id) {
        const category = await Category.findById(category_id);
        if (!category) {
          return res.status(400).json({ error: 'Category not found' });
        }
      }

      const budgetGoal = await BudgetGoal.findOneAndUpdate(
        { _id: req.params.id, user_id: req.user._id, is_deleted: false },
        {
          name,
          amount,
          date,
          category_id,
          detail,
          status,
          updated_at: new Date()
        },
        { new: true, runValidators: true }
      ).populate('category_id', 'name type');

      if (!budgetGoal) {
        return res.status(404).json({ error: 'Budget goal not found' });
      }

      res.json(budgetGoal);
    } catch (error) {
      logger.error('Error updating budget goal:', error);
      res.status(500).json({ error: 'Failed to update budget goal' });
    }
  },

  // Delete a budget goal (soft delete)
  deleteBudgetGoal: async (req, res) => {
    try {
      const budgetGoal = await BudgetGoal.findOneAndUpdate(
        { _id: req.params.id, user_id: req.user._id, is_deleted: false },
        { is_deleted: true, updated_at: new Date() },
        { new: true }
      );

      if (!budgetGoal) {
        return res.status(404).json({ error: 'Budget goal not found' });
      }

      res.json({ message: 'Budget goal deleted successfully' });
    } catch (error) {
      logger.error('Error deleting budget goal:', error);
      res.status(500).json({ error: 'Failed to delete budget goal' });
    }
  },

  // Get monthly budget goals summary
  getMonthlySummary: async (req, res) => {
    try {
      const year = parseInt(req.query.year) || new Date().getFullYear();
      const month = parseInt(req.query.month) || new Date().getMonth() + 1;

      const summary = await BudgetGoal.aggregate([
        {
          $match: {
            user_id: req.user._id,
            date: {
              $gte: new Date(year, month - 1, 1),
              $lt: new Date(year, month, 1)
            },
            is_deleted: false
          }
        },
        {
          $group: {
            _id: '$category_id',
            totalAmount: { $sum: '$amount' },
            totalProgress: { $avg: '$progress' },
            goals: { $push: '$name' }
          }
        }
      ]);

      // Get category details for each summary item
      const summaryWithCategories = await Promise.all(
        summary.map(async (item) => {
          const category = await Category.findById(item._id);
          return {
            category: category ? category.name : 'Uncategorized',
            totalAmount: item.totalAmount,
            averageProgress: item.totalProgress,
            goals: item.goals
          };
        })
      );

      res.json(summaryWithCategories);
    } catch (error) {
      logger.error('Error fetching monthly summary:', error);
      res.status(500).json({ error: 'Failed to fetch monthly summary' });
    }
  },

  // Get budget goal progress
  getBudgetGoalProgress: async (req, res) => {
    try {
      const budgetGoal = await BudgetGoal.findOne({
        _id: req.params.id,
        user_id: req.user._id,
        is_deleted: false
      });

      if (!budgetGoal) {
        return res.status(404).json({ error: 'Budget goal not found' });
      }

      res.json({
        progress: budgetGoal.progress,
        status: budgetGoal.status,
        amount: budgetGoal.amount,
        currentAmount: (budgetGoal.progress * budgetGoal.amount) / 100
      });
    } catch (error) {
      logger.error('Error fetching budget goal progress:', error);
      res.status(500).json({ error: 'Failed to fetch budget goal progress' });
    }
  },

  // Get budget goals by date range
  getBudgetGoalsByDateRange: async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
      const user_id = req.user._id;

      if (!startDate || !endDate) {
        return res.status(400).json({ error: 'Start date and end date are required' });
      }

      const budgetGoals = await BudgetGoal.find({
        user_id,
        date: {
          $gte: new Date(startDate),
          $lte: new Date(endDate)
        },
        is_deleted: false
      }).populate('category_id', 'name type');

      res.json(budgetGoals);
    } catch (error) {
      logger.error('Error fetching budget goals by date range:', error);
      res.status(500).json({ error: 'Failed to fetch budget goals by date range' });
    }
  }
};

module.exports = budgetGoalController; 