var BarentswatchStylesRepository = function () {
    "use strict";

    var iceChartStyles = {
        "Close Drift Ice": [new ol.style.Style({
            fill: new ol.style.Fill({
                color: "rgba(251, 156, 69, 0.5)"
            })
        })],
        "Very Close Drift Ice": [new ol.style.Style({
            fill: new ol.style.Fill({
                color: "rgba(255, 64, 64, 0.5)"
            })
        })],
        "Fast Ice": [new ol.style.Style({
            fill: new ol.style.Fill({
                color: "rgba(195, 197, 199, 0.5)"
            })
        })],
        "Open Drift Ice": [new ol.style.Style({
            fill: new ol.style.Fill({
                color: "rgba(255, 255, 64, 0.5)"
            })
        })],
        "Very Open Drift Ice": [new ol.style.Style({
            fill: new ol.style.Fill({
                color: "rgba(165, 253, 184, 0.5)"
            })
        })],
        "Open Water": [new ol.style.Style({
            fill: new ol.style.Fill({
                color: "rgba(176, 214, 255, 0.5)"
            })
        })]
    };

    var iceChartSelectStyles = {
        "Polygon": [new ol.style.Style({
            fill: new ol.style.Fill({
                color: "rgba(102, 204, 255, 0.5)"
            }),
            stroke: new ol.style.Stroke({
                color: "rgba(51, 153, 255, 1)",
                width: 2
            })
        })],
        zIndex: 2
    };

    var activeSeismicStyles = {
        "Polygon": [new ol.style.Style({
            fill: new ol.style.Fill({
                color: "rgba(119, 190, 149, 0.8)"
            }),
            stroke: new ol.style.Stroke({
                color: "rgba(78, 183, 123, 1)",
                width: 2
            })
        })]
    };

    var activeSeismicSelectStyles = {
        "Polygon": [new ol.style.Style({
            fill: new ol.style.Fill({
                color: "rgba(102, 204, 255, 0.5)"
            }),
            stroke: new ol.style.Stroke({
                color: "rgba(78, 183, 123, 1)",
                width: 2
            })
        })],
        zIndex: 2
    };

    var plannedSeismicStyles = {
        "Polygon": [new ol.style.Style({
            fill: new ol.style.Fill({
                color: "rgba(238, 150, 149, 0.8)"
            }),
            stroke: new ol.style.Stroke({
                color: "rgba(237, 128, 128, 1)",
                width: 2
            })
        })]
    };

    var plannedSeismicSelectStyles = {
        "Polygon": [new ol.style.Style({
            fill: new ol.style.Fill({
                color: "rgba(102, 204, 255, 0.5)"
            }),
            stroke: new ol.style.Stroke({
                color: "rgba(237, 128, 128, 1)",
                width: 2
            })
        })],
        zIndex: 2
    };

    var seaBottomInstallationsStyles = {
        "Point": [new ol.style.Style({
            image: new ol.style.Circle({
                radius: 5,
                fill: new ol.style.Fill({
                    color: "rgba(238, 150, 149, 0.8)"
                }),
                stroke: new ol.style.Stroke({
                    color: "rgba(8, 113, 114, 1)", width: 2
                })
            })
        })]
    };

    var seaBottomInstallationsSelectStyles = {
        "Point": [new ol.style.Style({
            image: new ol.style.Circle({
                radius: 5,
                fill: new ol.style.Fill({
                    color: "rgba(102, 204, 255, 0.8)"
                }),
                stroke: new ol.style.Stroke({
                    color: "rgba(8, 113, 114, 1)", width: 2
                })
            })
        })],
        zIndex: 2
    };

    var jMessageStyles = {
        "MultiPolygon": [new ol.style.Style({
            fill: new ol.style.Fill({
                color: "rgba(238, 150, 149, 0.8)"
            }),
            stroke: new ol.style.Stroke({
                color: "rgba(237, 128, 128, 1)",
                width: 2
            })
        })]
    };

    var jMessageSelectionStyles = {
        "MultiPolygon": [new ol.style.Style({
            fill: new ol.style.Fill({
                color: "rgba(102, 204, 255, 0.5)"
            }),
            stroke: new ol.style.Stroke({
                color: "rgba(78, 183, 123, 1)",
                width: 2
            })
        })], zIndex: 2
    };

    var coastalRegulationsStyles = {
        "LineString": [new ol.style.Style({
            fill: new ol.style.Fill({
                color: "rgba(217, 207, 56, 0.8)"
            }),
            stroke: new ol.style.Stroke({
                color: "rgba(217, 207, 56, 1)",
                width: 6
            })
        })]
    };

    var coastalRegulationsSelectionStyles = {
        "LineString": [new ol.style.Style({
            fill: new ol.style.Fill({
                color: "rgba(217, 207, 56, 0.8)"
            }),
            stroke: new ol.style.Stroke({
                color: "rgba(78, 183, 123, 1)",
                width: 6
            })
        })], zIndex: 2
    };

    var coralReefStyles = {
        "Polygon": [new ol.style.Style({
            fill: new ol.style.Fill({
                color: "rgba(238, 150, 149, 0.8)"
            }),
            stroke: new ol.style.Stroke({
                color: "rgba(237, 128, 128, 1)",
                width: 2
            })
        })]
    };

    var coralReefSelectionStyles = {
        "Polygon": [new ol.style.Style({
            fill: new ol.style.Fill({
                color: "rgba(238, 150, 149, 0.8)"
            }),
            stroke: new ol.style.Stroke({
                color: "rgba(78, 183, 123, 1)",
                width: 2
            })
        })], zIndex: 2
    };

//TODO: AIS STYLES

    var iceChartStyleFunction = function (feature, resolution) {
        if (!feature) {
            return;
        }
        return iceChartStyles[feature.get("icetype")];
    };
    var activeSeismicStyleFunction = function (feature, resolution) {
        if (!feature) {
            return;
        }
        return activeSeismicStyles[feature.getGeometry().getType()];
    };
    var plannedSeismicStyleFunction = function (feature, resolution) {
        if (!feature) {
            return;
        }
        return plannedSeismicStyles[feature.getGeometry().getType()];
    };
    var seaBottomInstallationsStyleFunction = function (feature, resolution) {
        if (!feature) {
            return;
        }
        return seaBottomInstallationsStyles[feature.getGeometry().getType()];
    };
    var jMessagesStyleFunction = function (feature, resolution) {
        if (!feature) {
            return;
        }
        return jMessageStyles[feature.getGeometry().getType()];
    };
    var coastalRegulationsStyleFunction = function (feature, resolution) {
        if (!feature) {
            return;
        }
        return coastalRegulationsStyles[feature.getGeometry().getType()];
    };
    var coralReefStyleFunction = function (feature, resoltion) {
        if (!feature) {
            return;
        }
        return coralReefStyles[feature.getGeometry().getType()];
    };

// __BEGIN_SELECT_STYLES_
    var iceChartSelectStyleFunction = function () {
        return new ol.interaction.Select({
            style: function (feature, resolution) {
                return iceChartSelectStyles[feature.getGeometry().getType()];
            }
        });
    };
    var activeSeismicSelectStyleFunction = function () {
        return new ol.interaction.Select({
            style: function (feature, resolution) {
                return activeSeismicSelectStyles[feature.getGeometry().getType()];
            }
        });
    };
    var plannedSeismicSelectStyleFunction = function () {
        return new ol.interaction.Select({
            style: function (feature, resolution) {
                return plannedSeismicSelectStyles[feature.getGeometry().getType()];
            }
        });
    };
    var seaBottomInstallationsSelectStyleFunction = function () {
        return new ol.interaction.Select({
            style: function (feature, resolution) {
                console.log(feature.getGeometry().getType());
                return seaBottomInstallationsSelectStyles[feature.getGeometry().getType()];
            }
        });
    };
    var jMessagesSelectStyleFunction = function () {
        return new ol.interaction.Select({
            style: function (feature, resolution) {
                return jMessageSelectionStyles[feature.getGeometry().getType()];
            }
        });
    };
    var coastalRegulationsSelectStyleFunction = function () {
        return new ol.interaction.Select({
            style: function (feature, resolution) {
                return coastalRegulationsSelectionStyles[feature.getGeometry().getType()];
            }
        });
    };
    var coralReefSelectStyleFunction = function () {
        return new ol.interaction.Select({
            style: function (feature, resolution) {
                return coralReefSelectionStyles[feature.getGeometry().getType()];
            }
        });
    };
// __END_SELECT_STYLES_

    return {
        BarentswatchIceChartStyle: iceChartStyleFunction,
        BarentswatchIceChartSelectionStyle: iceChartSelectStyleFunction,
        BarentswatchActiveSeismicStyle: activeSeismicStyleFunction,
        BarentswatchActiveSeismicSelectionStyle: activeSeismicSelectStyleFunction,
        BarentswatchPlannedSeismicStyle: plannedSeismicStyleFunction,
        BarentswatchPlannenSeismicSelectionStyle: plannedSeismicSelectStyleFunction,
        BarentswatchSeaBottomInstallationsStyle: seaBottomInstallationsStyleFunction,
        BarentswatchSeaBottomInstallationsSelectionStyle: seaBottomInstallationsSelectStyleFunction,
        BarentswatchJMessagesStyle: jMessagesStyleFunction,
        BarentswatchJMessagesSelectionStyle: jMessagesSelectStyleFunction,
        BarentswatchCoastalRegulationStyle: coastalRegulationsStyleFunction,
        BarentswatchCoastalRegulationSelectionStyle: coastalRegulationsSelectStyleFunction,
        BarentswatchCoralReefStyle: coralReefStyleFunction,
        BarentswatchCoralReefSelectionStyle: coralReefSelectStyleFunction
    }

}();