import RdfConstructs from '../utils/RdfConstructs'
// TODO convention: parameters must be of type string

const addResource = (context, {subject, predicate, object}) => {
  if (subject != null && predicate != null && object != null) {
    context.commit('ADD_QUAD_FROM_IRI', {
      subject: subject, // subject must be an IRI
      predicate: predicate,
      object: object
    })
  } else {
    throw new Error('Error: Ningún elemento de la terna debe ser nulo.')
  }
}

const removeResource = (context, resource) => {
  if (resource != null) {
    context.commit('REMOVE_RESOURCE_FROM_IRI', resource)
  } else {
    throw new Error('Error: No existe el recurso.')
  }
}

const editResource = (context, {oldResource, newResource}) => {
  if (oldResource != null && newResource != null) {
    context.getters.getTriplesMatchingSubject(oldResource).forEach((triple) => {
      context.dispatch('removeQuad', {subject: triple.subject.value, predicate: triple.predicate.value, object: triple.object.value})
      context.dispatch('addResource', {subject: newResource, predicate: triple.predicate.value, object: triple.object.value})
    })
    context.getters.getTriplesMatchingObject(oldResource).forEach((triple) => {
      context.dispatch('removeQuad', {subject: triple.subject.value, predicate: triple.predicate.value, object: triple.object.value})
      context.dispatch('addResource', {subject: triple.subject.value, predicate: triple.predicate.value, object: newResource})
    })
  } else {
    throw new Error('Error: Los recursos no deben ser nulos.')
  }
}

const removeQuad = (context, {subject, predicate, object}) => {
  if (subject != null && predicate != null && object != null) {
    context.commit('REMOVE_QUAD_FROM_IRI', {
      subject: subject,
      predicate: predicate,
      object: object
    })
  } else {
    throw new Error('Error: Los elementos de la terna no deben ser nulos.')
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
  } else {
    throw new Error('Error: Los elementos de la terna no deben ser nulos.')
  }
}

const addClassLiteralProperty = (context, {subject, predicate, object}) => {
  if (subject != null && predicate != null && object != null) {
    context.commit('ADD_QUAD_WITH_OBJECT_LITERAL_FROM_IRI', {
      subject: subject,
      predicate: predicate,
      object: object
    })
  } else {
    throw new Error('Error: Los elementos de la terna no deben ser nulos.')
  }
}

const importN3 = (context, {content, store}) => {
  if (content != null) {
    context.commit('IMPORT_N3', {content, store})
  } else {
    throw new Error('Error: El contenido a importar no debe ser nulo.')
  }
}

const addN3 = (context, {content, store}) => {
  if (content != null) {
    context.commit('ADD_N3', {content, store})
  } else {
    throw new Error('Error: El contenido a añadir no debe ser nulo.')
  }
}

const delN3 = (context, {content, store}) => {
  if (content != null) {
    context.commit('DEL_N3', {content, store})
  } else {
    throw new Error('Error: El contenido a eliminar no debe ser nulo.')
  }
}

const setActivity = (context, content) => {
  if (content != null) {
    context.commit('SET_ACTIVITY', content)
  } else {
    throw new Error('Error: El contenido de la actividad no debe ser nulo.')
  }
}

const exportJsonLD = (context) => {
  context.commit('EXPORT_JSON_LD')
}

const exportTurtle = (context) => {
  context.commit('EXPORT_TURTLE')
}

const setVocabularyState = (context, {vocabulary, active}) => {
  context.commit('SET_VOCABULARY_STATE', {vocabulary, active})
}
export default {
  addResource,
  editResource,
  editClassLiteralProperty,
  removeQuad,
  removeResource,
  addClassLiteralProperty,
  importN3,
  addN3,
  delN3,
  setActivity,
  exportJsonLD,
  exportTurtle,
  setVocabularyState
}
