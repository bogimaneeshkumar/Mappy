



// This file has to added every html file

// registr service worker -navigator-can use dom
// service worker-self. -no dom window access


if ('serviceWorker' in navigator) {

    // The UI that will be presented when an update is found
    let presentUpdateAvailable = serviceWorker => {
        let metaThemeColor = document.querySelector("meta[name=theme-color]");
        metaThemeColor.setAttribute("content", '#41a048');
        document.getElementById('update-banner').dataset.state = 'updateavailable';
        document.querySelector('#update-banner .headline').innerHTML = 'Update available';
        document.querySelector('#update-banner .subhead').innerHTML = 'Click here to update the app to the latest version';
        document.getElementById('update-banner').addEventListener('click', clickEvent => {
            serviceWorker.postMessage('skipWaiting');
        });
    }

    // Register our service worker  // registering our service worker file name and making both the service worker file openly available to that folder
    navigator.serviceWorker.register('./serviceWorker.js')
    .then(registration => {

        // Present the update available UI if there is already an update waiting
        if (registration.waiting) presentUpdateAvailable(registration.waiting);

        // We wait for an UpdateFoundEvent, which is fired anytime a new service worker is acquired
        registration.onupdatefound = updatefoundevent => {

            // Ignore the event if this is our first service worker and thus not an update
            if (!registration.active) return;

            // Listen for any state changes on the new service worker
            registration.installing.addEventListener('statechange', statechangeevent => {

                // Wait for the service worker to enter the installed state (aka waiting)
                if (statechangeevent.target.state !== 'installed') return;

                // Present the update available UI
                presentUpdateAvailable(registration.waiting);
            });
        };

        // We wait for a ControllerEvent, which is fired when the document acquires a new service worker
        navigator.serviceWorker.addEventListener('controllerchange', controllerchangeevent => {

            // We delay our code until the new service worker is activated
            controllerchangeevent.target.ready.then(registration => {

                // Reload the window
                if (!window.isReloading) {
                    window.isReloading = true;
                    window.location.reload();
                }
                
            });
        });
    });
   
}

// ####### For IOS



// var iosDiv=`

    
// <div class ="prompt-div" >
//     <div>
     
//             <h3>Add to Home Screen </h3>
//             <a href="#" class="prompt-cancel">Cancel</a>
              
          
//     </div>
//         <div>This website has functionality. Add as App to Home Screen</div>
//         <h5>Press the 'Share' button on the menu bar  below</h5>
//         <h5>Press  'Add' to Home Screen</h5>
// </div>`

// //checking ig=f thedevice is ios
// const isIOS=/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

// //c hecking in pwa manifest
// const isPWAinstalled=window.matchMedia('(display-mode : standalone)').matches ;

// // showing the prompt

// if(isIOS && !isPWAinstalled)
// {
//   document.querySelector('.prompt-div').style.display = 'block';

//   document.querySelector('.prompt-cancel').addEventListener('click',()=>{
//     document.querySelector('.prompt-div').style.display = 'none';
//   });


// }



   
//         // // check if the PWA is not installed
//         // if (!navigator.standalone && !window.matchMedia('(display-mode: standalone)').matches) {
//         //     let visitCount = 0;
            
//         //     document.querySelector('.prompt-div').style.display = 'block';
//         //     // listen for the 'fetch' event
//         //     self.addEventListener('fetch', event => {
//         //       // increment the visit count for every page visit
//         //       self.addEventListener('fetch', event => {
//         //         // check if the requested resource is not the current page
//         //         if (event.request.url !== self.location.href) {
//         //           visitCount++;
//         //         }
                
//         //       });
              
              
//         //       // show the div when the user has visited the site about 4 times
//         //       if ( visitCount==0) {
//         //         event.respondWith(new Response(iosDiv, {
//         //           headers: {'Content-Type': 'text/html'}
//         //         }));
//         //       } else {
//         //         event.respondWith(fetch(event.request));
//         //       }
//         //     });
//         //   }