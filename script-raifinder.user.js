// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      2025-02-23
// @description  try to take over the world!
// @author       Thunlos
// @match        https://www.operateur112.fr/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=operateur112.fr
// @grant        none
// ==/UserScript==


(function() {
	'use strict';
	
	const mostRevelentStyles = {
		fontSize: "1.2em",
		color: "red"
	}



	async function loadMissionPageInjection(iframeNode, iframeContentWindow) {

		let missionName = iframeContentWindow.document.getElementById("mission_general_info").dataset.missionTitle.toUpperCase();
		let RAIContainer = iframeContentWindow.document.getElementById("mission-aao-group");
		if (!RAIContainer)
			return;
		let RAIs = RAIContainer.querySelectorAll("a span");
		let mostRevelent = null;
		for (let RAISpan of RAIs) {
			let RAIName = RAISpan.innerText;
			let RAINameUpper = RAIName.toUpperCase();
			let foundCharIdx = [];

			let i = 0;
			for (let j in missionName) {
				let current_i = i;
				while (current_i < RAINameUpper.length && RAINameUpper[current_i] != missionName[j]) {
					current_i++;
				}
				if (current_i !== RAINameUpper.length) {
					i = current_i + 1;
					foundCharIdx.push(current_i);
				}
			}
			if (foundCharIdx.length === 0)
				continue;
			let relevency = foundCharIdx.length / RAINameUpper.length;
			if (relevency > 0 && (!mostRevelent || mostRevelent.relevency < relevency)) {
				mostRevelent = { DOMElement: RAISpan, RAIName: RAIName, relevency: relevency };
			}

			let newRAIName = "";
			let bolding = false;
			i = 0;
			let j = 0;
			while (i < RAIName.length) {
				if (j < foundCharIdx.length && foundCharIdx[j] == i) {
					if (!bolding) {
						bolding = true;
						newRAIName += "<b>";
					}
					j++;
				} else {
					if (bolding) {
						bolding = false;
						newRAIName += "</b>";
					}
				}
				newRAIName += RAIName[i];
				i++;
			}
			if (bolding)
				newRAIName += "</b>";
			console.log(RAIName, newRAIName);
			RAISpan.innerHTML = newRAIName;
		}

		if (mostRevelent) {
			if (mostRevelentStyles) {
				for (let style in mostRevelentStyles) {
					mostRevelent.DOMElement.style[style] = mostRevelentStyles[style];
				}
			}

			let panel = mostRevelent.DOMElement.closest("[role=tabpanel]");
			if (panel.id && panel.id.startsWith("aao_category_")) {
				let panelBtn = RAIContainer.querySelector("#aao-tabs li a[href='#" + panel.id + "']");
				if (panelBtn) {
					panelBtn.click();
				}
			}
		}

	}


	let popupPage = document.getElementById("lightbox_box");
	const callback = (mutationList, observer) => {
		for (const mutation of mutationList) {
			if (mutation.type === "childList") {
				for (let node of mutation.addedNodes) {
					if (node.classList.contains("lightbox_iframe")) {
						node.onload = () => {
							if (node.src.startsWith(window.location.origin + "/missions/"))
								loadMissionPageInjection(node, node.contentWindow);
						}
					}
				}
			}
		}
	};

	const observer = new MutationObserver(callback)
	observer.observe(popupPage, { attributes: false, childList: true, subtree: false });
})();