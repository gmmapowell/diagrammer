import DiagramModel from "./model/diagram.js";

class Portfolio {
	constructor(errors) {
		this.errors = errors;
		this.diagrams = [];
		this.tabs = {};
	}

	createDiagram(named) {
		var ret = new DiagramModel(this.errors);
		this.diagrams.push({named, diagram: ret });
		return ret;
	}

	ensureTabs(tabrow) {
		this.tabs = {};
		var current = tabrow.querySelectorAll(".diagram-tab");
		var toRemove = [];
		for (var i=0;i<current.length;i++) {
			toRemove[current[i].dataset["diagramFor"]] = current[i];
		}
		for (var i=0;i<this.diagrams.length;i++) {
			var d = this.diagrams[i];
			var t = findTabFor(current, d.named);
			if (!t) {
				t = addDiagramTab(tabrow, d.named);
			} else {
				delete toRemove[d.named];
			}
			this.tabs[d.named] = t;
		}
		var keys = Object.keys(toRemove);
		for (var i=0;i<keys.length;i++) {
			tabrow.removeChild(toRemove[keys[i]]);
		}
	}

	each(f) {
		for (var i=0;i<this.diagrams.length;i++) {
			var d = this.diagrams[i];
			f(d.named, d.diagram, this.tabs[d.named]);
		}
	}
}

function findTabFor(tabs, name) {
	for (var i=0;i<tabs.length;i++) {
		var t = tabs[i];
		if (t.dataset["diagramFor"] == name) {
			return t;
		}
	}
}

function addDiagramTab(tabs, name) {
	var t = document.createElement("div");
	t.className = "diagram-tab";
	t.dataset["diagramFor"] = name;
	var ti = document.createElement("div");
	ti.className = "tab-title";
	ti.appendChild(document.createTextNode(name));
	t.appendChild(ti);
	var cd = document.createElement("div");
	ti.appendChild(cd);
	var c = document.createElement("canvas");
	c.className="diagram";
	c.setAttribute("width", "1200");
	c.setAttribute("height", "800");
	cd.appendChild(c);
	t.appendChild(cd);
	tabs.appendChild(t);
	return t;
}

export default Portfolio;