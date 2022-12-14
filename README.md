# Full Stack Web3 todo app

This project demonstrates how you can build a full web3 application that allows users to create an on-chain to-do list, using Solidity for the smart contract and Next.js for the application.

## Tools:

- [React SDK](https://docs.thirdweb.com/react): To access the connected wallet, switch the user's network, and claim an NFT from our Edition Drop collection.
- [Deploy](https://portal.thirdweb.com/deploy): To deploy a custom todo smart contract and use it on our frontend using the React sdk.

## Using This Template

Create a project using this example:

```bash
npx thirdweb create --template todo-list
```

- Go into the `contracts` folder:

```bash
cd contracts
```

- Deploy the smart contract:

```bash
npx thirdweb deploy
```

- Copy the contract address and paste it into the `contractAddress` variable in `pages/index.js`.

## How It Works

Using [Deploy](https://portal.thirdweb.com/deploy), we first deploy the contract, then we can use it in our dapp using the thirdweb react sdk.

Next, we use the `useContractData` to get all the todos, and map through it to display them on the page.

## Adding todos

We use the `Web3Button` UI component from thirdweb and pass in the contract address and onClick event to it. In the onClick function we are calling the setTodo function on the contract with the input:

```tsx
<div className={styles.todoForm}>
  <input
    value={input}
    onChange={(e) => setInput(e.target.value)}
    placeholder="Enter todo"
  />

  <Web3Button
    contractAddress={contractAddress}
    action={(contract) => contract.call("setTodo", input)}
    accentColor="#1ce"
  >
    Set Todo
  </Web3Button>
</div>
```

### Deleting the todos

Where we map through all the todos we will add another `Web3Button` component that will call the `deleteTodo` function on the contract:

```tsx
<ul>
  {data.map((item: string, index: number) => (
    <li key={index} className={styles.todo}>
      {item}
      <Web3Button
        contractAddress={contractAddress}
        action={(contract) => contract.call("deleteToDo", index)}
        accentColor="#1ce"
      >
        Delete Todo
      </Web3Button>
    </li>
  ))}
</ul>
```

## Join our Discord!

For any questions or suggestions, join our discord at [https://discord.gg/thirdweb](https://discord.gg/thirdweb).
