"use-strict";function appConfig(a,e){
a.configure({key:"AIzaSyCEZmwIm--ubf46rOQ4BzpU-9PjvKC9TTA",
libraries:"weather,geometry.visualization"}),
e.errorOnUnhandledRejections(!1)}
function appController(a){
    function e(e,o,i){t.isLoading=!0,a.getImages(e,o,i).then(
        function(a){t.images=a.photos.photo,t.imagesMetaData={
            page:a.photos.page,pages:a.photos.pages,total:a.photos.total},t.isLoading=!1}).catch(
                function(a){console.log(a)})}var t=this,o=49.257735,i=-123.123904;t.isLoading=!0,t.images=[],t.modalImg="",
                t.imagesMetaData={page:1,pages:1,total:0},t.map={center:{latitude:o,longitude:i},zoom:8},t.marker={id:0,coords:{
                    latitude:o,longitude:i},options:{draggable:!0,title:"Drag me where you want me to be"},events:{dragend:
                        function(a,t,n){o=a.getPosition().lat(),i=a.getPosition().lng(),e(o,i)}}},t.firstPage=
                        function(){e(o,i,1)},t.prevPage=
                        function(){1!==t.imagesMetaData.page&&e(o,i,t.imagesMetaData.page-1)},t.nextPage=
                        function(){t.imagesMetaData.page!==t.imagesMetaData.pages&&e(o,i,t.imagesMetaData.page+1)},t.lastPage=
                        function(){e(o,i,t.imagesMetaData.pages)},t.showImage=
                        function(a){document.getElementById("modal").style.display="flex",t.modalImg=a},e(o,i,1)}
                        function flickrService(a,e){function t(e,t,n){n=void 0!==n?n:1;var r={
                        api_key:"19236ba2e890aa0bc178c5ffef51af25",method:"flickr.photos.search",lat:e,lon:t,page:n,per_page:20,format:"json",
                        nojsoncallback:1};return a.get("https://api.flickr.com/services/rest",{params:r}).then(o).catch(i)}
                        function o(a){return a.data}function i(a){return e.reject(a)}return{getImages:t}}
                        angular.module("app",["uiGmapgoogle-maps"]).config(appConfig),
                        appConfig.$inject=["uiGmapGoogleMapApiProvider","$qProvider"],
                        angular.module("app").controller("appController",
                            appController),appController.$inject=["Flickr"],
                        angular.module("app").factory("Flickr",
                            flickrService),flickrService.$inject=["$http","$q"];