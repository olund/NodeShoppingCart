#Produktpresentation
* [Javascript på studentserver](http://www.student.bth.se/~heoa13/js/)
* [Github repo](http://github.com/olund/NodeShoppingCart)
* [LIVE](http://henrikolund.se:8000)
* [Installations guide](http://henrikolund.se:8000/installation)

Det var lätt att välja vad projektet skulle gå ut på, jag har alltid velat skapa en webshop och varför inte göra en nu när man får chansen!
Tanken med projektet är att visa upp kunskaperna man har lärt sig under kursen och även mer avancerade tekniker.

Projektet var medelsvårt att implementera, det finns så många olika javascript library's och man vet inte riktigt vad/vilket som är bäst för just min produkt. Som tur var hittade jag KrakenJS tidigt och bestämde mig direkt för att arbeta med det. Jag har tidigare arbetat med ExpressJS och tyckte verkligen om arbetsättet med anonyma funktioner och callbacks men ibland hamnade man i [callback hell](http://callbackhell.com/). KrakenJS är ett lager utanpå ExpressJS och ger struktur samt konvention.

Mycket problem med databaser och kopplingar fanns det. Mitt första försök att koppla in en databas i projektet valde jag MongoDB med ORM'n [jaydata](http://jaydata.org/). Det visade sig vara ett uruselt val, varför ska jag krångla till det med en NoSQL databas när jag kan relationsdatabaser såpass bra... MongoDB med Jaydata lyckades jag aldrig skapa arv i, vilket var ett måste för att en kategori måste kunna hantera flera produkter. Efter många dagars försök ändrade mig och det blev istället MySQL samt [Sequelize](http://sequelizejs.com/). Efter ändringen har jag inte stött på några större problem (förutom att jag var tvungen att skriva om 50% av all kod)!


##Krav k1: Paketera, presentera och produktifiera
NodeShoppingCart är ett projekt för dig som är i behov av en webshop. Idén med projektet var att visa upp kunskaperna man har lärt sig hittils med att skapa en hyffsad webshop. Webshopen har nuvarande inte en checkout och är allså inte produktions redo ännu men med minimala kunskapar kan man integrera exempelvis paypal smidigt. Designmässigt behövs det också en förbättring men det var inte fokus i projektet.

Webshopen hanterar produkter, kategorier och användare. Det finns en administratör som kan skapa, uppdatera och ta bort allt det väsentliga. En produkt har en titel, beskrivning, pris samt en bild samt är kopplad till en kategori. En produkt kan läggas till i kundvagnen av en gästanvändare utan att behöva logga in, gästanvändaren behöver bara logga in när denna ska checka ut.


[Installations guide](http://henrikolund.se:8000/installation)

Självklart finns koden på ett [Github repo](http://github.com/olund/NodeShoppingCart)


##Krav k2: Ha koll på konkurrenterna och lär av dem
Det finns väldigt många webshopar ute på nätet, varför handla i butik när du är ett knapptryck från att beställa det du vill ha på nätet? Det finns många webshopar som jag anser vara riskabla med oseriösa företag, prestandaproblem och användares lösenord lagras i cleartext. Du slipper inte oseriösa företag med mitt projekt men du får åtminstonde en start på en webshop som hanterar användares lösenord med password-hash samt bra prestanda med NodeJS.

Jag har försökt att återskapa en enklare version av [Dustin](https://www.dustinhome.se/) och [Inet](http://inet.se) i hundra procent javascript. Vad jag vet finns det ingen stor webshop som är enbart i javascript och varför inte gå emot strömmen, NodeJS är hett och blir bara större och större för varje dag.

Om man söker efter "Nodejs webshop", "Nodejs ecommerce" hittar man inte mycket nytt. Endast 1 projekt på github och 2 färdiga lösningar. Om man jämför med dustin och inet använder de enbart javascript för frontend och medan deras backend är implementerat i något annat språk än nodejs.


###Krav och features
Största kravet för mig var att projektet skulle vara skrivit i 100% javascript, både på klientsidan och serversidan. Dock tillkommer det självklart lite CSS/LESS som tar upp 9.2%.


###Features
* MVC designmönster.
* ORM för databashantering.
* Administration (CRUD för kategorier, produkter samt användare).
* AJAX request.
* Testning.
* Inloggning.
* Kundvagn, köp av produkter


###Nästa version
* Mer Ajax, "page reloads" är fult, särskilt när man lägger till en produkt i kundvagnen.
* Större coverage på testningen.
* Bättre felhantering
* Statistik/grafer över produkter.
* Checkout
* Dashboard, visa köpta produkter.


##Krav k3: Kvalitet och omfattning
Jag hade viss erfarenhet av att programmera Nodejs innan kursstarten men aldrig gjort något i ren javascript. Jag valde att göra ett projekt som ligger utanför det vi har lärt oss i kursen eftersom jag anser att det skulle bli mer intressant hur jag skulle lyckats att göra något själv från grunden istället för att förbättre något vi redan har skapat från kursmomenten. Att skriva en hel hemsida i javascript/nodejs var fruktansvärt roligt och lärorikt. Att följa MVC designmönstret vi lärde oss i PHPMVC kursen var väldigt användningsbart och kodstrukturen känns väldigt optimal. Allt har sin egna plats och det är enkelt att navigera runt i filerna.

###Mappstruktur
![mappstruktur](http://puu.sh/ePI05/c50de1e911.png)



Något positivt är att jag använder GET, POST, PUT samt DELETE (RESTful) men jag renderar även templates om använderen inte gör ett Ajax request. Det blev en smidig lösning istället för exempelvis enbar använda ajax.

Jag har inte fört någon tidslogg för hur många timmar jag exakt har ägnat åt projektet men jag skulle uppskatta att det är åtminstonde 80-90 timmar med all research.

Jag anser att min kod håller en bra kvalité men designen kan alltid förbättras samt github commit meddelanden måste förbättras i framtiden. När jag var trött på git blev meddelanden "asdf"..


##Optionella krav
Eftersom min applikation ligger utanför det vi har lärt oss i kursen var det svårt att välja optionella krav, jag har använt såpass mycket nytt som vi ej lär oss men jag har valt ut de tre största.


##K4 - NodeJS med CLI verktyg
När man arbetar i NodeJS använder man terminalen väldigt mycket och för mig blir arbetsättet väldigt logiskt och det finns inget annat arbetsätt som är bättre. Allt sker på ett ögenblick och man får respons direkt.

För att kunna hantera projektet behöver man ha kunskap om terminalen samt ett flertal verktyg. Detta kräver en högre insats av utvecklaren men man får väldigt mycket tillbaka bland annat högre kontroll och mer effektivitet.

Inför projektet krävdes det att jag skulle lära mig följande verktyg för att verkligen kunna arbeta effektivt med node.js.
* generator-kraken
* grunt
* npm
* nodemon
* strongloop
* bower


Det som används mest i projeket är npm, nodemon och strong-cli. För att använda NPM behövs en `.package.json` fil där all konfiguration finns. NPM läser filen för att veta vad som skall göras och exempel på detta är `npm start`, `npm install` och `npm test`. För att slippa starta om nodejs servern vid varje kodändring används `nodemon`. Nodemon kollar om filer har ändrats och bestämmer själv om det behövs en omstart eller inte.

Ett måste för att utveckla ett projekt är en debuger och jag valde att använda strongloop. För att slippa skriva `console.log` i varenda route behöver man bara skriva ett kommando i konsollen och det är `slc debug`. Man får då upp ett liknande verktyg som google chrome's där man kan sätta breakpoints samt se live output.

Ett stortproblem för mig var att jag aldrig visste om en viss funktion/route triggade, nu när jag jobbar mycket i terminalen kan jag enkelt se vad som körs.
```
213.80.115.208 - - [26/Jan/2015:18:24:22 +0000] "GET /products HTTP/1.1" 200 6169 "http://henrikolund.se:8000/" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2287.0 Safari/537.36"
```
Ovanstående rad ser man att det har varit en webbläsare som har kört en GET request till henrikolund.se:8000/ och jag ser att statuskoden är 200 vilket betyder "OK".


##K5 - Ramverk
Varför ska man återskapa hjulet var min apporach. Eftersom vi har gått igenom alla grunder i kursmomenten var mitt mål att
använda mig av olika ramverk för att snabba upp utvecklingen. Att använda olika ramverk/bibliotek är både positivt och negativt eftersom det är mycket dokumentation som måste läsas men det snabbar upp utvecklingen i och med att det finns mycket kod att återanvända. En annan nackdel är att kvalitén kan skilja sig otroligt mycket och för att säkerhetställa att jag valde rätt kollade jag populariteten på paketen innan jag började använda dem.

Tyvärr gjorde jag ett stort misstag i början av projektet genom att använda jaydata (nämns tidigare), jag läste inte igenom hur det fungerade tillräckligt bra och såg inte att projektet var nerlagt. Inför nästa projekt kommer detta definitivt inte hände och nu förstår jag verkligen att man måste planera bättre.

###KrakenJS
KrakenJS som jag har nämnt tidigare är alltså grunden i allt. KrakenJS sköter routing och allt det nödvändiga.

###Sequelize ORM
Sequelize biblioteket ger en enkel tillgång till MySQL, MariaDB, SQLite eller PostgreSQL databaser. Det är alltså en ORM (Object-Relational-Mapper).

####Exempelanvädning av Sequelize för att hitta användare med användarnamnet 'test'
```
var models = require('../models');

router.get('/länk', function (req, res) {
    models.User.find({
        where: {
            username: 'test'
        },
        limit: 100,
    }).then(function (users) {
        console.log(users);
    });
});

```

###DustJS
LinkedIns DustJS är "Asynchronous templates" för browsers samt node.js.
Kolla in public/temlates/* för att se exempel!



##K6 - Testning
Testdriven utveckling är en systemutvecklingsmetod som sätter starkt fokus på automatiserad enhetstestning och är något jag har velat använda mig sen vi använde PHPUnit under PHPMVC kursen.

Mina kunskaper var begränsade vid start av projektet och tyvärr blev testningen lidande. Fokus i projektet blev istället implementation av krav. Jag tycker ändå att testning är väldigt viktigt och bör alltid ske i ett projekt och det är därför det finns med som ett optionellt krav i mitt projekt.


När jag testar min kod använde jag Grunt som är ett byggsystem (nämns ovanför) och grunt kallar på
[Mocha](https://github.com/mochajs/mocha) som kör enhetstester. Grunt kör även Jshint test för att kolla att koden håller hög kvalité och att alla inblandade medlemmar använder sig av samma kodstruktur. I `.jshintrc` filen finns kodstandarden alla inblandade följer.

Mocha är väldigt populärt bibliotek för att testa javascript kod och en utan kodkunskapar kan följa vad som händer eftersom det är väldigt beskrivande.

####Ett exempel på ett testfall ser ut såhär:
![sequelize](http://puu.sh/f31Pj/1bdd6653ce.png)


###JSHINT fel
![jshintfel](http://puu.sh/ePHU5/d5e5167083.png)

###Fullt fungerande test
![Working test cases](http://puu.sh/ePiHZ/602b7babb4.png)










##Tankar om kursen
Kursen känns föråldrad, varför inte använda tänket vi körde med i HTMLPHP, att vi ska lära oss det "nyaste" för att sedan kunna applicera det när vi börjar jobba inom programmering. När kursen skrivs om hoppas jag att andra elever får lära sig mer av roligare saker såsom ramverk, nya ecmascript 6 och slippa göra tråkiga spel.
Kursen håller ett lagom tempo och svårighets graden ökar stegvis vilket var mycket positivt. Jag anser att kursen går igenom det vitala för att lära sig hantera javascript på en lagom nivå. JQuery, websockets, Nodejs och prototypbaserad programmering var mycket användbart att lära sig.

Jag rekommederar denna kursen till programmerare utan förkunskaper om javascript, annars inte.


Jag ger kursen betyget 7/10.


// Henrik Ölund
