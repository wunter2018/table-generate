<template>
  <div class="header">
    <p v-if="mode === 'report'">报表设计器</p>
    <p v-if="mode === 'form'">表单设计器</p>
    <div class="nav">
      <el-dropdown class="dropdown" @command="changeMode">
        <span class="text"
          ><span class="formIcon form-icon-mode icon"></span>模式</span
        >
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="form">表单</el-dropdown-item>
          <el-dropdown-item command="report">报表</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown class="dropdown" @command="changeLanguage">
        <span class="text"
          ><span class="formIcon form-icon-language icon"></span>语言</span
        >
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="chinese">中文</el-dropdown-item>
          <el-dropdown-item command="english">英文</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown class="dropdown" @command="changeTheme">
        <span class="text"
          ><span class="formIcon form-icon-theme icon"></span>主题</span
        >
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="element-blue">饿了么蓝</el-dropdown-item>
          <el-dropdown-item command="orange-red">橙红</el-dropdown-item>
          <el-dropdown-item command="sea-green">海洋绿</el-dropdown-item>
          <el-dropdown-item command="dark-magenta">深洋红</el-dropdown-item>
          <el-dropdown-item command="crimson">猩红</el-dropdown-item>
          <el-dropdown-item command="dark">蓝黑</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { matchThemeColor } from '../../util/color'

export default {
  data () {
    return {
      modeSwitch: false
    }
  },
  computed: {
    mode () {
      return this.$store.getters.mode
    }
  },
  methods: {
    changeMode (command) {
      this.$store.commit('SET_MODE', command)
    },
    changeTheme (command) {
      this.$store.commit('SET_THEME', command)
      this.$store.commit('SET_THEMECOLOR', matchThemeColor(command))
      window.document.documentElement.setAttribute('data-theme', command)
    },
    changeLanguage (command) {

    }
  }
}
</script>

<style scoped lang="scss">
.header {
  min-height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 25px;
  padding: 0px 20px;

  @include background_color("header-background-color");
  @include font_color("header-color");

  .nav {
    .dropdown {
      margin: 0px 8px;
      @include font_color("header-color");
      .icon {
        margin-right: 6px;
      }
    }
    .dropdown:hover {
      cursor: pointer;
    }
  }
}
.header p::first-letter {
  font-size: 30px;
}
</style>
