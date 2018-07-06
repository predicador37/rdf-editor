import RdfConstructs from '@/utils/RdfConstructs'

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
      let predicate = triple.predicate
      let object = triple.object
      context.dispatch('removeQuad', {subject: oldResource, predicate: predicate, object: object})
      context.dispatch('addQuad', {subject: newResource, predicate: predicate, object: object})
    })

    context.getters.getTriplesMatchingObject(oldResource).forEach((triple) => {
      let predicate = triple.predicate
      let subject = triple.subject
      context.dispatch('removeQuad', {subject: subject, predicate: predicate, object: oldResource})
      context.dispatch('addQuad', {subject: subject, predicate: predicate, object: newResource})
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

const addClassLiteralProperty = (context, {subject, predicate, object}) => {
  if (subject != null && predicate != null && object != null) {
    context.commit('ADD_QUAD_WITH_OBJECT_LITERAL_FROM_IRI', {
      subject: subject,
      predicate: predicate,
      object: object
    })
  }
}

const importN3 = (context, content) => {
  context.commit('IMPORT_N3', content)
}

const exportJsonLD = (context) => {
  context.commit('EXPORT_JSON_LD')
}

export default {
  addClass,
  addResource,
  editResource,
  addQuad,
  removeQuad,
  removeResource,
  addClassLiteralProperty,
  importN3,
  exportJsonLD
}
