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
      <Head
        title="Shopify Development V2"
        description="Hello World placeholder landing page for shopify-development-v2."
        url="https://solutions.makemelive.in/shopify-development-v2/"
        type="website"
        site_name="Makemelive Solutions"
      />
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
