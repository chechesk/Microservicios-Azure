const { createProxyMiddleware } = require('http-proxy-middleware');

const createProxy = (containerName, containerPort) => {
  const proxyMiddleware = createProxyMiddleware({
    target: `http://${containerName}:${containerPort}`,
    changeOrigin: true,
    // Puedes agregar más opciones según sea necesario
    // Por ejemplo, para habilitar el soporte de WebSockets:
    ws: true,
    secure: false,  // Deshabilita la verificación SS
    // Manejo de errores
    onError: (err, req, res) => {
      console.error('Proxy Error:', err);
      res.status(500).json({ error: 'Proxy Error', message: err.message });
    },
  });

  return proxyMiddleware;
};

module.exports = createProxy;
