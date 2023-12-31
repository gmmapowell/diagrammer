import EdgeEndPropertiesParser from "./edgeendparser.js";
import { EdgeEnd } from "./model/edge.js";

class EdgeConfigParser {
	constructor(model, errors) {
		this.model = model;
		this.errors = errors;	
	}

	line(l) {
		var cmd = l.tokens[0];
		switch (cmd) {
			case "from": 
			case "to":
			{
				switch (l.tokens.length) {
					case 1: {
						this.errors.raise(cmd + " property requires a node reference");
						break;
					}
					case 2: {
						var end = new EdgeEnd(cmd, l.tokens[1]);
						this.model.add(end);
						return new EdgeEndPropertiesParser(end, this.errors);
					}
					default: {
						this.errors.raise(cmd + ": too many arguments");
						break;
					}
				}
				break;
			}
			default: {
				this.errors.raise("no property: " + cmd);
			}
		}
	}
}

export default EdgeConfigParser;