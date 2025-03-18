import { useState } from "react";
import "./App.css";
import SolanaWallet from "./components/SolanaWallet";
import EthWallet from "./components/EthWallet";
import * as bip39 from "bip39";

function App() {
  const [show, setShow] = useState(true);
  const [mnemonic, setMnemonic] = useState("");

  const generateMnemonic = async () => {
    const newMnemonic = await bip39.generateMnemonic();
    setMnemonic(newMnemonic);
    setShow(false);
  };

  return (
    <div className="flex flex-col items-center w-full p-6 bg-gray-100 min-h-screen">
    {/* Generate Mnemonic Button */}
    {show&&<button onClick={generateMnemonic} className="px-6 py-3 bg-blue-500 text-white rounded mb-6">
        Generate Mnemonic
    </button>}

    {/* Mnemonic Input */}
    <input
        type="text"
        className="w-1/2 p-3 border rounded mb-6"
        placeholder="Your Mnemonic"
        onChange={(e)=>setMnemonic(e.target.value)}
        value={mnemonic}
    />

    {/* Solana Wallets */}
    <div className="w-full max-w-5xl bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold text-center mb-4">Solana Wallets</h2>
        <SolanaWallet mnemonic={mnemonic} />
    </div>

    {/* Ethereum Wallets */}
    <div className="w-full max-w-5xl bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-center mb-4">Ethereum Wallets</h2>
        <EthWallet mnemonic={mnemonic} />
    </div>
</div>

  );
}

export default App;
