// TODO: Add tests that you find necessary.

const { isValidXML } = require("../src");

describe("advanced validator test", () => {
  it("should return true for an xml with blank at first character", () => {
  	expect(isValidXML("	<a />")).toBeTruthy();
  });

  it("should return true for an xml with nonconsecutive nodes of the same tag", () => {
  	expect(isValidXML("<a><b></b><c></c><b></b></a>")).toBeTruthy();
  });

  it("should return true for an xml with self closing tag", () => {
  	expect(isValidXML("<a><b></b><c></c><b></b><d /><e /></a>")).toBeTruthy();
  });

  it("should return false for an xml with consecutive self-closing nodes of the same tag", () => {
  	expect(isValidXML("<a /><a />")).toBeFalsy();
  });

  it("should return false for an xml with consecutive self-closing nodes of the same tag", () => {
  	expect(isValidXML("<a /><a></a>")).toBeFalsy();
  });

  it("should return false for an xml with a node containing a node with the same but self-closing tag", () => {
  	expect(isValidXML("<a ><a/></a>")).toBeFalsy();
  });
});
