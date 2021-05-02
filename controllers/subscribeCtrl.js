const PushSubscription = require('../models/subscribeModel')
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

const isValidSaveRequest = (req, res) => {
    // Check the request body has at least an endpoint.
    if (!req.body || !req.body.endpoint) {
      // Not a valid subscription.
      res.status(400);
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({
        error: {
          id: 'no-endpoint',
          message: 'Subscription must have an endpoint.'
        }
      }));
      return false;
    }
    return true;
  };

const pushSubscriptionCtrl = {
    subscribeToPush: async (req, res) => {
        try {
            if (!isValidSaveRequest(req, res)) {
                return;
            }

            const newSubscription = new PushSubscription(req.body)
            console.log(newSubscription)
            await newSubscription.save()
            
            // return saveSubscriptionToDatabase(req.body)
            //     .then(function (subscriptionId) {
            //         res.setHeader('Content-Type', 'application/json');
            //         res.send(JSON.stringify({ data: { success: true } }));
            //     })
            // const {subscription} = req.body;
            // const newSubscription = new PushSubscription({ subscription })
            // console.log(newSubscription)
            // await newSubscription.save()

            res.json({msg: "Subscription to Push Successful!"})
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getSubscriptions: async (req, res) => {
        try{
            const pushSubs = await PushSubscription.find()
            res.json(pushSubs)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = pushSubscriptionCtrl