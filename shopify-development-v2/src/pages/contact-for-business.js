import React from "react";

export default function ContactforBusiness() {
  return (
    <section
      style={{
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 24px",
        background:
          "linear-gradient(135deg, #f7fbff 0%, #eef5ff 45%, #f3f7ef 100%)"
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "720px",
          textAlign: "center",
          background: "#ffffff",
          borderRadius: "24px",
          padding: "56px 32px",
          boxShadow: "0 18px 60px rgba(15, 23, 42, 0.08)"
        }}
      >
        <p
          style={{
            margin: "0 0 12px",
            fontSize: "14px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#5b6b7f",
            fontWeight: 700
          }}
        >
          Shopify Development V2
        </p>
        <h1
          style={{
            margin: "0 0 16px",
            fontSize: "clamp(40px, 7vw, 72px)",
            lineHeight: 1,
            color: "#10233f"
          }}
        >
          Hello World
        </h1>
        <p
          style={{
            margin: 0,
            fontSize: "18px",
            lineHeight: 1.7,
            color: "#4c5d73"
          }}
        >
          This is the placeholder landing page for
          {" "}
          <strong>/shopify-development-v2</strong>.
        </p>
      </div>
    </section>
  );
}
