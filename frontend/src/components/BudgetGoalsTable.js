import React, { useState, useEffect, useCallback } from 'react';
import { MoreVertical, Plus, Trash2, ChevronLeft, ChevronRight, Edit, ChevronDown } from 'lucide-react';
import BudgetGoalDialog from './BudgetGoalPopUp';
import Toast from './Toast';
import ConfirmDialog from './ConfirmDialog';
import apiService from '../services/apiService';

const BudgetGoalsTable = () => {
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [ setShowMobileMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showGoalDialog, setShowGoalDialog] = useState(false);
  const [toast, setToast] = useState(null);
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [pageCache, setPageCache] = useState({});
  const [openMenuId, setOpenMenuId] = useState(null);
  const [goalToEdit, setGoalToEdit] = useState(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteType, setDeleteType] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(null);
  const [openStatusId, setOpenStatusId] = useState(null);

  const goalStatuses = [
    { value: 'active', label: 'Active' },
    { value: 'achieved', label: 'Achieved' },
    { value: 'failed', label: 'Failed' },
    { value: 'terminated', label: 'Terminated' },
    { value: 'other', label: 'Other' }
  ];

  // Calculate pagination
  const totalPages = Math.ceil(totalRows / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;

  // Memoized fetch function to prevent unnecessary re-renders
  const fetchGoals = useCallback(async (page, limit) => {
    if (pageCache[page]) {
      setGoals(pageCache[page].goals || []);
      setTotalRows(pageCache[page].total || 0);
      setCurrentPage(pageCache[page].page || 1);
      setPerPage(limit);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const response = await apiService.get(`/budget-goals?page=${page}&limit=${limit}`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });


      if (!response.data) {
        throw new Error('No data received from server');
      }

      // Correctly access the budgetGoals array from the response
      const fetchedGoals = response.data.budgetGoals || [];
      const fetchedTotal = response.data.total || fetchedGoals.length;
      const fetchedPage = response.data.page || 1;


      // Update cache
      setPageCache(prevCache => ({
        ...prevCache,
        [fetchedPage]: { 
          goals: fetchedGoals, 
          total: fetchedTotal, 
          page: fetchedPage 
        }
      }));

      // Update state
      setGoals(fetchedGoals);
      setTotalRows(fetchedTotal);
      setCurrentPage(fetchedPage);
      setPerPage(limit);
    } catch (error) {
      console.error("Error fetching budget goals:", error);
      
      // Handle different types of errors
      let errorMessage = 'Failed to fetch budget goals.';
      if (error.response) {
        // Server responded with an error
        errorMessage = error.response.data?.error || error.response.data?.message || errorMessage;
      } else if (error.request) {
        // Request was made but no response received
        errorMessage = 'No response from server. Please check your connection.';
      }

      setToast({
        type: 'error',
        message: errorMessage
      });

      // Reset state on error
      setGoals([]);
      setTotalRows(0);
      setCurrentPage(1);
    } finally {
      setLoading(false);
      setIsInitialLoad(false);
    }
  }, [pageCache]);

  // Initial load
  useEffect(() => {
    if (isInitialLoad) {
      fetchGoals(currentPage, perPage);
    }
  }, [isInitialLoad, currentPage, perPage, fetchGoals]);


  // Add error boundary
  useEffect(() => {
    const handleError = (error) => {
      console.error('Global error:', error);
      setToast({
        type: 'error',
        message: 'An unexpected error occurred. Please try refreshing the page.'
      });
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  // Handle page changes
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    fetchGoals(newPage, perPage);
  };

  const handleRowSelect = (id) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
  };

  const handleSelectAll = () => {
    if (!goals || goals.length === 0) return;
    
    if (selectedRows.size === goals.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(goals.map(goal => goal._id || goal.id)));
    }
  };

  // delete the chunks of records
  const handleDelete = async () => {
    if (selectedRows.size > 0) {
      // Store original state for potential rollback
      const originalGoals = [...goals];
      const originalTotal = totalRows;

      // Optimistically remove selected items from local state
      setGoals(prev => prev.filter(goal => !selectedRows.has(goal._id || goal.id)));
      setTotalRows(prev => Math.max(0, prev - selectedRows.size));
      setSelectedRows(new Set());

      try {
        // Attempt to delete on backend
        await Promise.all(Array.from(selectedRows).map(id => 
          apiService.delete(`/budget-goal/${id}`, { withCredentials: true })
        ));
        setToast({
          type: 'success',
          message: 'Selected goals deleted successfully!'
        });
      } catch (error) {
        // Revert local state on error
        setGoals(originalGoals);
        setTotalRows(originalTotal);
        console.error("Error deleting selected goals:", error.response?.data || error.message);
        setToast({
          type: 'error',
          message: error.response?.data?.error || 'Failed to delete selected goals.'
        });
      }
    }
  };

  // delete the single record 
  const handleRowDelete = async (id) => {
    setOpenMenuId(null); // Close menu
    // Store original state for potential rollback
    const originalGoals = [...goals];
    const originalTotal = totalRows;
    // Optimistically remove the item from local state
    setGoals(prev => prev.filter(goal => (goal._id || goal.id) !== id));
    setTotalRows(prev => Math.max(0, prev - 1));
    try {
      // Attempt to delete on backend
      await apiService.delete(`/budget-goal/${id}`, { withCredentials: true });
      
      setToast({
        type: 'success',
        message: 'Goal deleted successfully!'
      });
    } catch (error) {
      // Revert local state on error
      setGoals(originalGoals);
      setTotalRows(originalTotal);
      console.error("Error deleting goal:", error.response?.data || error.message);
      setToast({
        type: 'error',
        message: error.response?.data?.error || 'Failed to delete goal.'
      });
    }
  };

  // handle the edit of single record
  const handleEdit = (id) => {
    setOpenMenuId(null);
    const goal = goals.find(g => (g._id || g.id) === id);
    if (goal) {
      setGoalToEdit(goal);
      setShowGoalDialog(true);
    }
  };

  const handleAddNew = () => {
    setGoalToEdit(null);
    setShowGoalDialog(true);
  };

  const handleGoalAction = async (goalData, isEditMode) => {
    setLoading(false);
    try {

      const backendData = {
        name: goalData.name,
        amount: parseFloat(goalData.amount),
        date: goalData.date,
        category_id: goalData.category_id,
        category: goalData.category,
        detail: goalData.detail,
        duration: goalData.duration || 'monthly',
        status: goalData.status || 'active',
        progress: goalData.progress || 0
      };

      if (isEditMode && goalData._id) {
        // Store the original goal for potential rollback
        const originalGoal = goals.find(g => g._id === goalData._id);
        
        // Optimistically update local state
        const updatedGoal = {
          ...goalData,
          category: goalData.category
        };
        
        setGoals(prev => prev.map(g => 
          g._id === goalData._id ? updatedGoal : g
        ));

        try {
          // Update backend without affecting local state
          await apiService.put(`/budget-goal/${goalData._id}`, backendData, { withCredentials: true });
          setToast({
            type: 'success',
            message: 'Goal updated successfully!'
          });
        } catch (error) {
          // Revert local state on error
          setGoals(prev => prev.map(g => 
            g._id === goalData._id ? originalGoal : g
          ));
          throw error;
        }
      } else {
        // Create new goal
        const tempGoal = {
          ...goalData,
          _id: Date.now().toString(),
          id: Date.now().toString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        
        // Optimistically add to local state
        setGoals(prev => [tempGoal, ...prev.filter(g => g.id !== tempGoal.id)]);
        setTotalRows(prev => prev + 1);
        setCurrentPage(1);

        try {
          const response = await apiService.post('/create-budget-goal', backendData, { withCredentials: true });
          
          // Update temporary entry with real data
          setGoals(prev => prev.map(g => 
            g._id === tempGoal._id 
              ? { ...response.data, id: response.data._id, category: response.data.category_id ? response.data.category_id.name : response.data.category } 
              : g
          ));
          setToast({
            type: 'success',
            message: 'Goal added successfully!'
          });
        } catch (error) {
          // Remove temporary entry on error
          setGoals(prev => prev.filter(g => g._id !== tempGoal._id));
          setTotalRows(prev => Math.max(0, prev - 1));
          throw error;
        }
      }
    } catch (error) {
      console.error(`Error ${isEditMode ? 'updating' : 'adding'} goal:`, error.response?.data || error.message);
      setToast({
        type: 'error',
        message: error.response?.data?.error || `Failed to ${isEditMode ? 'update' : 'add'} the goal!`
      });
    } finally {
      setLoading(false);
      setShowGoalDialog(false);
      setGoalToEdit(null);
    }
  };

  // Format date to a more readable format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    try {
        const date = new Date(dateString);
        return isNaN(date) ? 'Invalid Date' : date.toLocaleDateString('en-US', options);
    } catch (error) {
        return 'Invalid Date';
    }
  };

  // Format currency
  const formatCurrency = (amount) => {
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount)) return 'Invalid Amount';

    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(numericAmount);
  };

  // Add click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openMenuId && !event.target.closest('.action-menu-container')) {
        setOpenMenuId(null);
      }
    };

    // Add event listener to window
    window.addEventListener('click', handleClickOutside);

    // Cleanup
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [openMenuId]);

  const handleDeleteClick = (id = null) => {
    if (id) {
      setDeleteType('single');
      setDeleteId(id);
    } else {
      setDeleteType('multiple');
    }
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      if (deleteType === 'single') {
        await handleRowDelete(deleteId);
      } else {
        await handleDelete();
      }
      setToast({
        type: 'success',
        message: `Goal${deleteType === 'multiple' ? 's' : ''} deleted successfully`
      });
    } catch (error) {
      setToast({
        type: 'error',
        message: `Failed to delete goal${deleteType === 'multiple' ? 's' : ''}`
      });
    } finally {
      setShowDeleteConfirm(false);
      setDeleteType(null);
      setDeleteId(null);
    }
  };

  // Update the handleStatusChange function
  const handleStatusChange = async (goalId, newStatus, e) => {
    // Prevent row selection when clicking the dropdown
    e.stopPropagation();
    
    setUpdatingStatus(goalId);
    const originalGoals = [...goals];
    
    try {
      // Find the goal to update
      const goalToUpdate = goals.find(goal => goal._id === goalId);
      if (!goalToUpdate) {
        throw new Error('Goal not found');
      }

      // Prepare the update data with all required fields
      const updateData = {
        name: goalToUpdate.name,
        amount: goalToUpdate.amount,
        date: goalToUpdate.date,
        category_id: goalToUpdate.category_id?._id || goalToUpdate.category_id,
        category: goalToUpdate.category,
        detail: goalToUpdate.detail || '',
        duration: goalToUpdate.duration || 'monthly',
        status: newStatus,
        progress: goalToUpdate.progress || 0
      };

      // Optimistically update local state
      setGoals(prev => prev.map(goal => 
        goal._id === goalId ? { ...goal, status: newStatus } : goal
      ));

      // Update backend with all required fields
      await apiService.put(`/budget-goal/${goalId}`, updateData, { withCredentials: true });

      setToast({
        type: 'success',
        message: 'Status updated successfully!'
      });
    } catch (error) {
      // Revert on error
      setGoals(originalGoals);
      console.error("Error updating status:", error.response?.data || error.message);
      setToast({
        type: 'error',
        message: error.response?.data?.error || 'Failed to update status.'
      });
    } finally {
      setUpdatingStatus(null);
    }
  };

  return (
    <div className="w-full font-sans px-4 sm:px-6 lg:px-8">
      {/* Card Container with gradient border and shadow */}
      <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-xl border border-slate-200/20 overflow-hidden mx-auto max-w-full transition-all duration-300">
        {/* Gradient top border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-t-3xl" />
        {/* Header with title and controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-4 sm:px-8 pt-6 pb-4">
          <h2 className="flex items-center gap-3 text-2xl lg:text-3xl font-bold text-slate-800 tracking-tight">
            <Plus className="text-indigo-500" size={28} />
            Budget Goals
          </h2>
          <button
            onClick={() => setShowGoalDialog(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-5 py-2 rounded-xl shadow transition-all duration-200 active:scale-95 text-sm"
          >
            <Plus size={16} />
            Add Goal
          </button>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto px-2 sm:px-6 pb-6">
          <table className="min-w-full divide-y divide-slate-100">
            <thead className="bg-slate-50/80">
              <tr>
                <th className="px-3 py-4 text-center">
                  <input
                    type="checkbox"
                    checked={goals && goals.length > 0 && selectedRows.size === goals.length}
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
                  />
                </th>
                <th className="px-3 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Goal Name</th>
                <th className="px-3 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Target Date</th>
                <th className="px-3 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Amount</th>
                <th className="px-3 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Status</th>
                <th className="px-3 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-slate-400 animate-pulse">
                    Loading goals...
                  </td>
                </tr>
              ) : !goals || goals.length === 0 ? (
                <tr>
                  <td colSpan="6">
                    <div className="text-center py-12">
                      <div className="text-slate-300 mb-4">
                        <Plus size={48} className="mx-auto" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-700 mb-2">No goals yet</h3>
                      <p className="text-slate-500 mb-4">Add your first goal to get started</p>
                      <button
                        onClick={handleAddNew}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-xl font-bold transition-all"
                      >
                        Add New Goal
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                goals.map((goal) => (
                  <tr
                    key={goal._id || goal.id}
                    className={`group cursor-pointer transition-all duration-200 ${selectedRows.has(goal._id || goal.id)
                      ? 'bg-indigo-50 border-l-4 border-indigo-500'
                      : 'hover:bg-slate-50'} animate-[fadeIn_0.4s]`}
                    onClick={() => handleRowSelect(goal._id || goal.id)}
                  >
                    <td className="px-3 py-4 text-center">
                      <input
                        type="checkbox"
                        checked={selectedRows.has(goal._id || goal.id)}
                        onChange={() => handleRowSelect(goal._id || goal.id)}
                        onClick={e => e.stopPropagation()}
                        className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
                      />
                    </td>
                    <td className="px-3 py-4 text-sm font-semibold text-slate-800 text-center truncate">
                      <div title={goal.name}>{goal.name}</div>
                    </td>
                    <td className="px-3 py-4 text-sm text-slate-600 text-center font-mono">
                      {formatDate(goal.date)}
                    </td>
                    <td className="px-3 py-4 text-sm text-slate-600 text-center font-mono">
                      {formatCurrency(goal.amount)}
                    </td>
                    <td className="px-3 py-4 text-center relative">
                      <div className="flex justify-center">
                        <div className="relative inline-block text-left">
                          <button
                            type="button"
                            className={`w-32 flex items-center justify-between gap-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs font-semibold text-slate-700 transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${goal.status === 'achieved' ? 'text-emerald-700' : goal.status === 'active' ? 'text-indigo-700' : goal.status === 'failed' ? 'text-red-700' : goal.status === 'terminated' ? 'text-slate-700' : 'text-yellow-700'}`}
                            onClick={e => {
                              e.stopPropagation();
                              setOpenStatusId(openStatusId === goal._id ? null : goal._id);
                            }}
                            aria-haspopup="listbox"
                            aria-expanded={openStatusId === goal._id}
                          >
                            <span className="truncate capitalize">{goalStatuses.find(s => s.value === goal.status)?.label || goal.status}</span>
                            <ChevronDown size={16} className={`transition-transform duration-200 ${openStatusId === goal._id ? 'rotate-180' : ''}`} />
                          </button>
                          {openStatusId === goal._id && (
                            <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-32 bg-white border border-slate-200 rounded-2xl shadow-xl z-10 overflow-hidden animate-fadeIn">
                              {goalStatuses.map(status => (
                                <button
                                  key={status.value}
                                  className={`w-full text-left px-4 py-3 text-xs font-semibold capitalize transition-colors duration-150 first:rounded-t-2xl last:rounded-b-2xl ${goal.status === status.value ? 'bg-indigo-50 text-indigo-700' : 'text-slate-700 hover:bg-indigo-50 hover:text-indigo-600'}`}
                                  onClick={e => {
                                    e.stopPropagation();
                                    setOpenStatusId(null);
                                    if (goal.status !== status.value) {
                                      handleStatusChange(goal._id, status.value, e);
                                    }
                                  }}
                                  disabled={updatingStatus === goal._id}
                                >
                                  {status.label}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-4 text-center relative action-menu-container">
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          setOpenMenuId(openMenuId === goal._id ? null : goal._id);
                        }}
                        className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all duration-200"
                        aria-label="Actions"
                      >
                        <MoreVertical size={18} />
                      </button>
                      {openMenuId === goal._id && (
                        <div className="absolute right-full -mr-12 top-0 w-32 bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 z-4 animate-fadeIn">
                          <div className="py-1">
                            <button
                              onClick={e => {
                                e.stopPropagation();
                                handleEdit(goal._id || goal.id);
                              }}
                              className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 w-full text-left transition-all duration-200"
                            >
                              <Edit size={16} className="mr-2" />
                              Edit
                            </button>
                            <button
                              onClick={e => {
                                e.stopPropagation();
                                handleDeleteClick(goal._id || goal.id);
                              }}
                              className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left transition-all duration-200"
                            >
                              <Trash2 size={16} className="mr-2" />
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Pagination */}
          {totalRows > perPage && (
            <div className="px-2 sm:px-6 pt-4 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-slate-100 mt-2">
              <div className="text-xs text-slate-500">
                Showing <span className="font-bold text-slate-700">{startIndex + 1}</span> to <span className="font-bold text-slate-700">{Math.min(endIndex, totalRows)}</span> of <span className="font-bold text-slate-700">{totalRows}</span> entries
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 text-slate-400 hover:text-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-all duration-200"
                >
                  <ChevronLeft size={20} />
                </button>
                <div className="flex items-center gap-1">
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => handlePageChange(index + 1)}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition-all duration-200 ${currentPage === index + 1 ? 'bg-indigo-600 text-white shadow' : 'text-slate-600 hover:bg-indigo-100'}`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 text-slate-400 hover:text-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-all duration-200"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Selection Actions */}
      {selectedRows.size > 0 && (
        <div className="md:hidden fixed bottom-4 left-4 right-4 bg-white border border-slate-200 rounded-xl shadow-lg p-4 animate-fadeIn z-50">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">
              {selectedRows.size} item{selectedRows.size > 1 ? 's' : ''} selected
            </span>
            <button
              onClick={() => {
                handleDeleteClick();
                setShowMobileMenu(false);
              }}
              className="flex items-center gap-2 text-red-600 hover:text-red-700 px-3 py-2 hover:bg-red-50 rounded-xl transition-all duration-200"
            >
              <Trash2 size={16} />
              Delete
            </button>
          </div>
        </div>
      )}

      {/* Add Goal Dialog */}
      {showGoalDialog && (
        <BudgetGoalDialog
          onClose={() => setShowGoalDialog(false)}
          onSuccess={handleGoalAction}
          goalToEdit={goalToEdit}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => {
          setShowDeleteConfirm(false);
          setDeleteType(null);
          setDeleteId(null);
        }}
        onConfirm={handleDeleteConfirm}
        title={`Delete ${deleteType === 'multiple' ? 'Goals' : 'Goal'}`}
        message={`Are you sure you want to delete ${deleteType === 'multiple' ? 'these goals' : 'this goal'}?`}
        confirmText="Delete"
        cancelText="Cancel"
      />

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default BudgetGoalsTable;