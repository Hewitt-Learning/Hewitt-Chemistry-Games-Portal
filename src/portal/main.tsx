/** @jsxImportSource react */
import React from "react";
import { createRoot } from "react-dom/client";
import { PortalApp } from "./PortalApp";

// This is the root div from index.html where the whole portal gets mounted
const rootNode = document.getElementById("app");

if (!rootNode) {
	// If this ever throws, it means the HTML shell is missing the #app element
	throw new Error("Portal root #app not found.");
}

// Reset browser default margin so our layout starts flush with the viewport
document.body.style.margin = "0";

createRoot(rootNode).render(React.createElement(PortalApp));