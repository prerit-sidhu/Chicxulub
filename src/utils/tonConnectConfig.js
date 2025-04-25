// Use production manifest URL for deployment
const manifestUrl = 'https://chicxulub.app/tonconnect-manifest.json';

const tonConnectOptions = {
  manifestUrl,
  buttonRootId: 'ton-connect-button',
  // Add proper connection parameters for production
  connectRequestParameters: {
    universalLink: 'https://app.tonkeeper.com/ton-connect',
    bridgeUrl: 'https://bridge.tonapi.io/bridge'
  }
};

export { tonConnectOptions };
