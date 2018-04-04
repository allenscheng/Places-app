/* global Vue, VueRouter, axios, google */

var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      message: "Welcome to Vue.js!",
      places: [],
      nameFilter: "",
      addressFilter: "",
      sortAttribute: "name",
      sortAscending: true,
      newPlace: {
        name: "",
        address: ""
      },
      errors: []
    };
  },
  mounted: function() {
    axios.get("places").then(
      function(response) {
        this.places = response.data;
      }.bind(this)
    );
    var map = new google.maps.Map(document.getElementById("map"), {
      zoom: 12,
      center: { lat: 41.8781, lng: -87.6298 }
    });
    var places = [
      {
        lat: 41.8781,
        lng: -87.6298,
        title: "city of Chicago",
        description: "center of Chicago",
        link: "https://www.cityofchicago.org/city/en.html"
      },
      {
        lat: 41.8807,
        lng: -87.6742,
        title: "United Center",
        description: "Chicago Bulls stadium",
        link: "http://www.unitedcenter.com/"
      },
      {
        lat: 41.8623,
        lng: -87.6167,
        title: "Soldier Field",
        description: "Chicago Bears stadium",
        link: "http://www.chicagobears.com/"
      }
    ];
    places.forEach(function(place) {
      var contentString =
        '<div id="content">' +
        '<div id="siteNotice">' +
        "</div>" +
        '<h1 id="firstHeading" class="firstHeading">' +
        place.title +
        "</h1>" +
        '<div id="bodyContent">' +
        place.description +
        "<a href=" +
        place.link +
        "target=_blank>" +
        place.link +
        "</a>" +
        "</div>" +
        "</div>";

      var infowindow = new google.maps.InfoWindow({
        content: contentString
      });

      var marker = new google.maps.Marker({
        position: place,
        map: map,
        title: "Uluru (Ayers Rock)"
      });
      marker.addListener("click", function() {
        infowindow.open(map, marker);
      });
    });
  },
  methods: {
    addNewAddress: function() {
      var params = {
        name: this.newPlace.name,
        address: this.newPlace.address
      };
      axios.post("places", params).then(
        function(response) {
          this.places.push(response.data);
          this.newPlace = {
            name: "",
            address: ""
          };
          location.reload();
        }.bind(this)
      );
    },
    isValid: function(place) {
      var validName = place.name
        .toLowerCase()
        .includes(this.nameFilter.toLowerCase());
      var validAddress = place.address
        .toLowerCase()
        .includes(this.addressFilter.toLowerCase());
      return validName && validAddress;
    },
    // above is for a filter
    sortBy: function(sortTerm) {
      this.sortAttribute = sortTerm;
      this.sortAscending = !this.sortAscending;
    }
  },
  computed: {
    sortedPlaces: function() {
      return this.places.sort(
        function(place1, place2) {
          if (this.sortAscending === true) {
            return place1[this.sortAttribute] > place2[this.sortAttribute];
          } else {
            return place1[this.sortAttribute] < place2[this.sortAttribute];
          }
        }.bind(this)
      );
    }
  }
};

var router = new VueRouter({
  routes: [{ path: "/", component: HomePage }]
});

var app = new Vue({
  el: "#app",
  router: router
});
