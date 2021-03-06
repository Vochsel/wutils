
/* ----------------- Data Utils -------------- */

var out_data= {};

/* ======= Quick Data Object =======
	 - Author: Ben Skinner
	 - Params:
	 	- val (initial value of data)
	 - Return:
	 	- Quick Data Object
*/
out_data.create = function(val) {
	/* ======= Creates Inlet =======
		 - Author: Ben Skinner
		 - Desc: Adds event listener to @evt to change value of data
		 - Private internal function
		 - Params:
		 	- qd (Quick Data reference)
		 	- dom (Direct HTML DOM reference)
		 	- evt (String of event to listen for)
		 - Return:
		 	- Quick Data Object
	*/
	var CreateInlet = function(qd, dom, evt) {
		//Temporary data value
		var t = qd;
		//Add event listener to input of DOM
		dom.addEventListener(evt, function(e) {
			var val = (e.target.isContentEditable) ? e.target.innerHTML : e.target.value;

			t.update(val);
		});
		//Push input reference into array of inputs
		qd.inlets.push(dom);

		//Update data value
		qd.update(qd.value);
	}
	/* ======= Creates Outlet =======
		 - Author: Ben Skinner
		 - Desc: Adds event listener to @evt to change value of data
		 - Private internal function
		 - Params:
		 	- qd (Quick Data reference)
			- callback (function callback called on data change)
			- data_ref ()
		 - Return:
		 	- Quick Data Object
	*/
	var CreateOutlet = function(qd, callback, data_ref) {
		//Build outlet variable with dom reference, and outlet callback
		var out = {
			callback: callback,
			data: data_ref
		};
		//Push output reference
		qd.outlets.push(out);
		//Updata data value
		qd.update(qd.value);
	}

	return {
		value: val,
		setValue: function(v) {
			this.value = v;
		},
		getValue: function() { return this.value; },
		inlets: [],
		outlets: [],
		updateInlets: function(v) {
			//Update all inlets
			for(var i=0; i<this.inlets.length; i++) {
				if(this.inlets[i].isContentEditable && this.inlets[i] !== document.activeElement) {
					this.inlets[i].innerHTML = this.getValue();
				} else {
					this.inlets[i].value = this.getValue();
				}
			}
		},
		updateOutlets: function(v) {
			//Update all outlets
			for(var i=0; i<this.outlets.length; i++) {
				//Pass through value and data reference
				this.outlets[i].callback(this.getValue(), this.outlets[i].data);
			}
		},
		/* ======= Update data =======
			 - Author: Ben Skinner
			 - Desc: Updates value and updates all callbacks for inlets and outlets
			 - Params:
			 	- v (value to set to)
			 - Return:
			 	- Quick Data Object
		*/
		update: function(v) {
			//Update internal value if argument
			if(v !== undefined)
				this.setValue(v);

			this.updateOutlets(v);

			this.updateInlets(v);
		},
		/* ======= Adds inlet =======
			 - Author: Ben Skinner
			 - Desc: adds inlet to array
			 - Params:
			 	- doms_str (identification of dom)
			 	- evt (optional event string)
			 - Return:
			 	- Quick Data Object
		*/
		inlet: function(doms_str, evt) {
			//Select necessary DOM elements
			var doms = module.exports.dom.getAll(doms_str);

			//Default setting of evt
			if(evt === undefined)
				evt = "input";

			//If single DOM element
			if(doms.constructor !== Array) {
				CreateInlet(this, doms, evt);
			} else {
				//Otherwise loop and add all DOM elements
				for(var i = 0; i < doms.length; ++i) {
					CreateInlet(this, doms[i], evt);
				}
			}
			return this;
		},
		/* ======= Adds outlet =======
			 - Author: Ben Skinner
			 - Desc: adds outlet to array
			 - Params:
				- callback (function to call on value updated)
			 	- data_ref (external data reference to be passed through)
			 - Return:
			 	- Quick Data Object
		*/
		outlet: function(callback, data_ref) {
			//Create outlet
			CreateOutlet(this, callback, data_ref);
			return this;
		}
	}
};

/* ======= Quick Data Presets =======
	 - Author: Ben Skinner
	 - Members:
	 	- HTML (Replaces innerHTML with value)
	 	- Attribute (Sets attribute @attr with value)
*/
out_data.presets = {
	HTML: function(value, data_ref) {
		//If single DOM element
		if((data_ref.constructor !== HTMLCollection) && (data_ref.constructor !== Array)) {
			data_ref.innerHTML = value;
		} else {
			//Otherwise loop and add all DOM elements
			for(var i = 0; i < data_ref.length; ++i) {
				data_ref[i].innerHTML = value;
			}
		}
	},
	TextArea: function(value, data_ref) {
		//If single DOM element
		if((data_ref.constructor !== HTMLCollection) && (data_ref.constructor !== Array)) {
			data_ref.value = value;
		} else {
			//Otherwise loop and add all DOM elements
			for(var i = 0; i < data_ref.length; ++i) {
				data_ref[i].value = value;
			}
		}
	},
	Attribute: function(value, data_ref) {
		if((data_ref.dom.constructor !== HTMLCollection) && (data_ref.dom.constructor !== Array)) {
			if(data_ref.dom.setAttribute === undefined)
				data_ref.dom[data_ref.attr] = value;
			else
				data_ref.dom.setAttribute(data_ref.attr, value);
		} else {
			for(var i = 0; i < data_ref.dom.length; ++i) {
				if(data_ref.dom[i].setAttribute === undefined)
					data_ref.dom[i].attr = value;
				else
					data_ref.dom[i].setAttribute(data_ref.attr, value);
			}
		}
	},
	LocalStorage: function(value, data_ref) {

	}
}

module.exports = out_data; 