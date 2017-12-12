const API_AI_TOKEN = 'ad418c27caa445cf8aa5706893e657a4';
const apiAiClient = require('apiai')(API_AI_TOKEN);

const FACEBOOK_ACCESS_TOKEN = 'EAAF0d9iIhmABAEKQzV8iun8TgXxRsntwq6ZC4QQ6mLyUE4ViqmagM3CkvZAarTNtIZCTLZBh8cwK8vM4cSgZAls5I7pzBZAAw0cZCEKq3VGceXbbK0a4j1pQrktCPx82fcCasCDCINbCUdZAxiP4QN2m74zAbyKeR8JA5dnmsOPgBgZDZD';

const request = require('request');

const sendTextMessage = (senderId, text) => {
    request({
        url: 'https://graph.facebook.com/v2.11/me/messages',
        qs: { access_token: FACEBOOK_ACCESS_TOKEN },
        method: 'POST',
        json: {
            recipient: { id: senderId },
            message: { text },
        }
    });
};

const sendImage = (senderId, imageUri) => {
    return request({
        url: 'https://graph.facebook.com/v2.11/me/messages',
        qs: { access_token: FACEBOOK_ACCESS_TOKEN },
        method: 'POST',
        json: {
            recipient: { id: senderId },
            message: {
                attachment: {
                    type: 'image',
                    payload: { url: imageUri }
                }
            }
        }
    });
};

module.exports = (event) => {
    const senderId = event.sender.id;
    const message = event.message.text;
    const apiaiSession = apiAiClient.textRequest(message, {sessionId: 'aidmbot'});

    apiaiSession.on('response', (response) => {
        const result = response.result.fulfillment.speech;

        if (response.result.metadata.intentName === 'image_search') {
            sendImage(senderId, result);
        } else {
            sendTextMessage(senderId, result);
        }
    });

    apiaiSession.on('error', error => console.log(error));
    apiaiSession.end();
};
