'use-strict';

angular
  .module('app')
  .controller('appController', appController);

appController.$inject = ['Flickr'];

function appController(Flickr) {
  var vm = this;       // view-model
  var lat = 49.257735;   // default latitude
  var lon = -123.123904;  // default longitude

  vm.isLoading = true; // flag to hide or display loading animation
  vm.images = [];      // array to store current location images
  vm.modalImg = "";    // image to be displayed in image modal
  /* metadata related to each map location's public images */
  vm.imagesMetaData = { page: 1, pages: 1, total: 0 };

  /* default initialization for google map */
  vm.map = {
    center: { latitude: lat, longitude: lon },
    zoom: 8
  };

  /* the google marker */
  vm.marker = {
    id: 0,
    coords: { latitude: lat, longitude: lon },
    options: {
      draggable: true,
      title: 'kill me'
    },
    events: {
      dragend: function (marker, dragend, args) {
        lat = marker.getPosition().lat();
        lon = marker.getPosition().lng();
        fetchImages(lat, lon);
      }
    }
  };

  vm.firstPage = function () {
    fetchImages(lat, lon, 1);
  };

  vm.prevPage = function () {
    if(vm.imagesMetaData.page === 1) return;
    else fetchImages(lat, lon, (vm.imagesMetaData.page - 1));
  };

  vm.nextPage = function () {
    if(vm.imagesMetaData.page === vm.imagesMetaData.pages) return;
    else fetchImages(lat, lon, (vm.imagesMetaData.page + 1));
  };

  vm.lastPage = function () {
    fetchImages(lat, lon, vm.imagesMetaData.pages);
  };

  /* image modal */
  vm.showImage = function (image) {
    var modal = document.getElementById("modal");
    modal.style.display = "flex";
    vm.modalImg = image;
  };

  /* Images based on lat, lon and page number */
  function fetchImages(lat, lon, page) {
    vm.isLoading = true;
    Flickr.getImages(lat, lon, page).then(function (data) {
      vm.images = data.photos.photo;
      vm.imagesMetaData = {
        page: data.photos.page,
        pages: data.photos.pages,
        total: data.photos.total
      };
      vm.isLoading = false;
    })
    .catch(function (e) {
      console.log(e);
    });
  }

  /*  for default location */
  fetchImages(lat, lon, 1);
}
