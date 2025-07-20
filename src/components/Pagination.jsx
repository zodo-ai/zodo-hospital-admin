/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";

export function itemRender(current, type, originalElement) {
  if (type === "prev") {
    return (
      <Link>
        <i className="feather-chevron-left">
          <FeatherIcon icon="chevron-left" />
        </i>
      </Link>
    );
  }
  if (type === "next") {
    return (
      <Link>
        <i className="feather-chevron-right">
          <FeatherIcon icon="chevron-right" />
        </i>
      </Link>
    );
  }
  return originalElement;
}

export function onShowSizeChange(current, pageSize) {
}
