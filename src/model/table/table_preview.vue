<template>
  <div>
    <table class="table" :class="item.data.isometry ? 'isometry' : ''">
      <thead>
        <template v-for="(row, index) in tableHeader(item.children)">
          <tr :key="`tr${index}`">
            <template v-for="(column, index) in row">
              <template v-if="column.options.visible">
                <td
                  :key="`column${index}`"
                  :class="tableCellClass(item)"
                  :colspan="column.options.colspan"
                  :rowspan="column.options.rowspan"
                  :style="[
                    { height: `${column.options.height}px` },
                    { width: `${column.options.width}px` },
                  ]"
                >
                  <template v-if="column.options.type === 'normal'">
                    <div v-for="item in column.list" :key="item.id">
                      <preview :item="item"></preview>
                    </div>
                  </template>
                  <template v-else>
                    <div class="specilTd">{{ column.options.label }}</div>
                  </template>
                </td>
              </template>
            </template>
          </tr>
        </template>
      </thead>
      <tbody>
        <template v-for="(row, index) in tableBody(item.children)">
          <tr :key="`tr${index}`">
            <template v-for="(column, index) in row">
              <template v-if="column.options.visible">
                <td
                  :key="`column${index}`"
                  :class="tableCellClass(item)"
                  :colspan="column.options.colspan"
                  :rowspan="column.options.rowspan"
                  :style="[
                    { height: `${column.options.height}px` },
                    { width: `${column.options.width}px` },
                  ]"
                >
                  <template v-if="column.options.type === 'normal'">
                    <div v-for="item in column.list" :key="item.id">
                      <preview :item="item"></preview>
                    </div>
                  </template>
                  <template v-else>
                    <div class="specilTd">{{ column.options.label }}</div>
                  </template>
                </td>
              </template>
            </template>
          </tr>
        </template>
      </tbody>
      <tfoot>
        <template v-for="(row, index) in tableFooter(item.children)">
          <tr :key="`tr${index}`">
            <template v-for="(column, index) in row">
              <template v-if="column.options.visible">
                <td
                  :key="`column${index}`"
                  :class="tableCellClass(item)"
                  :colspan="column.options.colspan"
                  :rowspan="column.options.rowspan"
                  :style="[
                    { height: `${column.options.height}px` },
                    { width: `${column.options.width} ` },
                  ]"
                >
                  <template v-if="column.options.type === 'normal'">
                    <div v-for="item in column.list" :key="item.id">
                      <preview :item="item"></preview>
                    </div>
                  </template>
                  <template v-else>
                    <div class="specilTd">{{ column.options.label }}</div>
                  </template>
                </td>
              </template>
            </template>
          </tr>
        </template>
      </tfoot>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      required: true,
      type: Object
    }
  },
  methods: {
    tableCellClass (item) {
      let cellClass = ''
      if (item.data.showBorder) {
        cellClass = cellClass + 'border '
      }
      return cellClass
    },
    tableHeader (children) {
      let list = []
      for (let row of children) {
        if (row.some(column => column.options.isheader)) {
          list.push(row)
        }
      }
      return list
    },
    tableBody (children) {
      let list = []
      for (let row of children) {
        if (!row.some(column => column.options.isheader || column.options.isfooter)) {
          list.push(row)
        }
      }
      return list
    },
    tableFooter (children) {
      let list = []
      for (let row of children) {
        if (row.some(column => column.options.isfooter)) list.push(row)
      }
      return list
    }
  }
}
</script>

<style scoped lang="scss">
.table {
  table-layout: fixed;
  border-collapse: collapse;
  .border {
    border: 1px solid $color-black;
  }
}
.isometry {
  width: 100%;
}
.specilTd {
  text-align: center;
}
</style>
