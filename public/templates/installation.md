#Installation av NodeShoppingCart
Denna guide visar hur man sätter upp NodeShoppingCart för **OSX Yosemite**.     
Guiden kräver 4 dependencies som behöver installeras **INNAN** du börjar med installationen av projektet.    
Den här guiden använder terminalen för att konfigurera och hämta hem projektet.    
Om du ej vet hur terminalen fungerar bör du ta reda på det innan du ens försöker.   
   

##Dependencies

Projektet kräver
* [Node.js](http://nodejs.org/)
* [NPM](http://nodejs.org/)
* [ImageMagick](http://www.imagemagick.org/)
* [Brew - Pakethanterare](http://brew.sh)


För OSX Yosemite kan du installera ImageMagick med:
```
$ brew install ImageMagick
```


##Steg 1
Hämta hem projektet från GitHub

```
$ git clone https://github.com/olund/NodeShoppingCart

```

##Steg 2
Gå in i projektet och ladda ner dependencies

```
$ cd NodeShoppingCart
$ npm install
```
 Detta kommer ta en stund, dags att sätta på kaffe och ta det lugnt en stund.


##Steg 3 - Ändra databas kopplingen

Databas konfigurationen är väldigt simpel, en json fil för 3 olika fall.
Default inställningen är en MySQL databas men du kan själv välja mellan
* MySQL
* MariaDB
* SQLite
* PostgeSQL

Du behöver ändra på host, username, password och port.

```
$ vim config/database.json

```

##Steg 4 - Starta server
```
$ npm start
```

OM något skulle gå fel, kolla i npm-debug loggen och försök lista ut felet, annars skickar du in en buggrapport via github.


## Optionellt-steg
Kör testfallen.

```
$ npm test
```
