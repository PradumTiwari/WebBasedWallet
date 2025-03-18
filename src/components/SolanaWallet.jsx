import { mnemonicToSeed } from "bip39";
import React, { useState } from "react";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";

const SolanaWallet = ({ mnemonic }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wallets, setWallets] = useState([]);
  const [show,setShow]=useState(false);
  const generateWallet = async () => {
    try {
      // Convert mnemonic to seed
      const seed = await mnemonicToSeed(mnemonic);

      // Define Solana derivation path
      const path = `m/44'/501'/${currentIndex}'/0'`;

      // Generate private key from derivation path
      const derivedSeed = derivePath(path, seed.toString("hex")).key;

      // Convert private key seed into a key pair
      const keypair = Keypair.fromSecretKey(
        nacl.sign.keyPair.fromSeed(derivedSeed).secretKey
      );

      // Update state: Increment index & store new keys
      setCurrentIndex((prev) => prev + 1);
      setWallets([
        ...wallets,
        {
          publicKey: keypair.publicKey.toBase58(),
          privateKey: Buffer.from(keypair.secretKey).toString("hex"),
        },
      ]);
    } catch (error) {
      console.error("Error generating wallet:", error);
    }
  };

  return (
    <div className="bg-gray-100 p-4">
      <button
        onClick={generateWallet}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Add Wallet
      </button>
      <div className="mt-4">
        <div style={{ display: "flex", fontWeight: "bold", marginBottom: "5px" }}>
          <div style={{ flex: 1, textAlign: "center" }}>Public Key</div>
          <div style={{ flex: 1, textAlign: "center" }}>Private Key</div>
        </div>
        {wallets.map((wallet, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              width: "100%",
              gap: "10px",
              borderBottom: "1px solid #ddd",
              padding: "5px",
            }}
          >
            <div
              style={{
                flex: 1,
                overflow: "auto",
                whiteSpace: "nowrap",
                background: "#fff",
                padding: "5px",
                borderRadius: "5px",
              }}
            >
              {wallet.publicKey}
            </div>
            <div
              style={{
                flex: 1,
                overflow: "auto",
                whiteSpace: "nowrap",
                background: "#fff",
                padding: "5px",
                borderRadius: "5px",
              }}
            >
              {
                show?wallet.privateKey:<h2>****************</h2>
              }
              
            </div>
            <button onClick={()=>{
                setShow(!show)
              }}>Show</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SolanaWallet;
