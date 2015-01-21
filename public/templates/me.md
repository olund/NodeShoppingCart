#Produktpresentation
[Javascript på studentserver](http://www.student.bth.se/~heoa13/js/)
[Github repo](http://github.com/olund/NodeShoppingCart)
[]

NodeShppingCart är ett projekt för dig som är i behov av en webshop.



##Krav k1: Paketera, presentera och produktifiera
###En presentation av vad din "produkt" gör, vilket problem den löser.

Det var lätt att välja vad projektet skulle gå ut på, jag har alltid velat skapa en webshop och varför inte göra en nu när man får chansen!
Tanken med projektet är att visa upp kunskaperna man har lärt sig under kursen och även mer avancerade tekniker.


Produkter, kategorier och användare är det väsentliga i projektet.






##Krav k2: Ha koll på konkurrenterna och lär av dem
Om man söker efter "Nodejs webshop", "Nodejs ecommerce" hittar man inte mycket nytt. Endast 1 projekt på github och 2 färdiga lösningar.


###Krav och features
Största kravet för mig var att projektet skulle vara skrivit i 100% javascript, både på klientsidan och serversidan. Det tillkommer självklart lite CSS/LESS som tar upp 9.2%.

* MVC designmönster
* ORM för databashantering
* CRUD för kategorier, produkter samt användare.
* AJAX request
* Testning



###Nästa version
Mer Ajax, "page reloads" är fult.
Större coverage på testningen.






##Krav k3: Kvalitet och omfattning
Jag hade viss erfarenhet av att programmera Nodejs innan kursstarten men aldrig gjort något i ren javascript. Jag valde att göra ett projekt som ligger utanför det vi har lärt oss i kursen eftersom jag anser att det skulle bli mer intressant hur jag skulle lyckats att göra något själv från grunden istället för att förbättre något vi redan har skapat från kursmomenten. Att skriva en hel hemsida i ren javascript var fruktansvärt roligt och lärorikt. Att följa MVC designmönstret vi lärde oss i PHPMVC kursen var väldigt användningsbart och kodstrukturen känns väldigt optimal. Allt har sin egna plats och det är enkelt att navigera runt i filerna.

###Mapstruktur
```
.
|-- config
|-- controllers
|-- lib
|-- locales
|   `-- US
|       `-- en
|           |-- errors
|-- models
|-- public
|   |-- css
|   |-- fonts
|   |-- images
|   |   `-- products
|   |-- js
|   `-- templates
|       |-- admin
|       |-- cart
|       |-- errors
|       |-- layouts
|       |-- partials
|       `-- products
|-- tasks
`-- test
    |-- admin
    `-- videos
```

I controllers, models och public/templates finner ni den väsentliga koden.


##Optionella krav
Eftersom min applikation ligger utanför det vi har lärt oss i kursen var det svårt att välja optienlla krav, jag har använt såpass mycket nytt som vi ej lär oss men jag har valt ut de tre största.


###K1 - Ramverk
Varför ska man återskapa hjulet var min apporach. Eftersom vi har gått igenom alla grunder i kursmomenten kände jag att för att testa på olika ramverk.

* ExpressJS
* KrakenJS
* Sequelize ORM
* DustJS
*

###K2 - Testning

###K3 - CLI????



##Tankar om kursen
Kursen känns föråldrad, varför inte använda tänket vi körde med i HTMLPHP att vi ska lära oss det "nyaste" för att sedan kunna applicera det när vi börjar jobba inom programmering. När kursen skrivs om hoppas jag att andra elever får lära sig mer av roligare saker såsom ramverk, nya ecmascript 6 och slippa göra tråkiga spel.
Kursen håller ett lagom tempo och svårighets graden ökar stegvis vilket var mycket positivt. Jag anser att kursen går igenom det vitala för att lära sig hantera javascript på en lagom nivå. JQuery, websockets, Nodejs och prototypbaserad programmering var mycket användbart att lära sig.

Jag rekommederar denna kursen till programmerare utan förkunskaper om javascript, annars inte.


Jag ger kursen betyget 7/10.
