function SimpleHtmlBuilder() {
    this._retval = "";
}

SimpleHtmlBuilder.prototype.createModalIconLine = function (iconName, fieldName, fieldValue) {
    this.beginRow();
    this.beginColumn("6");
    this.addMaterialIcon(iconName);
    this.addStrongText(fieldName);
    this.closeDiv();
    this.beginColumn("6");
    this.addText(fieldValue);
    this.closeDiv();
    this.endRow();
    var retval = this.getString();
    this.clear();
    return retval;
};

SimpleHtmlBuilder.prototype.getSelfContainedHeading = function(headingSize, text) {
    return "<h" + headingSize + " class='blue-text'>" + text + "</h" + headingSize + ">";
};

SimpleHtmlBuilder.prototype.createHeading = function(headingSize, text) {
    this._retval += "<h" + headingSize + ">" + text + "</h" + headingSize + ">";
};

SimpleHtmlBuilder.prototype.addText = function (text) {
    this._retval += text;
};

SimpleHtmlBuilder.prototype.beginColumn = function (size) {
    this._retval += "<div class='col " + size + "'>";
};

SimpleHtmlBuilder.prototype.addMaterialIcon = function (icon) {
    this._retval += "<i class='material-icons prefix'>" + icon + "</i>";
};

SimpleHtmlBuilder.prototype.addStrongText = function (text) {
    this._retval += "<strong>" + text + "</strong>";
};

SimpleHtmlBuilder.prototype.clear = function () {
    this._retval = "";
};

SimpleHtmlBuilder.prototype.getString = function () {
    return this._retval;
};

SimpleHtmlBuilder.prototype.beginRow = function () {
    this._retval += "<div class='row'>";
};

SimpleHtmlBuilder.prototype.endRow = function () {
    this.closeDiv();
};

SimpleHtmlBuilder.prototype.closeDiv = function () {
    this._retval += "</div>";
};
