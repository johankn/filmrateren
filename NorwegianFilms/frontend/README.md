# Dokumentasjon

## Filmrateren

### Tema for prosjektet

Det er høst, og dermed sesong for å sitte inne under et varmt pledd og se på film. Derfor har vi laget en løsning hvor brukeren kan finne informasjon om norske filmer. Brukeren søker på den ønskede filmen, og skal da presenteres med søkeresultater. Basert på brukerens ønsker skal resultatene kunne sorteres og filtreres. Bruker skal ha mulighet til å trykke på en film for å få opp nøkkelinformasjon om filmen. Basert på denne informasjonen og reviews fra andre brukere kan brukeren vurdere om dette er en film hen vil se. Etter å ha sett en film kan brukeren selv skrive et review og rate filmen. Reviewet publiseres på siden til den aktuelle filmen slik at andre brukere kan ha nytte av det. Ratingen oppdateres også fortløpende basert på de innsendte ratingene. Dermed er brukerne av NorwegianFilms klare til å utforske alle de beste norske filmene!

## Valg

### 1. Funksjonelt

- Vi har valgt å ha en søkefelt for input av søk for å gjøre brukergrensesnittet så enkelt som mulig. For at brukeren skal slippe å skrive inn hele filmnavnet gir søkefeltet forslag for autocomplete. 
- I underveisinnlevering 1 presenteres et fåtall mockup-filmer listebasert med filmtittel og -cover. Senere er det tenkt at bruker skal kunne søke på en filmtittel, og at resultatene fra søket da skal presenteres med samme type liste med dynamisk scrolling. Søkeknappen er ikke implementert ennå, men den skal gi mulighet for brukeren til å søke på andre ting enn filmtitlene som dukker opp i autocomplete. Dette legger til rette for at brukeren kan søke på filmer som hen ikke helt husker hva heter eller filmserier hvor det finnes flere filmer. Basert på tittel og cover kan brukeren velge hvilken film hen vil vite mer om. 
- Ved å trykke på et søkeresultat navigerer applikasjonen inn på siden for den aktuelle filmen, og det presenteres mer detaljer om objektet. På denne måten unngår vi å bruke ressurser på å laste inn unødvendig informasjon om filmer som ikke er aktuelle.
- I underveisinnlevering 1 er det ikke implementert filtrering og sortering. Det er tenkt at søkeresultatene skal kunne sorteres på f.eks. rating eller utgivelsesår. Filtreringen kan baseres på f.eks. sjanger. Dette skal utføres på hele resultatsettet basert på lagret informasjon i databasen. Dette skal bidra til at brukeren lettere finner filmer som passer til hen.
- Brukergenerert data skal lagres persistent på databaseserveren i form av reviews som legges inn på den aktuelle filmens side. Alle reviewsene som gjelder denne filmen hentes fra databasen og presenteres på denne siden. Ratingen av filmen oppdateres basert på gjennomsnittet av ratingene i databasen, og presenteres for bruker som stjerner. Dette valget er gjort slik at brukerne enkelt kan dele sin mening om filmen med hverandre.  
- I underveisinnlevering 1 er det ikke fokusert på universell utforming. Senere skal det legges til rette for universell utforming basert på prinsippene som skal presenteres i forelesning. 
- Løsningen demonstrerer aspekter ved bærekraftig webutvikling ved å ha gjenbrukbare og uavhengige komponenter som MovieCard og SearchHitCard. Det legger til rette for at man enkelt kan revidere og ekspandere nettsiden uten å måtte endre på hele koden. Tailwind er en oversiktlig måte å formattere innholdet på som også legger til rette for at utenforstående enkelt kan feilsøke og endre koden.  
- Designet er laget med tanke på et intuitivt brukergrensesnitt og en innbydende fremtoning. Den grafiske profilen med en kinosal og mørk rødlilla farge skal gjenspeile at applikasjonen handler om filmer. Det responsive designet er implementert med grids og flex for å sørge for at siden er oversiktlig og appellerende på alle plattformer. 

### 2. Teknisk

- Brukergrensesnitt er basert på React og programmert i Typeskript. Prosjektet er satt opp med Vite.
- I underveisinnlevering 1 er det ikke ennå implementert state managment.
- I underveisinnlevering 1 er det ikke ennå implementert GraphQL og database i backend.
- Tailwind brukes for å gjøre det mest mulig oversiktlig med formattering i frontend.  
- React Router brukes for å gjøre navigeringen mellom sidene mest mulig intuitiv. 

### 3. Utvikling og testing

- Vi har brukt issues og issue board på gitlab for å holde oversikt over utviklingsoppgavene. Vi har organisert issuene i labels _setup_, _frontend_ og _backend_. Slik har vi lett holdt oversikt over hvilke typer utviklingsoppgaver som må gjøres. Hver issue har også vært koblet til en milestone. Slik har vi kontinuerlig holdt oversikt over hvor mye som gjenstår på prosjektet. I tillegg har vi opprettet merge request etter hver issue ble ferdig, og en annen på teamet har gått igjennom koden og kvalitetsikret den før den har blitt merget til main.

- I underveisinnlevering 1 er det ikke ennå implementert tester.
