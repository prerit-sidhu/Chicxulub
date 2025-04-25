// Use a more reliable manifest URL and configuration
const manifestUrl = 'https://raw.githubusercontent.com/ton-connect/demo-dapp-with-wallet/main/public/tonconnect-manifest.json';

const tonConnectOptions = {
  manifestUrl,
  buttonRootId: 'ton-connect-button',
  // Add these connection parameters to fix the aborted operation error
  connectRequestParameters: {
    universalLink: 'https://app.tonkeeper.com/ton-connect',
    bridgeUrl: 'https://bridge.tonapi.io/bridge'
  }
};

export { tonConnectOptions };