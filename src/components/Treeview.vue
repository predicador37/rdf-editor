

<script>
  import Treeview from '@/components/Treeview'
  export default {
    name: 'v-treeview',
    inheritAttres: false,
    props: {
      captionField: {
        type: String,
        required: false,
        default: 'name'
      },
      childrenField: {
        type: String,
        required: false,
        default: 'children'
      },
      items: {
        type: Object,
        required: true,
        default: () => {}
      },
      value: {
        type: Array,
        required: false,
        default: null
      }
    },
    computed: {
      caption () {
        return this.items[this.captionField]
      }
    },
    data () {
      return {
      }
    },
    methods: {
      genChild (child) {
        return this.$createElement(Treeview, {
          class: 'ml-4',
          props: {
            captionField: this.captionField,
            childrenField: this.childrenField,
            items: child,
            value: this.value
          }
        })
      },
      genChildren () {
        let childElements = []
        if (this.items[this.childrenField]) {
          this.items[this.childrenField].forEach(child => {
            childElements.push(this.genChild(child))
          })
        }
        return childElements
      },
      genRoot () {
        return this.$createElement('label', {
          class: 'treeview-label'
        }, [this.caption])
      }
    },
    render (h) {
      return h('div', {}, [this.genRoot(), ...this.genChildren()])
    }
  }
</script>

<style scoped>

</style>
