import DataFactory from 'rdf-ext'

let rdf = DataFactory

const BASE_URL = 'http://uned.es/example#'

export default {
  BASE_URL,
  getSubjectListByPredicateAndObject ({dataset, predicate, object}) {
    return new Promise((resolve, reject) => {
      let subjects = []

      let quadStream = dataset.toStream()

      quadStream.on('data', (quad) => {
        if ((quad.object.equals(rdf.namedNode(object))) && (quad.predicate.equals(rdf.namedNode(predicate)))) {
          subjects.push({text: quad.subject.value.split('#')[1], value: quad.subject.value})
        }
      }).on('end', () => {
        resolve(subjects)
      })
    })
  },
  getSubjectListByPredicate({dataset, predicate}) {
    return new Promise((resolve, reject) => {
      let subjects = []

      let quadStream = dataset.toStream()

      quadStream.on('data', (quad) => {
        if (quad.predicate.equals(rdf.namedNode(predicate))) {
          subjects.push({text: quad.subject.value.split('#')[1], value: quad.subject.value})
        }
      }).on('end', () => {
        resolve(subjects)
      })
    })
  },
  async getObjectListByPredicateAndSubject ({dataset, predicate, subject}) {
    return new Promise((resolve, reject) => {
      let objects = []

      let quadStream = dataset.toStream()

      quadStream.on('data', (quad) => {
        if ((quad.subject.equals(rdf.namedNode(subject))) && (quad.predicate.equals(rdf.namedNode(predicate)))) {
          objects.push({text: quad.object.value.split('#')[1], value: quad.object.value})
        }
      })
        .on('end', () => {
          resolve(objects)
        })
    })
  }
}
