import "./App.css";
import Header from "../components/header";
import Body from "../components/body";
import { useEffect, useState } from "react";
import Auth from "../components/auth";
import { currentUser } from "../lib/firebase";

function App() {
  const [isSignIn, setSignIn] = useState(false);
  const [isNewEntry, setIsNewEntry] = useState(false);

  useEffect(() => {
    if (currentUser()) {
      setSignIn(true);
    }
  }, []);

  if (!isSignIn) {
    return (
      <Auth
        onSignIn={() => {
          setSignIn(true);
        }}
      ></Auth>
    );
  }
  return (
    <div className="app">
      <Header setIsNewEntry={setIsNewEntry}></Header>
      <Body isNewEntry={isNewEntry} setIsNewEntry={setIsNewEntry}></Body>
    </div>
  );
}

export default App;
