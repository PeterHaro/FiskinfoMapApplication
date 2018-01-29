function ComputerBackend() {
    this._token = "";
    this._httpBuilder = new SimpleHtmlBuilder();
}

ComputerBackend.prototype.showBottmsheet = function(feature) {
    var body = $("#bottom_sheet_container");
    body.val("");
    $("#modal_header").text(feature._name); //TODO: Create getters and setters
    body.append("<h6>" + feature._norwegianTitle + "</h6>");
    body.append("<div class='divider'></div>");

    body.append(this._httpBuilder.createModalIconLine("layers", "Område", feature._areaSubheader));
    this._httpBuilder.clear();
    body.append(this._httpBuilder.createModalIconLine("directions_boat", "Seismikkfartøy", feature._seismicVessel));
    this._httpBuilder.clear();


    var bottomSheet = document.querySelector("#bottom_sheet");
    var instance = M.Modal.getInstance(bottomSheet);
    instance.open();
};

ComputerBackend.prototype.getToken = function() {
    if(this._token !== "") {
        //RETURN TOKEN
    }
    // ELSE AUTHENTICATE HERE
    this._token = "Create this method";
};