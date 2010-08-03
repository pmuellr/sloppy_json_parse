//-------------------------------------------------------------------
var output

if (typeof JSON == "undefined") {
	alert("this page only runs in a browser that supports JSON")
	throw new Error("JSON not defined")
}

window.addEventListener("load", testAll, false)

//-------------------------------------------------------------------
function testAll() {
	output = document.getElementById("output")
	testAllSections()
}

//-------------------------------------------------------------------
function testAllSections() {
	var sections = document.getElementsByTagName("section")
	
	for (var i=0; i<sections.length; i++) {
		testSection(sections[i])
	}
	
	log("")
	log("all tests complete")
}

//-------------------------------------------------------------------
function testSection(section) {
	var id = section.id

	if (null == id || "" == id) id = "[unnamed]"
	
	var srcElements = section.getElementsByTagName("pre")
	if (srcElements.length != 2) {
		return logFail(section, "expecting two &lt;pre&gt;'s in &lt;section id='" + id + "'&gt;")
	}
		
	var h2 = document.createElement("h1")
	h2.innerHTML = "test: " + id
	
	var h3s = document.createElement("h3")
	h3s.innerHTML = "sloppy json"
			
	var h3j = document.createElement("h3")
	h3j.innerHTML = "json"
			
	section.insertBefore(h2,  srcElements[0])
	section.insertBefore(h3s, srcElements[0])
	section.insertBefore(h3j, srcElements[1])
	
	if (null == section.id) return logFail(section, "section has no id")
	if (""   == section.id) return logFail(section, "section has no id")
	
	return test(section, srcElements[0].innerHTML, srcElements[1].innerHTML)
}

//-------------------------------------------------------------------
function test(section, sString, jString) {
	try {
		sString = JSON.stringify(sloppy_json_parse(sString))
	}
	catch (e) {
		return logFail(section, "error parsing SloppyJSON: " + e.message)
	}

	try {
		jsString = JSON.stringify(sloppy_json_parse(jString))
	}
	catch (e) {
		return logFail(section, "error parsing JSON as SloppyJSON: " + e.message)
	}
	
	try {
		jString = JSON.stringify(JSON.parse(jString))
	}
	catch (e) {
		return logFail(section, "error parsing JSON: " + e.message)
	}
	
	if (jsString != sString) {
		return logFail(section, "JSON didn't parse the same as SloppyJSON")
	}
	
	if (jString != sString) {
		return logFail(section, "strings don't parse the same")
	}
	
	return logPass(section)
}

//-------------------------------------------------------------------
function logPass(section) {
	log("passed: " + section.id, "color:#0C0")
	return true
}

//-------------------------------------------------------------------
function logFail(section, message) {
	section.style.display = "block";
	
	var id = section.id
	if (id == "") id = "[unnamed]";
	
	log("failed: " + id + "; " + message, "color:#F00")
	return false
}

//-------------------------------------------------------------------
function log(message, style) {
	if (style) message = "<span style='" + style + "'>" + message + "</span>"
	output.innerHTML += message + "<br>"
}
