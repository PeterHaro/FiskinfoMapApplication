function ComputerBackend() {
    this._token = "";
    this._httpBuilder = new SimpleHtmlBuilder();
}

ComputerBackend.prototype.showBottmsheet = function (feature) {
    var body = $("#bottom_sheet_container");
    body.text("");
    body.append(this._httpBuilder.getSelfContainedHeading(3, feature._name));
    this._httpBuilder.clear();
    // $("#modal_header").text(feature._name); //TODO: Create getters and setters
    console.log("feature name: " + feature._name);
    body.append("<h6>" + feature._norwegianTitle + "</h6>");
    body.append("<div class='divider'></div>");

    body.append(this._httpBuilder.createModalIconLine("layers", "Område", feature._areaSubheader));
    body.append(this._httpBuilder.createModalIconLine("directions_boat", "Seismikkfartøy", feature._seismicVessel));
    body.append(this._httpBuilder.createModalIconLine("settings_applications", "Type", feature._operationType));
    body.append(this._httpBuilder.createModalIconLine("visibility", "Undertype", feature._underType));
    body.append(this._httpBuilder.createModalIconLine("access_time", "Periode", feature.getPeriod()));
    body.append(this._httpBuilder.createModalIconLine("business", "Ansvarlig selskap", feature._responsibleCompany));
    body.append(this._httpBuilder.createModalIconLine("info", "Kilde", feature._sourceType));
    body.append(this._httpBuilder.createModalIconLine("settings_input_antenna", "Sensortype", feature._sensorType));
    body.append(this._httpBuilder.createModalIconLine("format_list_numbered", "Sensorantall", feature._numberOfSensors));
    body.append(this._httpBuilder.createModalIconLine("arrow_forward", "Sensorlengde", feature._sensorLength));
    body.append(this._httpBuilder.getSelfContainedHeading(6, "MER INFO"));
    body.append("<div class='divider'></div>");
    body.append(this._httpBuilder.createModalIconLine("link", "Oljedirektoratets faktasider", feature._factPage)); //TODO: Make it look like URL
    body.append(this._httpBuilder.createModalIconLine("link", "Oljedirektoratets kart", feature._mapUrl));

    var bottomSheet = document.querySelector("#bottom_sheet");
    var instance = M.Modal.getInstance(bottomSheet);
    instance.open();
};

ComputerBackend.prototype.getToken = function () {
    if (this._token !== "") {
        //RETURN TOKEN
    }
    // ELSE AUTHENTICATE HERE
    this._token = "Create this method";
};