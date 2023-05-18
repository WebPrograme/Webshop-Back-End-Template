## Backend Template for Webshop
Dit is een basis template voor de backend van een Webshop. Hiermee kan je het volgende doen:

#### "Normale" Gebruikers:
 - Het inloggen en registreren voor gebruikers
 - Het toevoegen/verwijderen/aanpassen van winkelkarretjes
 - Het toevoegen/verwijderen van favorieten
 - Orders plaatsen (Betalingen zijn nog niet toegevoegd)

#### Admin Gebruikers:
 - Het bekijken van geplaatste orders en het updaten van de status van een order
 - Het bekijken/verwijderen/aanpasssen/toevoegen van producten
    - **Aanpassen/toevoegen:**
      - Toevoegen/verwijderen van afbeeldingen
      - Toevoegen/verwijderen/aanpassen van stock per maat
      - Toevoegen/verwijderen van categorieën
      - Toevoegen/verwijderen/aanpassen van kortingen

## Firebase
**Firebase Realtime Database**: hier wordt alles opgeslagen (Achteraf bekeken was Firestore misschien toch de betere optie)
**Firebase Storage**: hier worden de afbeeldingen opgeslagen\
**Firebase Auth**: hiermee kan je gebruikers en admins geauthenticeerd

Voor veiligheids redene wordt de `config/firebase.js` niet openbaar gemaakt.
