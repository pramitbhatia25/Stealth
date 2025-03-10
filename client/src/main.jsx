import "./index.css";

import App from "./App.jsx";
import { createRoot } from "react-dom/client";
import { NextUIProvider } from "@nextui-org/system";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { StarknetWalletConnectors } from "@dynamic-labs/starknet";
import { SolanaWalletConnectors } from "@dynamic-labs/solana";
import { FlowWalletConnectors } from "@dynamic-labs/flow";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { EclipseWalletConnectors } from "@dynamic-labs/eclipse";
import { CosmosWalletConnectors } from "@dynamic-labs/cosmos";
import { BitcoinWalletConnectors } from "@dynamic-labs/bitcoin";
import { AlgorandWalletConnectors } from "@dynamic-labs/algorand";

createRoot(document.getElementById("root")).render(
  <NextUIProvider>
    <DynamicContextProvider
      settings={{
      environmentId: "b729ee28-b174-4641-8419-f946ccc04243",
      walletConnectors: [
        AlgorandWalletConnectors,
        BitcoinWalletConnectors,
        CosmosWalletConnectors,
        EclipseWalletConnectors,
        EthereumWalletConnectors,
        FlowWalletConnectors,
        SolanaWalletConnectors,
        StarknetWalletConnectors,
      ],
    }}
    >
      <main className="dark text-foreground bg-background">
        <App />
      </main>
    </DynamicContextProvider>
  </NextUIProvider>
);
