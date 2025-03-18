import React,{useState} from 'react'
import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";

const EthWallet = ({mnemonic}) => {
    const [currentIndex,setCurrentIndex] = useState(0);
    const [wallets,setWallets]=useState([]);
    const generateWallet = async() => {
       const seed=await mnemonicToSeed(mnemonic);
       const derivationPath=`m/44'/60'/${currentIndex}'/0'`;
       const hdNode=HDNodeWallet.fromSeed(seed);
       //Creates a master wallet from seed
       const child=hdNode.derivePath(derivationPath);
       //derives a specific wallet from the master wallet
       const privateKey=child.privateKey;
       const wallet=new Wallet(privateKey);
       const publicKey=wallet.address;
       
    setCurrentIndex((prev)=>prev+1);
    setWallets([...wallets, {publicKey,privateKey}]);
    
    }
  return (
    <div className="w-full h-64 overflow-auto border p-4 bg-white shadow-md rounded-lg">
    <button
        onClick={generateWallet}
        className="px-4 py-2 bg-blue-500 text-white rounded mb-4"
    >
        Add Eth Wallet
    </button>

    <div className="space-y-2">
        {wallets.map((wallet, index) => (
            <div key={index} className="flex space-x-4 p-2 border rounded shadow">
                <div className="w-1/2 p-2 border border-gray-300 rounded">
                    <b>Public Key:</b> <span className="break-all">{wallet.publicKey}</span>
                </div>
                <div className="w-1/2 p-2 border border-gray-300 rounded">
                    <b>Private Key:</b> <span className="break-all">{wallet.privateKey}</span>
                </div>
            </div>
        ))}
    </div>
</div>
  )
}

export default EthWallet