var BarentswatchStylesRepository = function () {
    "use strict";

    var maxFeatureCount = 0;
    var aisVectorReference = null;

    function createStyle(src, img) {
        return new ol.style.Style({
            image: new ol.style.Icon(({
                anchor: [0.5, 0.96],
                crossOrigin: 'anonymous',
                src: src,
                img: img,
                imgSize: img ? [img.width, img.height] : undefined
            }))
        });
    }

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

    function createAisSingleFeatureStyle(feature) {
        if (!feature) {
            return;
        }
        var featureName = "";
        if (feature.values_.ShipType === 30) {
            featureName = "fishing-vessel";
        } else {
            featureName = "non-fishing-vessel";
        }
        var style = aisStyles[featureName];
        style.image_.setRotation(feature.values_.Cog);
        return style;
    }

    var aisStyles = {
        "fishing-vessel": new ol.style.Style({
            image: new ol.style.Icon({
                //anchor: [0.5, 46],
                src: './boat-orange.svg',
                // imgSize: [13, 29],
            })
        }),
        "non-fishing-vessel": new ol.style.Style({
            image: new ol.style.Icon({
                //anchor: [0.5, 46],
                src: './boat-grey.svg',
                //imgSize: [13, 29],
            })
        })
    };

    var aisSelectionStyles = {
        "fishing-vessel": new ol.style.Style({
            image: new ol.style.RegularShape({
                points: 5,
                radius: 10,
                radius2: 4,
                angle: 0
            })
        }),
        "non-fishing-vessel": new ol.style.Style({
            image: new ol.style.RegularShape({
                points: 5,
                radius: 10,
                radius2: 4,
                angle: 0
            })
        })
    };

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

    var calculateClusterInfo = function (resolution) {
        maxFeatureCount = 0;
        var features = BarentswatchStylesRepository.GetAisVectorReference().getSource().getFeatures();
        var feature, radius;
        for (var i = features.length - 1; i >= 0; --i) {
            feature = features[i];
            var originalFeatures = feature.get('features');
            var extent = ol.extent.createEmpty();
            var j, jj;
            for (j = 0, jj = originalFeatures.length; j < jj; ++j) {
                ol.extent.extend(extent, originalFeatures[j].getGeometry().getExtent());
            }
            maxFeatureCount = Math.max(maxFeatureCount, jj);
            radius = 0.25 * (ol.extent.getWidth(extent) + ol.extent.getHeight(extent)) /
                resolution;
            feature.set('radius', radius);
        }
    };

    var textFill = new ol.style.Fill({
        color: '#fff'
    });
    var textStroke = new ol.style.Stroke({
        color: 'rgba(0, 0, 0, 0.6)',
        width: 3
    });
    var oldAISClusterStylResolution;
    var aisClusterStyleFunction = function (feature, resolution) {
        if (resolution != oldAISClusterStylResolution) {
            calculateClusterInfo(resolution);
            oldAISClusterStylResolution = resolution;
        }
        var style;
        var size = feature.get('features').length;
        if (size > 1) {
            style = new ol.style.Style({
                image: new ol.style.Circle({
                    radius: feature.get('radius'),
                    fill: new ol.style.Fill({
                        color: [255, 153, 0, Math.min(0.8, 0.4 + (size / maxFeatureCount))]
                    })
                }),
                text: new ol.style.Text({
                    text: size.toString(),
                    fill: textFill,
                    stroke: textStroke
                })
            });
        } else {
            var originalFeature = feature.get("features")[0];
            style = createAisSingleFeatureStyle(originalFeature);
        }
        return style;
    };

    var aisStyleFunction = function (feature, resolution) {
        if (!feature) {
            return;
        }
        var featureName = "";
        if (feature.values_.ShipType === 30) {
            featureName = "fishing-vessel";
        } else {
            featureName = "non-fishing-vessel";
        }
        var style = aisStyles[featureName];
        style.image_.setRotation(feature.values_.Cog);
        return style;
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
    var aisSelectionStyleFunction = function () {
        return new ol.interaction.Select({
            style: function (feature, resolution) {
                console.log("Inside: aisSelectionStyleFunction");
                console.log(feature.getGeometry());
                return aisSelectionStyles[feature.getGeometry().getType()];
            }
        });
    };
// __END_SELECT_STYLES_

    // GETTERS_AND_SETTERS
    //TODO: HACK, FIGURE OUT HOW TO REMOVE THIS
    function setAisVectorLayer(layer) {
        this.aisVectorReference = layer;
    }

    function getAisVectorReference() {
        return this.aisVectorReference;
    }

    // __END_GETTERS_AND_SETTERS

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
        BarentswatchCoralReefSelectionStyle: coralReefSelectStyleFunction,
        BarentswatchAisStyle: aisClusterStyleFunction,
        BarentswatchAisSelectionStyle: aisSelectionStyleFunction,
        SetAisVectorLayer: setAisVectorLayer,
        GetAisVectorReference: getAisVectorReference
    }

}();