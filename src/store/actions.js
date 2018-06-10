import RdfConstructs from '@/utils/RdfConstructs'
import consts from './consts'

let baseUrl = consts.baseUrl

const addClass = (context, className) => {
  if (className != null) {
    context.commit('ADD_QUAD_FROM_IRI', {
      subject: baseUrl + className,
      predicate: RdfConstructs.rdf_type.value,
      object: RdfConstructs.owl_Class.value
    })
  }
}

const addResource = (context, {subject, predicate, object}) => {
  if (subject != null && predicate != null && object != null) {
    context.commit('ADD_QUAD_FROM_IRI', {
      subject: baseUrl + subject,
      predicate: predicate,
      object: object
    })
  }
}

const addClassLiteralProperty = (context, {resourceName, property, literal}) => {
  if (resourceName != null) {
    context.commit('ADD_QUAD_WITH_OBJECT_LITERAL_FROM_IRI', {
      subject: baseUrl + resourceName,
      predicate: RdfConstructs[property].value,
      object: literal
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
  addClassLiteralProperty,
  importN3,
  exportJsonLD
}
