/*
validator's isValidXML function receives a string, checks if a string is a valid xml, and returns a boolean.

<a /> => true
<a></a> => true
<a>test</a> => true
<a><b></b></a> => true
<a></a><b></b> => true

<a> => false
<<a></a> => false
<a><b></a></b> => false

IMPORTANT: Please note that we have our own internal rules about validity.
1. A node cannot contain a node with the same tag. ex) <a><a></a></a> => false
2. A node cannot be followed by a node with the same tag. ex) <a></a><a></a> => false
3. An xml cannot be more than 2 levels deep. ex) <a><b><c><d></d></c></b></a> => false

IMPORTANT: Feel free to use open source libraries you find necessary.
IMPORTANT: Don't worry about XML declaration, node attributes, or unicode characters.

For further examples, please check basic_spec.js file.

DO NOT MODIFY
*/

/*
@param xmlString: a string, possibly a valid xml string
@return boolean;
*/
exports.isValidXML = xmlString => {
  if (xmlString.length === 0) {
    return false;
  }

  var dom = parseXmlString(xmlString);
  if (!dom) { 
  	return false; 
  }

  if (!validation(dom, 0))
  	return false;

  return true;
  // TODO: FILL ME
};

var parseXmlString = function(str) {
	var ROOT = 'root';
	if (window.DOMParser) {
		var parser = new window.DOMParser();
		str = '<' + ROOT + '>' + str + '</' + ROOT + '>';

		var dom = parser.parseFromString(str, 'text/xml');

		if (dom.getElementsByTagName('parsererror').length > 0)
			return null;

		return dom.firstElementChild;
	}
	
	return null;
}

var validation = function(element, depth, parentTag) {
	if (depth > 2 || element.tagName === parentTag) {
		return false;
	}

	var child = element.firstElementChild;
	var siblingTag = "";

	parentTag = element.tagName;
	while (child) {
		if (child.tagName === siblingTag) {
			return false;
		}

		if (child.childNodes && !validation(child, depth + 1, parentTag)) {
			return false;
		}

		siblingTag = child.tagName;
		child = child.nextSibling;
	}

	return true;
}