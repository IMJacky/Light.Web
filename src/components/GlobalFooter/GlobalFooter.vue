<template>
  <div class="footer">
    <div class="links">
      <a href="https://jiqunar.com/" target="_blank">Light 首页</a>
      <a href="https://github.com/IMJacky/Light.Web" target="_blank">
        <a-icon type="github" />
      </a>
      <a href="https://ant.design/" target="_blank">Ant Design</a>
      <a href="https://vue.ant.design/" target="_blank">Vue Antd</a>
    </div>
    <div class="copyright">
      Copyright
      <a-icon type="copyright" /> 2021 <span>By 王杰光-Jack &nbsp;</span>
      <img src="/jgwa.png" />
      <a
        style="margin-left: 5px; color: rgba(0, 0, 0, 0.45)"
        href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=32050602010240"
        target="_blank"
        >京公网安备32050602010240号</a
      >
      <a style="margin-left: 5px; color: rgba(0, 0, 0, 0.45)" href="https://beian.miit.gov.cn" target="_blank"
        >苏ICP备17029611号</a
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'GlobalFooter',
  data () {
    return {}
  }
}
</script>

<style lang="less" scoped>
.footer {
  padding: 0 16px;
  margin: 48px 0 24px;
  text-align: center;

  .links {
    margin-bottom: 8px;

    a {
      color: rgba(0, 0, 0, 0.45);

      &:hover {
        color: rgba(0, 0, 0, 0.65);
      }

      &:not(:last-child) {
        margin-right: 40px;
      }
    }
  }
  .copyright {
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
  }
}
</style>
