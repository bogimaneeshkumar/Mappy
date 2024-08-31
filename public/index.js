//custom func to scroll to top according to our needs

let tour=introJs();
const smoothscrolltoTop=()=>{
  let currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
  if (currentScroll > 0) {
       window.requestAnimationFrame(smoothscrolltoTop);
       window.scrollTo (0,currentScroll - (currentScroll/10));  // zero is for top 
  }
}


const Guide=()=>{
 

  if(window.localStorage.getItem('already-shown') /* ||  response from server */  )
      {
          return;
      }





const refreshTourSteps=()=>{
  
  tour.setOption('features',features.filter((feature)=>{
      if(!feature.hasOwnProperty('element'))
      {
          return true;
      }

      return feature.element || !!feature.element.getClientRects().length; 
      
  })

  )
}


     



  let features=[
      {
          title : "welcome to Mappy",
          intro: "This webapp helps you search custom places inside IIT(Dhanbad) with directions and Routes",
          
          // position :'right',  // i can fix the positon of tooltip for responsiveness for individual element
              },


              {
                  title : "Search Bar",
                  intro: " This helps you to search places of your choice",
                  element:document.querySelector(".search-input")
                  // position :'right',  // i can fix the positon of tooltip for responsiveness for individual element
                      },
    
      

      {
          title:"UI Layers ",
          intro :" If you feel this UI is not for you,   toggle anytime for different Map Layers views! ",
          element : document.querySelector('.leaflet-control-layers-toggle')
  
      },
      {
        title : "Admin",
        intro: "If you have Admin-Key,Enter the code and start adding new places",
        element:document.querySelector(".btn")
        // position :'right',  // i can fix the positon of tooltip for responsiveness for individual element
            },
      {
          title :`Developer`,
          intro:"You'll Never miss an update from us -Made with ❣ by Chaitanya",
         
          
  
      },
      
  ]








  tour.setOptions({
      // steps : []
  
     
      steps: features.filter((feature)=>{
          if(!feature.hasOwnProperty('element'))
          {
              return true;
          }
  
          return feature.element || !!feature.element?.getClientRects().length;
      }),
  
      scrollToElement: true, // Enable smooth scrolling to elements
    showProgress: true, // Show progress bar
    showBullets: false, // Hide bullets
    showButtons: true, // Show navigation buttons
    exitOnOverlayClick: true, // Allow exiting the tour on overlay click
    exitOnEsc: true, // Allow exiting the tour with the Esc key
    autoPosition :true,
    disableInteraction: true,
    exitOnEsc : false, // for desktop to prevent tour on click esc
    exitOnOverlayClick : false, // for mobile to prevent tour touching on gray area
    showStepNumbers :false,
    skipLabel :"SKIP",
    doneLabel :"Finish!",
    nextLabel :"Proceed",
    prevLabel :"Prev",
  
  
  }) 


// this adds smooth scrolling to elements once step change 
  tour.onafterchange(function(targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    });
  



tour.onexit (()=>{
 
  window.removeEventListener('resize',refreshTourSteps)
  window.localStorage.setItem('already-shown' ,true)  

 
  window.scrollTo({ top: 0, behavior: 'smooth' });
  

})
  tour.start()

  window.addEventListener('resize',refreshTourSteps)
  tour.refresh(true); // the will be use of it when some elements are hidden
  
 


}
window.addEventListener('DOMContentLoaded',()=>{
  Guide()
})


 ////// tour done///////////
 
 
 






// admin

let admin=document.querySelector('.btn')?.addEventListener('click',()=>{

  let key=prompt('Enter the security code','AuthKey🔑')
  if(key==456789)
  {
    location.href='/admin.html';
  }
})




 
 //for local running in terminal type ipconfig and use that ip idress in mobile  make sure both server and mobile are connectedto same hostnameg






var map_init = L.map('map', {
    center: [23.814296468133172, 86.44118417874446],
   
 
    zoom: 17,
    markerZoomAnimation :true,
   
});
map_init.zoomControl.remove();
L.control.zoom({
    position: 'bottomright'
}).addTo(map_init);



//  open street map
let osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    attribution: 'Chaitanya' 
}).addTo(map_init);






// Google Map Layer

let googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
    
    subdomains:['mt0','mt1','mt2','mt3'],
    attribution: 'Chaitanya' 
 });
 googleStreets.addTo(map_init);


 // Satelite Layer
let googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
  
   subdomains:['mt0','mt1','mt2','mt3'],
   attribution: 'Chaitanya' 
 });
googleSat.addTo(map_init);







var baseLayers = {
 
  // these layers should be opposite ie bottom layer is shown first
  // "Water Color":Stamen_Watercolor,

  "OpenStreetMap": osm,
  "Satellite":googleSat,
  "Google Map":googleStreets,
 
 
 
};

L.control.layers(baseLayers).addTo(map_init);


if(!navigator.geolocation) {
    console.log("Your browser doesn't support geolocation feature!")
} else {
    setInterval(() => {
        navigator.geolocation.getCurrentPosition(getPosition)
    }, 2500);
}









let control;

let newLat;
let newlong;


// updating route is not working

const addRoute=(waypoints,latitude,longitude)=>{
  // latitude amd longitudeis place  location values 
  let greenIcon,redIcon;
  if(control)
  {
    // console.log(control); // this is very useful to get directins routes info
    control.remove();

  }
  if(greenIcon)
  {
    greenIcon=null;
  }

   greenIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
   redIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
  
  control=L.Routing.control({
   waypoints: waypoints,
   createMarker: function (i, wayp,n,) {
    // use the custom icon for the start marker only
    





    if (i === 1) {

      
      return L.marker([latitude,longitude], {
        icon: redIcon,
        
      });
    }

   let newWaypoints; 
    
    if (i === 0) {

       // Update the marker with the user's location
       setInterval(() => {
        navigator.geolocation.watchPosition(function(position) {
          console.log([position.coords.latitude, position.coords.longitude])
          newLat=position.coords.latitude;
          newlong=position.coords.longitude;
          newWaypoints= [
            L.latLng(position.coords.latitude, position.coords.longitude),
            L.latLng(placeInfo[0].latitude,placeInfo[0].longitude)];     

        });
     

        addRoute(newWaypoints,latitude,longitude);



      
    }, 25000);

// this executes first and then after 20 sec updates
// from get position
     return L.marker([lat,long], {
      icon: greenIcon,
      
    });
   
    }
  
  },
   routeWhileDragging: false,
   draggableWaypoints: false
 
 }).addTo(map_init);

 
 // Get the markers from the routing control
// if(control){
//  const markers =  L.Routing.control().getWaypoints();
 
//  // Set the draggable option to false for each marker
//  markers.forEach(marker => {
//    marker.options.draggable = false;
//  });

 
//  }

 document.querySelector(".cross").addEventListener("click", ()=> {
  
  
        document.querySelector('.icon').style.display='inline-block';
        document.querySelector('#search').style.display='inline-block';
  
  document.querySelector('.cross').style.display='none';
 
 
 
  document.querySelector('.search-suggest').disabled=false;
 
  
  document.querySelector('.search-suggest').value='';


  if(control)
  {
    // console.log(control); // this is very useful to get directins routes info
    control.remove();
    window.location.reload(false)

  }
 
 


 
 
  
});


}








var marker, circle, lat, long, accuracy;



    var greenIcon = new L.Icon({
      iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
  

function getPosition(position) {
    // console.log(position)
    lat = position.coords.latitude
    long = position.coords.longitude
    accuracy = position.coords.accuracy
    marker
 

    if (marker) {
        map_init.removeLayer(marker)
    }

   
    // create a button onclick show current location with flyto 
   marker = L.marker([lat, long],{
      icon: greenIcon,
			title: '@me'
    })
   


   var featureGroup = L.featureGroup([ marker]).addTo(map_init)
// map_init.flyTo([lat,long],16,{
//     animate : true,
//     duration : 1,
// })
   

    // map_init.fitBounds(featureGroup.getBounds())
    
if(lat && long)

{
  // document.querySelector('.wrapper').style.display='block'
}
    console.log("Your coordinate is: Lat: " + lat + " Long: " + long + " Accuracy: " + accuracy)
   




 
}













let input=document.querySelector('#q');

input?.addEventListener('input',()=>{
  console.log("Your coordinate is:")
showResults(input.value);

})


const showResults=(val)=> {

  let res = document.getElementById("result");
  res.style.display ='block';
  res.innerHTML = '';
  if (val == '') {
    return;
  }
  let placeList = '';
              // During Development  BASE_URL=http://127.0.0.1:6969
  fetch(`https://mappy-devstudio.onrender.com/suggest?q=${val}`).then(
   function (response) {
     return response.json();
   }).then(function (data) {
     for (let i=0; i<data.length; i++) {
       placeList += ' <ul class="innerulist">' + data[i] + '</ul>';
       
     }
     res.innerHTML = ' <ul class="ulist" >' + placeList + '</ul> ';

     if(input.val=='')
     {
      res.innerHTML ='';
     }



///////// MAIN CODE /////////////
       document.querySelector('.ulist').addEventListener("click", (e)=>{
   // console.log(e.target.innerHTML);
  

   
   
   let searchBtn=document.querySelector('.search-suggest');
     searchBtn.value = e.target.innerText;
     document.querySelector('.search-suggest').addEventListener("oninput", (e)=>{
      
      // console.log(document.querySelector('.search-suggest').value)
      console.log("document.querySelector('.search-suggest').value")
            showResults()
     })
   


      // document.querySelector('.icon').className='random'
  // document.querySelector('#search').style.display='none'
  document.querySelector('.cross').style.display='block'
  
  document.querySelector('#result').style.display='none'




   let point=document.querySelector('.search-suggest').value;
   document.querySelector('.search-suggest').disabled=true;


 // During Development  BASE_URL=http://127.0.0.1:6969
  fetch(`https://mappy-devstudio.onrender.com/maproute/location?q=${point}`).then((response)=>{return response.json()}).then((data)=>{
   
  
    
  
  placeInfo=data;
//   setInterval(() => {
//     navigator.geolocation.getCurrentPosition(getPosition)
// }, 2500);

var waypoints = [
  L.latLng(lat,long),
  L.latLng(placeInfo[0].latitude,placeInfo[0].longitude)

 
];

addRoute(waypoints,placeInfo[0].latitude,placeInfo[0].longitude);
       
    })
       
});

    

     return true;
   }).catch(function (err) {
     console.warn('Something went wrong.', err);
     return false;
   });
}



let placeInfo;

         document.querySelector('.icon').addEventListener('click',()=>{


  document.querySelector('.icon').display='none'
  document.querySelector('#search').style.display='none'


  document.querySelector('.cross').style.display='block'
  document.querySelector('#result').style.display='none'

   let point=document.querySelector('.search-suggest').value;

 // During Development  BASE_URL=http://127.0.0.1:6969
  fetch(`https://mappy-devstudio.onrender.com/maproute/location?q=${point}`).then((response)=>{return response.json()}).then((data)=>{
   
  
  
  placeInfo=data;
    // console.log(placeInfo[0]);
  
                   


 var waypoints = [
  L.latLng(lat,long),
  L.latLng(placeInfo[0].latitude,placeInfo[0].longitude)];


addRoute(waypoints,placeInfo[0].latitude,placeInfo[0].longitude)


   
    })




 


  });

