import DataFactory from 'rdf-ext'

let rdf = DataFactory
const baseURL = 'http://uned.es/'

export default {
  getSubjectListByPredicateAndObject ({dataset, predicate, object}) {
    let subjects = []

    let quadStream = dataset.toStream()

    quadStream.on('data', (quad) => {
      if ((quad.object.equals(rdf.namedNode(object))) && (quad.predicate.equals(rdf.namedNode(predicate)))) {
        subjects.push({text: quad.subject.value.split(baseURL)[1], value: quad.subject.value})
      }
    })
    return subjects
  },
  getObjectListByPredicateAndSubject ({dataset, predicate, subject}) {
    let objects = []

    let quadStream = dataset.toStream()

    quadStream.on('data', (quad) => {
      if ((quad.subject.equals(rdf.namedNode(subject))) && (quad.predicate.equals(rdf.namedNode(predicate)))) {
        objects.push({text: quad.object.value.split(baseURL)[1], value: quad.object.value})
      }
    })
    return objects
  }
}
