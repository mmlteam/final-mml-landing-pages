import React, { useEffect } from "react";
import Head from "../Head";
import PageAnimWrapper from "../../components/pagetransition";
import { useHistory } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
// import "../contact/contact.scss";
import "./thankyou.scss";

const Thankyou = () => {
  let history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);

    const timer = setTimeout(() => {
      history.push("/");
    }, 10000);

    return () => clearTimeout(timer);
  }, [history]);

  return (
    <PageAnimWrapper>
      <Head
        title="Makemelive Technologies Thank You Page"
        ogdescription="We will be in touch with you within 24 hours."
        description="Shopify Website Design and Development Company"
        url="https://solutions.makemelive.in/shopify-development-v1/thankyou"
        type="website"
        site_name="Makemelive Technologies"
      />
      <div className="page-wrapper thankyou-page">
        <div className="container">
          <div className="row">
            <div className="col-md-10 col-xs-12 col-offset-md-2">
              <div className="col-md-10 col-xs-12">
                <div className="content thankyou-wrapper align-center">
                  <div className="check-sign">
                    <FaCheck />
                  </div>
                  <div className="thankyou-title">
                    <h2>Thank You!</h2>
                  </div>
                  <div className="thankyou-subtitle">
                    <p>We will be in touch with you within 24 hours.</p>
                  </div>
                  <div className="thankyou-desc">
                    <p>For any further inquiries,</p>
                    <p>
                      please email us at{" "}
                      <a href="mailto:connect@makemelive.in">
                        connect@makemelive.in
                      </a>
                    </p>
                    <p>
                      or Call/WhatsApp on{" "}
                      <a href="tel:+919136651479">+91 9136651479</a>
                    </p>

                    <p className="custom-redirect-content">
                      We are redirecting you to main website in 10 seconds...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageAnimWrapper>
  );
};

export default Thankyou;
