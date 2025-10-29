const mongoose = require('mongoose');

const budgetGoalSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  name: {
    type: String,
    required: [true, 'Goal name is required'],
    trim: true,
    minlength: [2, 'Goal name must be at least 2 characters long'],
    maxlength: [100, 'Goal name cannot exceed 100 characters']
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [0, 'Amount cannot be negative'],
    validate: {
      validator: function(value) {
        return value > 0;
      },
      message: 'Amount must be greater than 0'
    }
  },
  date: {
    type: Date,
    required: [true, 'Date is required'],
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Category is required']
  },
  detail: {
    type: String,
    trim: true,
    maxlength: [500, 'Detail cannot exceed 500 characters']
  },
  status: {
    type: String,
    enum: {
      values: ['active', 'achieved', 'failed','terminated','other'],
      message: 'Status must be either active, achieved, or failed'
    },
    default: 'active'
  },

  duration: {
    type: String,
    enum: {
      values: ['daily', 'weekly', 'monthly','yearly'],
      message: 'Status must be either daily, weekly, montly or yearly'
    },
    default: 'monthly'
  },
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  is_deleted: {
    type: Boolean,
    default: false
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

// Indexes for faster queries
budgetGoalSchema.index({ user_id: 1, date: -1 });
budgetGoalSchema.index({ user_id: 1, status: 1 });

// Pre-save middleware to validate category type
budgetGoalSchema.pre('save', async function(next) {
  try {
    const Category = mongoose.model('Category');
    const category = await Category.findById(this.category_id);
    
    if (!category) {
      throw new Error('Category not found');
    }
    
    // if (category.type !== 'budget_goal') {
    //   throw new Error('Category must be of type budget_goal');
    // }
    
    next();
  } catch (error) {
    next(error);
  }
});

// Static method to find active goals
budgetGoalSchema.statics.findActive = function(userId) {
  return this.find({
    user_id: userId,
    status: 'active',
    is_deleted: false
  });
};

// Instance method to update progress
budgetGoalSchema.methods.updateProgress = async function(currentAmount) {
  this.progress = Math.min(100, Math.round((currentAmount / this.amount) * 100));
  if (this.progress >= 100) {
    this.status = 'achieved';
  }
  return this.save();
};

// Instance method to soft delete
budgetGoalSchema.methods.softDelete = async function() {
  this.is_deleted = true;
  return this.save();
};

const BudgetGoal = mongoose.model('BudgetGoal', budgetGoalSchema);

module.exports = BudgetGoal; 