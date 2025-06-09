import "./App.css";
import Header from "../components/header";
import Body from "../components/body";
import { useEffect, useState } from "react";
import Auth from "../components/auth";
import { auth } from "../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [isSignIn, setSignIn] = useState(false);
  const [isNewEntry, setIsNewEntry] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setSignIn(true);
      } else {
        setSignIn(false);
      }
    });
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
