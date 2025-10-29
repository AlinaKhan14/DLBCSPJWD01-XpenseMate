const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const validateEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  
  // Check email format
  if (!emailRegex.test(email)) return false;
  
  // Check for common disposable email domains
  const disposableDomains = [
    'tempmail.com',
    'throwawaymail.com',
    'mailinator.com',
    // Add more disposable domains as needed
  ];
  
  const domain = email.split('@')[1].toLowerCase();
  if (disposableDomains.includes(domain)) return false;
  
  return true;
};

const validateInput = (input, options = {}) => {
  const {
    maxLength = 1000,
    minLength = 1,
    allowHtml = false,
    allowSpecialChars = true,
  } = options;

  if (!input || typeof input !== 'string') return false;
  
  // Check length
  if (input.length < minLength || input.length > maxLength) return false;
  
  // Check for HTML if not allowed
  if (!allowHtml && /<[^>]*>/g.test(input)) return false;
  
  // Check for special characters if not allowed
  if (!allowSpecialChars && /[^a-zA-Z0-9\s]/g.test(input)) return false;
  
  return true;
};

module.exports = {
  validateEmail,
  validateInput,
}; 