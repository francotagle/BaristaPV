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

const RECETARIO_ESTATICO = RECETARIO;

let RECETAS = [];

let RECETARIO_TOTAL_PAGINAS = 2;

function puedeEditarCarta() {

    return rolUsuario === "master" || rolUsuario === "admin";
}

function marcaCarta() {

    if (barActual() === "babilonia") {

        return {
            logo: "imagen/LogoBabilonia.png",
            alt: "Babilonia",
            nombre: "BABILONIA",
            cabecera: "RECETARIO BABILONIA",
            sub: "Coctelería Babilonia",
            filtro: "brightness(2.4) saturate(1.15)"
        };
    }

    return {
        logo: "imagen/BaristaLogo.png",
        alt: "El Barista Caffè",
        nombre: "EL BARISTA CAFFÈ",
        cabecera: "RECETARIO BARISTA",
        sub: "Coctelería Barista",
        filtro: ""
    };
}

// Carga las recetas del bar actual desde la base de datos.
// Si la tabla aún no existe, Barista usa las recetas que vienen en el archivo.
async function cargarRecetas() {

    let lista = [];

    try {

        const { data, error } = await supabaseClient
            .from("recetas")
            .select("*")
            .order("orden", { ascending: true })
            .order("id", { ascending: true });

        if (error) throw error;

        lista = data || [];

    } catch (err) {

        console.error("Error cargando recetas:", err);

        lista = barActual() === "barista"
            ? RECETARIO_ESTATICO.map(function(r, i) {
                return Object.assign({ id: null, orden: i + 1 }, r);
            })
            : [];
    }

    RECETAS = lista.map(function(r, i) {

        return {
            id: r.id,
            orden: r.orden,
            pagina: i + 3,
            nombre: r.nombre || "",
            indice: r.indice || r.nombre || "",
            descripcion: r.descripcion || "",
            ingredientes: Array.isArray(r.ingredientes) ? r.ingredientes : [],
            elaboracion: r.elaboracion || "",
            cristaleria: r.cristaleria || "",
            preparacion: r.preparacion || "",
            foto: r.foto || ""
        };
    });

    RECETARIO_TOTAL_PAGINAS = 2 + RECETAS.length;
}

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

    const marca = marcaCarta();

    logo.src = marca.logo;

    logo.alt = marca.alt;

    if (marca.filtro) logo.style.filter = marca.filtro;

    logo.className = "libro-logo";

    cab.appendChild(logo);

    cab.appendChild(crearEl("p", "libro-sobretitulo", subtitulo));

    return cab;
}


function crearPortada() {

    const pag = crearEl("article", "libro-pagina libro-portada");

    pag.dataset.pagina = "1";

    const logo = document.createElement("img");

    const marca = marcaCarta();

    logo.src = marca.logo;

    logo.alt = marca.alt;

    if (marca.filtro) logo.style.filter = marca.filtro;

    logo.className = "libro-portada-logo";

    pag.appendChild(logo);

    pag.appendChild(crearEl("p", "libro-sobretitulo", marca.nombre));

    pag.appendChild(crearEl("h3", "libro-portada-titulo", "RECETARIO"));

    pag.appendChild(crearEl("p", "libro-portada-sub", marca.sub));

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

    pag.appendChild(crearCabeceraLibro(marcaCarta().nombre));

    pag.appendChild(crearEl("h3", "libro-titulo", "Índice"));

    const lista = crearEl("div", "libro-indice-lista");

    if (RECETAS.length === 0) {

        lista.appendChild(
            crearEl(
                "p",
                "libro-vacio",
                puedeEditarCarta()
                    ? "Aún no hay productos en la carta. Usa «Editar carta» para agregar el primero."
                    : "Aún no hay productos en la carta."
            )
        );
    }

    RECETAS.forEach(function(r) {

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

    pag.appendChild(crearCabeceraLibro(marcaCarta().cabecera));

    pag.appendChild(crearEl("h3", "libro-titulo", r.nombre));

    if (r.descripcion) {

        pag.appendChild(crearEl("p", "libro-descripcion", r.descripcion));
    }

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

        if (!par[1]) return;

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


function renderLibro() {

    const libro = document.getElementById("libro");

    if (!libro) return;

    libro.innerHTML = "";

    libro.appendChild(crearPortada());

    libro.appendChild(crearIndice());

    RECETAS.forEach(function(r) {

        libro.appendChild(crearPaginaReceta(r));
    });

    const btnEditar = document.getElementById("libro-editar");

    if (btnEditar) btnEditar.hidden = !puedeEditarCarta();
}


function construirRecetario() {

    if (recetarioListo) return;

    const libro = document.getElementById("libro");

    if (!libro) return;

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


async function abrirRecetario() {

    const overlay = document.getElementById("recetario-overlay");

    if (!overlay) return;

    construirRecetario();

    overlay.classList.add("abierto");

    document.body.classList.add("libro-abierto");

    await cargarRecetas();

    renderLibro();

    // Primero se muestra la ventana; luego se mide y se ajusta el tamaño
    window.requestAnimationFrame(function() {

        ajustarEscalaRecetario();

        irAPaginaRecetario(
            Math.min(ultimaPaginaRecetario, RECETARIO_TOTAL_PAGINAS),
            true
        );

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



// ========================================
// EDITOR DE LA CARTA (solo master y admin)
// ========================================

let recetaEditando = null;

let fotoNuevaArchivo = null;

let fotoQuitada = false;


function elEd(id) {

    return document.getElementById(id);
}


function mostrarListaEditor() {

    elEd("carta-form").hidden = true;

    elEd("carta-lista-wrap").hidden = false;

    elEd("carta-nuevo").hidden = false;

    const cont = elEd("carta-lista");

    cont.innerHTML = "";

    if (RECETAS.length === 0) {

        cont.appendChild(
            crearEl("p", "libro-vacio", "La carta está vacía. Agrega el primer producto.")
        );
    }

    RECETAS.forEach(function(r, i) {

        const fila = crearEl("div", "carta-fila");

        if (r.foto) {

            const mini = document.createElement("img");

            mini.src = r.foto;

            mini.alt = "";

            mini.className = "carta-mini";

            fila.appendChild(mini);

        } else {

            fila.appendChild(crearEl("span", "carta-mini carta-mini-vacia", "Sin foto"));
        }

        fila.appendChild(crearEl("span", "carta-fila-nombre", r.nombre));

        const acciones = crearEl("div", "carta-fila-acciones");

        const subir = crearEl("button", "btn-secondary", "▲");

        subir.type = "button";

        subir.setAttribute("aria-label", "Subir");

        subir.disabled = i === 0;

        subir.addEventListener("click", function() { moverReceta(i, -1); });

        const bajar = crearEl("button", "btn-secondary", "▼");

        bajar.type = "button";

        bajar.setAttribute("aria-label", "Bajar");

        bajar.disabled = i === RECETAS.length - 1;

        bajar.addEventListener("click", function() { moverReceta(i, 1); });

        const editar = crearEl("button", "btn-secondary", "Editar");

        editar.type = "button";

        editar.addEventListener("click", function() { abrirFormularioReceta(r); });

        acciones.appendChild(subir);

        acciones.appendChild(bajar);

        acciones.appendChild(editar);

        fila.appendChild(acciones);

        cont.appendChild(fila);
    });
}


async function moverReceta(i, delta) {

    const a = RECETAS[i];

    const b = RECETAS[i + delta];

    if (!a || !b || a.id == null || b.id == null) return;

    // Se reasignan todas las posiciones para que nunca queden repetidas
    const nuevo = RECETAS.slice();

    nuevo[i] = b;

    nuevo[i + delta] = a;

    const cambios = [];

    nuevo.forEach(function(r, k) {

        if (r.orden !== k + 1) cambios.push({ id: r.id, orden: k + 1 });
    });

    for (const c of cambios) {

        const { error } = await supabaseClient
            .from("recetas")
            .update({ orden: c.orden })
            .eq("id", c.id);

        if (error) {

            alert("No se pudo cambiar el orden.");

            console.error(error);

            break;
        }
    }

    await refrescarCarta();
}


async function refrescarCarta() {

    await cargarRecetas();

    renderLibro();

    ajustarEscalaRecetario();

    mostrarListaEditor();
}


function abrirFormularioReceta(r) {

    recetaEditando = r || null;

    fotoNuevaArchivo = null;

    fotoQuitada = false;

    elEd("carta-lista-wrap").hidden = true;

    elEd("carta-nuevo").hidden = true;

    elEd("carta-form").hidden = false;

    elEd("carta-form-titulo").textContent = r ? "Editar producto" : "Nuevo producto";

    elEd("carta-nombre").value = r ? r.nombre : "";

    elEd("carta-indice").value = r && r.indice !== r.nombre ? r.indice : "";

    elEd("carta-descripcion").value = r ? r.descripcion : "";

    elEd("carta-ingredientes").value = r ? r.ingredientes.join("\n") : "";

    elEd("carta-elaboracion").value = r ? r.elaboracion : "";

    elEd("carta-cristaleria").value = r ? r.cristaleria : "";

    elEd("carta-preparacion").value = r ? r.preparacion : "";

    elEd("carta-foto").value = "";

    elEd("carta-mensaje").textContent = "";

    elEd("carta-eliminar").hidden = !r || r.id == null;

    pintarVistaFoto(r ? r.foto : "");
}


function pintarVistaFoto(url) {

    const vista = elEd("carta-foto-vista");

    vista.innerHTML = "";

    if (!url) {

        vista.appendChild(crearEl("span", "carta-mini carta-mini-vacia", "Sin foto"));

        elEd("carta-foto-quitar").hidden = true;

        return;
    }

    const img = document.createElement("img");

    img.src = url;

    img.alt = "Foto del producto";

    img.className = "carta-foto-grande";

    vista.appendChild(img);

    elEd("carta-foto-quitar").hidden = false;
}


// Reduce la foto (máx. 1100 px) para que suba rápido, incluso desde el teléfono
function reducirFoto(archivo) {

    return new Promise(function(resolver) {

        const lector = new FileReader();

        lector.onerror = function() { resolver(archivo); };

        lector.onload = function() {

            const img = new Image();

            img.onerror = function() { resolver(archivo); };

            img.onload = function() {

                const max = 1100;

                const k = Math.min(1, max / Math.max(img.width, img.height));

                const lienzo = document.createElement("canvas");

                lienzo.width = Math.round(img.width * k);

                lienzo.height = Math.round(img.height * k);

                lienzo.getContext("2d").drawImage(img, 0, 0, lienzo.width, lienzo.height);

                lienzo.toBlob(function(blob) {

                    resolver(blob || archivo);

                }, "image/jpeg", 0.85);
            };

            img.src = lector.result;
        };

        lector.readAsDataURL(archivo);
    });
}


async function guardarReceta(e) {

    e.preventDefault();

    const msg = elEd("carta-mensaje");

    const nombre = elEd("carta-nombre").value.trim();

    if (!nombre) {

        msg.textContent = "Escribe el nombre del producto.";

        return;
    }

    const boton = elEd("carta-guardar");

    boton.disabled = true;

    msg.textContent = "Guardando...";

    try {

        let foto = recetaEditando ? recetaEditando.foto : "";

        if (fotoQuitada) foto = "";

        if (fotoNuevaArchivo) {

            const blob = await reducirFoto(fotoNuevaArchivo);

            const ruta = barActual() + "/" + Date.now() + ".jpg";

            const { error: errSubida } = await supabaseClient
                .storage
                .from("recetas")
                .upload(ruta, blob, { contentType: "image/jpeg", upsert: true });

            if (errSubida) throw errSubida;

            foto = supabaseClient
                .storage
                .from("recetas")
                .getPublicUrl(ruta).data.publicUrl;
        }

        const datos = {
            nombre: nombre,
            indice: elEd("carta-indice").value.trim() || nombre,
            descripcion: elEd("carta-descripcion").value.trim(),
            ingredientes: elEd("carta-ingredientes").value
                .split("\n")
                .map(function(t) { return t.trim(); })
                .filter(Boolean),
            elaboracion: elEd("carta-elaboracion").value.trim(),
            cristaleria: elEd("carta-cristaleria").value.trim(),
            preparacion: elEd("carta-preparacion").value.trim(),
            foto: foto || null
        };

        let error;

        if (recetaEditando && recetaEditando.id != null) {

            ({ error } = await supabaseClient
                .from("recetas")
                .update(datos)
                .eq("id", recetaEditando.id));

        } else {

            datos.orden = RECETAS.reduce(function(m, r) {
                return Math.max(m, Number(r.orden) || 0);
            }, 0) + 1;

            ({ error } = await supabaseClient
                .from("recetas")
                .insert(datos));
        }

        if (error) throw error;

        await refrescarCarta();

    } catch (err) {

        console.error("Error guardando receta:", err);

        msg.textContent =
            "No se pudo guardar. ¿Ejecutaste el SQL nuevo en Supabase? (" +
            (err && err.message ? err.message : "error") + ")";

    } finally {

        boton.disabled = false;
    }
}


async function eliminarReceta() {

    if (!recetaEditando || recetaEditando.id == null) return;

    if (!confirm("¿Eliminar «" + recetaEditando.nombre + "» de la carta?")) return;

    const { error } = await supabaseClient
        .from("recetas")
        .delete()
        .eq("id", recetaEditando.id);

    if (error) {

        console.error(error);

        alert("No se pudo eliminar.");

        return;
    }

    await refrescarCarta();
}


function abrirEditorCarta() {

    elEd("carta-editor").hidden = false;

    mostrarListaEditor();
}


function cerrarEditorCarta() {

    elEd("carta-editor").hidden = true;

    // Vuelve al índice para ver los cambios
    irAPaginaRecetario(2, true);
}


document.addEventListener("DOMContentLoaded", function() {

    const editar = elEd("libro-editar");

    if (!editar) return;

    editar.addEventListener("click", abrirEditorCarta);

    elEd("carta-cerrar").addEventListener("click", cerrarEditorCarta);

    elEd("carta-nuevo").addEventListener("click", function() {
        abrirFormularioReceta(null);
    });

    elEd("carta-cancelar").addEventListener("click", mostrarListaEditor);

    elEd("carta-form").addEventListener("submit", guardarReceta);

    elEd("carta-eliminar").addEventListener("click", eliminarReceta);

    elEd("carta-foto").addEventListener("change", function(e) {

        const f = e.target.files && e.target.files[0];

        if (!f) return;

        fotoNuevaArchivo = f;

        fotoQuitada = false;

        pintarVistaFoto(URL.createObjectURL(f));
    });

    elEd("carta-foto-quitar").addEventListener("click", function() {

        fotoNuevaArchivo = null;

        fotoQuitada = true;

        elEd("carta-foto").value = "";

        pintarVistaFoto("");
    });
});
