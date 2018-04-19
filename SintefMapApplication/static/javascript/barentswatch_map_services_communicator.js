function BarentswatchMapServicesCommunicator() {
    this._token = "";
    this._wms_url = "https://geo.barentswatch.no/geoserver/bw/wms";
    this._map_services_base_url = "https://www.barentswatch.no/api/v1/geodata/download/";
    this._ais_service_url = "https://www.barentswatch.no/api/v1/geodata/ais/positions?xmin=0&ymin=53&xmax=38&ymax=81";
    this._map_services_format = "?format=JSON";
    this._format = "image/png";
    this._crossOriginPolicy = "anonymous";
    this._barentswatchServerType = "geoserver";
    this._transparencyPolicy = true;
    this._wmsRatio = 1;
    this._barentswatchWMSLayerVersion = "1.1.1";
    this.sProjection = "EPSG:3857";
    this.projection = ol.proj.get(this.sProjection);
    this.projectionExtent = this.projection.getExtent();
}

// __BEGIN_AIS_SERVICE_
BarentswatchMapServicesCommunicator.prototype.fetchAISData = function () {
    return new ol.layer.Vector({
        source: new ol.source.Vector({
            url: this._ais_service_url,
            format: new ol.format.GeoJSON()
        })
    });
};
// __END_AIS_SERVICE_

// __BEGIN_API_SERVICES_
BarentswatchMapServicesCommunicator.prototype._buildApiServiceQueryString = function (layerName) {
    return this._map_services_base_url + layerName + this._map_services_format;
};


BarentswatchMapServicesCommunicator.prototype.createApiServiceVectorLayer = function (layerName, style) {
    return new ol.layer.Vector({
        source: new ol.source.Vector({
            url: this._buildApiServiceQueryString(layerName),
            format: new ol.format.GeoJSON()
        }),
        style: style,
        title: layerName
    });
};

BarentswatchMapServicesCommunicator.prototype.parseAuthenticatedVectorLayer = function (data) {
    console.log(data);
    console.log("Entering parseAuthenticatedVectorLayer ");
    var layer = new ol.layer.Vector({
        source: new ol.source.Vector({
            features: (new ol.format.GeoJSON()).readFeatures(data)
        }),
        style: style,
        title: layerName
    });
    return layer;
};

BarentswatchMapServicesCommunicator.prototype.createAuthenticatedServiceVectorLayer = function (token, query, layerName) {
    console.log(token);
    console.log("Entering create authenticatedServiceVectorLayer");
    FiskInfoUtility.corsRequest(query, "GET", "", this.parseAuthenticatedVectorLayer, corsErrBack, token);
};

function corsErrBack(error) {
    alert(error);
}

// ?????
BarentswatchMapServicesCommunicator.prototype.createClusturedApiServiceVectorLayer = function (layerName, style) {
    var vectorSource = new ol.layer.Vector({
        source: new ol.source.Vector({
            url: this._buildApiServiceQueryString(layerName),
            format: new ol.format.GeoJSON()
        }),
        style: style
    });

    return new ol.source.Cluster({
        distance: 10,
        source: vectorSource
    });
};

BarentswatchMapServicesCommunicator.prototype._createAuthenticatedAiSLayer = function (token, that) {
    that._token = token;
    if (that !== null) {
        return that.createAuthenticatedServiceVectorLayer(that._token, "https://www.barentswatch.no/api/v1/geodata/ais/positions?xmin=0&ymin=53&xmax=38&ymax=81", "Fartøy (AIS)");
    } else {
        return this.barentswatchCommunicator.createAuthenticatedServiceVectorLayer(that._token, "https://www.barentswatch.no/api/v1/geodata/ais/positions?xmin=0&ymin=53&xmax=38&ymax=81", "Fartøy (AIS)");
    }

};

BarentswatchMapServicesCommunicator.prototype.createAisVectorLayer = function (backend) {
    if (this._token === "") {
        backend.getToken(this._createAuthenticatedAiSLayer, this);
    } else {
        return this.createAuthenticatedServiceVectorLayer(this._token, "https://www.barentswatch.no/api/v1/geodata/ais/positions?xmin=0&ymin=53&xmax=38&ymax=81", "Fartøy (AIS)");
    }
};

// __END_API_SERVICES_

// __BEGIN_WMS_SERVICES_
BarentswatchMapServicesCommunicator.prototype.createWaveWarningSingleTileWMS = function () {
    return this.createSingleTileWMS("bw:waveforecast_area_iso_latest");
};

BarentswatchMapServicesCommunicator.prototype.createIceEdgeSingleTileWMS = function () {
    return this.createSingleTileWMS("bw:icechart_latest");
};

BarentswatchMapServicesCommunicator.prototype.createIceEdgeSingleTileWMS = function () {
    return this.createSingleTileWMS("bw:icechart_latest");
};
BarentswatchMapServicesCommunicator.prototype.createIceEdgeSingleTileWMS = function () {
    return this.createSingleTileWMS("bw:icechart_latest");
};
BarentswatchMapServicesCommunicator.prototype.createIceEdgeSingleTileWMS = function () {
    return this.createSingleTileWMS("bwdev:iceedge_latest");
};

BarentswatchMapServicesCommunicator.prototype.createSingleTileWMS = function (layername) {
    return new ol.layer.Image({
        source: new ol.source.ImageWMS({
            ratio: this._wmsRatio,
            url: this._wms_url,
            crossOrigin: this._crossOriginPolicy,
            params: {
                "FORMAT": this._format,
                "VERSION": this._barentswatchWMSLayerVersion,
                LAYERS: layername,
                STYLES: ''
            },
            serverType: this._barentswatchServerType,
            transparent: this._transparencyPolicy
        }),
        title: layername
    });
};

// __END_WMS_SERVICES_