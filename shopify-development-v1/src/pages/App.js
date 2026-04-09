import React, { useEffect } from "react";
// import Routes from "../routes";
import Navigation from "../components/navigation";
import ContactforBusiness from "./contact-for-business";
import LpFooter from "../components/lp-footer";
import Head from "./Head";
import WhatsApp from "../components/whatsapp-chat";

const App = () => {
  useEffect(() => {
    const basePath = (process.env.PUBLIC_URL || "").replace(/\/+$/, "");

    if (!basePath) {
      return;
    }

    const currentPath = window.location.pathname.replace(/\/+$/, "");
    const isWrongPath =
      currentPath !== basePath ||
      window.location.search !== "" ||
      window.location.hash !== "";

    if (isWrongPath) {
      window.history.replaceState({}, "", basePath);
    }
  }, []);

  return (
    <div className="app">
      <Head />
      <Navigation />
      <main className="main">
        <ContactforBusiness />
      </main>
      <WhatsApp />
      <LpFooter />
    </div>
  );
};

export default App;
