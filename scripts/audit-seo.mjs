import fs from 'node:fs';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
const base='https://www.coopercounselingsc.com';
const pages=['index','about','services','professional-consultations','resources','contact'];
const titles=new Set(), descriptions=new Set();
const decode=s=>s.replaceAll('&quot;','"').replaceAll('&amp;','&');
const audit=[];
for(const page of pages){
 const file=page+'.html', html=fs.readFileSync(file,'utf8'), route=page==='index'?'/':'/'+page;
 const title=decode(html.match(/<title>(.*?)<\/title>/s)[1]);
 const description=decode(html.match(/name="description" content="([^"]+)"/)[1]);
 assert(!titles.has(title),'duplicate title'); titles.add(title);
 assert(!descriptions.has(description),'duplicate description'); descriptions.add(description);
 assert.equal((html.match(/<h1\b/g)||[]).length,1,file+' H1 count');
 assert(html.includes(`rel="canonical" href="${base+route}"`),file+' canonical');
 assert(!/noindex|localhost|formsubmit|\u2014/i.test(html),file+' forbidden metadata/text');
 for(const prop of ['og:title','og:description','og:url','og:image','twitter:card','twitter:title','twitter:description','twitter:image']) assert(html.includes(`="${prop}"`),file+' missing '+prop);
 const graph=JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
 assert.equal(graph['@context'],'https://schema.org');
 const ids=new Set(graph['@graph'].map(e=>e['@id']));
 for(const e of graph['@graph']){
  assert(e['@type']); assert(e['@id'].startsWith(base));
  assert(!e.address&&!e.areaServed&&!e.aggregateRating&&!e.review,'unverified local claims');
 }
 const walk=e=>{if(!e||typeof e!=='object')return;if(e['@id'])assert(ids.has(e['@id']),'unresolved entity '+e['@id']);for(const v of Object.values(e))if(typeof v==='object')Array.isArray(v)?v.forEach(walk):walk(v);}; walk(graph);
 for(const [,href] of html.matchAll(/(?:href|src)="([^"]+)"/g)){
  if(/^(https?:|tel:|mailto:)/.test(href))continue;
  const [path,fragment]=href.split('#'), clean=path.replace(/^\//,'');
  const target=!clean? (path==='/'?'index.html':file):pages.includes(clean)?clean+'.html':clean;
  assert(fs.existsSync(target),file+' missing '+href);
  if(fragment&&target.endsWith('.html'))assert(fs.readFileSync(target,'utf8').includes(`id="${fragment}"`),file+' missing anchor '+href);
 }
 for(const img of html.matchAll(/<img\b[^>]+>/g))assert(/alt="[^"]+"/.test(img[0])&&/width="\d+"/.test(img[0])&&/height="\d+"/.test(img[0]),file+' image attributes');
 audit.push({file,route,title,description,descriptionLength:description.length,structuredTypes:graph['@graph'].map(e=>e['@type'])});
}
const contact=fs.readFileSync('contact.html','utf8');
const old=execFileSync('git',['show','7e1dd84:contact.html'],{encoding:'utf8'});
const embed=s=>s.match(/<div data-secure-form=[\s\S]+?<\/script>/)[0];
assert.equal(embed(contact),embed(old),'Hushmail embed changed');
const sitemap=fs.readFileSync('sitemap.xml','utf8');
for(const {route}of audit)assert(sitemap.includes(`<loc>${base+route}</loc>`));
assert.equal((sitemap.match(/<loc>/g)||[]).length,6);
const robots=fs.readFileSync('robots.txt','utf8');assert(robots.includes('Allow: /')&&robots.includes(base+'/sitemap.xml')&&!/Disallow:\s*\//.test(robots));
console.log(JSON.stringify({localValidation:'passed',pages:audit,hushmailEmbed:'unchanged'},null,2));
if(process.argv.includes('--live')){
 const at=process.argv.indexOf('--origin'), origin=at<0?base:process.argv[at+1];
 const resolve=process.argv.includes('--resolve')?['--resolve','www.coopercounselingsc.com:443:75.2.60.5']:[];
 const urls=new Set(audit.map(e=>e.route));
 for(const f of pages.map(p=>p+'.html'))for(const [,link]of fs.readFileSync(f,'utf8').matchAll(/(?:href|src)="([^"]+)"/g))if(!/^(https?:|tel:|mailto:|#)/.test(link))urls.add('/'+link.replace(/^\//,'').split('#')[0]);
 for(const path of ['/styles.css','/script.js','/sitemap.xml','/robots.txt','/assets/current-brand/old-pier-hero.avif'])urls.add(path);
 for(const path of urls){const status=execFileSync('curl.exe',['-sS','--max-time','25',...resolve,'-o','NUL','-w','%{http_code}',origin+path],{encoding:'utf8'});assert.equal(status,'200',path+' status');console.log('200 '+origin+path);}
 const status=execFileSync('curl.exe',['-sS','--max-time','25',...resolve,'-o','NUL','-w','%{http_code}',origin+'/seo-audit-missing-page'],{encoding:'utf8'});assert.equal(status,'404');console.log('404 correctly returned for missing page');
 for(const {file,route}of audit){const html=execFileSync('curl.exe',['-sS','--max-time','25',...resolve,origin+route],{encoding:'utf8'});assert(html.includes(fs.readFileSync(file,'utf8').match(/<title>.*?<\/title>/)[0]));assert(html.includes(`rel="canonical" href="${base+route}"`));assert(!/formsubmit|noindex/i.test(html));if(origin===base)assert(!/\.netlify\/scripts\/hud/i.test(html),'production badge returned');}
 console.log('Live metadata and badge cleanup verified');
}
