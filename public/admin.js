

 
  let Zoom=16

 
var map_init = L.map('map', {
    center: [23.814296468133172, 86.44118417874446],
   
 
    zoom: Zoom,
    markerZoomAnimation :true,
});




var OSM = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {


    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map_init);









// admin dont need to acess his location
/*L.Control.geocoder().addTo(map_init);
if (!navigator.geolocation) {
    console.log("Your browser doesn't support geolocation feature!")
} else {
    setInterval(() => {
        navigator.geolocation.getCurrentPosition(getPosition)
    }, 5000);
};
*/







//var marker, circle, lat, long, accuracy;

/*function getPosition(position) {
    // console.log(position)
    lat = position.coords.latitude
    long = position.coords.longitude
    accuracy = position.coords.accuracy

    if (marker) {
        map_init.removeLayer(marker)
    }

    if (circle) {
        map_init.removeLayer(circle)
    }

    marker = L.marker([lat, long])
   
   // circle = L.circle([lat, long], { radius: accuracy })

    /*var featureGroup = L.featureGroup([ marker]).addTo(map_init)
    map_init.flyTo([lat,long],18,{
        animate : true,
        duration : 1,
    })

    //map_init.fitBounds(featureGroup.getBounds())
    

    console.log("Your coordinate is: Lat: " + lat + " Long: " + long + " Accuracy: " + accuracy)
}*/



   






const markerArr=[];
//var markergroup=L.layerGroup().addTo(map_init);

const createmarker=(a,b)=>{
    const popupContent=`
    
    <h2>You are an admin!  <br>Enter the place name to store in DB</h2>
    <span> Lat :${a}</span> 
    <span> Lng :${b}</span>
    <div id="savebtn-container">

    <input type="text" class="input" placeholder="Enter name">
<button class ="button" type="submit"> save </button>
    </div> `
  

  

  if(markerArr.length<1){
   mymarker=L.marker([a,b])
  .addTo(map_init)
  .bindPopup(   popupContent,{
      keepInView: false,
      closeButton: true
      })
      .openPopup();


      markerArr.push(mymarker);
      
    }

    else{
        map_init.removeLayer(mymarker);
        markerArr.pop()
    }

        


      


}




const markPlaces=(item)=>{
  // <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="delete-icon"><path class="delete-primary" d="M5 5h14l-.89 15.12a2 2 0 0 1-2 1.88H7.9a2 2 0 0 1-2-1.88L5 5zm5 5a1 1 0 0 0-1 1v6a1 1 0 0 0 2 0v-6a1 1 0 0 0-1-1zm4 0a1 1 0 0 0-1 1v6a1 1 0 0 0 2 0v-6a1 1 0 0 0-1-1z"></path><path class="delete-secondary" d="M8.59 4l1.7-1.7A1 1 0 0 1 11 2h2a1 1 0 0 1 .7.3L15.42 4H19a1 1 0 0 1 0 2H5a1 1 0 1 1 0-2h3.59z"></path></svg>
  // <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="edit-icon"><path class="edit-primary" d="M4 14a1 1 0 0 1 .3-.7l11-11a1 1 0 0 1 1.4 0l3 3a1 1 0 0 1 0 1.4l-11 11a1 1 0 0 1-.7.3H5a1 1 0 0 1-1-1v-3z"></path><rect width="20" height="2" x="2" y="20" class="delete-secondary" rx="1"></rect></svg>
    let Info = `
    <div class="info">
      <p class="place"  >${item.place}</p>
    
      <p ><span class="points latitude">Latitude:</span>: <span id="lat-container"> ${item.latitude}</span></p>
      <p ><span class="points longitude">Longitude:</span>: <span id="lng-container">${item.longitude}</span></p>
    </div>
    <hr>
    <div class=btn-container>
    <button class="editbtn">Edit</button>
    
    <button class="deletebtn">Delete</button>
    
    <button class ="cancelbtn">cancel</button>
    <button class ="updatebtn">Update</button>
    </div>
 
  `;

  let marky = L.marker([item.latitude, item.longitude]).addTo(map_init);
    // mouseover
  marky.on('mouseover', () => {
    marky.bindPopup(Info, {
      keepInView: true,
      closeButton: true
    }).openPopup();
  });
}





  




    
















const sendUserData=(event)=>{
       
    const saveBtn=document.querySelector('.button')
    
    saveBtn.addEventListener('click',()=>{
      
     let inpdata =document.querySelector('.input').value;  // name of the place acc to user(client) front end 
 
 
 
 const isConfirmtion=confirm(` Are you sure save this place :${inpdata}`);

 if(isConfirmtion) {


    if( inpdata=="")
       
    {
       alert("you cannot save without a name");
       return;
    }


        
 



        
        (async () => {
            try{   // During Development  BASE_URL=http://127.0.0.1:6969
            const dataFromServer = await fetch(`https://mappy-devstudio.onrender.com/places`, {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(
                {
                place :inpdata,
                latitude :event.latlng.lat,
                longitude : event.latlng.lng,
            
                } )
            })
            
            const content = await dataFromServer.json();
            
          if(content ) 
          {
            console.log(content);
            alert(`Your data has been saved  `)
            window.location.reload(false);
          }

            
         
        }
        catch(err){
            console.log(err);
            console.log(err.message);
            alert('Error occured While Adding !  Try Again')
            window.location.reload(false);
        }
          })();  // sel calling async func 
        


 }
 else{
    window.location.reload(false);
 }

})
        
              
              
              
 
             






}




const deleteLocation=()=>{





    

    let mapContainer = document.getElementById('map'); // Replace 'map' with the ID of your map container element
    mapContainer.addEventListener('click', (event) => 
    
    {
      if (event.target.classList.contains('deletebtn')) {



        let lat=document.querySelector('#lat-container')
        let lng=document.querySelector('#lng-container')

        console.log(lat?.innerHTML, lng?.innerHTML);


        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!',
          allowOutsideClick:false
        }).then((result) => {
          if (result.isConfirmed) {


            (async () => {
              try{   // During Development  BASE_URL=http://127.0.0.1:6969
              const dataFromServer = await fetch(`https://mappy-devstudio.onrender.com/admin/delete`, {
                method: 'DELETE',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                  {
                  
                  latitude :lat.innerHTML,
                  longitude : lng.innerHTML
              
                  } )
              })
              
              const content = await dataFromServer.json();
              
            if(content ) 
            {
              console.log(content.message);

              let timerInterval
              Swal.fire(
                'Deleted!',
                `${content.message}`,
                'success'
              ).then(() =>{
                if(result){
                  
                  const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                    

                      
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)

                      timerInterval = setInterval(() => {
                        Swal.getHtmlContainer().querySelector('strong')
                          .textContent = (Swal.getTimerLeft() / 1000)
                            .toFixed(0)
                      }, 100)
                    },
                    willClose: () => {
                      clearInterval(timerInterval)
                      
                      
                    }
                  })
                  
                  Toast.fire({
                    icon:"info",
                    html:`Loading.. in <strong></strong> seconds`
                  })
                   setTimeout(()=>{
                    window.location.reload(false);
                   }, 2000)
                  

                }
                
                
              })
              {
             
              }
            }
  
              
           
          }
          catch(err){
              console.log(err);
              console.log(err.message);
              alert('Error occured While Adding !  Try Again')
              window.location.reload();
          }
            })(); 

          
          }
        })

    



console.log(document.querySelector('.place').innerHTML)

       
      }
    });
}



deleteLocation();   


const editLocationName=()=>{


    let mapContainer = document.getElementById('map'); // Replace 'map' with the ID of your map container element
   
    mapContainer.addEventListener('click', (event) => 
    
    {


      let editbtn=document.querySelector('.editbtn');
      let deletebtn=document.querySelector('.deletebtn');
      let updatebtn=document.querySelector('.updatebtn');
      let cancelbtn=document.querySelector('.cancelbtn');
      let placeName= document.querySelector('.place');
      

      if (event.target.classList.contains('editbtn')) {

       
       placeName.setAttribute("contenteditable", "true");
       placeName.focus();


          console.log(document.querySelector('.points').innerHTML)

         
            editbtn.style.display="none";
          
            deletebtn.style.display="none";

            cancelbtn.style.display="block";
            updatebtn.style.display="block";








       
      }

     
          





    });
}


editLocationName();


const cancelChanges=()=>{


    let mapContainer = document.getElementById('map'); // Replace 'map' with the ID of your map container element
   
    mapContainer.addEventListener('click', (event) => 
    
    {


      let editbtn=document.querySelector('.editbtn');
      let deletebtn=document.querySelector('.deletebtn');
      let updatebtn=document.querySelector('.updatebtn');
      let cancelbtn=document.querySelector('.cancelbtn');
      let placeName= document.querySelector('.place');
      let defaultContent=placeName?.innerHTML;

     

           cancelbtn.addEventListener('click',()=>{
            placeName.innerHTML=defaultContent;
            placeName.setAttribute("contenteditable", "false");
          
            editbtn.style.display="block";
          
            deletebtn.style.display="block";

            cancelbtn.style.display="none";
            updatebtn.style.display="none";
          
           })
          





    });
}
         
  cancelChanges();  

  const updateLocation=()=>{

    

    let mapContainer = document.getElementById('map');
     // Replace 'map' with the ID of your map container element
   


    mapContainer.addEventListener('click', ()=>{

      let updatebtn=document.querySelector('.updatebtn');
      

   updatebtn?.addEventListener('click', ()=>{
    let placeName= document.querySelector('.place').innerHTML;
  
   let newplaceName= document.querySelector('.place').innerHTML;
   let lat=document.querySelector('#lat-container')
    let lng=document.querySelector('#lng-container')

    Swal.fire({
      title: 'Are you sure to update ?',
      text: ` Location changes from ${placeName} to  ${newplaceName}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Update it!',
      allowOutsideClick:false
    }).then((result)=>{
      if(result.isConfirmed)
      {

        (async () => {
          try{   // During Development  BASE_URL=http://127.0.0.1:6969
          const dataFromServer = await fetch(`https://mappy-devstudio.onrender.com/admin/update`, {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(
              {
              
              latitude :lat.innerHTML,
              longitude : lng.innerHTML,
              newName:newplaceName
          
              } )
          })
          
          const content = await dataFromServer.json();
          
        if(content ) 
        {
          console.log(content.message);

let timerInterval
const updateToast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
  

    // Swal.showLoading();
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)

    timerInterval = setInterval(() => {
      Swal.getHtmlContainer().querySelector('strong')
        .textContent = (Swal.getTimerLeft() / 1000) // milli sec to seconds
          .toFixed(0)
    }, 100)
  },
  willClose: () => {
    clearInterval(timerInterval)
    
    
  }
})

          updateToast.fire({
            icon:"success",   
            html:`Updating data in <strong> </strong> seconds`
          })
           setTimeout(()=>{
            window.location.reload(false);
           }, 3000)
         
        }

          
       
      }
      catch(err){
          console.log(err);
          console.log(err.message);
          alert('Error occured While Adding !  Try Again')
          window.location.reload();
      }
        })();  // sel calling async func 
      }
    })

   
  });




    })


    








 
  



      }
    
    updateLocation()
  
    const SweetAlert=()=>{
    




    }
        
 
       const getMarkers=()=>{

                        // During Development  BASE_URL=http://127.0.0.1:6969
                   
                        
                        const FetchToast = Swal.mixin({
                          toast: true,
                          position: 'top-end',
                          showConfirmButton: false,
                          timer: 6000,
                          timerProgressBar: true,
                          didOpen: (toast) => {
                          
                        
                            // Swal.showLoading();
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        
                              
                            
                            
                          }
                        })
                        
                                  FetchToast.fire({
                                    icon:"info",   
                                    html:`Data Loading..`
                                  })
                                 
                                 
                                }
                  
                      
                    fetch('https://mappy-devstudio.onrender.com/locations/all')
                    .then((response) => 
                          response.json()
                                                                    
                    )
                    .then((data) => {

                        data.map((item)=>{
                            markPlaces(item);
                        })

                         
                        Swal.close()


                       } );

       



      


getMarkers();








    map_init.on('click',(e)=>{
       
      
    
        createmarker(e.latlng.lat,e.latlng.lng) 
        Zoom=17;
        sendUserData(e);
       

    })      
    
    
  

   



  
  
 
   
  

 



      
    
    


    
    
       
          
        

         
        
     
        
    //     let data=document.querySelector('.myinp').value;
        
        
    //     alert('are you sure you want to save');
    //     if(alert)
    //     {
    //  
    //     console.log(placesarr);
        
    //     }
    //    markersArr.removeLayer(mymarker)
       
       
        
    
            



            

    //     

                 

          
           
           
            


    
    
          

        



         


         


        
    
          
      
    
        

 /*fetch('http://192.168.93.221:6969/coordinates', {
    Method: 'POST',
    Headers: {
      'Accept': 'application.json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "latitude": e.latlng.lat,
        "longitude": e.latlng.lng,

    })*/

    
                      
                        

   
        
        
        

           
