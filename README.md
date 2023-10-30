## Solve3 Captcha Node Module Quick Start Guide

The Solve3 Captcha Node Module is designed to offer captcha protection for your smart contracts, effectively guarding against bot interference. Here's a step-by-step guide to help you integrate this module into your projects frontend.

### Installation

Begin by installing the `@solve3/captcha` package using npm or yarn. Open your terminal and run:

```bash
npm install @solve3/captcha
# or
yarn add @solve3/captcha
```

### Usage

Now, let's dive into the implementation:

1. **Initialize the Solve3 Captcha Module:**

   First, you need to initialize the Solve3 Captcha module by importing it and creating an instance of it. This step should be done at the beginning of your code.

   ```javascript
   import { Solve3 } from "@solve3/captcha";

   const solve3 = new Solve3();
   ```

2. **Handle the Solve3 Success Event:**

The Solve3 Captcha module emits a "success" event when the user successfully completes the captcha challenge. You can listen for this event and define what should happen when the event is triggered.

```javascript
solve3.on("success", async (proof) => {
  // This is where you can send the transaction using the proof.
  // Example: sendTransaction(proof);
});
```

3. **Get the Message to Sign:**

   Before sending a transaction, you'll need a message to sign. This message typically includes the user's wallet address, the destination contract, and the network ID (chain ID).

   ```javascript
   const messageToSign = await solve3.init({
     account: walletAddress,
     destination: destinationContract,
     network: chainId,
   });
   ```

4. **Sign the Message:**

   You need to sign the message with the user's wallet. This can be done using a signing function provided by your Ethereum library (e.g., ethers.js or web3.js). Make sure you have the user's wallet set up and available.

   ```javascript
   const signature = await signMessage(messageToSign);
   ```

5. **Open the Captcha Challenge:**

   Finally, open the Solve3 Captcha challenge, passing the previously obtained signature. This will display the captcha challenge to the user.

   ```javascript
   await solve3.open(signature);
   ```

### Full Example using React.js and wagmi

This React.js example initializes the Solve3 Captcha module, gets the message to sign, signs the message using wagmi, and opens the captcha challenge when the `Set Message` button is clicked. Make sure to replace the placeholders with your actual values and Ethereum provider.

```javascript
import { useState } from "react";
import { useAccount, useSignMessage, useContractWrite } from "wagmi";
import { abi } from "./abi";
import { Solve3 } from "@solve3/captcha";

const Message = () => {
  const yourContract: `0x${string}` = "0xYourContractAddress";

  const { signMessageAsync } = useSignMessage();
  const { address } = useAccount();
  const [message, setMessage] = useState<string>("");

  const { data: writeData, writeAsync } = useContractWrite({
    address: yourContract,
    abi: abi,
    functionName: "setMessage", 
  });

  const solve3 = new Solve3();

  solve3.on("success", async (proof: string) => {
    // function sig: setMessage(string memory message, bytes memory proof)
    await writeAsync({ args: [message, proof] });
  });

  const onClickHandler = async () => {
    const messageToSign: string = await solve3.init({
      account: address as string,
      destination: yourContract,
      network: 5,
    });

    const signature = await signMessageAsync({ message: messageToSign });
    await solve3.open(signature);
  };

  return (
    <div>
      ...
      <h3>New Message:</h3>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={onClickHandler}>Set Message</button>
      ...
    </div>
  );
};

export default Message;

```
