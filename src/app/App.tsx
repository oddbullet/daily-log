import "./App.css";
import Header from "../components/header";
import Body from "../components/body";
import { useEffect, useState, type JSX } from "react";
import Auth from "../components/auth";
import { auth } from "../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Log from "../components/log";
import Dashboard from "../components/dashboard";
import Setting from "../components/setting";

function App() {
  const [isSignIn, setSignIn] = useState(false);
  const [isNewEntry, setIsNewEntry] = useState(false);
  const [pageState, setPage] = useState(0);

  interface numberAndJSX {
    [key: number]: JSX.Element;
  }

  const page: numberAndJSX = {
    0: <Body isNewEntry={isNewEntry} setIsNewEntry={setIsNewEntry}></Body>,
    1: <Log></Log>,
    2: <Setting></Setting>,
  };

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
      <Header setIsNewEntry={setIsNewEntry} setPage={setPage}></Header>
      {/* <Body isNewEntry={isNewEntry} setIsNewEntry={setIsNewEntry}></Body> */}
      {page[pageState]}
    </div>
  );
}

export default App;
