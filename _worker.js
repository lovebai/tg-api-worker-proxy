addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request));
  });
  async function handleRequest(request) {
    const url = new URL(request.url);
    
    // HTTP 强制跳转 HTTPS（兼容边缘场景）
    const proto = request.headers.get('X-Forwarded-Proto') || 'https';
    if (proto === 'http') {
      return Response.redirect(`https://${url.hostname}${url.pathname}`, 301);
    }
  
    // Telegram 反向代理
    if (url.pathname.toLowerCase().startsWith('/bot')) {
      const target = new URL(request.url);
      target.host = 'api.telegram.org';
      
      // 构造新请求（保留原始请求属性）
      const newReq = new Request(target, {
        headers: request.headers,
        method: request.method,
        body: request.body,
        redirect: 'follow'
      });
      newReq.headers.set('Host', target.host);  // 关键：修正 Host 头
      
      try {
        return await fetch(newReq);
      } catch (err) {
        console.error(`Proxy error: ${err}`);
        return new Response('Bad Gateway', { status: 502 });
      }
    }
  
    // 根路径健康检查
    if (url.pathname === '/') {
      return new Response('Server is healthy ✅', {
        status: 200,
        headers: { 'Content-Type': 'text/plain' }
      });
    }
  
    // 其他请求返回 404
    return new Response('Not Found', { status: 404 });
  }
