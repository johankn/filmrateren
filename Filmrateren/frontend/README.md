# Dokumentasjon

## Filmrateren

### Tema for prosjektet

Det er høst, og dermed sesong for å sitte inne under et varmt pledd og se på film. Vi har derfor laget en løsning hvor brukeren kan finne informasjon om norske filmer. Fra forsiden kan brukeren kan søke på sin ønskede film, eller bla ned for  et mer avansert søk med fritekst, sjangerfiltrering og sorteringsvalg. Bruker skal ha mulighet til å trykke på en film for å få opp nøkkelinformasjon om filmen. Basert på denne informasjonen og reviews fra andre brukere kan brukeren vurdere om dette er en film hen vil se. Etter å ha sett en film kan brukeren selv skrive et review og rate filmen. Reviewet publiseres på siden til den aktuelle filmen slik at andre brukere kan ha nytte av det. Ratingen oppdateres også fortløpende basert på de innsendte ratingene. Dermed er brukerne av *Filmrateren* klare til å utforske alle de beste norske filmene!

## Valg

### 1. Funksjonalitet

- Vi har valgt å ha et søkefelt for input av søk for å gjøre brukergrensesnittet så enkelt som mulig. For at brukeren skal slippe å skrive inn hele filmnavnet gir søkefeltet forslag for autocomplete. Brukeren har dog mulighet til å bla ned for et avansert søk. 
- I underveisinnlevering 1 presenteres et fåtall mockup-filmer listebasert med filmtittel og coverbilde. Senere er det tenkt at bruker skal kunne søke på en filmtittel, og at resultatene fra søket da skal presenteres med samme type liste med dynamisk scrolling. Dette legger til rette for at brukeren kan søke på filmer som hen ikke helt husker hva heter eller filmserier hvor det finnes flere filmer. Basert på tittel og cover kan brukeren velge hvilken film hen vil vite mer om.
- Ved å trykke på et søkeresultat navigerer applikasjonen inn på siden for den aktuelle filmen, og det presenteres mer detaljer om objektet. På denne måten unngår vi at brukeren blir overøset med detaljer når hen skal velge film.
- I underveisinnlevering 1 er det ikke implementert filtrering og sortering.
  - Det er tenkt at søkeresultatene skal kunne sorteres på f.eks. rating eller utgivelsesår. Filtreringen kan baseres på f.eks. sjanger. Dette skal utføres på hele resultatsettet basert på lagret informasjon i databasen. Dette skal bidra til at brukeren lettere finner filmer som passer til hen.
  - Planen er at dette skal implementeres som en del av det avanserte søket som brukeren kan scrolle ned for. Grunnen til at vi har valgt å skille enkelt og avansert søk er at brukergrensesnittet skal være så enkelt som mulig, slik at brukeren har mulighet til å kun skrive inn søkeord hvis hen vil det.
- Brukergenerert data skal lagres persistent på databaseserveren i form av reviews som legges inn på den aktuelle filmens side. Alle reviewsene som gjelder denne filmen hentes fra databasen og presenteres på denne siden. Ratingen av filmen oppdateres basert på gjennomsnittet av ratingene i databasen, og presenteres for bruker som stjerner. Dette valget er gjort slik at brukerne enkelt kan dele sin mening om filmen med hverandre.
- I underveisinnlevering 1 er det ikke fokusert på universell utforming. Senere skal det legges til rette for universell utforming basert på prinsippene som skal presenteres i forelesning.
- Løsningen demonstrerer aspekter ved bærekraftig webutvikling ved å ha gjenbrukbare og uavhengige komponenter som MovieCard og SearchHitCard. Det legger til rette for at man enkelt kan revidere og ekspandere nettsiden uten å måtte endre på hele koden. Tailwind er en oversiktlig måte å formattere innholdet på som også legger til rette for at utenforstående enkelt kan feilsøke og endre koden.
- Designet er laget med tanke på et intuitivt brukergrensesnitt og en innbydende fremtoning. Den grafiske profilen med en kinosal og mørk rødlilla farge skal gjenspeile at applikasjonen handler om filmer. Det responsive designet er implementert med grids og flex for å sørge for at siden er oversiktlig og appellerende på alle plattformer.

### 2. Teknisk

- Brukergrensesnitt er basert på React og programmert i Typeskrict. Prosjektet er satt opp med Vite.
- I underveisinnlevering 1 er det ikke ennå implementert state management.
- I underveisinnlevering 1 er det ikke ennå implementert GraphQL og database i backend.
- Tailwind brukes for å gjøre det mest mulig oversiktlig med formatering i frontend.
  - For HomePage.tsx har vi en egen css-fil fordi vi først etterhvert implementerte Tailwind.
  - Planen er å bruke Tailwind her også.
- React Router brukes for å optimalisere navigasjonen mellom sidene, noe som gir en mer intuitiv brukeropplevelse.

### 3. Utvikling og testing

- Vi har brukt issues og issue board på gitlab for å holde oversikt over utviklingsoppgavene. Vi har organisert issuene i labels _setup_, _frontend_ og _backend_. Slik har vi lett holdt oversikt over hvilke typer utviklingsoppgaver som må gjøres. Hver issue har også vært koblet til en milestone. Slik har vi kontinuerlig holdt oversikt over hvor mye som gjenstår på prosjektet. I tillegg har vi opprettet merge request etter hver issue ble ferdig, og en annen på teamet har gått igjennom koden og kvalitetsikret den før den har blitt merget til main.

- I underveisinnlevering 1 er det ikke enda implementert tester.
