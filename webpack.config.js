const path = require('path');

module.exports = {
  // ... other webpack config
  
  // Add this to ignore source map warnings from node_modules
  ignoreWarnings: [
    {
      module: /node_modules\/@tonconnect\/sdk/,
      message: /Failed to parse source map/,
    },
  ],
};