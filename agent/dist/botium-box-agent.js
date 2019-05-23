!function(e,s){"object"==typeof exports&&"undefined"!=typeof module?module.exports=s(require("path"),require("slugify"),require("nodegit"),require("botium-core/src/scripting/Constants"),require("botium-core/src/Capabilities"),require("intercept-stdout"),require("util"),require("botium-core"),require("p-queue"),require("delay"),require("botium-core/src/Fluent"),require("debug"),require("dotenv-flow"),require("os"),require("kue")):"function"==typeof define&&define.amd?define(["path","slugify","nodegit","botium-core/src/scripting/Constants","botium-core/src/Capabilities","intercept-stdout","util","botium-core","p-queue","delay","botium-core/src/Fluent","debug","dotenv-flow","os","kue"],s):e.main=s(e.path,e.slugify,e.nodegit,e.Constants,e.Capabilities,e.interceptStdout,e.util,e.botiumCore,e.pQueue,e.delay,e.Fluent,e.debug,e.dotenvFlow,e.os,e.kue)}(this,function(e,s,t,o,r,n,a,i,c,l,d,u,p,T,S){"use strict";e=e&&e.hasOwnProperty("default")?e.default:e,s=s&&s.hasOwnProperty("default")?s.default:s,t=t&&t.hasOwnProperty("default")?t.default:t,o=o&&o.hasOwnProperty("default")?o.default:o,r=r&&r.hasOwnProperty("default")?r.default:r,n=n&&n.hasOwnProperty("default")?n.default:n,a=a&&a.hasOwnProperty("default")?a.default:a,i=i&&i.hasOwnProperty("default")?i.default:i,c=c&&c.hasOwnProperty("default")?c.default:c,l=l&&l.hasOwnProperty("default")?l.default:l,d=d&&d.hasOwnProperty("default")?d.default:d,u=u&&u.hasOwnProperty("default")?u.default:u,p=p&&p.hasOwnProperty("default")?p.default:p,T=T&&T.hasOwnProperty("default")?T.default:T,S=S&&S.hasOwnProperty("default")?S.default:S;const f={buildTarget:"COMMUNITY EDITION",buildBranch:"release/1.6.0",buildRevision:"3178396f7209c3cfd7fcbcae1f61f900f32687a5",buildDate:"2019-05-23T16:04:42+02:00"};var m=()=>{console.log("BOTIUM BOX - AGENT"),console.log(`BUILD_TARGET: ${f.buildTarget}`),console.log(`BUILD_BRANCH: ${f.buildBranch}`),console.log(`BUILD_REVISION: ${f.buildRevision}`),console.log(`BUILD_TIMESTAMP: ${f.buildDate}`)};const g=u("botium-retrieve-all-test-cases");var E={prepareConvos:(e,s,t)=>{const o=e.testSets.filter(e=>e.expandConvos).length>0,r=e.testSets.filter(e=>e.expandUtterancesToConvos).length>0,n=e.testSets.filter(e=>e.expandScriptingMemory).length>0;return r&&(t("expanding utterances to convos ..."),s.compiler.ExpandUtterancesToConvos()),n&&(t("expanding scripting memories to convos ..."),s.compiler.ExpandScriptingMemoryToConvos()),(o||r||n)&&(t("expanding convos ..."),s.compiler.ExpandConvos()),t(`found ${s.compiler.convos.length} convos ...`),s.compiler.convos},merge:(e,s)=>{const t={};e.botium&&e.botium.Capabilities&&Object.assign(t,e.botium.Capabilities),s.botium&&s.botium.Capabilities&&Object.assign(t,s.botium.Capabilities);const o={};e.botium&&e.botium.Sources&&Object.assign(o,e.botium.Sources),s.botium&&s.botium.Sources&&Object.assign(o,s.botium.Sources);const r={};return e.botium&&e.botium.Envs&&Object.assign(r,e.botium.Envs),s.botium&&s.botium.Envs&&Object.assign(r,s.botium.Envs),{caps:t,sources:o,envs:r}}};const I=i.BotDriver,h=u("botium-box-worker-runtestcases"),{prepareConvos:b,merge:O}=E,$={},C={},_=e=>{C[e]&&(C[e].forEach(e=>e()),delete C[e],h(`Worker for ${e} stopped.`))};var R=(e,{id:s,data:t},i)=>{const{testSessionId:c,testSessionName:l,testSessionJobId:d}=t;let u=!1,p=!1;((e,s,t)=>{$[e]||($[e]=[]),C[e]||(C[e]=[]),$[e].push(s),C[e].push(t)})(c,()=>{u=!0},()=>{p=!0});const T={unhook:null},S=()=>{T.unhook&&(T.unhook(),T.unhook=null)};return new Promise((S,f)=>{T.unhook=n(s=>{if(e.debug){const e=s.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,"");i("process.log",{testSessionId:c,testSessionName:l,testSessionJobId:d,log:e})}return s}),h(`Started processing, JobId #${s}.`);const{caps:m,sources:E,envs:$}=O(e,t),C=new I(m,E,$),R=C.BuildFluent();R.compiler=C.BuildCompiler(),C._validate().then(()=>new Promise((e,s)=>{Promise.all(t.testSets.map(e=>((e,s,t)=>{e.convos&&e.convos.forEach(t=>{let r=[];try{t.format===o.SCRIPTING_FORMAT_TXT&&(r=s.Compile(t.content,o.SCRIPTING_FORMAT_TXT,o.SCRIPTING_TYPE_CONVO)),r&&r.forEach(e=>{e.sourceTag=t.sourceTag})}catch(s){throw g(s),new Error(`${e.name}: Convo Script compilation failed: ${a.inspect(s)}`)}}),e.pconvos&&e.pconvos.forEach(t=>{let r=[];try{t.format===o.SCRIPTING_FORMAT_TXT&&(r=s.Compile(t.content,o.SCRIPTING_FORMAT_TXT,o.SCRIPTING_TYPE_PCONVO)),r&&r.forEach(e=>{e.sourceTag=t.sourceTag})}catch(s){throw g(s),new Error(`${e.name}: Partial Convo Script compilation failed: ${a.inspect(s)}`)}}),e.utterances&&e.utterances.forEach(t=>{let r=[];try{t.format===o.SCRIPTING_FORMAT_TXT&&(r=s.Compile(t.content,o.SCRIPTING_FORMAT_TXT,o.SCRIPTING_TYPE_UTTERANCES)),r&&r.forEach(e=>{e.sourceTag=t.sourceTag})}catch(s){throw g(s),new Error(`${e.name}: Utterance script compilation failed: ${a.inspect(s)}`)}}),e.scriptingMemories&&e.scriptingMemories.forEach(t=>{let r=[];try{t.format===o.SCRIPTING_FORMAT_TXT&&(r=s.Compile(t.content,o.SCRIPTING_FORMAT_TXT,o.SCRIPTING_TYPE_SCRIPTING_MEMORY)),r&&r.forEach(e=>{e.sourceTag=t.sourceTag})}catch(s){throw g(s),new Error(`${e.name}: Scripting Memory script compilation failed: ${a.inspect(s)}`)}}),e.folders&&e.folders.forEach(t=>{try{const{convos:o,pconvos:r,utterances:n}=s.ReadScriptsFromDirectory(t.path,t.globFilter);o&&o.forEach(e=>{e.sourceTag=Object.assign({},e.sourceTag,t.sourceTag)}),r&&r.forEach(e=>{e.sourceTag=Object.assign({},e.sourceTag,t.sourceTag)}),n&&n.forEach(e=>{e.sourceTag=Object.assign({},e.sourceTag,t.sourceTag)})}catch(s){throw g(s),new Error(`${e.name}: Folder ${t} script compilation failed: ${a.inspect(s)}`)}});let n=Promise.resolve();e.excels&&e.excels.length>0&&(n=Promise.all(e.excels.map(({id:e,filename:t,filecontent:n,hasConvos:a,hasPartialConvos:i,hasUtterances:c,worksheetsConvos:l,worksheetsPartialConvos:d,worksheetsUtterances:u,startRow:p,startCol:T,sourceTag:S})=>new Promise(e=>{const t=Buffer.from(n,"base64");let f=[],m=[],g=[];a&&(l&&(s.caps[r.SCRIPTING_XLSX_SHEETNAMES]=l),isNaN(p)||(s.caps[r.SCRIPTING_XLSX_STARTROW]=p),isNaN(T)||(s.caps[r.SCRIPTING_XLSX_STARTCOL]=T),f=s.Compile(t,o.SCRIPTING_FORMAT_XSLX,o.SCRIPTING_TYPE_CONVO)),i&&(d&&(s.caps[r.SCRIPTING_XLSX_SHEETNAMES_PCONVOS]=d),isNaN(p)||(s.caps[r.SCRIPTING_XLSX_STARTROW]=p),isNaN(T)||(s.caps[r.SCRIPTING_XLSX_STARTCOL]=T),m=s.Compile(t,o.SCRIPTING_FORMAT_XSLX,o.SCRIPTING_TYPE_PCONVO)),c&&(u&&(s.caps[r.SCRIPTING_XLSX_SHEETNAMES_UTTERANCES]=u),isNaN(p)||(s.caps[r.SCRIPTING_XLSX_STARTROW]=p),isNaN(T)||(s.caps[r.SCRIPTING_XLSX_STARTCOL]=T),g=s.Compile(t,o.SCRIPTING_FORMAT_XSLX,o.SCRIPTING_TYPE_UTTERANCES)),f&&f.forEach(e=>{e.sourceTag=Object.assign({},e.sourceTag,S)}),m&&m.forEach(e=>{e.sourceTag=Object.assign({},e.sourceTag,S)}),g&&g.forEach(e=>{e.sourceTag=Object.assign({},e.sourceTag,S)}),e()}))));let i=Promise.resolve();return Promise.all([i,n])})(e,R.compiler,C.tempDirectory))).then(()=>b(t,R,h)).then(s=>{e(s.reduce((e,s)=>e.concat(s),[]))}).catch(s)})).then(()=>{const e=t.batchNum||1,s=t.batchCount||1,o=Math.ceil(R.compiler.convos.length/s),r=o*(e-1),n=Math.min(r+o,R.compiler.convos.length)-1,a=n-r+1,T={batchNum:e,totalCount:0,failedCount:0,successCount:0};h(`batchNum: ${e} batchCount: ${s} convosPerBatch: ${o} batchStart: ${r} batchEnd: ${n} batchLength: ${a}`);for(let s=r;s<=n;s++){const S=s,f=R.compiler.convos[S];let m=null;const g=[],E=(e,s)=>{s.attachments&&g.push(...s.attachments)},I=(e,s)=>{s.attachments&&g.push(...s.attachments)},b=(e,s)=>{g.push(s)},O=(e,s)=>{s&&(f.sourceTag=Object.assign({},f.sourceTag,s))},$=()=>{C.eventEmitter.removeListener("MESSAGE_SENTTOBOT",E),C.eventEmitter.removeListener("MESSAGE_RECEIVEDFROMBOT",I),C.eventEmitter.removeListener("MESSAGE_ATTACHMENT",b),C.eventEmitter.removeListener("CONTAINER_STARTED",O)},N=()=>{C.on("MESSAGE_SENTTOBOT",E),C.on("MESSAGE_RECEIVEDFROMBOT",I),C.on("MESSAGE_ATTACHMENT",b),C.on("CONTAINER_STARTED",O)};let v=null;R.Call(()=>{if(u)throw new Error("Test Session cancelled")}),R.Call(N).Start(),R.Call(()=>new Promise(e=>{if(u)h(`Test Session cancelled, skipping Convo "${f.header.name}", Index ${S}, ${S-r} from ${o}`),e();else if(p)h(`Test Session stopped, skipping Convo "${f.header.name}", Index ${S}, ${S-r} from ${o}`),e();else{h(`Running Convo "${f.header.name}", Index ${S}, ${S-r+1} from ${a}`);try{return f.Run(R.container).then(s=>{h(`Running Convo "${f.header.name}" completed successfully.`),m=s,e()}).catch(s=>{h(`Running Convo "${f.header.name}" failed: ${s}.`),m=s.transcript,v=s,e()})}catch(s){v=s,e()}}})),R.Stop().Call($),R.Call(()=>{if(u)throw new Error("Test Session cancelled")}),R.Call(()=>new Promise((s,E)=>u?s():p?s():(m&&(m.err=m.err?m.err.message?m.err.message:JSON.stringify(m.err):null,m.steps&&m.steps.forEach(e=>{e.err=e.err?e.err.message?e.err.message:JSON.stringify(e.err):null})),T.totalCount++,v?T.failedCount++:T.successCount++,null!==v&&t.bail&&_(c),void i("process.progress",{testSessionId:c,testSessionName:l,testSessionJobId:d,currentBatchIndex:S,batchNum:e,batchStart:r,batchEnd:n,batchLength:a,convosPerBatch:o,progress:Math.round((S-r+1)/a*100),testcase:f.header.name,source:f.toString(),sourceTag:f.sourceTag,transcript:m,attachments:g,success:null===v,err:v?v.message?v.message:JSON.stringify(v):null,stopTestSession:null!==v&&t.bail}).on("complete",s).on("failed",e=>{E(new Error(`process.progress finally failed after retry attempts: ${e}, decr redis counter`))}))))}R.Clean(),R.Exec().then(()=>S(T)).catch(e=>{R.container?(h(`Test Session Run failed (${e}), doing additional BotDriver Clean.`),R.container.Clean().catch(e=>h(e)).then(()=>{e.result=T,f(e)})):(h(`Test Session Run failed (${e}).`),f(e))})}).catch(f)}).then(e=>(S(),e)).catch(e=>{throw S(),e})},N=e=>{$[e]&&($[e].forEach(e=>e()),delete $[e],h(`Worker for ${e} cancelled.`))},v=_;u("botium-box-worker-runperformancetestcases"),i.BotDriver;const P={};var y=(e,{created_at:s,id:t,data:o,_attempts:r},n)=>{},U=(e,s)=>{P[e]&&(P[e].forEach(e=>e()),delete P[e])};p.config(),m();const M=u("botium-box-worker"),B=(()=>{if(process.env.BOTIUMBOX_AGENT_NAME)return process.env.BOTIUMBOX_AGENT_NAME;const e=T.hostname();return e&&process.env.hasOwnProperty("BOTIUMBOX_AGENT_NUM")?`${e}_${process.env.BOTIUMBOX_AGENT_NUM}`:e||"Default Agent"})(),A=process.env.BOTIUMBOX_AGENT_GROUP||"Default Group";M(`Connecting agent ${B} to group ${A} ...`);let w={};if(process.env.BOTIUMBOX_QUEUE_SETTINGS)try{w=JSON.parse(process.env.BOTIUMBOX_QUEUE_SETTINGS),M(`Got queue settings '${JSON.stringify(w)}'`)}catch(e){console.log(`ERROR parsing queue settings '${process.env.BOTIUMBOX_QUEUE_SETTINGS}':`),console.log(e),process.exit(1)}else process.env.BOTIUMBOX_QUEUE_PREFIX&&(w.prefix=process.env.BOTIUMBOX_QUEUE_PREFIX),process.env.BOTIUMBOX_QUEUE_REDISURL&&(w.redis=process.env.BOTIUMBOX_QUEUE_REDISURL);M(`connecting to Botium queue '${JSON.stringify(w)}'`);const X=process.env.hasOwnProperty("BOTIUMBOX_QUEUE_PROGRESS_RETRY_ATTEMPTS")?process.env.BOTIUMBOX_QUEUE_PROGRESS_RETRY_ATTEMPTS:5,G=process.env.hasOwnProperty("BOTIUMBOX_QUEUE_PROGRESS_RETRY_DELAY")?process.env.BOTIUMBOX_QUEUE_PROGRESS_RETRY_DELAY:1e4;M(`Using job progress retryAttempts: ${X}, retryDelay: ${G}`);const J=process.env.BOTIUMBOX_QUEUE_CONCURRENCY||1,x=process.env.BOTIUMBOX_QUEUE_CONCURRENCY_PERFORMANCE||1;let L=process.env.BOTIUMBOX_QUEUE_HEARTBEAT||3e5;L>0&&L<5e3&&(L=5e3);const F=S.createQueue(w);F.on("error",e=>{console.log(`ERROR connecting to queue '${JSON.stringify(w)}':`),console.log(e),process.exit(1)});const j=(e,s)=>F.create(e,s).removeOnComplete(!0).save(),D=(e,s)=>F.create(e,s).attempts(X).backoff({delay:G,type:"fixed"}).removeOnComplete(!0).save();let q={};const k=e=>{q=e};M("Trying to register agent ..."),j("agent.register",{title:`register agent ${B} to group ${A}`,name:B,group:A}).on("failed",e=>{console.log("ERROR registering agent:"),console.log(e),process.exit(1)}).on("complete",e=>{M(`Registration completed with result '${JSON.stringify(e)}', now accepting processing jobs (concurrency ${J}, concurrencyPerformance, ${x}).`),k(e);const s=(e,s)=>{const{testSessionId:t,testSessionName:o,testSessionJobId:r}=e.data;if(!t||!r)return s(new Error(`Processing Job ${e.id} failed, no testSessionId or testSessionJobId given.`));M(`Processing Job ${e.id} for Test Session ${t}/${o}, Job ${r}`);try{R(q,e,D).then(n=>{M(`Processing Job ${e.id} finished with result:`),n&&M(n),s(null,n),D("process.ready.success",{title:`Processing Job ${e.id} for Test Session ${t}/${o} ready`,testSessionId:t,testSessionName:o,testSessionJobId:r,jobId:e.id,result:n})}).catch(n=>{M(`Processing Job ${e.id} failed:`),M(n),s(n),D("process.ready.failed",{title:`Processing Job ${e.id} for Test Session ${t}/${o} failed`,testSessionId:t,testSessionName:o,testSessionJobId:r,jobId:e.id,result:n.result,err:`${n}`})})}catch(n){M(`Processing Job ${e.id} failed:`),M(n),s(n),D("process.ready.failed",{title:`Processing Job ${e.id} for Test Session ${t}/${o} failed`,testSessionId:t,testSessionName:o,testSessionJobId:r,jobId:e.id,err:n})}};if(F.process(`process.run.${A}`,J,s),F.process(`process.run.${B}`,J,s),F.process("process.run",J,s),F.process(`process.cancel.${B}`,J,(e,s)=>{if(!e.data||!e.data.testSessionId)return[M,s].forEach(e=>e("Cancel Test Session event received, but no testSessionId given"));M(`Canceling Test Session ${e.data.testSessionId}/${e.data.testSessionName}`);try{N(e.data.testSessionId),M(`Canceling Test Session ${e.data.testSessionId}/${e.data.testSessionName} finished.`),s()}catch(t){M(`Canceling Test Session Job ${e.data.testSessionId}/${e.data.testSessionName} failed:`),M(t),s(t)}}),F.process(`process.stop.${B}`,J,(e,s)=>{if(!e.data||!e.data.testSessionId)return[M,s].forEach(e=>e("Stop Test Session event received, but no testSessionId given"));M(`Stopping Test Session ${e.data.testSessionId}/${e.data.testSessionName}`);try{v(e.data.testSessionId),M(`Stopping Test Session ${e.data.testSessionId}/${e.data.testSessionName} finished.`),s()}catch(t){M(`Stopping Test Session Job ${e.data.testSessionId}/${e.data.testSessionName} failed:`),M(t),s(t)}}),F.process(`agent.ping.${B}`,J,(e,s)=>{s()}),F.process("performanceprocess.run",x,(e,s)=>{const{performanceTestSessionId:t,performanceTestSessionName:o,performanceTestSessionJobId:r}=e.data;if(!t||!r)return s(new Error(`Processing Job ${e.id} failed, no performanceTestSessionId or performanceTestSessionJobId given.`));M(`Processing Job ${e.id} for Test Session ${t}/${o}, Job ${r}`);try{D("performanceprocess.started",{title:`Processing Job ${e.id} for Test Session ${t}/${o} started`,performanceTestSessionId:t,performanceTestSessionName:o,performanceTestSessionJobId:r,agentName:B,jobId:e.id}),y(q,e,D).then(n=>{M(`Processing Job ${e.id} finished`),s(null,n),D("performanceprocess.ready.success",{title:`Processing Job ${e.id} for Test Session ${t}/${o} ready`,performanceTestSessionId:t,performanceTestSessionName:o,performanceTestSessionJobId:r,agent:B,jobId:e.id,result:n})}).catch(n=>{M(`Processing Job ${e.id} failed:`),M(n),s(n),D("performanceprocess.ready.failed",{title:`Processing Job ${e.id} for Test Session ${t}/${o} failed`,performanceTestSessionId:t,performanceTestSessionName:o,performanceTestSessionJobId:r,agent:B,jobId:e.id,result:n.result,err:`${n}`})})}catch(n){M(`Processing Job ${e.id} failed:`),M(n),s(n),D("performanceprocess.ready.failed",{title:`Processing Job ${e.id} for Test Session ${t}/${o} failed`,performanceTestSessionId:t,performanceTestSessionName:o,performanceTestSessionJobId:r,agent:B,jobId:e.id,err:n})}}),F.process(`performanceprocess.cancel.${B}`,x,(e,s)=>{if(!e.data||!e.data.performanceTestSessionId)return[M,s].forEach(e=>e("Cancel Test Session event received, but no performanceTestSessionId given"));M(`Canceling Test Session ${e.data.performanceTestSessionId}/${e.data.performanceTestSessionName}`);try{U(e.data.performanceTestSessionId,e),M(`Canceling Test Session ${e.data.performanceTestSessionId}/${e.data.performanceTestSessionName} finished.`),s()}catch(t){M(`Canceling Test Session Job ${e.data.performanceTestSessionId}/${e.data.performanceTestSessionName} failed:`),M(t),s(t)}}),F.process(`agent.reconfigure.${B}`,J,(e,s)=>{M("Trying to reconfigure agent ..."),j("agent.register",{title:`reconfigure agent ${B} for group ${A}`,name:B,group:A}).on("failed",e=>{M("ERROR reconfiguring agent:"),M(e),s(e)}).on("complete",e=>{M(`Reconfiguration completed with result '${JSON.stringify(e)}'.`),k(e),s()})}),L>0){const e=()=>{M("sending heartbeat ..."),j("agent.heartbeat",{title:`heartbeat from agent ${B} for group ${A}`,name:B,group:A}).on("complete",()=>{setTimeout(e,L)})};e()}}),process.on("uncaughtException",e=>{console.log("Got an uncaughtException",e)});return{}});
