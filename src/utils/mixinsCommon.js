/**
 * TODO 页面公用对象
 */
 export default {
    data: function() {
      return {}
    },
    methods: {
      /**
       * 跳转路由
       * @param path 路由路径
       * @param query 查询参数
       */
      jumpPath(path, query) {
        query = query || {}
        this.$router.push({path: path, query: query})
      },
      openWeb(url) {
        window.location.href = url
      },
      toFloor(x, n) {
        let ff = parseFloat(x);
        if (isNaN(ff)) {
          let s = '0.0'
          while (s.length < 2 + n) {
            s += '0';
          }
          return s;
        }
        if (!n || n < 0) n = 2
        let yz = Math.pow(10, n);
        let f = Math.round(x * yz) / yz;
        let s = f.toString();
        let rs = s.indexOf('.');
        if (rs < 0) {
          rs = s.length;
          s += '.';
        }
        while (s.length <= rs + n) {
          s += '0';
        }
        let n1 = s.substr(0, rs)
        let n2 = s.substr(rs + 1)
        return String(n1).replace(/(\d)(?=(\d{3})+$)/g, "$1,") + '.' + n2;
      }
    }
  }
