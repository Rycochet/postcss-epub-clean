"use strict";

/**
 * Properties to prefix.
 */
var postcss = require("postcss"),
		list = require("postcss/lib/list"),
		props = [
			// text
			"hyphens",
			"line-break",
			"text-align-last",
			"text-emphasis",
			"text-emphasis-color",
			"text-emphasis-style",
			"word-break",
			// writing modes
			"writing-mode",
			"text-orientation",
			"text-combine-upright",
			// text to speech
			"cue",
			"cue-before",
			"cue-after",
			"pause",
			"rest",
			"speak",
			"speak-as",
			"voice-family"
		],
		types = [
			"opentype",
			"woff"
		];

/**
 * PostCSS plugin to prefix ePub3 properties.
 * @param {Object} style
 */
function plugin(style) {
	var i, fonts, usable, hasWeight, hasStyle,
			epub = /^-epub-/,
			url = /url\(/,
			font = new RegExp("format\\(['\"]?(" + types.join("|") + ")['\"]?\\)");

	style.eachDecl(function(decl) {
		if (decl.value) {
			if (props.indexOf(decl.prop) >= 0) {
				decl.parent.insertBefore(decl, decl.clone({prop: "-epub-" + decl.prop}));
			} else if (decl.prop[0] === "-" && !epub.test(decl.prop)) {
				decl.parent.remove(decl);
			}
		}
	});
	style.eachAtRule(function(rule) {
		if (rule.name === "font-face") {
			hasWeight = hasStyle = false;
			rule.eachDecl(function(decl) {
				switch (decl.prop) {
					case "src":
						fonts = list.comma(decl.value);
						usable = [];
						for (i = 0; i < fonts.length; i++) {
							if (!url.test(fonts[i]) || font.test(fonts[i])) {
								usable.push(fonts[i]);
							}
						}
						decl.value = usable.join(",");
						break;
					case "font-weight":
						hasWeight = true;
						break;
					case "font-style":
						hasStyle = true;
						break;
				}
			});
			if (!hasWeight) {
				rule.append({prop: "font-weight", value: "normal"});
			}
			if (!hasStyle) {
				rule.append({prop: "font-style", value: "normal"});
			}
		}
	});
}

/*
 * ...and export for use...
 */
module.exports = {
	postcss: plugin,
	process: function(css, opts) {
		return postcss(plugin).process(css, opts).css;
	}
};
