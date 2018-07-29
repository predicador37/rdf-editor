import DataFactory from 'rdf-ext'

let rdf = DataFactory

const n3store = state => state.n3store

const rdfConstructs = state => state.rdfConstructs

const baseUrl = state => state.baseUrl

const getSubjectListByPredicateAndObject = (state) => ({predicate, object}) => {
  return new Promise((resolve, reject) => {
    let subjects = state.n3store.getSubjects(predicate, object, null)
    resolve(subjects)
  })
}

const getSubjectListByPredicate = (state) => (predicate) => {
  return new Promise((resolve, reject) => {
    let subjects = state.n3store.getSubjects(predicate, null, null)
    resolve(subjects)
  })
}

const getObjectListByPredicateAndSubject = (state) => ({predicate, subject}) => {
  return new Promise((resolve, reject) => {
    let subjects = state.n3store.getObjects(subject, predicate, null)
    resolve(subjects)
  })
}

const getTriplesMatchingSubject = (state) => (subject) => {
  return state.n3store.getQuads(rdf.namedNode(subject), null, null, null)
}

const getTriplesMatchingObject = (state) => (object) => {
  return state.n3store.getQuads(null, null, rdf.namedNode(object), null)
}

export default {
  n3store,
  rdfConstructs,
  baseUrl,
  getSubjectListByPredicateAndObject,
  getSubjectListByPredicate,
  getObjectListByPredicateAndSubject,
  getTriplesMatchingSubject,
  getTriplesMatchingObject
}
