function BarentswatchGeoserverCommunicator() {
    this._wms_url = "https://geo.barentswatch.no/geoserver/bw/wms";
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

BarentswatchGeoserverCommunicator.prototype.createWaveWarningSingleTileWMS = function () {
    return this.createSingleTileWMS("bw:waveforecast_area_iso_latest");
};

BarentswatchGeoserverCommunicator.prototype.createIceEdgeSingleTileWMS = function () {
    return this.createSingleTileWMS("bw:icechart_latest");
};

BarentswatchGeoserverCommunicator.prototype.createIceEdgeSingleTileWMS = function () {
    return this.createSingleTileWMS("bw:icechart_latest");
};
BarentswatchGeoserverCommunicator.prototype.createIceEdgeSingleTileWMS = function () {
    return this.createSingleTileWMS("bw:icechart_latest");
};
BarentswatchGeoserverCommunicator.prototype.createIceEdgeSingleTileWMS = function () {
    return this.createSingleTileWMS("bw:icechart_latest");
};

BarentswatchGeoserverCommunicator.prototype.createSingleTileWMS = function (layername) {
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
        })
    });
};

