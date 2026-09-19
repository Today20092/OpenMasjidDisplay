// Throwaway local preview. Serves only the prototype, on loopback.
import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
const html = await readFile(new URL('./prototype.html', import.meta.url));
const server=createServer((req,res)=>{
  const path=new URL(req.url,'http://localhost').pathname;
  if(path!=='/'&&path!=='/prototype.html'){res.writeHead(404);res.end('Not found');return;}
  res.writeHead(200,{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'});res.end(html);
});
server.listen(4178,'127.0.0.1',()=>console.log('Design study: http://127.0.0.1:4178/?variant=A'));
