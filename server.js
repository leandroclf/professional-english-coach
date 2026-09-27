import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { requestFeedback } from './src/coach.js';

const root = resolve(fileURLToPath(new URL('.', import.meta.url)));
export const types = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml',
  '.mp3': 'audio/mpeg', '.wav': 'audio/wav', '.ogg': 'audio/ogg',
  '.mp4': 'video/mp4', '.webm': 'video/webm', '.vtt': 'text/vtt; charset=utf-8'
};

try {
  const localEnv = await readFile(resolve(root, '.env'), 'utf8');
  for (const line of localEnv.split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*?)\s*$/);
    if (!match || Object.hasOwn(process.env, match[1])) continue;
    const value = match[2].replace(/^(['"])(.*)\1$/, '$2');
    process.env[match[1]] = value;
  }
} catch (error) { if (error.code !== 'ENOENT') throw error; }

export function createAppServer(config = {}) {
  const apiKey = config.apiKey ?? process.env.OPENAI_API_KEY;
  const model = config.model ?? process.env.OPENAI_MODEL;
  return createServer(async (req, res) => {
    const url = new URL(req.url, 'http://localhost');
    if (req.method === 'GET' && url.pathname === '/api/status') {
      res.writeHead(200, { 'Content-Type': types['.json'], 'Cache-Control': 'no-store' });
      res.end(JSON.stringify({ feedbackAvailable: Boolean(apiKey && model) }));
      return;
    }
    if (req.method === 'POST' && url.pathname === '/api/feedback') {
      try {
        let raw = '';
        for await (const chunk of req) {
          raw += chunk;
          if (raw.length > 16000) throw Object.assign(new Error('Request is too large.'), { status: 413 });
        }
        const data = JSON.parse(raw);
        if (typeof data.answer !== 'string' || !data.answer.trim() || typeof data.prompt !== 'string') throw Object.assign(new Error('Prompt and response are required.'), { status: 400 });
        const feedback = await requestFeedback(data, { apiKey, model, ...(config.fetchImpl ? { fetchImpl: config.fetchImpl } : {}) });
        res.writeHead(200, { 'Content-Type': types['.json'], 'Cache-Control': 'no-store' });
        res.end(JSON.stringify(feedback));
      } catch (error) {
        res.writeHead(error.status || 502, { 'Content-Type': types['.json'], 'Cache-Control': 'no-store' });
        res.end(JSON.stringify({ error: error.message || 'Coach request failed.' }));
      }
      return;
    }
    if (req.method !== 'GET' && req.method !== 'HEAD') { res.writeHead(405); res.end(); return; }
    const path = url.pathname === '/' ? '/index.html' : decodeURIComponent(url.pathname);
    if (path.split('/').some(segment => segment && segment.startsWith('.'))) { res.writeHead(403); res.end('Forbidden'); return; }
    const file = resolve(root, `.${path}`);
    if (file !== root && !file.startsWith(root + sep)) { res.writeHead(403); res.end(); return; }
    try {
      const content = await readFile(file);
      res.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream', 'X-Content-Type-Options': 'nosniff' });
      res.end(req.method === 'HEAD' ? undefined : content);
    } catch { res.writeHead(404); res.end('Not found'); }
  });
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT || 4173);
  const host = process.env.HOST || '127.0.0.1';
  createAppServer().listen(port, host, () => process.stdout.write(`Professional English Coach listening on http://${host}:${port}\n`));
}
