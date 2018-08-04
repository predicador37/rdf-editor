import RdfConstructs from '../utils/RdfConstructs'
// TODO convention: parameters must be of type string

const addClass = (context, className) => {
  if (className != null) {
    context.commit('ADD_QUAD_FROM_IRI', {
      subject: className,
      predicate: RdfConstructs.rdf_type.value,
      object: RdfConstructs.owl_Class.value
    })
  }
}

const addResource = (context, {subject, predicate, object}) => {
  if (subject != null && predicate != null && object != null) {
    context.commit('ADD_QUAD_FROM_IRI', {
      subject: subject, // subject must be an IRI
      predicate: predicate,
      object: object
    })
  }
}

const addQuad = (context, {subject, predicate, object}) => {
  if (subject != null && predicate != null && object != null) {
    context.commit('ADD_QUAD_FROM_IRI', {
      subject: subject, // subject must be an IRI
      predicate: predicate,
      object: object
    })
  }
}

const removeResource = (context, resource) => {
  if (resource != null) {
    context.commit('REMOVE_RESOURCE_FROM_IRI', resource)
  }
}

const editResource = (context, {oldResource, newResource}) => {
  if (oldResource != null && newResource != null) {
    context.getters.getTriplesMatchingSubject(oldResource).forEach((triple) => {
      context.dispatch('removeQuad', {subject: triple.subject.value, predicate: triple.predicate.value, object: triple.object.value})
      context.dispatch('addQuad', {subject: newResource, predicate: triple.predicate.value, object: triple.object.value})
    })

    context.getters.getTriplesMatchingObject(oldResource).forEach((triple) => {
      context.dispatch('removeQuad', {subject: triple.subject.value, predicate: triple.predicate.value, object: triple.object.value})
      context.dispatch('addQuad', {subject: triple.subject.value, predicate: triple.predicate.value, object: newResource})
    })
  }
}

const removeQuad = (context, {subject, predicate, object}) => {
  if (subject != null && predicate != null && object != null) {
    context.commit('REMOVE_QUAD_FROM_IRI', {
      subject: subject,
      predicate: predicate,
      object: object
    })
  }
}

const editClassLiteralProperty = (context, {subject, predicate, object, newObject}) => {
  if (subject != null && predicate != null && object != null) {
    context.commit('EDIT_QUAD_WITH_OBJECT_LITERAL_FROM_IRI', {
      subject: subject,
      predicate: predicate,
      object: object,
      newObject: newObject
    })
  }
}

const addClassLiteralProperty = (context, {subject, predicate, object}) => {
  if (subject != null && predicate != null && object != null) {
    context.commit('ADD_QUAD_WITH_OBJECT_LITERAL_FROM_IRI', {
      subject: subject,
      predicate: predicate,
      object: object
    })
  }
}

const importN3 = (context, {content, store}) => {
  console.log('STORE')
  console.log(store)
  context.commit('IMPORT_N3', {content, store})
}

const exportJsonLD = (context) => {
  context.commit('EXPORT_JSON_LD')
}

const exportTurtle = (context) => {
  context.commit('EXPORT_TURTLE')
}
export default {
  addClass,
  addResource,
  editResource,
  addQuad,
  editClassLiteralProperty,
  removeQuad,
  removeResource,
  addClassLiteralProperty,
  importN3,
  exportJsonLD,
  exportTurtle
}
