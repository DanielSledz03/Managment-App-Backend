import * as admin from 'firebase-admin';
import serviceAccount from './managment-app-428bc-firebase-adminsdk-lb0ln-fe73c872e2.json';

const serviceAccountJson = JSON.stringify(serviceAccount);
const parsedServiceAccount = JSON.parse(serviceAccountJson);

admin.initializeApp({
    credential: admin.credential.cert(parsedServiceAccount),
});
