// load required elements from the arcGIS libraries
require([
  "esri/config",
  "esri/Map",
  "esri/views/MapView",
  "esri/widgets/Locate",
  "esri/widgets/Search",
  "esri/rest/places",
  "esri/rest/support/FetchPlaceParameters",
  "esri/rest/support/PlacesQueryParameters",
  "esri/geometry/Circle",
  "esri/Graphic",
  "esri/layers/GraphicsLayer",
  "esri/symbols/WebStyleSymbol",
], function (
  esriConfig,
  Map,
  MapView,
  Locate,
  Search,
  places,
  FetchPlaceParameters,
  PlacesQueryParameters,
  Circle,
  Graphic,
  GraphicsLayer,
  WebStyleSymbol
) {
  // define some variables
  esriConfig.apiKey =
    "AAPKd852ce0f23b64f25ab10f9ff821fddbbBgFtnoGId4FCFfpV0xS6Kux9xyWMmFvKVcCAu4PKd8Ja4G61zD59mJNNznO8Emav";
  let infoPanel; // Info panel for place information
  let clickPoint; // Clicked point on the map
  let activeCategory = "17057"; // Convenience Stores category
  const searchRadius = 500; // meters

  // GraphicsLayer for places
  const placesLayer = new GraphicsLayer({
    id: "placesLayer",
  });
  // GraphicsLayer for map
  const bufferLayer = new GraphicsLayer({
    id: "bufferLayer",
  });

  // Variables for the store results
  // const categorySelect = document.getElementById("categorySelect");
  const resultPanel = document.getElementById("results");
  const flow = document.getElementById("flow");

  // create map object with the GraphicsLayers
  const mapObj = new Map({
    basemap: "arcgis/navigation",
    layers: [bufferLayer, placesLayer],
  });

  // create initial map view object centered around Windsor
  const viewObj = new MapView({
    map: mapObj,
    center: [-0.608149, 51.483146], // Windsor
    zoom: 13,
    container: "viewDiv",
  });

  // Add search box to view
  const search = new Search({
    view: viewObj,
  });
  viewObj.ui.add(search, "top-left"); //Add to the map

  // add locate button to view
  const locate = new Locate({
    view: viewObj,
    useHeadingEnabled: false,
    goToOverride: function (view, options) {
      options.target.scale = 1500;
      return view.goTo(options.target);
    },
  });
  viewObj.ui.add(locate, "top-left");

  // Clear previous search graphics and results
  function clearMap() {
    bufferLayer.removeAll();
    placesLayer.removeAll();
    resultPanel.innerHTML = "";
    if (infoPanel) infoPanel.remove();
  }

  // Enable Click event on map view and then display stores in that area
  viewObj.on("click", (event) => {
    clearMap();
    clickPoint = event.mapPoint;
    // Pass point to the showPlaces() function
    clickPoint && showPlaces(clickPoint);
  });

  // Display a map circle at click point.
  async function showPlaces(placePoint) {
    // Define a circle that represents the location/search radius
    const circleGeometry = new Circle({
      center: placePoint,
      geodesic: true,
      numberOfPoints: 100,
      radius: searchRadius,
      radiusUnit: "meters",
    });
    // style the circle
    const circleGraphic = new Graphic({
      geometry: circleGeometry,
      symbol: {
        type: "simple-fill", // autocasts as SimpleFillSymbol
        style: "solid",
        color: [3, 140, 255, 0.1],
        outline: {
          width: 1,
          color: [3, 140, 255],
        },
      },
    });
    // Add buffer graphic to the view
    bufferLayer.graphics.add(circleGraphic);
    // Parameters for queryPlacesNearPoint()
    const placesQueryParameters = new PlacesQueryParameters({
      categoryIds: [activeCategory],
      radius: searchRadius,
      point: placePoint,
    });
    // Query places around the clicked area
    const results = await places.queryPlacesNearPoint(placesQueryParameters);
    // Pass the PlacesQueryResult to processPlaces()
    processPlaces(results);
  }

  // Process PlaceResults
  function processPlaces(results) {
    results.results.forEach((placeResult) => {
      // Pass each result to the addResult() function
      addResult(placeResult);
    });
  }

  // Create image style for later searching
  // Place graphic of store on map
  // List stores on the info panel with basic details
  function createWebStyle(symbolName) {
    return new WebStyleSymbol({
      name: symbolName,
      styleName: "Esri2DPointSymbolsStyle",
    });
  }

  async function addResult(place) {
    const placeGraphic = new Graphic({
      geometry: place.location,
    });
    placeGraphic.symbol = createWebStyle("shopping-center"); // Icon for shopping center
    // Add each graphic to the GraphicsLayer
    placesLayer.graphics.add(placeGraphic);
    const infoDiv = document.createElement("calcite-list-item");
    infoDiv.label = place.name;
    infoDiv.description = `
      ${place.categories[0].label} -
      ${Number((place.distance / 1000).toFixed(1))} km`;

    // If a place in the info panel is clicked
    // then open the feature's popup
    infoDiv.addEventListener("click", async () => {
      viewObj.openPopup({
        location: place.location,
        title: place.name,
      });
      // Move the view to center on the selected place feature
      viewObj.goTo(placeGraphic);
      // Fetch more details about each place based
      // on the place ID with all possible fields
      const fetchPlaceParameters = new FetchPlaceParameters({
        placeId: place.placeId,
        requestedFields: ["all"],
      });
      // Pass the FetchPlaceParameters and the location to getStoreDetails()
      getStoreDetails(fetchPlaceParameters, place.location);
    });
    resultPanel.appendChild(infoDiv);
  }

  // Get place details and display in the info panel
  async function getStoreDetails(fetchPlaceParameters, placePoint) {
    // Get place details
    const result = await places.fetchPlace(fetchPlaceParameters);
    const placeDetails = result.placeDetails;
    // Set-up panel on the info for more place information
    infoPanel = document.createElement("calcite-flow-item");
    flow.appendChild(infoPanel);
    infoPanel.heading = placeDetails.name;
    infoPanel.description = placeDetails.categories[0].label;
    // Pass attributes from each place to the setAttribute() function
    setAttribute("Description", "information", placeDetails.description);
    setAttribute("Address", "map-pin", placeDetails.address.streetAddress);
    setAttribute("Phone", "mobile", placeDetails.contactInfo.telephone);
    setAttribute("Hours", "clock", placeDetails.hours.openingText);
    infoPanel.addEventListener("calciteFlowItemBack", async () => {
      viewObj.closePopup();
    });
  }

  // For selected store, display basic info
  function setAttribute(heading, icon, validValue) {
    if (validValue) {
      const element = document.createElement("calcite-block");
      element.heading = heading;
      element.description = validValue;
      const attributeIcon = document.createElement("calcite-icon");
      attributeIcon.icon = icon;
      attributeIcon.slot = "icon";
      attributeIcon.scale = "m";
      element.appendChild(attributeIcon);
      infoPanel.appendChild(element);
    }
  }
});
