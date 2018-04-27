//DEPENDS ON BarentswatchStylesRepository
function BarentswatchMapServicesCommunicator() {
    this._token = "";
    this._wms_url = "https://geo.barentswatch.no/geoserver/bw/wms";
    this._map_services_base_url = "https://www.barentswatch.no/api/v1/geodata/download/";
    this._ais_service_url = "https://www.barentswatch.no/api/v1/geodata/ais/positions?xmin=0&ymin=53&xmax=38&ymax=81";
    this._tool_serive_url = "https://www.barentswatch.no/api/v1/geodata/download/fishingfacility?format=JSON";
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
    this._map = null;
    this._aisStyle = null;
}

BarentswatchMapServicesCommunicator.prototype.setMap = function (map) {
    this._map = map;
};

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

BarentswatchMapServicesCommunicator.prototype.parseAuthenticatedAISVectorLayer = function (data) {
    var jsonData = JSON.parse(data);
    var geoJsonData = {
        "type": "FeatureCollection",
        "features": []
    };

    for (var i = 0; i < jsonData.length; i++) {
        geoJsonData.features.push({
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [jsonData[i].Lon, jsonData[i].Lat]
            },
            "properties": {
                "TimeStamp": jsonData[i].TimeStamp,
                "Sog": jsonData[i].Sog,
                "Rot": jsonData[i].Rot,
                "Navstat": jsonData[i].Navstat,
                "Mmsi": jsonData[i].Mmsi,
                "Cog": jsonData[i].Cog,
                "ShipType": jsonData[i].ShipType,
                "Name": jsonData[i].Name,
                "Imo": jsonData[i].Imo,
                "Callsign": jsonData[i].Callsign,
                "Country": jsonData[i].Country,
                "Eta": jsonData[i].Eta,
                "Destination": jsonData[i].Destination,
                "IsSurvey": jsonData[i].IsSurvey,
                "Source": jsonData[i].Source
            }
        });
    }

    /* // OLD SAFE
     var layer = new ol.layer.Vector({
     source: new ol.source.Vector({
     features: new ol.format.GeoJSON().readFeatures(geoJsonData, {
     featureProjection: "EPSG:3857"
     })
     }),
     style: BarentswatchStylesRepository.BarentswatchAisStyle,
     title: "AIS"
     });
     */

    /*  //WORKING CLUSTER LAYER, NOW GET ON STYLES!
     var layer = new ol.layer.Vector({
     source: new ol.source.Cluster({
     distance: 10,
     source: new ol.source.Vector({
     features: new ol.format.GeoJSON().readFeatures(geoJsonData, {
     featureProjection: "EPSG:3857"
     })
     })
     }),
     style: BarentswatchStylesRepository.BarentswatchAisStyle,
     title: "AIS"
     });
     */

    var layer = new ol.layer.Vector({
        source: new ol.source.Cluster({
            distance: 10,
            source: new ol.source.Vector({
                features: new ol.format.GeoJSON().readFeatures(geoJsonData, {
                    featureProjection: "EPSG:3857"
                })
            })
        }),
        style: BarentswatchStylesRepository.BarentswatchAisStyle,
        title: "AIS"
    });

    if (this.map != null) {
        BarentswatchStylesRepository.SetAisVectorLayer(layer);
        map.addLayer(layer);
        map.addInteraction(BarentswatchStylesRepository.BarentswatchAisSelectionStyle());
    }
};

BarentswatchMapServicesCommunicator.prototype.parseAuthenticatedToolsVectorLayer = function (data) {
    var layer = new ol.layer.Vector({
        source: new ol.source.Cluster({
            distance: 10,
            source: new ol.source.Vector({
                features: new ol.format.GeoJSON().readFeatures(data, {
                    featureProjection: "EPSG:3857"
                })
            }),
            geometryFunction: function(feature) {
             var geometry = feature.getGeometry();
             if(geometry.getType() === "Point") {
                 return geometry;
             } else if (geometry.getType() === "Polygon") {
                 console.log("Polygon");
                 return geometry.getInteriorPoint();
             } else if (geometry.getType() === "LineString") {
                 return new ol.geom.Point(geometry.getLastCoordinate());
             } else {
                 console.log(geometry.getType());
                 return null;
             }
            }
        }),
        style: BarentswatchStylesRepository.BarentswatchToolStyle,
        title: "Tools"
    });
    if (this.map != null) {
        // SET STYLE
        //BarentswatchStylesRepository
        map.addLayer(layer);
        //ADD SELECTION LISTENER
    }
};

BarentswatchMapServicesCommunicator.prototype.createAuthenticatedServiceVectorLayer = function (token, query, authenticatedCall) {
    if (authenticatedCall === "ais") {
        FiskInfoUtility.corsRequest(query, "GET", "", this.parseAuthenticatedAISVectorLayer, corsErrBack, token);
    } else if (authenticatedCall === "tools") {
        FiskInfoUtility.corsRequest(query, "GET", "", this.parseAuthenticatedToolsVectorLayer, corsErrBack, token);
    }

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

BarentswatchMapServicesCommunicator.prototype._createClusteredSource = function (_distance, _source) {
    return new ol.source.Cluster({
        distance: parseInt(_distance, 10),
        source: _source
    });
};

BarentswatchMapServicesCommunicator.prototype._createAuthenticatedAiSLayer = function (token, that) {
    that._token = token;
    if (that !== null) {
        return that.createAuthenticatedServiceVectorLayer(that._token, that._ais_service_url, "ais");
    } else {
        return this.barentswatchCommunicator.createAuthenticatedServiceVectorLayer(this._token, this._ais_service_url, "ais");
    }

};

BarentswatchMapServicesCommunicator.prototype.createAisVectorLayer = function (backend, aisStyle) {
    if (aisStyle !== null) {
        this._aisStyle = aisStyle;
    }
    if (this._token === "") {
        backend.getToken(this._createAuthenticatedAiSLayer, this);
    } else {
        return this.createAuthenticatedServiceVectorLayer(this._token, this._ais_service_url, "ais");
    }
};

BarentswatchMapServicesCommunicator.prototype._createAuthenticatedToolsLayer = function (token, that) {
    that._token = token;
    if (that !== null) {
        that.createAuthenticatedServiceVectorLayer(that._token, that._tool_serive_url, "tools")
    } else {
        this.barentswatchCommunicator.createAuthenticatedServiceVectorLayer(this._token, this._tool_serive_url, "tools")
    }
};

BarentswatchMapServicesCommunicator.prototype.createToolsVectorLayer = function (backend) {
    if (this._token === "") {
        backend.getToken(this._createAuthenticatedToolsLayer, this);
    } else {
        this.createAuthenticatedServiceVectorLayer(this._token, this._tool_serive_url, "tools")
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