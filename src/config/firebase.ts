import * as admin from 'firebase-admin';
import type { ServiceAccount } from 'firebase-admin';

// import Firebase account credentials
// note: saving the entire private key locally may not be secure. It's better to
import accountConfig from './service-account.json';

// initialize firebase in order to access its services
admin.initializeApp({
    credential: admin.credential.cert(accountConfig as ServiceAccount),
    databaseURL: `https://${accountConfig.project_id}.firebaseio.com`,
});

// initialize the database and collections
const db = admin.firestore();

// export them so it can be globally accessed
export { admin, db };
