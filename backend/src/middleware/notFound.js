function notFound(req, res, next) {
    res.status(404).json({ message: '未找到请求的资源' });
  }
  
  module.exports = notFound;