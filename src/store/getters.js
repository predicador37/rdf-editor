import DataFactory from 'rdf-ext'

let rdf = DataFactory

const n3store = state => state.n3store

const engine = state => state.engine

const rdfConstructs = state => state.rdfConstructs

const prefixes = state => state.prefixes

const baseUrl = state => state.baseUrl

const activity = state => state.activity

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

const getStoreQuads = (state) => (s, p, o, g) => {
  return state.n3store.getQuads(s, p, o, g)
}

export default {
  n3store,
  engine,
  rdfConstructs,
  prefixes,
  baseUrl,
  activity,
  getSubjectListByPredicateAndObject,
  getSubjectListByPredicate,
  getObjectListByPredicateAndSubject,
  getTriplesMatchingSubject,
  getTriplesMatchingObject,
  getStoreQuads
}
