const webpush = require('web-push');

const gcmServerKey = 'AIzaSyC5itnz9jHmpvQRhq8sJUCFUy2SYUPanGs';
webpush.setGCMAPIKey(gcmServerKey);

const vapidKeys = {
  publicKey:
'BMidUD_07d11ReA2mW8BkUhYFhxQZek-TXMECB4KD86Es4Cx4UYfShDYHOnt3jarm2hJOD_lKqhJv_HrubZ07YY',
  privateKey: 'oZX9qv2HzR6Z7aXpticlMU59XlWb7fc9_onFZDawA5Y'
};

webpush.setVapidDetails(
  'mailto:joshua.adeegbola20@gmail.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

const sendNotice = (payload) => {
  webpush.sendNotification(
    pushSubscription,
    payload,
  );
}


module.exports = sendNotice