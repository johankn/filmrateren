# Dokumentasjon

## Filmrateren

### Tema for prosjektet

Det er høst, og dermed sesong for å sitte inne under et varmt pledd og se på film. Vi har derfor laget en løsning hvor brukeren kan finne informasjon om norske filmer. Fra forsiden kan brukeren søke på sin ønskede film, eller bla ned for  et mer avansert søk med fritekst, sjangerfiltrering og sorteringsvalg. Bruker skal ha mulighet til å trykke på en film for å få opp nøkkelinformasjon om filmen. Basert på denne informasjonen og reviews fra andre brukere kan brukeren vurdere om dette er en film hen vil se. Etter å ha sett en film kan brukeren selv skrive et review og rate filmen. Reviewet publiseres på siden til den aktuelle filmen slik at andre brukere kan ha nytte av det. Ratingen oppdateres også fortløpende basert på de innsendte ratingene. Dermed er brukerne av *Filmrateren* klare til å utforske alle de beste norske filmene!

## Valg

### 1. Tech-stack

#### Server-side:

- **Apollo (Apollo Server)**: På serveren bruker vi Apollo, dette gjør det mulig å opprette et enkelt og effektivt grensesnitt for å hente og oppdatere data ved hjelp av GraphQL. Dette hjelper oss med å organisere og håndtere dataforespørsler fra klientene på en strukturert måte.

- **Mongoose + MongoDB**: For databasen bruker vi Mongoose sammen med MongoDB. Mongoose hjelper oss med å strukturere og organisere dataene på en logisk måte (gjennom mongoose.schema). MongoDB er selve databasen, hvor vi lagrer og henter informasjon. Denne kjøres på gruppas virtuelle maskin.

#### Klient-side:

- **Apollo (Apollo Client)**: På klientens side bruker vi også Apollo for å enkelt håndtere dataene som vi henter fra serveren via GraphQL. Apollo Client gir oss en enkel måte å administrere og oppdatere klientens tilstand basert på de dataene vi får fra serveren. Apollo Client har også *InMemoryCache*, som cacher resultater fra spørringene, som gjør brukeropplevelsen mer responsiv, og vi slipper unødvendige spørringer.

- **React med Typescript**: For å bygge brukergrensesnittet i frontend bruker vi React, dette gir oss verktøyene vi trenger for å opprette en flott og interaktiv nettside. Frontend-delen av prosjektet er satt opp med Vite. 


### 2. Funksjonalitet

- Vi har valgt å ha et søkefelt for input av søk for å gjøre brukergrensesnittet så enkelt som mulig. For at brukeren skal slippe å skrive inn hele filmnavnet gir søkefeltet forslag for autocomplete. Dette inputfeltet lager en *debouncevalue* som brukes i en spørring etter filmer 1.5 sekund etter bruker har sluttet å taste. Dette for å ikke utføre en spørring etter hvert tastetrykk. Brukeren har dog mulighet til å bla ned på forsiden for et mer avansert søk. Her er det mulighet for å skrive inn fritekst hvis man kun husker et par bokstaver i tittelen, man kan filtrere på sjanger, og sortere enten alfabetisk, på IMDB-rating, varighet, eller på utgivelsesår. Det er en del filmer i databasen uten data på f.eks IMDB-rating eller utgivelsesår, og disse filmene kan man velge å filtrere bort når man sorterer på disse feltene.
- Ved å trykke på et søkeresultat (en film) navigerer applikasjonen inn på siden for den aktuelle filmen, og det presenteres mer detaljer om objektet. På denne måten unngår vi at brukeren blir overøset med detaljer når hen skal velge film.
- **Brukergenerert data** skal lagres persistent på databaseserveren i form av brukeranmeldelser som legges inn på den aktuelle filmens side. Alle brukeranmeldelsene som gjelder denne filmen hentes fra databasen og presenteres på denne siden. Ratingen av filmen oppdateres basert på gjennomsnittet av ratingene i databasen, og presenteres for bruker som stjerner. Dette valget er gjort slik at brukerne enkelt kan dele sin mening om filmen med hverandre.
- Vi har hatt **universell utforming** i bakhodet mens vi har utviklet. Blant annet har vi lagt til en talefunksjon som leser opp alt innholdet til en spesifikk film. Dette gjør at siden også er tilgjengelig for de med lesevansker. 
- Løsningen demonstrerer aspekter ved **bærekraftig webutvikling** ved å ikke hente unødvendig informasjon fra databasen. Vi har implementert paging (ved hjelp av limit og skip variablene i apollo-klienten), og vi har en "Last flere filmer"-knapp så vi ikke laster inn flere filmer enn hva brukeren ønsker. I tillegg returnerer GraphQL spørringene kun nødvendig data, f.eks kun *id og tittel* i autocomplete-komponenten, og kun *id, tittel, posterURL og genres* i avansert søk. Imens når vi først trykker inn på en film, hentes all info om den filmen inn gjennom en *GET_MOVIE_BY_ID* -forespørsel.
- Designet er laget med tanke på et **intuitivt brukergrensesnitt** og en **innbydende fremtoning**. Den grafiske profilen med en kinosal og mørk rødlilla farge skal gjenspeile at applikasjonen handler om filmer. Det **responsive designet** er implementert med grids og flex for å sørge for at siden er oversiktlig og appellerende på alle plattformer.

### 3. Annet teknisk (state management, tailwind og react router)

- I underveisinnlevering 2 har vi implementert state management ved hjelp av Recoil. 
  - Atoms i Recoil fungerer som beholdere for enkeltverdier eller små datastykker som skal deles mellom komponenter. I vårt prosjekt har vi opprettet flere atoms for å lagre viktig global tilstand, for eksempel valgt sjanger, valgt sortering, og input-tekst av tittel på film. Ved hjelp av atoms kan vi enkelt få tilgang til og oppdatere denne tilstanden i ulike deler av applikasjonen vår.
- Tailwind brukes for å gjøre det mest mulig oversiktlig med formatering i frontend.
- React Router brukes for å optimalisere navigasjonen mellom sidene, noe som gir en mer intuitiv brukeropplevelse.

### 4. Utvikling og testing

- Vi har brukt issues og issue board på gitlab for å holde oversikt over utviklingsoppgavene. Vi har organisert issuene i labels *setup*, *frontend* og *backend*. Slik har vi lett holdt oversikt over hvilke typer utviklingsoppgaver som må gjøres. Hver issue har også vært koblet til en milestone. Slik har vi kontinuerlig holdt oversikt over hvor mye som gjenstår på prosjektet. I tillegg har vi opprettet merge request etter hver issue ble ferdig, og en annen på teamet har gått igjennom koden og kvalitetsikret den før den har blitt merget til main (peer review).

### Testing av komponenter i frontend:
 - Vi har **snapshot-tester** som gir oss muligheten til å ta "snapshots" av komponenter og sammenligne dem med tidligere kjøringer for å oppdage uventede endringer.
 - Vi har testet om **innholdet** i komponentene er som forventet. Innholdet sjekkes med funksjoner som er uavhengig av html-tag for å legge til rette for at koden senere kan endres uten at testene må endres. 
 - Vi har testet at komponentene kan motta **props** og presentere riktig innhold basert på disse propsene. Dette sikrer at komponentene våre fungerer som forventet og at de er i stand til å vise variert innhold basert på de data de mottar.
 - Vi har brukt **mocking av API-kall** for å teste at de utføres med korrekt innhold. Dette kan avdekke viktige feil i interaksjonen med backend fra frontend-siden. Mockups brukes for å unngå at backend-siden av API-kallet påvirker testen.
 - Vi har noen tester av **brukerinteraksjon** for å sjekke validering av brukerinput og at komponentene oppfører seg som forventet ved brukerinteraksjon. Dette er utført i større skala i ende-til-ende-testene, men det kan være nyttig å ha mindre tester som dette for å lettere kunne lokalisere feilen. UserEvent brukes for å simulere brukerinteraksjon på et høyere nivå. Vitest brukes til å mocke funksjoner og overvåke at funksjonskall skjer når de skal avhengig av brukerinteraksjon.

### Ende-til-ende testing med Playwright:
Vi har implementert ende-til-ende tester ved hjelp av Playwright for å teste samspillet mellom server og frontend, og at riktig data hentes. Playwright er et verktøy som gjør det mulig å automatisere testingen av nettapplikasjoner i ulike nettlesere (chrome, firefox, safari). Vi har i tillegg til å bruke Playwright testet backenden mye i Apollo Studio sin UI for å sikre at spørringene fungerer som forventet. 

**Testscenarioer**

Vi har utviklet flere testscenarioer for å verifisere at ulike funksjoner i applikasjonen fungerer som forventet. Dette inkluderer testing av navigasjon, at riktige filmer blir hentet etter filtrering og sortering, og håndtering av brukeranmeldelser.

**Utfordringer med brukeranmeldelser**

I løpet av testprosessen identifiserte vi en utfordring knyttet til brukeranmeldelser på filmer. En av testene innebar å legge til en brukeranmeldelse på en film ved hjelp av Playwright-tester på tvers av ulike nettlesere. Denne testen støtte imidlertid på begrensninger i eksisterende funksjonalitet, spesielt relatert til håndtering av dupliserte anmeldelser. For å løse denne utfordringen implementerte vi en midlertidig løsning ved å opprette en tilpasset backend-metode. Denne metoden tillot sletting av brukeranmeldelser med en spesifikk kommentar og var spesifikt utformet for testingsscenarier.

Noen av de vurderte alternativene for å forbedre denne funksjonaliteten er:

- **Test-database:**

  - Ideelt sett ville en test-database ha gitt oss muligheten til å legge til og slette brukeranmeldelser under testprosessen. Dette ville ha eliminert utfordringen med duplikater, da vi kunne ha kontrollert tilstanden til databasen før hver test.

- **Brukerinnlogging:**

  - Implementering av brukerinnlogging kunne ha tillatt en test-bruker å ha en egen knapp for å slette egne anmeldelser. Dette ville ha gjort det mulig å håndtere problemet ved å slette dem etter hver test, på samme måte som vi gjør med API-kallet vi har i testmetoden vår nå. Imidlertid er ikke brukerinnlogging for øyeblikket implementert i prosjektet vårt, og derfor er ikke denne tilnærmingen tilgjengelig.


