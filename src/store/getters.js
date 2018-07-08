import DataFactory from 'rdf-ext'

let rdf = DataFactory

const dataset = state => state.dataset

const rdfConstructs = state => state.rdfConstructs

const baseUrl = state => state.baseUrl

const getSubjectListByPredicateAndObject = (state) => ({predicate, object}) => {
  return new Promise((resolve, reject) => {
    console.log('get subject list by predicate and object')
    console.log(predicate)
    console.log(object)
    let subjects = []

    let quadStream = state.dataset.toStream()

    quadStream.on('data', (quad) => {
      if ((quad.object.equals(rdf.namedNode(object))) && (quad.predicate.equals(rdf.namedNode(predicate)))) {
        subjects.push({text: quad.subject.value.split('#')[1], value: quad.subject.value})
      }
    }).on('end', () => {
      resolve(subjects)
    })
  })
}

const getSubjectListByPredicate = (state) => (predicate) => {
  return new Promise((resolve, reject) => {
    // TODO: code rejects
    let subjects = []

    let quadStream = state.dataset.toStream()

    quadStream.on('data', (quad) => {
      if (quad.predicate.equals(rdf.namedNode(predicate))) {
        subjects.push({text: quad.subject.value.split('#')[1], value: quad.subject.value})
      }
    }).on('end', () => {
      resolve(subjects)
    })
  })
}

const getObjectListByPredicateAndSubject = (state) => ({predicate, subject}) => {
  return new Promise((resolve, reject) => {
    let objects = []

    let quadStream = state.dataset.toStream()

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

const getTriplesMatchingSubject = (state) => (subject) => {
  return state.dataset.match(rdf.namedNode(subject))
}

const getTriplesMatchingObject = (state) => (object) => {
  return state.dataset.match(null, null, rdf.namedNode(object))
}

export default {
  dataset,
  rdfConstructs,
  baseUrl,
  getSubjectListByPredicateAndObject,
  getSubjectListByPredicate,
  getObjectListByPredicateAndSubject,
  getTriplesMatchingSubject,
  getTriplesMatchingObject
}
