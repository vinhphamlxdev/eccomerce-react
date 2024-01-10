import React from "react";
import { Link } from "react-router-dom";

export default function BreadCrumb({ paths = [] }) {
  return (
    <div className="breadcrumb-session gap-x-3 px-3 py-3 flex items-center">
      {paths?.length > 0 &&
        paths.map((path, index) => {
          return (
            <Link
              to={path.url}
              key={index}
              className="flex items-center gap-x-1"
            >
              <i
                className={`bi text-[#E24B01] text-base ${
                  index === 0 ? "bi-house" : "bi-chevron-right"
                }`}
              ></i>
              <span className="text-sm text-[#3E0B00]">{path.label}</span>
            </Link>
          );
        })}
    </div>
  );
}
