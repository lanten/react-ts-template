module.exports = ({ USE_ANTD }) => {
  return [
    USE_ANTD && `@import '~antd/dist/antd.less';`,
    `@import './common.less';`,
    `@import './theme.less';`,
    ``,
  ]
}
