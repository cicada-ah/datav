<template>
  <div>
    <Menu mode="horizontal"
          theme="primary"
          active-name="1">
      <div class="layout-logo"></div>
      <MenuItem name="1">
      <Icon type="ios-paper" />
      内容管理
      </MenuItem>
      <MenuItem name="2">
      <Icon type="ios-people" />
      用户管理
      </MenuItem>
      <Submenu name="3">
        <template slot="title">
          <Icon type="ios-stats" />
          统计分析
        </template>
        <MenuGroup title="使用">
          <MenuItem name="3-1">新增和启动</MenuItem>
          <MenuItem name="3-2">活跃分析</MenuItem>
          <MenuItem name="3-3">时段分析</MenuItem>
        </MenuGroup>
        <MenuGroup title="留存">
          <MenuItem name="3-4">用户留存</MenuItem>
          <MenuItem name="3-5">流失用户</MenuItem>
        </MenuGroup>
      </Submenu>
      <MenuItem name="4">
      <Icon type="ios-construct" />
      综合设置
      </MenuItem>
    </Menu>
  </div>
</template>
<script>
export default {
  data () {
    return {
      theme1: 'light'
    }
  }
}
</script>
<style scoped>
.layout-logo {
  width: 100px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}
</style>

