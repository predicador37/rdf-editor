PREFIX icane: <http://www.icane.es/opendata/vocab>
PREFIX dcterms: <http://purl.org/dc/terms/>

SELECT ?serie ?fechaAct WHERE { 
?serie a icane:TimeSeries; dcterms:modified ?fechaAct 
} ORDER BY DESC(?fechaAct) LIMIT 10


PREFIX wikibase: <http://wikiba.se/ontology#>
PREFIX bd: <http://www.bigdata.com/rdf#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

SELECT ?prop ?propLabel WHERE { ?prop rdf:type wikibase:Property . SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }}

PREFIX wd: <http://www.wikidata.org/entity/> PREFIX wds: <http://www.wikidata.org/entity/statement/> PREFIX wdv: <http://www.wikidata.org/value/> PREFIX wdt: <http://www.wikidata.org/prop/direct/> PREFIX wikibase: <http://wikiba.se/ontology#> PREFIX p: <http://www.wikidata.org/prop/> PREFIX ps: <http://www.wikidata.org/prop/statement/> PREFIX pq: <http://www.wikidata.org/prop/qualifier/> PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> PREFIX bd: <http://www.bigdata.com/rdf#> SELECT ?pres ?presLabel ?spouse ?spouseLabel WHERE {?pres wdt:P31 wd:Q5 . ?pres wdt:P39 wd:Q11696 . ?pres wdt:P26 ?spouse . SERVICE wikibase:label { bd:serviceParam wikibase:language "en" . }}



PREFIX wd: <http://www.wikidata.org/entity/>
PREFIX wds: <http://www.wikidata.org/entity/statement/>
PREFIX wdv: <http://www.wikidata.org/value/>
PREFIX wdt: <http://www.wikidata.org/prop/direct/>
PREFIX wikibase: <http://wikiba.se/ontology#>
PREFIX p: <http://www.wikidata.org/prop/>
PREFIX ps: <http://www.wikidata.org/prop/statement/>
PREFIX pq: <http://www.wikidata.org/prop/qualifier/>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX bd: <http://www.bigdata.com/rdf#>

SELECT ?property ?count
WHERE {
  SELECT ?property (COUNT(?item) AS ?count)
  WHERE {
    ?item ?statement wd:Q3324507 . 
    ?property wikibase:statementProperty ?statement . 
  } GROUP BY ?property
} ORDER BY DESC(?count)




https://query.wikidata.org/sparql

PREFIX wd: <http://www.wikidata.org/entity/>
PREFIX wds: <http://www.wikidata.org/entity/statement/>
PREFIX wdv: <http://www.wikidata.org/value/>
PREFIX wdt: <http://www.wikidata.org/prop/direct/>
PREFIX wikibase: <http://wikiba.se/ontology#>
PREFIX p: <http://www.wikidata.org/prop/>
PREFIX ps: <http://www.wikidata.org/prop/statement/>
PREFIX pq: <http://www.wikidata.org/prop/qualifier/>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX bd: <http://www.bigdata.com/rdf#>

SELECT ?pres ?presLabel ?spouse ?spouseLabel WHERE {?pres wdt:P31 wd:Q5 . ?pres wdt:P39 wd:Q11696 . ?pres wdt:P26 ?spouse } LIMIT 100




SELECT ?p ?pLabel ?w ?wLabel WHERE {wd:Q30 p:P6/ps:P6 ?p . ?p wdt:P26 ?w . SERVICE wikibase:label {bd:serviceParam wikibase:language "en" . }}


PREFIX wd: <http://www.wikidata.org/entity/>
PREFIX wds: <http://www.wikidata.org/entity/statement/>
PREFIX wdv: <http://www.wikidata.org/value/>
PREFIX wdt: <http://www.wikidata.org/prop/direct/>
PREFIX wikibase: <http://wikiba.se/ontology#>
PREFIX p: <http://www.wikidata.org/prop/>
PREFIX ps: <http://www.wikidata.org/prop/statement/>
PREFIX pq: <http://www.wikidata.org/prop/qualifier/>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX bd: <http://www.bigdata.com/rdf#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

SELECT ?field ?fieldLabel ?propertyLabel
WHERE {
      VALUES (?predicate) {(wdt:P31) (wdt:P279)}
      wd:Q395 ?predicate ?field .
      ?property wikibase:directClaim ?predicate .
      SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
}

