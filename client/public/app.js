/* eslint-disable no-useless-escape */
//const pushCheckbox = document.querySelector('.js-push-toggle-checkbox');

/**** START register-sw ****/
function registerServiceWorker() {
  return navigator.serviceWorker.register('service-worker.js')
  .then(function(registration) {
    console.log('Service worker successfully registered.');
    return registration;
  })
  .catch(function(err) {
    console.error('Unable to register service worker.', err);
  });
}
/**** END register-sw ****/


function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}


// This is just to make sample code eaier to read.
// TODO: Move into a variable rather than register each time.
function getSWRegistration() {
  return navigator.serviceWorker.register('service-worker.js');
}

/**** START request-permission ****/
function askPermission() {
  return new Promise(function(resolve, reject) {
    const permissionResult = Notification.requestPermission(function(result) {
      resolve(result);
    });

    if (permissionResult) {
      permissionResult.then(resolve, reject);
    }
  })
  .then(function(permissionResult) {
    if (permissionResult !== 'granted') {
      throw new Error('We weren\'t granted permission.');
    }
  });
}
/**** END request-permission ****/

/**
 * Using `Notification.permission` directly can be slow (locks on the main
 * thread). Using the permission API with a fallback to
 * `Notification.permission` is preferable.
 * @return {Promise<String>} Returns a promise that resolves to a notification
 * permission state string.
 */
/**** START get-permission-state ****/
function getNotificationPermissionState() {
  if (navigator.permissions) {
    return navigator.permissions.query({name: 'notifications'})
    .then((result) => {
      return result.state;
    });
  }

  return new Promise((resolve) => {
    resolve(Notification.permission);
  });
}
/**** END get-permission-state ****/



/**** START send-subscription-to-server ****/
function sendSubscriptionToBackEnd(subscription) {
  // return fetch('/api/push-subscribe/', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify(subscription)
  // })
  // .then(function(response) {
  //   if (!response.ok) {
  //     throw new Error('Bad status code from server.');
  //   }

  //   return response.json();
  // })
  // .then(function(responseData) {
  //   if (!(responseData.data && responseData.data.success)) {
  //     throw new Error('Bad response from server.');
  //   }
  // });
  console.log(subscription)
}
/**** END send-subscription-to-server ****/

/**** START subscribe-user ****/
function subscribeUserToPush() {
  return getSWRegistration()
  .then(function(registration) {
    const subscribeOptions = {
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        'BMidUD_07d11ReA2mW8BkUhYFhxQZek-TXMECB4KD86Es4Cx4UYfShDYHOnt3jarm2hJOD_lKqhJv_HrubZ07YY'
      )
    };

    return registration.pushManager.subscribe(subscribeOptions);
  })
  .then(function(pushSubscription) {
    console.log('Received PushSubscription: ', JSON.stringify(pushSubscription));
    return pushSubscription;
  });
}
/**** END subscribe-user ****/

window.onload = function() {
  /**** START feature-detect ****/
  if (!('serviceWorker' in navigator)) {
    // Service Worker isn't supported on this browser, disable or hide UI.
    return;
  }

  if (!('PushManager' in window)) {
    // Push isn't supported on this browser, disable or hide UI.
    return;
  }
  /**** END feature-detect ****/

  // Push is supported.

  registerServiceWorker()
  askPermission()
  getNotificationPermissionState()
  sendSubscriptionToBackEnd()
  subscribeUserToPush()
};
