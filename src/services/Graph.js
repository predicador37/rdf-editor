import DataFactory from 'rdf-ext'

let rdf = DataFactory

const BASE_URL = 'http://uned.es/'

export default {
  BASE_URL,
  getSubjectListByPredicateAndObject ({dataset, predicate, object}) {
    let subjects = []

    let quadStream = dataset.toStream()

    quadStream.on('data', (quad) => {
      if ((quad.object.equals(rdf.namedNode(object))) && (quad.predicate.equals(rdf.namedNode(predicate)))) {
        subjects.push({text: quad.subject.value.split(BASE_URL)[1], value: quad.subject.value})
      }
    })
    return subjects
  },
  getObjectListByPredicateAndSubject ({dataset, predicate, subject}) {
    return new Promise((resolve, reject) => {
      let objects = []

      let quadStream = dataset.toStream()

      quadStream.on('data', (quad) => {
        if ((quad.subject.equals(rdf.namedNode(subject))) && (quad.predicate.equals(rdf.namedNode(predicate)))) {
          objects.push({text: quad.object.value.split(BASE_URL)[1], value: quad.object.value})
        }
      })
        .on('end', () => {
          resolve(objects)
        })
    })
  }
}
