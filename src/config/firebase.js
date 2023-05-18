const admin = require('firebase-admin');
const { initializeApp } = require('firebase/app');
const { getAuth } = require('firebase-admin/auth');

const serviceAccount = {
    "type": "service_account",
    "project_id": "web-shop-38204",
    "private_key_id": "d5f2e9a8714f78cad340a3c56e1dea91e906c780",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDGlokehKSGC+gH\nD3sn7OQnUzgt75MCrZj69ZaF3Wdzjs3vC2VCOH3bsnpzyGv8B21tNzmVxuGxm63i\nsQ6ahU/wRVLGzINI/1psUPsVRJQoURUqSbkJa9DtkLXNY8HFbzFV+qiCKU1GbX6k\nsfNnHmfc0wH9tzvnyYmr7/1UiKypRFIO+Vn0rQIv8/xSItpbVXR6JVEujLW0Zb2W\nyXfsZ66IvIuKgFQ9ln1BOFJkoQ/cf0hzBUhB7Xmx9qFuoHcUSa1+T7lsFchryUUc\nPiyYXHJ+SBPpw5WA+t4dfNppcgyvEIVTK9cFSZz+gv+M9eMlCiQS9gY0b5IhDbWv\nt7XmAnF5AgMBAAECggEAFpQaenMLzqbPZnAa6UbsiNEUJ9rfjNQmetAN4WHzJ2cS\n4G0cAeuw2ZgBBqWAq4q/pQV8oVwXoI0p98Z4OdbS6CdFmk851QSdaAfMCFa//pZ7\ncM+pf1n4Cu6jUPsY1qUGB7fETWo7PDjqR3jpCu4g0nFWPl3FLJ0UL02NsL0KXoMv\nw8+2duEi9LBMfqWyaaww8WS7auCo/iCeq85tOKIQ6UiNKXmt7Ygmg9wIGgXQ4Ak9\nFeJnXXu1/15fJizhoDA0xx/85Wof3Uo1KNXkg2PvPoAZPJlXENIXPQEM5DFnI6oM\nVv4bpefb4HfJrHVOWb/HeQ5ibXcCp20wn//oEbooFQKBgQD5zDld+8wlqJtL8RHY\nQ6NZ4Pp/NfnBh+kc7BX/vu8Btqz+CarZOhAoS0LY/+DxWrExneVx6c2ebANEYK2v\nINE+QjVJ5DU+LBI0Fuz44WwGHeWV+B+vxGLjFrAgE6iKuRbZAXtBoTq1YRgg8Z7X\n3NMH0bRtIEnoHguTbku98pnNRQKBgQDLhM9ZceM6p52i8GDtoz2CuMlbXAZ5UlpC\nvP4buvwzDG8ZuG2s26axuTBfFUTpQDBCV0sioOOjea3XmmFQMKGNT61r2XBoUxth\njSCTSy5qUT0lkC9YbBlonMhIQz3ah6znLeIjYLmy+laEV+pw0Axlvahx9dIn+4qH\nJ48G85TUpQKBgQDo+EEgmDADh0afAwxDiIGW166IagyvJFSTNtQlmytJi9e3bci7\no91h1x9XRv3B23Wa8soE/atZbx907D3QMWk1CYatjXriqzOnBSKp04NuCQAQaEMV\nKLGZXZWRtQPhrVHTvf/4a6hXdWCNiQs+A6OFjV0a0ZxcMXlWXO2jD9nFiQKBgCiD\nWZtelnM4pqKm40Sq+DWrfznWidtgz2L1qEfw4v9ufDdMhVihqP879CsZWsxr4K90\nHRrZmDcUo8yFiNWjuKUetVEAyeWalZrHszJfBvBXF6sAlswtSKmQfDYWXJvB4mNq\nuNd+C7lbKBnUPnESmUUvifaVjq4y3pKlB03E812ZAoGAGUqHZH91fbK5zngwhmzL\nyeOGzaRMTVXHdCeV9Wby8AisyIddTgkOYlqTcDyMXf3jlu0cVyt+Tt2wmX0eRyDp\nOnDNa/lfNu0gY60nh/EYitaV9fu8O7sMynGkOU0k9Odg1HME4TlRyJ2p4DWG7k2M\nrUzuM7L02lvb/E1hpLumj74=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-k9q8r@web-shop-38204.iam.gserviceaccount.com",
    "client_id": "116119126470235673664",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-k9q8r%40web-shop-38204.iam.gserviceaccount.com"
}

const firebaseConfig = {
    apiKey: "AIzaSyB5Z8TLxmkqZDVcDh5lyGlsqKHRGVYefIg",
    authDomain: "web-shop-38204.firebaseapp.com",
    databaseURL: "https://web-shop-38204-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "web-shop-38204",
    storageBucket: "web-shop-38204.appspot.com",
    messagingSenderId: "258327241295",
    appId: "1:258327241295:web:a2578cd574ad30f1c0c03a",
    measurementId: "G-W73DFZVRY4"
};

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://web-shop-38204-default-rtdb.europe-west1.firebasedatabase.app',
    storageBucket: 'web-shop-38204.appspot.com'
});

const storage = admin.storage();
const db = admin.database();

module.exports = { 
    db: db,
    storage: storage,
    getAuth: getAuth,
};