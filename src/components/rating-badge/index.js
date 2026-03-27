import React from "react";
import { FaStar } from "react-icons/fa";
import "./rating-badge.scss";

const GoogleRatingButton = () => {
  return (
    <div className="star-rating-container">
      <button className="plR5qb Y5MKCd" role="link" type="button">
        {/* animated sweep layer 1 */}
        <div className="xL0qi">
          <div className="iydNQb"></div>
        </div>

        {/* animated sweep layer 2 */}
        <div className="mTurwe">
          <div className="iydNQb"></div>
        </div>

        {/* inner white pill bg */}
        <div className="bvUkz"></div>

        {/* content */}
        <div className="u4Uk3c ratingRow">
          {/* LEFT: stars */}
          <div className="ratingRow__stars">
            {[...Array(5)].map((_, i) => (
              <span className="rating-badge__star" key={i}>
                <FaStar />
              </span>
            ))}
          </div>

          {/* MIDDLE: score + reviews */}
          <div className="ratingRow__scoreBlock">
            <div className="ratingRow__scoreLine">
              <span className="ratingRow__scoreValue">5</span>
              <span className="ratingRow__scoreOutof">/5</span>
            </div>
            {/* <div className="ratingRow__reviewsText">
              <span className="ratingRow__reviewsStrong">150+ reviews</span> on
              Google
            </div> */}
          </div>

          {/* DIVIDER */}
          <div className="ratingRow__divider" />

          {/* RIGHT: top rated + location */}
          <div className="ratingRow__metaBlock">
            <div className="ratingRow__title">Top Rated</div>
            <div className="ratingRow__subtitle">Web Agency · Mumbai</div>
          </div>
        </div>
      </button>
    </div>
  );
};

export default GoogleRatingButton;
