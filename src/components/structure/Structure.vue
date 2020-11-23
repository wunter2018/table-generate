<template>
  <div class="container">
    <header-view></header-view>
    <div class="divider-row"></div>
    <div class="body">
      <selector-view
        id="selector"
        class="selector"
        :list="list"
        :data="jsonData"
      ></selector-view>
      <div class="divider-column resize-column"></div>
      <workspace-view
        class="workspace"
        id="workspace"
        ref="workspaceView"
      ></workspace-view>
      <div class="divider-column resize-column"></div>
      <property-view
        id="property"
        class="property"
        @refreshBindKeys="refreshBindKeys"
      ></property-view>
    </div>
    <div class="divider-row"></div>
    <footer-view></footer-view>
  </div>
</template>

<script>
import thumbnail from '../../util/type.js'

export default {
  name: 'structure',
  data () {
    return {
      list: thumbnail
    }
  },
  computed: {
    jsonData () {
      return this.$store.getters.jsonData
    }
  },
  mounted () {
    let resizeColumns = document.getElementsByClassName('resize-column')
    let resizes = ['selector', 'property']

    // 设定workspace的宽度，可以动态改变
    let workspace = document.getElementById('workspace')
    workspace.style.width = getComputedStyle(workspace).width

    for (let index = 0; index < resizes.length; index++) {
      resizeColumns[index].onmousedown = (event) => { this.dragControlSize(event, resizes[index]) }
    }
  },
  methods: {
    // 更新bindKeys
    refreshBindKeys () {
      this.$refs.workspaceView.refreshBindKeys()
    },
    // 拖拽控制宽度
    dragControlSize (event, id) {
      let resize = document.getElementById(id)
      let regexp = new RegExp(/\d*\.?\d*/)
      let resizeWidth = Number(regexp.exec(getComputedStyle(resize).width))

      let workspace = document.getElementById('workspace')
      let workspaceWidth = Number(regexp.exec(getComputedStyle(workspace).width))

      let tableLayouts = document.getElementsByClassName('table-layout')

      let resizeLength = 0
      let workspaceLength = 0

      document.onmousemove = (ev) => {
        let deltaLength = 0
        switch (id) {
          case 'selector':
            deltaLength = ev.clientX - event.clientX
            break
          case 'property':
            deltaLength = event.clientX - ev.clientX
            break
        }
        resizeLength = resizeWidth + deltaLength
        workspaceLength = workspaceWidth - deltaLength

        if (resizeLength < 100) resizeLength = 100
        resize.style.width = resizeLength + 'px'
        if (workspaceLength < 550) workspaceLength = 550
        workspace.style.width = workspaceLength + 'px'

        for (let wrapper of tableLayouts) {
          let table = wrapper.getElementsByTagName('table')[0]
          let wrapperStyle = getComputedStyle(wrapper)
          if (table.offsetWidth < workspaceLength) {
            wrapper.style.width = `calc(100% - ${wrapperStyle.padding} - ${wrapperStyle.padding} - ${wrapperStyle.borderWidth} - ${wrapperStyle.borderWidth} - ${wrapperStyle.margin} - ${wrapperStyle.margin})`
          } else {
            wrapper.style.width = table.offsetWidth + 'px'
          }
        }
      }

      document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  height: 100%;
  display: flex;
  flex-direction: column;

  .body {
    display: flex;
    flex-direction: row;
    flex: 1;
    .selector {
      width: 230px;
      @include background_color("selector-background-color");
      @include font_color("selector-color");
    }
    .workspace {
      flex: 1;
      @include background_color("layout-background-color");
      @include font_color("layout-color");
    }
    .property {
      width: 260px;
      @include background_color("property-background-color");
      @include font_color("property-color");
    }
    .resize-column:hover {
      cursor: ew-resize;
      user-select: none;
    }
  }
}
</style>
