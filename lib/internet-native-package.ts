/**
 * Uncerson Internet-Native Website Package
 * Version: 3.8.0-production
 * Description: Internet-native deployment and Web3 QuickNode mainnet binding package.
 */

export const INTERNET_NATIVE_CONFIG = {
  packageName: "uncerson-internet-native-platform",
  version: "3.8.0",
  environment: "production",
  isSimulator: false,
  sharedAppUrl: "https://ais-pre-aiasezdc22pwppymarcx66-657144521.us-east1.run.app",
  developmentAppUrl: "https://ais-dev-aiasezdc22pwppymarcx66-657144521.us-east1.run.app",
  solanaNetwork: "mainnet-beta",
  rpcProvider: "QuickNode Enterprise",
  stakingProtocol: {
    name: "Uncerson 1B ROI Staking Vault",
    principalProtection: "100% Drip Feature",
    toolkitCompliance: ["Solana Agent Toolkit", "Solana Foundation Staking Toolkit"],
  }
};

export function getInternetNativeUrl(): string {
  return INTERNET_NATIVE_CONFIG.sharedAppUrl;
}
