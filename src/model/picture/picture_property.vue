<template>
  <div>
    <div class="property-item">
      <span class="label">图片</span>
      <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        :file-list="chooseData.data.list"
        :on-success="uploadSuccess"
      >
        <el-button size="mini" type="primary">点击上传</el-button>
      </el-upload>
    </div>

    <div class="property-item">
      <span class="label">适应容器</span>
      <el-select v-model="chooseData.config.fit" class="content" size="mini">
        <template v-for="item in chooseData.config.fits">
          <el-option
            :key="item.label"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </template>
      </el-select>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    chooseData: {
      required: true,
      type: Object
    },
    themeColor: {
      required: true,
      type: String
    }
  },
  methods: {
    uploadSuccess (response, file, fileList) {
      console.log(response, file, fileList)
    }
  }
}
</script>

<style scoped lang="scss">
.upload {
  min-width: 10px;
  width: 30px !important;
  max-width: 40px;
}
</style>
