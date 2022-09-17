import {
  ConnectWallet,
  useAddress,
  useContract,
  useContractRead,
  Web3Button,
} from "@thirdweb-dev/react";
import type { NextPage } from "next";
import { useState } from "react";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const address = useAddress();
  const contractAddress = "0x80ddA9989F272BFB1c53c1A100ff118Fd27dDb59";
  const [input, setInput] = useState("");
  const { contract } = useContract(contractAddress);
  const { data, isLoading } = useContractRead(contract, "getTodo");

  return (
    <div className={styles.container}>
      {address ? (
        <>
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

          <div>
            {isLoading ? (
              "Loading..."
            ) : (
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
            )}
          </div>
        </>
      ) : (
        <ConnectWallet accentColor="#1ce" colorMode="light" />
      )}
    </div>
  );
};

export default Home;
