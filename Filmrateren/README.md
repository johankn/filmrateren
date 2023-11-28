# Dokumentasjon

## Filmrateren

### Innholdsfortegnelse

[Tema for prosjektet](#tema-for-prosjektet)

1. [Tech-stack](#1-tech-stack)
   - [Server side](#server-side)
   - [Klient side](#klient-side)
2. [Funksjonalitet](#2.funksjonalitet)
   - [Brukergenerert data](#brukergenerert-data)
   - [Fokus på universell utforming og tilgjengelighet](#fokus-på-universell-utforming-og-tilgjengelighet)
   - [Fokus på bærekraftig utvikling](#fokus-på-bærekraftig-webutvikling)
3. [Annet teknisk](#3-annet-teknisk-state-management-tailwind-og-react-router)

4. [Utvikling-og-testing](#4-utvikling-og-testing)
   - [Testing av komponenter i frontend](#testing-av-komponenter-i-frontend)
   - [Ende-til-ende testing med Playwright](#ende-til-ende-testing-med-playwright)

### Tema for prosjektet

Det er høst, og dermed sesong for å sitte inne under et varmt pledd og se på film. Vi har derfor laget en løsning hvor brukeren kan finne informasjon om norske filmer. Fra forsiden kan brukeren søke på sin ønskede film, eller bla ned for et mer avansert søk med fritekst, sjangerfiltrering og sorteringsvalg. Bruker skal ha mulighet til å trykke på en film for å få opp nøkkelinformasjon om filmen. Basert på denne informasjonen og reviews fra andre brukere kan brukeren vurdere om dette er en film hen vil se. Etter å ha sett en film kan brukeren selv skrive et review og rate filmen. Reviewet publiseres på siden til den aktuelle filmen slik at andre brukere kan ha nytte av det. Ratingen oppdateres også fortløpende basert på de innsendte ratingene. Dermed er brukerne av _Filmrateren_ klare til å utforske alle de beste norske filmene!

## Valg

### 1. Tech-stack

#### Server-side:

- **Apollo (Apollo Server)**: På serveren bruker vi Apollo, dette gjør det mulig å opprette et enkelt og effektivt grensesnitt for å hente og oppdatere data ved hjelp av GraphQL. Dette hjelper oss med å organisere og håndtere dataforespørsler fra klientene på en strukturert måte.

- **Mongoose + MongoDB**: For databasen bruker vi Mongoose sammen med MongoDB. Mongoose hjelper oss med å strukturere og organisere dataene på en logisk måte (gjennom mongoose.schema). MongoDB er selve databasen, hvor vi lagrer og henter informasjon. Denne kjøres på gruppas virtuelle maskin.

  - **Datagrunnlag**: Filmene i databasen er hovedsakelig hentet fra TMDB (The Movie Database) sitt API (https://developer.themoviedb.org/docs). Vi lagde et script som hentet ut alle filmer med Norge som produksjonsland, og hentet evt. manglende informasjon andre steder, slik som OMDb API og web scraping av https://www.imdb.com.

#### Klient-side:

- **Apollo (Apollo Client)**: På klientens side bruker vi også Apollo for å enkelt håndtere dataene som vi henter fra serveren via GraphQL. Apollo Client gir oss en enkel måte å administrere og oppdatere klientens tilstand basert på de dataene vi får fra serveren. Apollo Client har også _InMemoryCache_, som cacher resultater fra spørringene, som gjør brukeropplevelsen mer responsiv, og vi slipper unødvendige spørringer.

- **React med Typescript**: For å bygge brukergrensesnittet i frontend bruker vi React, dette gir oss verktøyene vi trenger for å opprette en flott og interaktiv nettside. Frontend-delen av prosjektet er satt opp med Vite.

### 2.Funksjonalitet

- Vi har valgt å ha et søkefelt for input av søk for å gjøre brukergrensesnittet så enkelt som mulig. For at brukeren skal slippe å skrive inn hele filmnavnet gir søkefeltet forslag for autocomplete. Dette inputfeltet lager en _debouncevalue_ som brukes i en spørring etter filmer 1.5 sekund etter bruker har sluttet å taste. Dette for å ikke utføre en spørring etter hvert tastetrykk. Brukeren har dog mulighet til å bla ned på forsiden for et mer avansert søk. Her er det mulighet for å skrive inn fritekst hvis man kun husker et par bokstaver i tittelen, man kan filtrere på sjanger og streamingtjeneste, og sortere enten alfabetisk, på IMDB-rating, varighet, popularitet (samlet score basert på IMDB-rating og antall reviews) eller på utgivelsesår. Det er en del filmer i databasen uten data på f.eks IMDB-rating eller utgivelsesår, og disse filmene kan man velge å filtrere bort når man sorterer på disse feltene. Ved hjelp av reset-knappen kan brukeren effektivt og enkelt fjerne alle brukervalg.
- Ved å trykke på et søkeresultat (en film) navigerer applikasjonen inn på siden for den aktuelle filmen, og det presenteres mer detaljer om objektet. På denne måten unngår vi at brukeren blir overøset med detaljer når hen skal velge film.

#### Brukergenerert data

Lagres persistent på databaseserveren i form av brukeranmeldelser som legges inn på den aktuelle filmens side. Alle brukeranmeldelsene som gjelder denne filmen hentes fra databasen og presenteres på denne siden. Ratingen av filmen oppdateres basert på gjennomsnittet av ratingene i databasen, og presenteres for bruker som stjerner. Dette valget er gjort slik at brukerne enkelt kan dele sin mening om filmen med hverandre.

#### Fokus på universell utforming og tilgjengelighet

Vi har gjort flere tilpasnigner for at applikasjonen skal være tilgjengelig for alle mulige brukere, og har fokusert på de fire prinsippene for tilgjengelig webinnhold.

_1. Tekst-til-tale-funksjonalitet_

- Vi har forbedret tilgjengeligheten på Moviepage ved å inkludere en tekst-til-tale-funksjonalitet. Dette gir brukere muligheten til å få filminformasjonen opplest, noe som spesielt er verdifullt for de som foretrekker eller er avhengige av lydassistans. Vi har implementert en brukervennlig kontroll for å starte, stoppe, og eventuelt starte lyden på nytt, slik at brukerne har fullstendig kontroll over opplevelsen.

_2. Tastatur-navigasjon_

- Vi implementert tastaturtilgjengelighet, slik at funksjoner på Homepage kan betjenes uten bruk av mus. Dette er spesielt nyttig for brukere med ulike bevegelsesvansker eller de som foretrekker tastaturinteraksjon.

_3. Kognisjon, god interaksjonsdesign og semantisk koding_

- Vi har prioritert å integrere prinsippene for kontinuitet, kognisjon og god interaksjonsdesign. Dette innebærer å sikre at våre løsninger ikke bare er teknisk solide, men også at de gir en intuitiv og meningsfull opplevelse for brukeren. Det inkluderer tydelig tilbakemelding til brukeren for å veilede dem gjennom handlingene på nettstedet. For eksempel vil brukeren motta umiddelbar beskjed når de har lagt til en vurdering på en film, og den er blitt registrert. Vi har også tatt hensyn til lesetiden, slik at brukeren har tilstrekkelig tid til å absorbere informasjonen. Brukeren vil kun ha mulighet til å velge filtreringsalternativer som har resultater for det gitte inputet, for å gjøre det tydelig for brukeren hvilke alternativer som gjelder. I tilfelle brukeren søker på et input som ikke gir noen resultater, så får hen beskjed om det i stedet for at siden bare blir helt tom, for å unngå forvirring. 
- Vi har gjort interaktive elementer responsive, enten ved å endre farge eller forstørre størrelsen, slik at det blir tydelig for brukeren at det er mulig å utføre en handling. Lignende elementer, feks knapper, har likt design på de ulike sidene, for å gi brukeren en intutiv følelse av hvordn de kan utføre lignende handlinger på webapplikasjonen.
- Vi har implementert semantiske HTML-tags, som f.eks < nav > og < section >, der det har vært hensiktsmessig enn < div >, for å tydeligere beskrive elementets rolle.

_4. Inndatahjelp_

- På alle tekstfelter er det lagt til et default-eksempel som skal hjelpe bruker med å skjønne hva man kan/skal skrive. Dersom bruker likevel utfører en handling "feil", vil de motta klare tilbakemeldinger som gir veiledning om hvordan de kan rette opp i feilene. For eksempel, når en bruker prøver å legge til en rating uten en kommentar, vil de bli varslet om at en kommentar er nødvendig.

#### Fokus på bærekraftig webutvikling

- Løsningen demonstrerer bærekraftige prinsipper innen webutvikling ved å unngå unødvendig databasehenting. Paging, implementert ved bruk av "limit" og "skip" variabler i Apollo-klienten, sammen med en "Last flere filmer"-knapp, sikrer at vi laster inn kun det antallet filmer som brukeren ønsker. GraphQL-spørringer er nøye optimalisert, og returnerer kun nødvendig data som for eksempel **_id og tittel_** i autocomplete-komponenten, og **_id, tittel, posterURL og genres_** i avansert søk. For individuelle filmvisninger benyttes en dedikert **_GET_MOVIE_BY_ID-forespørsel_**.
- Designet er utformet med fokus på et intuitivt brukergrensesnitt og en innbydende presentasjon. Den grafiske profilen, med en kinosal og mørk rødlilla farge, reflekterer applikasjonens filmfokus. Det responsive designet, implementert gjennom grids og flex, sikrer oversikt og tiltalende visning på alle plattformer. Deisgnet er minimalt, og ingen elementer på nettsiden er overflødige.

### 3. Annet teknisk (state management, tailwind og react router)

- I underveisinnlevering 2 har vi implementert state management ved hjelp av Recoil.
  - Atoms i Recoil fungerer som beholdere for enkeltverdier eller små datastykker som skal deles mellom komponenter. I vårt prosjekt har vi opprettet flere atoms for å lagre viktig global tilstand, for eksempel valgt sjanger, valgt sortering, og input-tekst av tittel på film. Ved hjelp av atoms kan vi enkelt få tilgang til og oppdatere denne tilstanden i ulike deler av applikasjonen vår.
- Tailwind brukes for å gjøre det mest mulig oversiktlig med formatering i frontend.
- React Router brukes for å optimalisere navigasjonen mellom sidene, noe som gir en mer intuitiv brukeropplevelse.

### 4. Utvikling og testing

- Vi har brukt issues og issue board på gitlab for å holde oversikt over utviklingsoppgavene. Vi har organisert issuene i labels _setup_, _frontend_ og _backend_. Slik har vi lett holdt oversikt over hvilke typer utviklingsoppgaver som må gjøres. Hver issue har også vært koblet til en milestone. Slik har vi kontinuerlig holdt oversikt over hvor mye som gjenstår på prosjektet. I tillegg har vi opprettet merge request etter hver issue ble ferdig, og en annen på teamet har gått igjennom koden og kvalitetsikret den før den har blitt merget til main (peer review).

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
