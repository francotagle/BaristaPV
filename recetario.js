// ========================================
// RECETARIO (libro con scroll horizontal)
// ========================================

const RECETARIO = [
 {
  "pagina": 3,
  "indice": "Ramazzotti",
  "nombre": "RAMAZZOTTI",
  "ingredientes": [
   "9 OZ ESPUMANTE BRUT",
   "3 OZ RAMAZZOTTI",
   "1 ½ OZ SODA"
  ],
  "elaboracion": "DIRECTO A LA COPA",
  "cristaleria": "COPA O COPON",
  "preparacion": "AGREGAR HIELO HASTA LLENAR LA COPA. AGREGAR ESPUMANTE BRUT, RAMAZZOTTI Y SODA. DECORAR CON NARANJA. PREPARACIÓN ORIGINAL: HIELO A TOPE, 2 PARTES PROSECCO, 1 PARTE RAMAZZOTTI, 2 HOJAS ALBAHACA.",
  "foto": "imagen/recetario/receta-03.jpg"
 },
 {
  "pagina": 4,
  "indice": "Tinto De Verano",
  "nombre": "TINTO DE VERANO",
  "ingredientes": [
   "6 OZ VINO TINTO",
   "1 OZ VERMOUTH BIANCO",
   "1 OZ VODKA",
   "1 OZ ZUMO LIMÓN",
   "GINGER ALE"
  ],
  "elaboracion": "DIRECTO A LA COPA",
  "cristaleria": "COPA O COPON",
  "preparacion": "LLENAR UNA COPA CON HIELO CUBO. AGREGAR VINO, VERMUT, VODKA Y LIMÓN. REVOLVER Y CORONAR CON GINGER ALE. DECORAR CON RODAJAS DE LIMÓN.",
  "foto": "imagen/recetario/receta-04.jpg"
 },
 {
  "pagina": 5,
  "indice": "Tequila Margarita",
  "nombre": "TEQUILA MARGARITA",
  "ingredientes": [
   "3 OZ TEQUILA BLANCO",
   "1 ½ OZ ZUMO LIMÓN",
   "1 ½ OZ TRIPLE SEC",
   "1 ½ OZ GOMA",
   "SAL"
  ],
  "elaboracion": "EN COCTELERA.",
  "cristaleria": "COPA MARGARITA (OPCIONAL VASO OLD FASHION).",
  "preparacion": "ENLLANTAR CON SAL LA COPA. EN UNA COCTELERA CON HIELO CUBO A TOPE, AGREGAR TEQUILA, TRIPLE SEC, LIMÓN Y GOMA. AGITAR ENÉRGICAMENTE Y LUEGO SERVIR EN COPA USANDO UN COLADOR PARA QUE NO CAIGAN RESTOS DE HIELO. DECORAR CON UNA RODAJA O GARNISH DE LIMÓN.",
  "foto": "imagen/recetario/receta-05.jpg"
 },
 {
  "pagina": 6,
  "indice": "Carajillo Barista",
  "nombre": "CARAJILLO BARISTA",
  "ingredientes": [
   "2 OZ LICOR 43",
   "1 OZ MAGDALA",
   "2 OZ CAFÉ ESPRESSO"
  ],
  "elaboracion": "EN COCTELERA.",
  "cristaleria": "VASO LONDON BAJO (OPCIONAL OLD FASHION).",
  "preparacion": "EN UNA COCTELERA CON HIELO CUBO A TOPE, AGREGAR LOS TRES INGREDIENTES Y LUEGO AGITAR ENÉRGICAMENTE LA COCTELERA HASTA SERVIR CON COLADOR EL CÓCTEL. DECORAR CON GRANOS DE CAFE O UNA RODAJA DE NARANJA DESHIDRATADA.",
  "foto": "imagen/recetario/receta-06.jpg"
 },
 {
  "pagina": 7,
  "indice": "Daiquiri Variedades",
  "nombre": "DAIQUIRI VARIEDADES",
  "ingredientes": [
   "3 OZ RON BLANCO",
   "1 ½ OZ TRIPLE SEC",
   "1 ½ OZ ZUMO LIMÓN",
   "1 ½ OZ GOMA",
   "1 ½ OZ FRUTA DE ESTACIÓN"
  ],
  "elaboracion": "EN COCTELERA",
  "cristaleria": "COPA COCTEL O MARGARITA.",
  "preparacion": "AGREGAR EN UNA COCTELERA CON HIELO A TOPE TODOS LOS INGREDIENTES, AGITAR Y SERVIR EN COPA USANDO UN COLADOR. DECORAR CON RODAJA DE LIMÓN.",
  "foto": "imagen/recetario/receta-07.jpg"
 },
 {
  "pagina": 8,
  "indice": "Kir Royal",
  "nombre": "KIR ROYAL",
  "ingredientes": [
   "1 ½ OZ CASSIS (LICOR DE",
   "GROSELLA NEGRA)",
   "4 OZ ESPUMANTE BRUT"
  ],
  "elaboracion": "DIRECTO AL VASO",
  "cristaleria": "COPA FLAUTA",
  "preparacion": "EN UNA COPA FLAUTA HELADA AGREGAR LOS INGREDIENTES, DECORAR CON UN FRUTO ROJO Y SERVIR.",
  "foto": "imagen/recetario/receta-08.jpg"
 },
 {
  "pagina": 9,
  "indice": "Vaina",
  "nombre": "VAINA",
  "ingredientes": [
   "2 OZ OPORTO (OPCIONAL JEREZ)",
   "1 OZ COÑAC TRES PALOS",
   "1 OZ LICOR DE CACAO",
   "1 OZ GOMA",
   "1 YEMA DE HUEVO",
   "CANELA EN POLVO"
  ],
  "elaboracion": "EN COCTELERA",
  "cristaleria": "COPA COCTEL O FLAUTA",
  "preparacion": "EN UNA COCTELERA CON HIELO CUBO A TOPE AGREGAR TODOS LOS INGREDIENTES, EXCEPTO LA CANELA EN POLVO. AGITAR ENÉRGICAMENTE Y LUEGO SERVIR CON DOBLE COLADO (DOS COLADORES PARA EVITAR EL PASO DE HIELO PICADO). DECORAR EL CÓCTEL CON CANELA EN POLVO ENCIMA DEL CÓCTEL.",
  "foto": "imagen/recetario/receta-09.jpg"
 },
 {
  "pagina": 10,
  "indice": "Caipirinha",
  "nombre": "CAIPIRINHA",
  "ingredientes": [
   "3 OZ CACHAZA",
   "1 ½ OZ ZUMO LIMÓN",
   "1 ½ OZ GOMA"
  ],
  "elaboracion": "DIRECTO AL VASO",
  "cristaleria": "VASO OLD FASHION",
  "preparacion": "AGREGAR DOS GAJOS DE LIMÓN AL VASO, TODOS LOS INGREDIENTES Y HIELO FRAPPE A TOPE. REVOLVER Y DECORAR CON RODAJA DE LIMÓN",
  "foto": "imagen/recetario/receta-10.jpg"
 },
 {
  "pagina": 11,
  "indice": "Mojito Cubano",
  "nombre": "MOJITO CUBANO",
  "ingredientes": [
   "3 OZ RON BLANCO",
   "1 ½ OZ ZUMO LIMÓN",
   "1 ½ OZ GOMA",
   "1 ½ OZ SODA",
   "8 HOJAS DE MENTA"
  ],
  "elaboracion": "DIRECTO AL VASO",
  "cristaleria": "VASO LARGO",
  "preparacion": "AGREGAR AL VASO 4 GAJOS DE LIMÓN, 8 HOJAS DE MENTA, ZUMO DE LIMÓN Y GOMA. MACHACAR HASTA UNIR LOS SABORES. AGREGAR HIELO FRAPPE A TOPE Y RON BLANCO. REVOLVER Y CORONAR CON SODA. DECORAR CON LIMÓN Y MENTA.",
  "foto": "imagen/recetario/receta-11.jpg"
 },
 {
  "pagina": 12,
  "indice": "Mojito Sabores",
  "nombre": "MOJITO SABORES",
  "ingredientes": [
   "3 OZ RON BLANCO",
   "1 ½ OZ ZUMO LIMÓN",
   "1 ½ OZ GOMA",
   "1 ½ OZ SODA",
   "8 HOJAS DE MENTA",
   "2 OZ FRUTA DE ESTACIÓN"
  ],
  "elaboracion": "DIRECTO AL VASO",
  "cristaleria": "VASO LARGO",
  "preparacion": "AGREGAR AL VASO 4 GAJOS DE LIMÓN, 8 HOJAS DE MENTA, ZUMO DE LIMÓN, FRUTA DE ESTACIÓN Y GOMA. MACHACAR HASTA UNIR LOS SABORES. AGREGAR HIELO FRAPPE A TOPE Y RON BLANCO. REVOLVER Y CORONAR CON SODA. DECORAR CON LIMÓN, FRUTA DE ESTACIÓN Y MENTA.",
  "foto": "imagen/recetario/receta-12.jpg"
 },
 {
  "pagina": 13,
  "indice": "Mimosa",
  "nombre": "MIMOSA",
  "ingredientes": [
   "2 OZ ZUMO NARANJA",
   "4 OZ ESPUMANTE BRUT"
  ],
  "elaboracion": "DIRECTO AL VASO",
  "cristaleria": "COPA FLAUTA",
  "preparacion": "AGREGAR TODOS LOS INGREDIENTES EN UNA COPA BIEN HELADA. DECORAR CON UNA RODAJA DE NARANJA Y SERVIR.",
  "foto": "imagen/recetario/receta-13.jpg"
 },
 {
  "pagina": 14,
  "indice": "Aperol Spritz",
  "nombre": "APEROL SPRITZ",
  "ingredientes": [
   "9 OZ ESPUMANTE",
   "3 OZ APEROL",
   "1 ½ OZ SODA"
  ],
  "elaboracion": "DIRECTO AL VASO",
  "cristaleria": "COPA O COPON",
  "preparacion": "EN UNA COPA AGREGAR 3 O 4 HIELOS, AGREGAR TODOS LOS INGREDIENTES, DECORAR CON UNA RODAJA DE NARANJA Y SERVIR.",
  "foto": "imagen/recetario/receta-14.jpg"
 },
 {
  "pagina": 15,
  "indice": "Moscow Mule",
  "nombre": "MOSCOW MULE",
  "ingredientes": [
   "2 OZ VODKA",
   "4 OZ GINGER BEER",
   "1 OZ ZUMO LIMÓN",
   "1 OZ GOMA"
  ],
  "elaboracion": "DIRECTO AL VASO",
  "cristaleria": "JARRA METÁLICA",
  "preparacion": "EN UNA JARRA METÁLICA AGREGAR 4 GAJOS DE LIMÓN, ZUMO LIMÓN, GOMA Y VODKA. AGREGAR GINGER BEER, HIELO FRAPPE Y DECORAR CON UNA HOJA DE MENTA Y RODAJA DE LIMÓN.",
  "foto": "imagen/recetario/receta-15.jpg"
 },
 {
  "pagina": 16,
  "indice": "Saint-Germain Spritz",
  "nombre": "SAINT-GERMAIN SPRITZ",
  "ingredientes": [
   "9 OZ ESPUMANTE",
   "3 OZ SAINT-GERMAIN",
   "1 ½ OZ SODA"
  ],
  "elaboracion": "DIRECTO AL VASO",
  "cristaleria": "COPA O COPON",
  "preparacion": "EN UNA COPA AGREGAR 4 HIELOS Y TODOS LOS INGREDIENTES. REVOLVER Y DECORAR CON UNA RODAJA DE LIMÓN (OPCIONAL RAMA DE ROMERO).",
  "foto": "imagen/recetario/receta-16.jpg"
 },
 {
  "pagina": 17,
  "indice": "Tropical Gin",
  "nombre": "TROPICAL GIN",
  "ingredientes": [
   "3 OZ GIN",
   "1 REDBULL MARACUYÁ",
   "2 OZ PULPA MARACUYA"
  ],
  "elaboracion": "DIRECTO AL VASO",
  "cristaleria": "COPA O COPON",
  "preparacion": "EN UNA COPA AGREGAR HIELO CUBO A TOPE, LUEGO AGREGAR TODOS LOS INGREDIENTES, REVOLVER Y DECORAR CON UNA RODAJA DE LIMÓN.",
  "foto": "imagen/recetario/receta-17.jpg"
 },
 {
  "pagina": 18,
  "indice": "Sangría",
  "nombre": "SANGRÍA",
  "ingredientes": [
   "2 OZ MACERADO BARISTA",
   "2 OZ ZUMO NARANJA",
   "2 OZ GOMA",
   "6 OZ VINO TINTO"
  ],
  "elaboracion": "DIRECTO AL VASO",
  "cristaleria": "COPA O COPON",
  "preparacion": "EN UNA COPA CON TRES HIELOS, AGREGAR TODOS LOS INGREDIENTES Y REVOLVER. DECORAR CON FRUTOS ROJOS Y UNA RODAJA DE NARANJA. SI ES PARA LA JARRA APLICAR MISMA LÓGICA X 4.",
  "foto": "imagen/recetario/receta-18.jpg"
 },
 {
  "pagina": 19,
  "indice": "Jarrita Negroni",
  "nombre": "JARRITA NEGRONI",
  "ingredientes": [
   "4 OZ CAMPARI",
   "4 OZ VERMOUTH ROSSO",
   "4 OZ GIN"
  ],
  "elaboracion": "VASO MEZCLADOR",
  "cristaleria": "VASO OLD FASHION",
  "preparacion": "EN UN VASO MEZCLADOR AGREGAR ABUNDANTE HIELO, TODOS LOS INGREDIENTES Y LUEGO MEZCLAR ENÉRGICAMENTE. LUEGO EN UN VASO OLD FASHION AGREGAR TRES HIELO Y VACIAR LA MEZCLA. DECORAR CON PIEL DE NARANJA.",
  "foto": "imagen/recetario/receta-19.jpg"
 },
 {
  "pagina": 20,
  "indice": "Martini Dry",
  "nombre": "MARTINI DRY",
  "ingredientes": [
   "3 OZ GIN",
   "1 ½ OZ MARTINI EXTRA DRY",
   "TRES ACEITUNAS VERDES"
  ],
  "elaboracion": "VASO MEZCLADOR",
  "cristaleria": "COPA CÓCTEL O MARTINI",
  "preparacion": "EN UN VASO MEZCLADOR CON ABUNDANTE HIELO, AGREGAR TODOS LOS INGREDIENTES (EXCEPTO LAS ACEITUNAS) Y LUEGO MEZCLAR ENÉRGICAMENTE. EN UNA COPA CÓCTEL BIEN HELADA AGREGAR LA MEZCLA COLADA. AGREGAR TRES ACEITUNAS AL CÓCTEL Y SERVIR",
  "foto": "imagen/recetario/receta-20.jpg"
 },
 {
  "pagina": 21,
  "indice": "Vodka Martini",
  "nombre": "VODKA MARTINI",
  "ingredientes": [
   "3 OZ VODKA",
   "1 ½ OZ MARTINI EXTRA DRY",
   "TRES ACEITUNAS"
  ],
  "elaboracion": "VASO MEZCLADOR",
  "cristaleria": "COPA CÓCTEL O MARTINI.",
  "preparacion": "EN UN VASO MEZCLADOR CON ABUNDANTE HIELO, AGREGAR TODOS LOS INGREDIENTES (EXCEPTO LAS ACEITUNAS) Y LUEGO MEZCLAR ENÉRGICAMENTE. EN UNA COPA CÓCTEL BIEN HELADA AGREGAR LA MEZCLA COLADA. AGREGAR TRES ACEITUNAS AL CÓCTEL Y SERVIR",
  "foto": "imagen/recetario/receta-21.jpg"
 },
 {
  "pagina": 22,
  "indice": "007",
  "nombre": "007",
  "ingredientes": [
   "1 ½ OZ GIN",
   "1 ½ OZ VODKA",
   "1 ½ OZ MARTINI EXTRA DRY"
  ],
  "elaboracion": "VASO MEZCLADOR",
  "cristaleria": "COPA CÓCTEL O MARTINI",
  "preparacion": "EN UN VASO MEZCLADOR CON ABUNDANTE HIELO, AGREGAR TODOS LOS INGREDIENTES Y LUEGO MEZCLAR ENÉRGICAMENTE. EN UNA COPA CÓCTEL BIEN HELADA AGREGAR LA MEZCLA COLADA. AGREGAR PIEL DE LIMÓN Y SERVIR",
  "foto": "imagen/recetario/receta-22.jpg"
 },
 {
  "pagina": 23,
  "indice": "Martini Espresso",
  "nombre": "MARTINI ESPRESSO",
  "ingredientes": [
   "1 1/2 OZ CAFE ESPRESSO",
   "2 OZ LICOR DE CAFE",
   "2 OZ VODKA"
  ],
  "elaboracion": "COCTELERA",
  "cristaleria": "COPA COCTEL O VASO LONDON BAJO",
  "preparacion": "EN UNA COCTELERA CON ABUNDANTE HIELO AGREGAR TODOS LOS INGREDIENTES Y BATIR ENÉRGICAMENTE. COLAR Y SERVIR EN COPA. DECORAR CON GRANOS DE CAFE.",
  "foto": "imagen/recetario/receta-23.jpg"
 },
 {
  "pagina": 24,
  "indice": "Sour De La Casa",
  "nombre": "SOUR DE LA CASA",
  "ingredientes": [
   "3 OZ PISCO ESPECIAL 35°",
   "1 ½ OZ ZUMO LIMÓN",
   "1 ½ OZ GOMA",
   "ALBÚMINA"
  ],
  "elaboracion": "COCTELERA",
  "cristaleria": "VASO CATEDRAL/KERO",
  "preparacion": "EN UNA COCTELERA CON ABUNDANTE HIELO CUBO AGREGAR TODOS LOS INGREDIENTES, BATIR ENÉRGICAMENTE Y LUEGO SERVIR EN VASO. DECORAR CON UN LIMÓN EN RODAJA Y TRES GOTAS DE ANGOSTURA",
  "foto": "imagen/recetario/receta-24.jpg"
 },
 {
  "pagina": 25,
  "indice": "Amaretto Sour",
  "nombre": "AMARETTO SOUR",
  "ingredientes": [
   "3 OZ AMARETTO",
   "1 ½ OZ ZUMO LIMÓN",
   "1 ½ OZ GOMA",
   "ALBÚMINA"
  ],
  "elaboracion": "COCTELERA",
  "cristaleria": "VASO CATEDRAL/KERO",
  "preparacion": "EN UNA COCTELERA CON ABUNDANTE HIELO CUBO AGREGAR TODOS LOS INGREDIENTES, BATIR ENÉRGICAMENTE Y LUEGO SERVIR EN VASO. DECORAR CON UN LIMÓN EN RODAJA.",
  "foto": "imagen/recetario/receta-25.jpg"
 },
 {
  "pagina": 26,
  "indice": "Whisky Sour",
  "nombre": "WHISKY SOUR",
  "ingredientes": [
   "3 OZ WHISKY",
   "1 ½ OZ ZUMO LIMÓN",
   "1 ½ OZ GOMA",
   "ALBÚMINA"
  ],
  "elaboracion": "COCTELERA",
  "cristaleria": "VASO CATEDRAL/KERO",
  "preparacion": "EN UNA COCTELERA CON ABUNDANTE HIELO CUBO AGREGAR TODOS LOS INGREDIENTES, BATIR ENÉRGICAMENTE Y LUEGO SERVIR EN VASO. DECORAR CON UN LIMÓN EN RODAJA.",
  "foto": "imagen/recetario/receta-26.jpg"
 },
 {
  "pagina": 27,
  "indice": "Sour Catedral",
  "nombre": "SOUR CATEDRAL",
  "ingredientes": [
   "6 OZ PISCO ESPECIAL",
   "2 OZ ZUMO LIMÓN",
   "2 OZ GOMA",
   "ALBÚMINA"
  ],
  "elaboracion": "COCTELERA",
  "cristaleria": "VASO CATEDRAL/KERO",
  "preparacion": "EN UNA COCTELERA CON ABUNDANTE HIELO CUBO AGREGAR TODOS LOS INGREDIENTES, BATIR ENÉRGICAMENTE Y LUEGO SERVIR EN VASO. DECORAR CON UN LIMÓN EN RODAJA.",
  "foto": "imagen/recetario/receta-27.jpg"
 },
 {
  "pagina": 28,
  "indice": "Ruso Blanco",
  "nombre": "RUSO BLANCO",
  "ingredientes": [
   "2 OZ VODKA",
   "1 ½ OZ LICOR DE CAFE",
   "1 ½ OZ GOMA",
   "2 OZ CREMA"
  ],
  "elaboracion": "COCTELERA",
  "cristaleria": "VASO CATEDRAL/COPA COCTEL",
  "preparacion": "EN UNA COCTELERA CON ABUNDANTE HIELO CUBO AGREGAR TODOS LOS INGREDIENTES (EXCEPTO EL LICOR DE CAFÉ), BATIR ENÉRGICAMENTE. EN EL VASO (O COPA) AGREGAR LICOR DE CAFÉ. LUEGO VERTER LA MEZCLA DE LA COCTELERA SOBRE EL LICOR DE CAFÉ CUIDANDO QUE SE VEAN SEPARADOS EN COLOR (AYUDARSE CON UNA CUCHARA PARA VERTER LA MEZCLA SIN QUE CAIGA DIRECTO). DECORAR CON GRANOS DE CAFÉ.",
  "foto": "imagen/recetario/receta-28.jpg"
 },
 {
  "pagina": 29,
  "indice": "Ruso Negro",
  "nombre": "RUSO NEGRO",
  "ingredientes": [
   "3 OZ VODKA",
   "2 OZ LICOR DE CAFE"
  ],
  "elaboracion": "DIRECTO AL VASO",
  "cristaleria": "VASO OLD FASHION (WHISKY)",
  "preparacion": "AGREGAR EN EL VASO TRES HIELOS, REVOLVER Y BOTAR EXCESO DE AGUA. AGREGAR LOS INGREDIENTES, DECORAR CON RODAJA DE NARANJA Y SERVIR.",
  "foto": "imagen/recetario/receta-29.jpg"
 },
 {
  "pagina": 30,
  "indice": "Old Fashioned",
  "nombre": "OLD FASHIONED",
  "ingredientes": [
   "8 GOLPES DE ANGOSTURA",
   "15 GRAMOS AZÚCAR MORENA",
   "3 OZ WHISKY BOURBON (O RYE)",
   "½ OZ SODA",
   "PIEL DE NARANJA"
  ],
  "elaboracion": "DIRECTO AL VASO",
  "cristaleria": "VASO OLD FASHION (WHISKERO)",
  "preparacion": "EN UN VASO OLD FASHION AGREGAR EL AZÚCAR, ANGOSTURA Y BOURBON. REVOLVER ENÉRGICAMENTE HASTA DISOLVER EL AZÚCAR EN UN 50%. LUEGO AGREGAR SODA Y PIEL DE NARANJA.",
  "foto": "imagen/recetario/receta-30.jpg"
 },
 {
  "pagina": 31,
  "indice": "Cosmopolitan",
  "nombre": "COSMOPOLITAN",
  "ingredientes": [
   "2 OZ VODKA",
   "1 OZ ZUMO LIMÓN",
   "1 OZ GOMA",
   "1 OZ TRIPLE SEC",
   "1 OZ ARÁNDANO"
  ],
  "elaboracion": "COCTELERA",
  "cristaleria": "COPA COCTEL",
  "preparacion": "EN UNA COCTELERA CON ABUNDANTE HIELO CUBO AGREGAR TODOS LOS INGREDIENTES, BATIR ENÉRGICAMENTE Y LUEGO SERVIR EN COPA CON COLADOR. DECORAR CON UN LIMÓN Y ARÁNDANO.",
  "foto": "imagen/recetario/receta-31.jpg"
 },
 {
  "pagina": 32,
  "indice": "Tom Collins",
  "nombre": "TOM COLLINS",
  "ingredientes": [
   "3 OZ GINEBRA",
   "1 ½ OZ ZUMO LIMÓN",
   "1 ½ OZ GOMA",
   "1 ½ OZ SODA"
  ],
  "elaboracion": "DIRECTO AL VASO",
  "cristaleria": "VASO HIGHBALL O COLLINS",
  "preparacion": "EN UN VASO COLLINS AGREGAR ZUMO DE LIMÓN, GOMA Y GIN. REVOLVER Y LUEGO CORONAR CON SODA Y DECORAR CON RODAJA DE LIMÓN O MARRASQUINO ROJO.",
  "foto": "imagen/recetario/receta-32.jpg"
 },
 {
  "pagina": 33,
  "indice": "Bloody Mary",
  "nombre": "BLOODY MARY",
  "ingredientes": [
   "2 OZ ML VODKA",
   "4 OZ JUGO DE TOMATE",
   "5 GOLPES DE PIMIENTA",
   "1 ½ OZ ZUMO DE LIMÓN",
   "SAL",
   "5 GOLPES DE TABASCO",
   "3 GOLPES DE SALSA INGLESA",
   "MERKEN"
  ],
  "elaboracion": "COCTELERA",
  "cristaleria": "VASO ALTO",
  "preparacion": "ENLLANTAR UN VASO CON SAL Y MERKÉN. LUEGO EN UNA COCTELERA CON ABUNDANTE HIELO AGREGAR EL RESTO DE INGREDIENTES Y BATIR ENÉRGICAMENTE. LUEGO VERTER LA MEZCLA EN EL VASO ENLLANTADO, AGREGAR HIELO Y DECORAR CON TOCINO Y CAMARÓN.",
  "foto": "imagen/recetario/receta-33.jpg"
 },
 {
  "pagina": 34,
  "indice": "Virgin Mary",
  "nombre": "VIRGIN MARY",
  "ingredientes": [
   "4 OZ JUGO DE TOMATE",
   "1 ½ OZ ZUMO LIMÓN",
   "SAL",
   "5 GOLPES DE PIMIENTA",
   "5 GOLPES DE TABASCO",
   "MERKEN",
   "3 GOLPES DE SALSA INGLESA"
  ],
  "elaboracion": "COCTELERA",
  "cristaleria": "VASO ALTO",
  "preparacion": "ENLLANTAR UN VASO CON SAL Y MERKÉN. LUEGO EN UNA COCTELERA CON ABUNDANTE HIELO AGREGAR EL RESTO DE INGREDIENTES Y BATIR ENÉRGICAMENTE. LUEGO VERTER LA MEZCLA EN EL VASO ENLLANTADO, AGREGAR HIELO Y DECORAR CON TOCINO Y CAMARÓN.",
  "foto": "imagen/recetario/receta-34.jpg"
 },
 {
  "pagina": 35,
  "indice": "Laguna Azul",
  "nombre": "LAGUNA AZUL",
  "ingredientes": [
   "2 OZ VODKA",
   "1 OZ CURACAO BLUE",
   "1 OZ ZUMO LIMÓN",
   "1 OZ GOMA",
   "1 OZ SODA"
  ],
  "elaboracion": "DIRECTO AL VASO",
  "cristaleria": "VASO COLLINS",
  "preparacion": "EN UN VASO COLLINS AGREGAR TRES HIELOS, GOMA, ZUMO, CURAZAO Y VODKA. REVOLVER Y LUEGO CORONAR CON SODA Y UNA RODAJA DE LIMÓN.",
  "foto": "imagen/recetario/receta-35.jpg"
 },
 {
  "pagina": 36,
  "indice": "Gin Fizz",
  "nombre": "GIN FIZZ",
  "ingredientes": [
   "3 OZ GIN",
   "1 ½ OZ ZUMO LIMÓN",
   "1 ½ OZ GOMA",
   "1 ½ OZ SODA",
   "ALBÚMINA"
  ],
  "elaboracion": "COCTELERA",
  "cristaleria": "VASO COLLINS/COPA DE VINO.",
  "preparacion": "EN UNA COCTELERA CON HIELO AGREGAR TODOS LOS INGREDIENTES (EXCEPTO LA SODA) Y BATIR ENÉRGICAMENTE. LUEGO SERVIR EN VASO, CORONAR CON SODA Y DECORAR CON UNA RODAJA DE LIMÓN",
  "foto": "imagen/recetario/receta-36.jpg"
 },
 {
  "pagina": 37,
  "indice": "Bitter Batido",
  "nombre": "BITTER BATIDO",
  "ingredientes": [
   "3 OZ BITTER ARAUCANO",
   "1 ½ OZ LICOR DE CACAO"
  ],
  "elaboracion": "EN COCTELERA",
  "cristaleria": "VASO OLD FASHION",
  "preparacion": "EN UNA COCTELERA CON HIELO AGREGAR LOS INGREDIENTES Y BATIR ENÉRGICAMENTE. SERVIR EN VASO CON DOS HIELOS Y DECORAR CON RODAJA DE NARANJA",
  "foto": "imagen/recetario/receta-37.jpg"
 },
 {
  "pagina": 38,
  "indice": "Negroni",
  "nombre": "NEGRONI",
  "ingredientes": [
   "1 ½ OZ GIN",
   "1 ½ OZ VERMOUTH ROSSO",
   "1 ½ OZ CAMPARI"
  ],
  "elaboracion": "VASO MEZCLADOR",
  "cristaleria": "OLD FASHION (WHISKERO)",
  "preparacion": "EN UN VASO MEZCLADOR AGREGAR LOS INGREDIENTES, REVOLVER Y LUEGO SERVIR UN VASO HELADO CON DOS HIELOS Y UNA PIEL DE NARANJA.",
  "foto": "imagen/recetario/receta-38.jpg"
 },
 {
  "pagina": 39,
  "indice": "Clavo Oxidado",
  "nombre": "CLAVO OXIDADO",
  "ingredientes": [
   "2 OZ WHISKY",
   "2 OZ DRAMBUIE"
  ],
  "elaboracion": "DIRECTO AL VASO",
  "cristaleria": "VASO OLD FASHION/WHISKERO",
  "preparacion": "EN UN VASO OLD FASHION CON DOS O TRES HIELO, AGREGAR LOS INGREDIENTES, REVOLVER HASTA LOGRAR UNA TEMPERATURA ACORDE AL COCTEL (FRIO). DECORAR CON PIEL DE NARANJA",
  "foto": "imagen/recetario/receta-39.jpg"
 },
 {
  "pagina": 40,
  "indice": "Padrino",
  "nombre": "PADRINO",
  "ingredientes": [
   "2 OZ WHISKY",
   "2 OZ AMARETTO"
  ],
  "elaboracion": "DIRECTO AL VASO",
  "cristaleria": "VASO OLD FASHION/WHISKERO",
  "preparacion": "EN UN VASO OLD FASHION CON DOS O TRES HIELO, AGREGAR LOS INGREDIENTES, REVOLVER HASTA LOGRAR UNA TEMPERATURA ACORDE AL COCTEL (FRIO). DECORAR CON PIEL DE NARANJA",
  "foto": "imagen/recetario/receta-40.jpg"
 },
 {
  "pagina": 41,
  "indice": "Tequila Sunrise",
  "nombre": "TEQUILA SUNRISE",
  "ingredientes": [
   "2 OZ TEQUILA",
   "3 OZ ZUMO NARANJA",
   "1 OZ GRANADINA"
  ],
  "elaboracion": "DIRECTO AL VASO",
  "cristaleria": "VASO COLLINS",
  "preparacion": "EN UN VASO COLLINS CON DOS O TRES HIELO, AGREGAR LOS INGREDIENTES ESCALONADOS (GRANADINA, NARANJA, TEQUILA) PARA QUE SE VEAN LOS INGREDIENTES SEPARADO DE OTRO. DECORAR CON RODAJA DE NARANJA",
  "foto": "imagen/recetario/receta-41.jpg"
 },
 {
  "pagina": 42,
  "indice": "Long Island Ice Tea",
  "nombre": "LONG ISLAND ICE TEA",
  "ingredientes": [
   "¾ OZ GIN",
   "¾ OZ VODKA",
   "¾ OZ TEQUILA",
   "¾ OZ RON BLANCO",
   "¾ OZ TRIPLE SEC",
   "1 ½ OZ ZUMO LIMÓN",
   "1 ½ OZ GOMA",
   "COCA COLA"
  ],
  "elaboracion": "DIRECTO AL VASO",
  "cristaleria": "VASO HIGHBALL O COLLINS.",
  "preparacion": "EN UN VASO CON HIELO A TOPE AGREGAR LOS INGREDIENTES (EXCEPTO LA COCA COLA), REVOLVER HASTA LOGRAR UNA TEMPERATURA ACORDE AL COCTEL (FRIO). CORONAR CON COCA COLA Y DECORAR CON UNA RODAJA DE LIMÓN.",
  "foto": "imagen/recetario/receta-42.jpg"
 },
 {
  "pagina": 43,
  "indice": "Tequila Blue",
  "nombre": "TEQUILA BLUE",
  "ingredientes": [
   "3 OZ TEQUILA",
   "1 ½ OZ CURACAO BLUE",
   "1 ½ OZ ZUMO LIMÓN",
   "1 ½ OZ GOMA",
   "SAL"
  ],
  "elaboracion": "EN COCTELERA",
  "cristaleria": "COPA MARGARITA O VASO OLD FASHION",
  "preparacion": "ENLLANTAR CON SAL LA COPA O VASO, EN LA COCTELERA AGREGAR ABUNDANTE HIELO Y TODOS LOS INGREDIENTES, AGITAR, SERVIR Y DECORAR CON UNA RODAJA DE LIMÓN.",
  "foto": "imagen/recetario/receta-43.jpg"
 },
 {
  "pagina": 44,
  "indice": "Piña Colada",
  "nombre": "PIÑA COLADA",
  "ingredientes": [
   "3 OZ RON DE COCO",
   "3 OZ CREMA",
   "3 OZ PIÑA",
   "1 ½ OZ GOMA"
  ],
  "elaboracion": "EN COCTELERA",
  "cristaleria": "COPÓN",
  "preparacion": "EN UNA COCTELERA CON HIELO AGREGAR TODOS LOS INGREDIENTES, BATIR ENÉRGICAMENTE Y LUEGO SERVIR EN LA COPA. DECORAR CON RODAJA DE PIÑA",
  "foto": "imagen/recetario/receta-44.jpg"
 },
 {
  "pagina": 45,
  "indice": "Jerez Sour",
  "nombre": "JEREZ SOUR",
  "ingredientes": [
   "3 OZ JEREZ",
   "1 ½ OZ ZUMO DE LIMÓN",
   "1 ½ OZ GOMA",
   "ALBÚMINA"
  ],
  "elaboracion": "COCTELERA",
  "cristaleria": "VASO CATEDRAL/KERO",
  "preparacion": "EN UNA COCTELERA CON ABUNDANTE HIELO CUBO AGREGAR TODOS LOS INGREDIENTES, BATIR ENÉRGICAMENTE Y LUEGO SERVIR EN VASO. DECORAR CON UN LIMÓN EN RODAJA Y GOTAS DE ANGOSTURA.",
  "foto": "imagen/recetario/receta-45.jpg"
 },
 {
  "pagina": 46,
  "indice": "Chardonnay Sour",
  "nombre": "CHARDONNAY SOUR",
  "ingredientes": [
   "3 OZ CHARDONNAY",
   "1 ½ OZ ZUMO DE LIMÓN",
   "1 ½ OZ GOMA",
   "ALBÚMINA"
  ],
  "elaboracion": "COCTELERA",
  "cristaleria": "VASO CATEDRAL/KERO",
  "preparacion": "EN UNA COCTELERA CON ABUNDANTE HIELO CUBO AGREGAR TODOS LOS INGREDIENTES, BATIR ENÉRGICAMENTE Y LUEGO SERVIR EN VASO. DECORAR CON UN LIMÓN EN RODAJA Y GOTAS DE ANGOSTURA.",
  "foto": "imagen/recetario/receta-46.jpg"
 },
 {
  "pagina": 47,
  "indice": "Manhattan",
  "nombre": "MANHATTAN",
  "ingredientes": [
   "3 OZ BOURBON",
   "1 ½ OZ VERMOUTH ROSSO",
   "6 GOTAS DE ANGOSTURA"
  ],
  "elaboracion": "VASO MEZCLADOR",
  "cristaleria": "COPA COCTEL",
  "preparacion": "EN UN VASO MEZCLADOR CON ABUNDANTE HIELO AGREGAR LOS INGREDIENTES Y REVOLVER ENÉRGICAMENTE. LUEGO VERTER EN LA COPA, DECORAR CON PIEL DE NARANJA UNA CEREZA DE MARRASQUINO.",
  "foto": "imagen/recetario/receta-47.jpg"
 },
 {
  "pagina": 48,
  "indice": "Fuego Austral",
  "nombre": "FUEGO AUSTRAL",
  "ingredientes": [
   "3 OZ GIN",
   "2 OZ ZUMO POMELO",
   "2 OZ ZUMO LIMÓN",
   "1 OZ JUGO ZANAHORIA",
   "1 OZ JUGO MARACUYÁ",
   "PIMIENTA NEGRA",
   "SAL",
   "MERKEN"
  ],
  "elaboracion": "COCTELERA",
  "cristaleria": "COPÓN",
  "preparacion": "EN UNA COCTELERA CON HIELO CUBO AGREGAR GIN, POMELO, LIMÓN, ZANAHORIA, MARACUYÁ Y PIMIENTA. BATIR ENÉRGICAMENTE Y VERTER EN UN COPÓN ENLLANTADO CON SAL Y MERKÉN. DECORAR CON RODAJA DE LIMÓN.",
  "foto": null
 },
 {
  "pagina": 49,
  "indice": "Tinto Botánico",
  "nombre": "TINTO BOTÁNICO",
  "ingredientes": [
   "3 OZ GIN",
   "1 OZ VINO CARMENERE",
   "2 OZ SIROPE BETARRAGA",
   "2 OZ ZUMO NARANJA",
   "2 OZ JUGO ZANAHORIA",
   "PIMIENTA MIX",
   "TOCINO"
  ],
  "elaboracion": "COCTELERA",
  "cristaleria": "COPÓN",
  "preparacion": "EN UNA COCTELERA CON HIELO AGREGAR GIN, SIROPE, VINO, NARANJA, ZANAHORIA Y PIMIENTA. BATIR ENÉRGICAMENTE Y SERVIR EN COPA CON HIELO. DECORAR CON UN TOCINO.",
  "foto": null
 },
 {
  "pagina": 50,
  "indice": "Apple Schock",
  "nombre": "APPLE SCHOCK",
  "ingredientes": [
   "2 OZ JACK DANIEL'S APPLE",
   "1 ½ OZ ZUMO LIMON",
   "1 ½ OZ ZUMO NARANJA",
   "RED BULL MARACUYÁ"
  ],
  "elaboracion": "COCTELERA",
  "cristaleria": "COPÓN",
  "preparacion": "EN UNA COCTELERA CON HIELO AGREGAR WHISKY, LIMÓN Y NARANJA. BATIR ENÉRGICAMENTE SOBRE LA COPA, CORONAR CON RED BULL. DECORAR CON PIMIENTA NEGRA MOLIDA Y RODAJAS DE LIMÓN.",
  "foto": null
 },
 {
  "pagina": 51,
  "indice": "Negroni Carmenere",
  "nombre": "NEGRONI CARMENERE",
  "ingredientes": [
   "1 ½ OZ VINO CARMENERE",
   "1 ½ OZ CAMPARI",
   "1 ½ OZ VERMOUTH ROSSO"
  ],
  "elaboracion": "VASO MEZCLADOR",
  "cristaleria": "OLD FASHION (WHISKERO)",
  "preparacion": "EN UN VASO MEZCLADOR AGREGAR LOS INGREDIENTES, REVOLVER Y LUEGO SERVIR UN VASO HELADO CON DOS HIELOS Y UNA PIEL DE NARANJA.",
  "foto": "imagen/recetario/receta-51.jpg"
 }
];

const RECETARIO_TOTAL_PAGINAS = 51;

let recetarioListo = false;


function dividirCantidad(texto) {

    const m = texto.match(
        /^([\d½¼¾.,\/ ]+(?:OZ|GRAMOS|GOLPES|ML|CL|GR|CUCHARADAS?|UNIDADES?|HOJAS?)?(?:\s+DE)?)\s+(.+)$/i
    );

    return m
        ? { cantidad: m[1].trim(), resto: m[2] }
        : { cantidad: "", resto: texto };
}


function crearEl(tag, clase, texto) {

    const el = document.createElement(tag);

    if (clase) el.className = clase;

    if (texto !== undefined) el.textContent = texto;

    return el;
}


function crearCabeceraLibro(subtitulo) {

    const cab = crearEl("div", "libro-cabecera");

    const logo = document.createElement("img");

    logo.src = "imagen/BaristaLogo.png";

    logo.alt = "El Barista Caffè";

    logo.className = "libro-logo";

    cab.appendChild(logo);

    cab.appendChild(crearEl("p", "libro-sobretitulo", subtitulo));

    return cab;
}


function crearPortada() {

    const pag = crearEl("article", "libro-pagina libro-portada");

    pag.dataset.pagina = "1";

    const logo = document.createElement("img");

    logo.src = "imagen/BaristaLogo.png";

    logo.alt = "El Barista Caffè";

    logo.className = "libro-portada-logo";

    pag.appendChild(logo);

    pag.appendChild(crearEl("p", "libro-sobretitulo", "EL BARISTA CAFFÈ"));

    pag.appendChild(crearEl("h3", "libro-portada-titulo", "RECETARIO"));

    pag.appendChild(crearEl("p", "libro-portada-sub", "Coctelería Barista"));

    pag.appendChild(crearEl("div", "libro-linea"));

    const empezar = crearEl("button", "libro-portada-btn", "Ver índice");

    empezar.type = "button";

    empezar.addEventListener("click", function() {

        irAPaginaRecetario(2);
    });

    pag.appendChild(empezar);

    pag.appendChild(
        crearEl(
            "p",
            "libro-ayuda",
            "Desliza hacia la derecha para pasar la página →"
        )
    );

    return pag;
}


function crearIndice() {

    const pag = crearEl("article", "libro-pagina libro-indice");

    pag.dataset.pagina = "2";

    pag.appendChild(crearCabeceraLibro("EL BARISTA CAFFÈ"));

    pag.appendChild(crearEl("h3", "libro-titulo", "Índice"));

    const lista = crearEl("div", "libro-indice-lista");

    RECETARIO.forEach(function(r) {

        const item = crearEl("button", "libro-indice-item");

        item.type = "button";

        item.appendChild(crearEl("span", "libro-indice-nombre", r.indice));

        item.appendChild(crearEl("span", "libro-indice-puntos"));

        item.appendChild(crearEl("span", "libro-indice-num", String(r.pagina)));

        item.addEventListener("click", function() {

            irAPaginaRecetario(r.pagina);
        });

        lista.appendChild(item);
    });

    pag.appendChild(lista);

    pag.appendChild(crearEl("span", "libro-folio", "2"));

    return pag;
}


function crearPaginaReceta(r) {

    const pag = crearEl("article", "libro-pagina libro-receta");

    pag.dataset.pagina = String(r.pagina);

    pag.appendChild(crearCabeceraLibro("RECETARIO BARISTA"));

    pag.appendChild(crearEl("h3", "libro-titulo", r.nombre));

    const cuerpo = crearEl("div", "libro-cuerpo" + (r.foto ? "" : " sin-foto"));

    if (r.foto) {

        const foto = document.createElement("img");

        foto.src = r.foto;

        foto.alt = r.indice;

        foto.loading = "lazy";

        foto.className = "libro-foto";

        cuerpo.appendChild(foto);
    }

    const ingredientes = crearEl("ul", "libro-ingredientes");

    r.ingredientes.forEach(function(texto) {

        const partes = dividirCantidad(texto);

        const li = document.createElement("li");

        if (partes.cantidad) {

            li.appendChild(crearEl("strong", "", partes.cantidad + " "));
        }

        li.appendChild(document.createTextNode(partes.resto));

        ingredientes.appendChild(li);
    });

    cuerpo.appendChild(ingredientes);

    pag.appendChild(cuerpo);

    const detalles = crearEl("div", "libro-detalles");

    [
        ["Elaboración", r.elaboracion],
        ["Cristalería", r.cristaleria],
        ["Preparación Barista", r.preparacion]
    ].forEach(function(par) {

        const bloque = crearEl("div", "libro-detalle");

        bloque.appendChild(crearEl("h4", "", par[0]));

        bloque.appendChild(crearEl("p", "", par[1]));

        detalles.appendChild(bloque);
    });

    pag.appendChild(detalles);

    pag.appendChild(crearEl("span", "libro-folio", String(r.pagina)));

    return pag;
}


function paginaActualRecetario() {

    const libro = document.getElementById("libro");

    const paginas = libro.querySelectorAll(".libro-pagina");

    const centro = libro.scrollLeft + libro.clientWidth / 2;

    let mejor = 1;

    let distMin = Infinity;

    paginas.forEach(function(p) {

        const d = Math.abs(p.offsetLeft + p.offsetWidth / 2 - centro);

        if (d < distMin) {

            distMin = d;

            mejor = Number(p.dataset.pagina);
        }
    });

    return mejor;
}


function irAPaginaRecetario(numero, instantaneo) {

    const libro = document.getElementById("libro");

    if (!libro) return;

    const num = Math.max(1, Math.min(RECETARIO_TOTAL_PAGINAS, numero));

    const pag = libro.querySelector('[data-pagina="' + num + '"]');

    if (!pag) return;

    libro.scrollTo({
        left: pag.offsetLeft - (libro.clientWidth - pag.offsetWidth) / 2,
        behavior: instantaneo ? "auto" : "smooth"
    });
}


function actualizarIndicadorRecetario() {

    const indicador = document.getElementById("libro-indicador");

    if (!indicador) return;

    indicador.textContent =
        paginaActualRecetario() + " / " + RECETARIO_TOTAL_PAGINAS;
}


// Reduce el tamaño del libro lo justo para que la página
// más alta quepa completa en la ventana, sin tener que bajar

function ajustarEscalaRecetario() {

    const libro = document.getElementById("libro");

    if (!libro || !libro.clientHeight) return;

    const paginas = libro.querySelectorAll(".libro-pagina");

    const estiloLibro = window.getComputedStyle(libro);

    const relleno =
        parseFloat(estiloLibro.paddingTop) +
        parseFloat(estiloLibro.paddingBottom);

    const disponible = libro.clientHeight - relleno;

    const alineacionOriginal = libro.style.alignItems;

    // Para medir la altura natural, las páginas no deben estirarse
    libro.style.alignItems = "flex-start";

    let escala = 1;

    for (let i = 0; i < 5; i++) {

        libro.style.setProperty("--escala", String(escala));

        let maxAlto = 0;

        paginas.forEach(function(p) {

            maxAlto = Math.max(maxAlto, p.offsetHeight);
        });

        if (!maxAlto) break;

        const nueva = Math.max(
            0.45,
            Math.min(1, escala * disponible / maxAlto)
        );

        if (Math.abs(nueva - escala) < 0.005) {

            escala = nueva;

            break;
        }

        escala = nueva;
    }

    // Un pequeño margen para que no quede justo al borde
    escala = Math.max(0.45, escala * 0.985);

    libro.style.setProperty("--escala", String(escala));

    libro.style.alignItems = alineacionOriginal;
}


let ultimaPaginaRecetario = 1;


function construirRecetario() {

    if (recetarioListo) return;

    const libro = document.getElementById("libro");

    if (!libro) return;

    libro.innerHTML = "";

    libro.appendChild(crearPortada());

    libro.appendChild(crearIndice());

    RECETARIO.forEach(function(r) {

        libro.appendChild(crearPaginaReceta(r));
    });

    libro.addEventListener("scroll", function() {

        window.requestAnimationFrame(actualizarIndicadorRecetario);
    });

    // Rueda del mouse: mover el libro hacia los lados
    libro.addEventListener("wheel", function(e) {

        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {

            e.preventDefault();

            libro.scrollLeft += e.deltaY;
        }
    }, { passive: false });

    const btnPrev = document.getElementById("libro-prev");

    const btnNext = document.getElementById("libro-next");

    const btnIndice = document.getElementById("libro-ir-indice");

    const btnCerrar = document.getElementById("libro-cerrar");

    const overlay = document.getElementById("recetario-overlay");

    if (btnPrev) {

        btnPrev.addEventListener("click", function() {

            irAPaginaRecetario(paginaActualRecetario() - 1);
        });
    }

    if (btnNext) {

        btnNext.addEventListener("click", function() {

            irAPaginaRecetario(paginaActualRecetario() + 1);
        });
    }

    if (btnIndice) {

        btnIndice.addEventListener("click", function() {

            irAPaginaRecetario(2);
        });
    }

    if (btnCerrar) {

        btnCerrar.addEventListener("click", cerrarRecetario);
    }

    // Tocar el fondo oscuro también cierra la ventana
    if (overlay) {

        overlay.addEventListener("click", function(e) {

            if (e.target === overlay) cerrarRecetario();
        });
    }

    document.addEventListener("keydown", function(e) {

        if (!recetarioAbierto()) return;

        if (e.key === "Escape") cerrarRecetario();

        if (e.key === "ArrowRight") {

            irAPaginaRecetario(paginaActualRecetario() + 1);
        }

        if (e.key === "ArrowLeft") {

            irAPaginaRecetario(paginaActualRecetario() - 1);
        }
    });

    let temporizador = null;

    window.addEventListener("resize", function() {

        if (!recetarioAbierto()) return;

        window.clearTimeout(temporizador);

        temporizador = window.setTimeout(function() {

            ajustarEscalaRecetario();

            irAPaginaRecetario(paginaActualRecetario(), true);

        }, 120);
    });

    recetarioListo = true;
}


function recetarioAbierto() {

    const overlay = document.getElementById("recetario-overlay");

    return !!overlay && overlay.classList.contains("abierto");
}


function abrirRecetario() {

    const overlay = document.getElementById("recetario-overlay");

    if (!overlay) return;

    construirRecetario();

    overlay.classList.add("abierto");

    document.body.classList.add("libro-abierto");

    // Primero se muestra la ventana; luego se mide y se ajusta el tamaño
    window.requestAnimationFrame(function() {

        ajustarEscalaRecetario();

        irAPaginaRecetario(ultimaPaginaRecetario, true);

        actualizarIndicadorRecetario();
    });
}


function cerrarRecetario() {

    const overlay = document.getElementById("recetario-overlay");

    if (!overlay) return;

    ultimaPaginaRecetario = paginaActualRecetario();

    overlay.classList.remove("abierto");

    document.body.classList.remove("libro-abierto");
}
