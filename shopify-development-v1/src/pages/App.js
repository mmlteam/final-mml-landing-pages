import React from "react";
import Routes from "../routes";
import Navigation from "../components/navigation";
import LpFooter from "../components/lp-footer";
import Head from "./Head";
import WhatsApp from "../components/whatsapp-chat";

const App = () => {
  return (
    <div className="app">
      <Head />
      <Navigation />
      <main className="main">
        <Routes />
      </main>
      <WhatsApp />
      <LpFooter />
    </div>
  );
};

export default App;
