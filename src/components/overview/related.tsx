import React from "react";
import { PropertyData } from "../../../lib/data";
import Property from "../property";
import { motion } from "framer-motion";

function Related() {
  return (
    <div className="related-properties related-container">
      <div className="title-head">
        <h1>Related Properties</h1>
      </div>
      <div className="related-results">
        {/* @ts-ignore */}
        {[...new Array(6).keys()].map((index) => {
          return <Property property={PropertyData[0]} key={index} />;
        })}
      </div>
      <div className="see-more">
        <motion.button
          className="see-more-btn"
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
        >
          <span>See more properties</span>
        </motion.button>
      </div>
    </div>
  );
}

export default Related;
