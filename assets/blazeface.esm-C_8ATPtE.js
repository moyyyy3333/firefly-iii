import{o as w,a as v,c as N,b as oe,E as D,A as Et,d as ae,m as Z,e as K,s as E,f as R,g as ie,t as Oe,B as $t,h as Dt,D as zt,i as Lt,L as Vt,r as _,j as ye,S as Ct,M as Pt,T as H,k as ne,l as We,n as xt,p as pe,R as Ft,q as jt,u as Rt,v as Te,w as Bt,x as it,y as ot,z as ut,C as me,F as Ge,G as pt,H as mt,I as lt,J as ct,K as Ht,N as qt,O as dt,P as te,Q as ht,U as Wt,V as U,W as J,X as Q,Y as yt,Z as Gt,_ as Kt,$ as Ut,a0 as Jt,a1 as se,a2 as Xt,a3 as ft,a4 as Zt,a5 as Qt,a6 as Yt,a7 as Mt,a8 as ea,a9 as ta,aa as Ke,ab as Ue,ac as aa,ad as sa,ae as ra,af as na,ag as ia,ah as oa,ai as ua,aj as pa,ak as ma,al as la,am as ca,an as da,ao as ha,ap as gt,aq as ya,ar as fa,as as ga,at as Na,au as ba,av as Ta,aw as Sa,ax as wa,ay as va,az as Oa,aA as _a,aB as ka,aC as Aa,aD as Ia,aE as Ea,aF as $a,aG as Da,aH as Nt,aI as F,aJ as _e,aK as za,aL as La,aM as Va,aN as Ca,aO as Pa,aP as xa,aQ as Fa,aR as ja,aS as Ra,aT as Ba,aU as Ha,aV as qa,aW as Wa,aX as Ga,aY as Ka,aZ as Ua,a_ as Ja,a$ as Xa,b0 as Za,b1 as Qa,b2 as Ya,b3 as Ma,b4 as bt,b5 as es,b6 as ts,b7 as as,b8 as ss,b9 as Re,ba as rs,bb as ns,bc as is,bd as os,be as us,bf as ps,bg as ms,bh as ls,bi as cs,bj as ds,bk as hs,bl as ys,bm as fs,bn as gs,bo as Ns,bp as bs,bq as Ts,br as Ss,bs as ws,bt as vs,bu as Os,bv as _s,bw as ks,bx as As,by as Is,bz as Tt,bA as Es,bB as $s,bC as Ds,bD as zs,bE as Ls,bF as Vs,bG as Cs,bH as Ps,bI as xs,bJ as Fs,bK as ke,bL as js,bM as Rs,bN as Bs,bO as Hs,bP as qs,bQ as Ws,bR as Gs,bS as Ks,bT as Us,bU as Js,bV as Xs,bW as Zs,bX as Qs,bY as Ys,bZ as Ms,b_ as er,b$ as tr,c0 as ar,c1 as sr,c2 as rr,c3 as nr,c4 as ir,c5 as or,c6 as ur,c7 as pr,c8 as mr,c9 as lr,ca as cr,cb as dr,cc as hr,cd as yr,ce as fr,cf as gr,cg as Nr,ch as br,ci as Tr,cj as Sr,ck as wr,cl as vr,cm as Or,cn as _r,co as kr,cp as Ar,cq as Ir,cr as Er,cs as $r,ct as Dr,cu as zr,cv as Lr,cw as Vr,cx as Cr,cy as Pr,cz as xr,cA as Fr,cB as jr,cC as Rr,cD as Br,cE as Hr,cF as qr,cG as Wr,cH as Gr,cI as Kr,cJ as Ur,cK as Jr,cL as Xr,cM as ue,cN as Zr,cO as Qr,cP as Yr,cQ as Mr,cR as en,cS as fe,cT as Ae,cU as tn,cV as an,cW as sn,cX as rn,cY as nn,cZ as on,c_ as un,c$ as pn,d0 as le,d1 as mn,d2 as ln,d3 as cn,d4 as dn,d5 as G,d6 as P,d7 as ge,d8 as hn,d9 as yn}from"./index-C1lxb9Ju.js";/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function fn(a){v(Array.isArray(a),()=>"The argument passed to tf.addN() must be a list of tensors"),v(a.length>=1,()=>`Must pass at least one tensor to tf.addN(), but got ${a.length}`);const e=a.map((r,n)=>N(r,`tensors${n}`,"addN")),t=e[0];e.forEach(r=>{if(r.dtype!==t.dtype)throw new Error("All tensors passed to tf.addN() must have the same dtype")}),e.forEach(r=>{if(!oe(r.shape,t.shape))throw new Error("All tensors passed to tf.addN() must have the same shape")});const s=e;return D.runKernel(Et,s)}const gn=w({addN_:fn});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Nn(a,e,t,s,r,n){const u=N(a,"forgetBias","basicLSTMCell"),o=N(e,"lstmKernel","basicLSTMCell"),p=N(t,"lstmBias","basicLSTMCell"),m=N(s,"data","basicLSTMCell"),l=N(r,"c","basicLSTMCell"),c=N(n,"h","basicLSTMCell"),d=ae([m,c],1),h=Z(d,o),g=K(h,p),f=g.shape[0],y=g.shape[1]/4,b=[f,y],S=E(g,[0,0],b),k=E(g,[0,y],b),T=E(g,[0,y*2],b),O=E(g,[0,y*3],b),A=K(R(ie(S),Oe(k)),R(l,ie(K(u,T)))),I=R(Oe(A),ie(O));return[A,I]}const bn=w({basicLSTMCell_:Nn});/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Tn(a,e){const t=N(a,"x","bitwiseAnd"),s=N(e,"y","bitwiseAnd");if(!oe(t.shape,s.shape))throw new Error(`BitwiseAnd: Tensors must have the same shape. x: ${t.shape}, y: ${s.shape}`);if(t.dtype!=="int32"||s.dtype!=="int32")throw new Error(`BitwiseAnd: Only supports 'int32' values in tensor, found type of x: ${t.dtype} and type of y: ${s.dtype}`);const r={a:t,b:s};return D.runKernel($t,r)}const Sn=w({bitwiseAnd_:Tn});/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function wn(a,e){const t=N(a,"s0","broadcastArgs","int32"),s=N(e,"s1","broadcastArgs","int32");if(t.rank!==1)throw new Error(`broadcastArgs(): first input must be a vector (rank=1). Has rank ${t.rank}`);if(s.rank!==1)throw new Error(`broadcastArgs(): second input must be a vector (rank=1). Has rank ${s.rank}`);const r={s0:t,s1:s};return D.runKernel(Dt,r)}const vn=w({broadcastArgs_:wn});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function On(a){const t={x:N(a,"x","diag")};return D.runKernel(zt,t)}const _n=w({diag_:On});/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function kn(a,e){const t=N(a,"x","ensureShape","string_or_numeric");if(!Lt(t.shape,e))throw new Error(`EnsureShape: Shape of tensor ${t.shape} is not compatible with expected shape ${e}`);return a}const An=w({ensureShape_:kn});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function In(a,e,t){if(t<=0)throw new Error("The number of values should be positive.");const s={start:a,stop:e,num:t};return D.runKernel(Vt,{},s)}/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const ce=2147483648;function En(a,e,t="left"){const s=N(a,"sortedSequence","searchSorted"),r=N(e,"values","searchSorted"),n=s.shape[s.shape.length-1],u=r.shape[r.shape.length-1],o=_(s,[-1,n]),p=_(r,[-1,u]);if(o.rank<2)throw new Error("Sorted input argument must be at least 2-dimensional");if(o.shape[0]!==p.shape[0])throw new Error("Leading dimension of 'sortedSequence' and 'values' must match.");if(ye(p.shape)>=ce)throw new Error(`values tensor size must less than ${ce}`);if(o.shape[1]>=ce)throw new Error(`trailing dim_size must less than ${ce} for int32 output type, was ${o.shape[1]}`);const m={sortedSequence:o,values:p},l={side:t};return D.runKernel(Ct,m,l)}const Be=w({searchSorted_:En});/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function $n(a,e){return Be(a,e,"left")}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Dn(a,e,t,s,r=!1){const u={x:N(a,"x","maxPoolWithArgmax")},o={filterSize:e,strides:t,pad:s,includeBatchInIndex:r},p=D.runKernel(Pt,u,o);return{result:p[0],indexes:p[1]}}const zn=w({maxPoolWithArgmax_:Dn});/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Ln(a,e,{indexing:t="xy"}={}){if(t!=="xy"&&t!=="ij")throw new TypeError(`${t} is not a valid third argument to meshgrid`);if(a===void 0)return[];let s=N(a,"x","meshgrid",a instanceof H?a.dtype:"float32");if(e===void 0)return[s];let r=N(e,"y","meshgrid",e instanceof H?e.dtype:"float32");const n=ye(s.shape),u=ye(r.shape);return t==="xy"?(s=_(s,[1,-1]),r=_(r,[-1,1]),[Z(ne([u,1],s.dtype),s),Z(r,ne([1,n],r.dtype))]):(s=_(s,[-1,1]),r=_(r,[1,-1]),[Z(s,ne([1,u],s.dtype)),Z(ne([n,1],r.dtype),r)])}function Vn(a,e,t,s){const r=N(e,"data","multiRNNCell"),n=We(t,"c","multiRNNCell"),u=We(s,"h","multiRNNCell");let o=r;const p=[];for(let c=0;c<a.length;c++){const d=a[c](o,n[c],u[c]);p.push(d[0]),p.push(d[1]),o=d[1]}const m=[],l=[];for(let c=0;c<p.length;c+=2)m.push(p[c]),l.push(p[c+1]);return[m,l]}const Cn=w({multiRNNCell_:Vn});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Pn(a,e,t,s=!1){const r=N(a,"logits","multinomial"),n=r.size,u=r.rank;if(n<2)throw new Error(`Error in multinomial: you need at least 2 outcomes, but got ${n}.`);if(u>2)throw new Error(`Rank of probabilities must be 1 or 2, but is ${u}`);t=t||Math.random();const p={logits:u===1?_(r,[1,-1]):r},m={numSamples:e,seed:t,normalized:s},l=D.runKernel(xt,p,m);return u===1?_(l,[l.size]):l}const xn=w({multinomial_:Pn});function Fn(a,e){const t=N(a,"v1","outerProduct"),s=N(e,"v2","outerProduct");v(t.rank===1&&s.rank===1,()=>`Error in outerProduct: inputs must be rank 1, but got ranks ${t.rank} and ${s.rank}.`);const r=_(t,[-1,1]),n=_(s,[1,-1]);return Z(r,n)}const jn=w({outerProduct_:Fn});function Rn(a,e,t=0){return v(e.length===2,()=>"Invalid number of paddings. Must be length of 2."),pe(a,[e],t)}const Bn=w({pad1d_:Rn});function Hn(a,e,t=0){return v(e.length===2&&e[0].length===2&&e[1].length===2,()=>"Invalid number of paddings. Must be length of 2 each."),pe(a,e,t)}const qn=w({pad2d_:Hn});function Wn(a,e,t=0){return v(e.length===3&&e[0].length===2&&e[1].length===2&&e[2].length===2,()=>"Invalid number of paddings. Must be length of 2 each."),pe(a,e,t)}const Gn=w({pad3d_:Wn});function Kn(a,e,t=0){return v(e.length===4&&e[0].length===2&&e[1].length===2&&e[2].length===2&&e[3].length===2,()=>"Invalid number of paddings. Must be length of 2 each."),pe(a,e,t)}const Un=w({pad4d_:Kn});/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Jn(a,e,t,s){const r=a.map((l,c)=>N(l,`tensors${c}`,"raggedGather","int32")),n=N(e,"paramsDenseValues","raggedGather"),u=N(t,"indices","raggedGather","int32"),o={paramsNestedSplits:r,paramsDenseValues:n,indices:u},p={outputRaggedRank:s},m=D.runKernel(Ft,o,p);return{outputNestedSplits:m.slice(0,m.length-1),outputDenseValues:m[m.length-1]}}const Xn=w({raggedGather_:Jn});/**
 * @license
 * Copyright 2022 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Zn(a,e,t){const s=N(a,"starts","raggedRange"),r=N(e,"limits","raggedRange",s.dtype),n=N(t,"deltas","raggedRange",s.dtype),u={starts:s,limits:r,deltas:n},o=D.runKernel(jt,u);return{rtNestedSplits:o[0],rtDenseValues:o[1]}}const Qn=w({raggedRange_:Zn});/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Yn(a,e,t,s,r){const n=N(a,"shape","raggedTensorToTensor","int32"),u=N(e,"values","raggedTensorToTensor"),o=N(t,"defaultValue","raggedTensorToTensor",u.dtype),p=s.map((c,d)=>N(c,`tensors${d}`,"raggedTensorToTensor","int32")),m={shape:n,values:u,defaultValue:o,rowPartitionTensors:p},l={rowPartitionTypes:r};return D.runKernel(Rt,m,l)}const Mn=w({raggedTensorToTensor_:Yn});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ei(a,e,t){Te(a);const s=ye(a);let r=null;if(t==null||t==="float32")r=new Float32Array(s);else if(t==="int32")r=new Int32Array(s);else if(t==="bool")r=new Uint8Array(s);else throw new Error(`Unknown data type ${t}`);for(let n=0;n<s;n++)r[n]=e();return D.makeTensor(r,a,t)}const ti=w({rand_:ei});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ai(a,e,t=1,s="float32",r){if(Te(a),t==null&&(t=1),s==null&&(s="float32"),s!=="float32"&&s!=="int32")throw new Error(`Unsupported data type ${s}`);const n=new Bt(e,t,s,r),u=it(a,s);for(let o=0;o<u.values.length;o++)u.values[o]=n.nextValue();return u.toTensor()}const si=w({randomGamma_:ai});/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ri(a,e,t){if(e!=null&&e==="bool")throw new Error(`Unsupported data type ${e}`);return ot(a,0,1,e,t)}const ni=w({randomStandardNormal_:ri});/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ii(a,e,t,s){return ut(a,e,t,"int32",s)}const oi=w({randomUniformInt_:ii});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ui(a){const e=N(a,"x","reverse");return v(e.rank===1,()=>`Error in reverse1D: x must be rank 1 but got rank ${e.rank}.`),me(e,0)}const pi=w({reverse1d_:ui});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function mi(a,e){const t=N(a,"x","reverse");return v(t.rank===2,()=>`Error in reverse2D: x must be rank 2 but got rank ${t.rank}.`),me(t,e)}const li=w({reverse2d_:mi});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ci(a,e){const t=N(a,"x","reverse");return v(t.rank===3,()=>`Error in reverse3D: x must be rank 3 but got rank ${t.rank}.`),me(t,e)}const di=w({reverse3d_:ci});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function hi(a,e){const t=N(a,"x","reverse");return v(t.rank===4,()=>`Error in reverse4D: x must be rank 4 but got rank ${t.rank}.`),me(t,e)}const yi=w({reverse4d_:hi});/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */async function fi(a,e){const t=N(a,"x","setdiff1d"),s=N(e,"y","setdiff1d");v(t.dtype===s.dtype,()=>`x and y should have the same dtype, but got x (${t.dtype}) and y (${s.dtype}).`),v(t.rank===1,()=>`x should be 1D tensor, but got x (${t.shape}).`),v(s.rank===1,()=>`y should be 1D tensor, but got y (${s.shape}).`);const r=await t.data(),n=await s.data(),u=new Set(n);let o=0;for(let l=0;l<r.length;l++)u.has(r[l])||o++;const p=new Ge([o],t.dtype),m=new Ge([o],"int32");for(let l=0,c=0;l<r.length;l++)u.has(r[l])||(p.values[c]=r[l],m.values[c]=l,c++);return[p.toTensor(),m.toTensor()]}const gi=fi;/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Ni(a,e,t){if(pt(a),e!=null&&e.length!==5)throw new Error("tensor5d() requires shape to have five numbers");const s=mt(a,t);if(s.length!==5&&s.length!==1)throw new Error("tensor5d() requires values to be number[][][][][] or flat/TypedArray");if(s.length===1&&e==null)throw new Error("tensor5d() requires shape to be provided when `values` are a flat array");return lt(a,e,s,t)}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function bi(a,e,t){if(pt(a),e!=null&&e.length!==6)throw new Error("tensor6d() requires shape to have six numbers");const s=mt(a,t);if(s.length!==6&&s.length!==1)throw new Error("tensor6d() requires values to be number[][][][][][] or flat/TypedArray");if(s.length===1&&e==null)throw new Error("tensor6d() requires shape to be provided when `values` are a flat array");return e=e||s,lt(a,e,s,t)}/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Ti(a,e,t){const s=N(a,"tensor","tensorScatterupdate"),r=N(e,"indices","tensorScatterupdate","int32"),n=N(t,"updates","tensorScatterupdate");if(ct(n,r,s.shape),s.dtype!==n.dtype)throw new Error(`tensor and updates must have the same dtype, instead they are ${s.dtype} and ${n.dtype}.`);const u={tensor:s,indices:r,updates:n},o={};return D.runKernel(Ht,u,o)}const Si=w({tensorScatterUpdate_:Ti});/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function wi(a,e){return Be(a,e,"right")}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */async function vi(a){const e=N(a,"condition","whereAsync","bool"),t=await e.data(),s=qt(e.shape,t);return a!==e&&e.dispose(),s}const St=vi;/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */async function Oi(a,e,t){const s=N(a,"tensor","boolMask"),r=N(e,"mask","boolMask","bool"),n=t??0,u=r.rank,o=s.shape;v(u>0,()=>"mask cannot be scalar"),dt(o.slice(n,n+u),r.shape,"mask's shape must match the first K dimensions of tensor's shape,");let p=1;for(let f=n;f<n+u;f++)p*=o[f];const m=o.slice(0,n).concat([p],o.slice(n+u)),l=_(s,m),c=_(r,[-1]),d=await St(c),h=te(d,[1]),g=ht(l,h,n);return a!==s&&s.dispose(),e!==r&&r.dispose(),h.dispose(),l.dispose(),c.dispose(),d.dispose(),g}const _i=Oi;/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ki(a,e,t,s,r=!0){const n=N(a,"v","movingAverage"),u=N(e,"x","movingAverage"),o=N(t,"decay","movingAverage");Wt(n,u),v(oe(n.shape,u.shape),()=>"Shape mismatch in v and x");const p=U(1),m=J(p,o);let l=R(J(u,n),m);if(r){v(s!=null,()=>"When using zeroDebias: true, step is required.");const c=N(s,"step","movingAverage");l=Q(l,J(p,yt(o,c)))}return K(n,l)}const Ai=w({movingAverage_:ki});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Ii(a,e,t){Te(t);const s=N(a,"indices","scatterND","int32"),r=N(e,"updates","scatterND");ct(r,s,t);const n={indices:s,updates:r},u={shape:t};return D.runKernel(Gt,n,u)}const Ei=w({scatterND_:Ii});function $i(a,e,t,s){if(a.dtype!=="int32")throw new Error(`tf.sparseToDense() expects the indices to be int32 type, but the dtype was ${a.dtype}.`);if(a.rank>2)throw new Error(`sparseIndices should be a scalar, vector, or matrix, but got shape ${a.shape}.`);const r=a.rank>0?a.shape[0]:1,n=a.rank>1?a.shape[1]:1;if(t.length!==n)throw new Error(`outputShape has incorrect number of elements:, ${t.length}, should be: ${n}.`);const u=e.size;if(!(e.rank===0||e.rank===1&&u===r))throw new Error(`sparseValues has incorrect shape ${e.shape}, should be [] or [${r}]`);if(e.dtype!==s.dtype)throw new Error("sparseValues.dtype must match defaultValues.dtype")}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Di(a,e,t,s=0){Te(t);const r=N(a,"sparseIndices","sparseToDense","int32"),n=N(e,"sparseValues","sparseToDense","string_or_numeric"),u=N(s,"defaultValue","sparseToDense",n.dtype);$i(r,n,t,u);const o={sparseIndices:r,sparseValues:n,defaultValue:u},p={outputShape:t};return D.runKernel(Kt,o,p)}const zi=w({sparseToDense_:Di});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Li(a,e){const t=N(e,"indices","gatherND","int32"),r={params:N(a,"x","gatherND","string_or_numeric"),indices:t};return D.runKernel(Ut,r)}const Vi=w({gatherND_:Li});/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */async function Ci(a,e,t=1){const s=N(a,"predictions","inTopK"),r=N(e,"targets","inTopK");v(s.rank>1,()=>`inTopK() expects the predictions to be of rank 2 or higher, but got ${s.rank}`),v(s.rank-1===r.rank,()=>`predictions rank should be 1 larger than targets rank, but got predictions rank ${s.rank} and targets rank ${r.rank}`),dt(s.shape.slice(0,s.shape.length-1),r.shape,"predictions's shape should be align with the targets' shape, except the last dimension.");const n=s.shape[s.shape.length-1];v(t>0&&t<=n,()=>`'k' passed to inTopK() must be > 0 && <= the predictions last dimension (${n}), but got ${t}`);const u=await s.data(),o=await r.data(),[p,m]=[u.length/n,n],l=Jt("bool",p);for(let c=0;c<p;c++){const d=c*m,h=u.subarray(d,d+m),g=[];for(let f=0;f<h.length;f++)g.push({value:h[f],index:f});g.sort((f,y)=>y.value-f.value),l[c]=0;for(let f=0;f<t;f++)if(g[f].index===o[c]){l[c]=1;break}}return a!==s&&s.dispose(),e!==r&&r.dispose(),se(l,r.shape,"bool")}const Pi=Ci;/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function xi({x:a,filter:e,strides:t,pad:s,dataFormat:r="NHWC",dilations:n=[1,1],dimRoundingMode:u,bias:o,activation:p="linear",preluActivationWeights:m,leakyreluAlpha:l}){if(Xt(D.state.gradientDepth,p)===!1){let O=ft(a,e,t,s,r,n,u);return o!=null&&(O=K(O,o)),Zt(O,p,m,l)}const c=N(a,"x","depthwiseConv2d","float32"),d=N(e,"filter","depthwiseConv2d","float32");let h=c,g=!1;c.rank===3&&(g=!0,h=_(c,[1,c.shape[0],c.shape[1],c.shape[2]])),v(h.rank===4,()=>`Error in fused depthwiseConv2d: input must be rank 4, but got rank ${h.rank}.`),v(d.rank===4,()=>`Error in fused depthwiseConv2d: filter must be rank 4, but got rank ${d.rank}.`),v(h.shape[3]===d.shape[2],()=>`Error in fused depthwiseConv2d: number of input channels (${h.shape[3]}) must match the inChannels dimension in filter ${d.shape[2]}.`),n==null&&(n=[1,1]),v(Qt(t,n),()=>`Error in fused depthwiseConv2d: Either strides or dilations must be 1. Got strides ${t} and dilations '${n}'`),Yt("fused depthwiseConv2d",s,u);const f=Mt(h.shape,d.shape,t,n,s,u,!0);let y;o!=null&&(y=N(o,"bias","fused conv2d"),[y]=ea(y,c),ta(f.outShape,y.shape));let b;m!=null&&(b=N(m,"prelu weights","fused depthwiseConv2d"));const S=(O,A)=>{v(aa(n),()=>`Error in gradient of fused depthwiseConv2d: dilation rates greater than 1 are not yet supported. Got dilations '${n}'`);const[I,C,$,z]=A,B=sa(O,$,p),Se=ra(C.shape,B,I,t,s,n,u),qe=na(C,B,I.shape,t,s,n,u);if(z!=null){const It=ia(y,B);return[Se,qe,It]}return[Se,qe]},k={x:h,filter:d,bias:y,preluActivationWeights:b},T={strides:t,pad:s,dataFormat:r,dilations:n,dimRoundingMode:u,activation:p,leakyreluAlpha:l};return o==null?Ke((A,I,C)=>{let $=D.runKernel(Ue,k,T);return C([I,A,$]),g&&($=_($,[$.shape[1],$.shape[2],$.shape[3]])),{value:$,gradFunc:S}})(h,d):Ke((A,I,C,$)=>{let z=D.runKernel(Ue,k,T);return $([I,A,z,C]),g&&(z=_(z,[z.shape[1],z.shape[2],z.shape[3]])),{value:z,gradFunc:S}})(h,d,y)}const Fi=w({fusedDepthwiseConv2d_:xi});/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const ji=Object.freeze(Object.defineProperty({__proto__:null,conv2d:oa,depthwiseConv2d:Fi,matMul:ua},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class we{constructor(e){this.modelArtifacts=e}load(){return this.modelArtifacts}}class wt{constructor(e){this.saveHandler=e}save(e){return this.saveHandler(e)}}class Ri{constructor(e){e.load&&(this.load=()=>Promise.resolve(e.load())),e.save&&(this.save=t=>Promise.resolve(e.save(t)))}}function Bi(a,e,t,s){const r=arguments;return new Ri(vt(...r))}function vt(a,e,t,s){return arguments.length===1?a.modelTopology!=null||a.weightSpecs!=null?new we(a):(console.warn("Please call tf.io.fromMemory() with only one argument. The argument should be of type ModelArtifacts. The multi-argument signature of tf.io.fromMemory() has been deprecated and will be removed in a future release."),new we({modelTopology:a})):(console.warn("Please call tf.io.fromMemory() with only one argument. The argument should be of type ModelArtifacts. The multi-argument signature of tf.io.fromMemory() has been deprecated and will be removed in a future release."),new we({modelTopology:a,weightSpecs:e,weightData:t,trainingConfig:s}))}function Hi(a){return new wt(a)}function qi(a){return new wt(a)}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Ot=Object.freeze(Object.defineProperty({__proto__:null,CompositeArrayBuffer:pa,browserFiles:ma,browserHTTPRequest:la,concatenateArrayBuffers:ca,copyModel:da,decodeWeights:ha,decodeWeightsStream:gt,encodeWeights:ya,fromMemory:Bi,fromMemorySync:vt,getLoadHandlers:fa,getModelArtifactsForJSON:ga,getModelArtifactsForJSONSync:Na,getModelArtifactsInfoForJSON:ba,getSaveHandlers:Ta,getWeightSpecs:Sa,http:wa,isHTTPScheme:va,listModels:Oa,loadWeights:_a,moveModel:ka,registerLoadRouter:Aa,registerSaveRouter:Ia,removeModel:Ea,weightsLoaderFactory:$a,withSaveHandler:Hi,withSaveHandlerSync:qi},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Wi={};function _t(a){return Wi[a]}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function i(a,e,t,s,r){const n=e.inputParams[a];if(n&&n.inputIndexStart!==void 0){const o=n.inputIndexStart,p=n.inputIndexEnd===0?void 0:n.inputIndexEnd===void 0?o+1:n.inputIndexEnd,m=o<0?e.inputNames.length+o:o;if(n.type==="tensor")return L(e.inputNames[m],t,s,r);if(n.type==="tensors"){const d=e.inputs.slice(o,p);return e.inputNames.slice(o,p).filter((g,f)=>{var y;return((y=d[f])===null||y===void 0?void 0:y.op)!=="NoOp"}).map(g=>L(g,t,s,r))}const l=L(e.inputNames[m],t,s,r),c=l.dataSync();return n.type==="number"?c[0]:Da(l.shape,c)}const u=e.attrParams[a];return u&&u.value}function L(a,e,t,s){const[r,n]=x(a,t);if(s!=null){const o=s.getHashTableHandleByName(r);if(o!=null)return o}const u=t.currentContextIds.find(o=>!!e[Ne(r,o)]);return u!==void 0?e[Ne(r,u)][n]:void 0}function Je(a,e,t){return e[Ne(a,t.currentContextId)]}function q(a,e){const[t,s,r]=x(a,e);return[Ne(t,e&&e.currentContextId),s,r]}function Ne(a,e){return e?`${a}-${e}`:a}function x(a,e){if(a==="")return["",0,void 0];const t=e!=null&&e.parseNodeNameCache!=null;if(t){const n=e.parseNodeNameCache.get(a);if(n!=null)return n}const s=a.split(":");let r;if(s.length===1)r=[a,0,void 0];else{const n=s[0],u=s.length===3?s[1]:void 0,o=Number(s[s.length-1]);r=[n,o,u]}return t&&e.parseNodeNameCache.set(a,r),r}function he(a,e,t){let s=i("pad",a,e,t);if(s==="explicit"){s=i("explicitPaddings",a,e,t);const r=[[0,0],[0,0],[0,0],[0,0]];for(let n=0;n<4;n++)r[n][0]=s[n*2],r[n][1]=s[n*2+1];return r}return s}function W(a){return a.kept?a:Nt(a)}/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Gi=[{tfOpName:"Add",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"AddV2",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"AddN",category:"arithmetic",inputs:[{start:0,end:0,name:"tensors",type:"tensors"}]},{tfOpName:"BiasAdd",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0}]},{tfOpName:"Sub",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"RealDiv",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Div",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"DivNoNan",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"FloorDiv",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Mul",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Maximum",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Minimum",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Pow",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"SquaredDifference",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Mod",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"FloorMod",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]}],Ki=Object.freeze(Object.defineProperty({__proto__:null,json:Gi},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Ui=[{tfOpName:"Abs",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Acos",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Asin",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Atan",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Atan2",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"y",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Ceil",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"ClipByValue",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"clipValueMin",type:"number"},{start:2,name:"clipValueMax",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Complex",category:"basic_math",inputs:[{start:0,name:"real",type:"tensor"},{start:1,name:"imag",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"ComplexAbs",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Cos",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Cosh",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Elu",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Exp",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Floor",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Log",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Imag",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"Tout",name:"outputType",type:"dtype",notSupported:!0}]},{tfOpName:"Neg",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Real",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"Tout",name:"outputType",type:"dtype",notSupported:!0}]},{tfOpName:"Prelu",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"alpha",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Relu",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Relu6",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Selu",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Sigmoid",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Sin",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Sinh",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Sqrt",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Rsqrt",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Square",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Tan",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Tanh",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Sign",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Round",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Expm1",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Log1p",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Reciprocal",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Softplus",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Asinh",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Acosh",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Atanh",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Erf",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"LeakyRelu",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"alpha",name:"alpha",type:"number",defaultValue:.2},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"IsNan",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"IsFinite",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"IsInf",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]}],Ji=Object.freeze(Object.defineProperty({__proto__:null,json:Ui},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Xi=[{tfOpName:"EmptyTensorList",category:"control",inputs:[{start:0,name:"elementShape",type:"shape"},{start:1,name:"maxNumElements",type:"number"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"LoopCond",category:"control",inputs:[{start:0,name:"pred",type:"tensor"}]},{tfOpName:"Switch",category:"control",inputs:[{start:0,name:"data",type:"tensor"},{start:1,name:"pred",type:"tensor"}]},{tfOpName:"Merge",category:"control",inputs:[{start:0,end:0,name:"tensors",type:"tensors"}]},{tfOpName:"Enter",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"frame_name",name:"frameName",type:"string"},{tfName:"is_constant",name:"isConstant",type:"bool"}]},{tfOpName:"Exit",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"NextIteration",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"TensorArrayV3",category:"control",inputs:[{start:0,name:"size",type:"number"}],attrs:[{tfName:"dtype",name:"dtype",type:"dtype"},{tfName:"element_shape",name:"elementShape",type:"shape"},{tfName:"dynamic_size",name:"dynamicSize",type:"bool"},{tfName:"clear_after_read",name:"clearAfterRead",type:"bool"},{tfName:"identical_element_shapes",name:"identicalElementShapes",type:"bool"},{tfName:"tensor_array_name",name:"name",type:"string"}]},{tfOpName:"TensorArrayWriteV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"},{start:1,name:"index",type:"number"},{start:2,name:"tensor",type:"tensor"},{start:3,name:"flowIn",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"TensorArrayReadV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"},{start:1,name:"index",type:"number"},{start:2,name:"flowIn",type:"number"}],attrs:[{tfName:"dtype",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"TensorArrayGatherV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"},{start:1,name:"indices",type:"number[]"},{start:2,name:"flowIn",type:"number"}],attrs:[{tfName:"dtype",name:"dtype",type:"dtype"},{tfName:"element_shape",name:"elementShape",type:"shape"}]},{tfOpName:"TensorArrayScatterV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"},{start:1,name:"indices",type:"number[]"},{start:2,name:"tensor",type:"tensor"},{start:3,name:"flowIn",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"TensorArrayConcatV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"},{start:1,name:"flowIn",type:"number"}],attrs:[{tfName:"dtype",name:"dtype",type:"dtype"},{tfName:"element_shape_except0",name:"elementShapeExcept0",type:"shape",notSupported:!0}]},{tfOpName:"TensorArraySplitV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"},{start:1,name:"tensor",type:"tensor"},{start:2,name:"lengths",type:"number[]"},{start:3,name:"flowIn",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"TensorArraySizeV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"},{start:1,name:"flowIn",type:"number"}]},{tfOpName:"TensorArrayCloseV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"}]},{tfOpName:"StatelessIf",category:"control",inputs:[{start:0,name:"cond",type:"tensor"},{start:1,end:0,name:"args",type:"tensors"}],attrs:[{tfName:"then_branch",name:"thenBranch",type:"func"},{tfName:"else_branch",name:"elseBranch",type:"func"}]},{tfOpName:"If",category:"control",inputs:[{start:0,name:"cond",type:"tensor"},{start:1,end:0,name:"args",type:"tensors"}],attrs:[{tfName:"then_branch",name:"thenBranch",type:"func"},{tfName:"else_branch",name:"elseBranch",type:"func"}]},{tfOpName:"StatelessWhile",category:"control",inputs:[{start:0,end:0,name:"args",type:"tensors"}],attrs:[{tfName:"cond",name:"cond",type:"func"},{tfName:"body",name:"body",type:"func"}]},{tfOpName:"While",category:"control",inputs:[{start:0,end:0,name:"args",type:"tensors"}],attrs:[{tfName:"cond",name:"cond",type:"func"},{tfName:"body",name:"body",type:"func"}]},{tfOpName:"TensorListScatter",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"},{start:1,name:"indices",type:"number[]"},{start:2,name:"elementShape",type:"shape"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListScatterV2",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"},{start:1,name:"indices",type:"number[]"},{start:2,name:"elementShape",type:"shape"},{start:3,name:"numElements",type:"number"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListGather",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"},{start:1,name:"indices",type:"number[]"},{start:2,name:"elementShape",type:"shape"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListGetItem",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"},{start:1,name:"index",type:"number"},{start:2,name:"elementShape",type:"shape"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListSetItem",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"},{start:1,name:"index",type:"number"},{start:2,name:"tensor",type:"tensor"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListReserve",category:"control",inputs:[{start:0,name:"elementShape",type:"shape"},{start:1,name:"numElements",type:"number"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListFromTensor",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"},{start:1,name:"elementShape",type:"shape"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListStack",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"},{start:1,name:"elementShape",type:"shape"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"},{tfName:"num_elements",name:"numElements",type:"dtype"}]},{tfOpName:"TensorListSplit",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"},{start:1,name:"elementShape",type:"shape"},{start:2,name:"lengths",type:"number[]"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListConcat",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"}],attrs:[{tfName:"element_shape",name:"elementShape",type:"shape"},{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListConcatV2",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"}],attrs:[{tfName:"element_shape",name:"elementShape",type:"shape"},{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListPopBack",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"},{start:1,name:"elementShape",type:"shape"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListPushBack",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"},{start:1,name:"tensor",type:"tensor"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListLength",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"}]},{tfOpName:"TensorListResize",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"},{start:1,name:"size",type:"number"}]}],Zi=Object.freeze(Object.defineProperty({__proto__:null,json:Xi},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Qi=[{tfOpName:"AvgPool",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0},{tfName:"ksize",name:"kernelSize",type:"number[]"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"MaxPool",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0},{tfName:"ksize",name:"kernelSize",type:"number[]"},{tfName:"explicit_paddings",name:"explicitPaddings",type:"number[]",defaultValue:[],notSupported:!0},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"MaxPoolWithArgmax",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"ksize",name:"kernelSize",type:"number[]"},{tfName:"include_batch_in_index",name:"includeBatchInIndex",type:"bool"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"AvgPool3D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0},{tfName:"ksize",name:"kernelSize",type:"number[]"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"MaxPool3D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0},{tfName:"ksize",name:"kernelSize",type:"number[]"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Conv1D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"}],attrs:[{tfName:"stride",name:"stride",type:"number"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NWC"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"dilation",name:"dilation",type:"number",defaultValue:1}]},{tfOpName:"Conv2D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"useCudnnOnGpu",name:"useCudnnOnGpu",type:"bool"},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NHWC"},{tfName:"explicit_paddings",name:"explicitPaddings",type:"number[]",defaultValue:[]},{tfName:"dilations",name:"dilations",type:"number[]"}]},{tfOpName:"_FusedConv2D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"},{start:2,end:0,name:"args",type:"tensors"}],attrs:[{tfName:"num_args",name:"numArgs",type:"number"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"explicit_paddings",name:"explicitPaddings",type:"number[]",defaultValue:[]},{tfName:"use_cudnn_on_gpu",name:"useCudnnOnGpu",type:"bool",defaultValue:!0},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NHWC"},{tfName:"dilations",name:"dilations",type:"number[]",defaultValue:[1,1,1,1]},{tfName:"fused_ops",name:"fusedOps",type:"string[]",defaultValue:[]},{tfName:"epsilon",name:"epsilon",type:"number",defaultValue:1e-4},{tfName:"leakyrelu_alpha",name:"leakyreluAlpha",type:"number",defaultValue:.2}]},{tfOpName:"Conv2DBackpropInput",category:"convolution",inputs:[{start:2,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"},{start:0,name:"outputShape",type:"number[]"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0},{tfName:"explicit_paddings",name:"explicitPaddings",type:"number[]",defaultValue:[]},{tfName:"dilations",name:"dilations",type:"number[]",notSupported:!0}]},{tfOpName:"DepthwiseConv2d",category:"convolution",inputs:[{start:0,name:"input",type:"tensor"},{start:1,name:"filter",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NHWC"},{tfName:"explicit_paddings",name:"explicitPaddings",type:"number[]",defaultValue:[]},{tfName:"dilations",name:"dilations",type:"number[]"}]},{tfOpName:"DepthwiseConv2dNative",category:"convolution",inputs:[{start:0,name:"input",type:"tensor"},{start:1,name:"filter",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NHWC"},{tfName:"explicit_paddings",name:"explicitPaddings",type:"number[]",defaultValue:[]},{tfName:"dilations",name:"dilations",type:"number[]"}]},{tfOpName:"FusedDepthwiseConv2dNative",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"},{start:2,end:0,name:"args",type:"tensors"}],attrs:[{tfName:"num_args",name:"numArgs",type:"number"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NHWC"},{tfName:"dilations",name:"dilations",type:"number[]",defaultValue:[1,1,1,1]},{tfName:"fused_ops",name:"fusedOps",type:"string[]",defaultValue:[]},{tfName:"explicit_paddings",name:"explicitPaddings",type:"number[]",defaultValue:[]}]},{tfOpName:"Conv3D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NHWC"},{tfName:"dilations",name:"dilations",type:"number[]"}]},{tfOpName:"Dilation2D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"rates",name:"dilations",type:"number[]"},{tfName:"padding",name:"pad",type:"string"}]}],Yi=Object.freeze(Object.defineProperty({__proto__:null,json:Qi},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Mi=[{tfOpName:"Fill",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"},{start:1,name:"value",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"LinSpace",category:"creation",inputs:[{start:0,name:"start",type:"number"},{start:1,name:"stop",type:"number"},{start:2,name:"num",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"OneHot",category:"creation",inputs:[{start:0,name:"indices",type:"tensor"},{start:1,name:"depth",type:"number"},{start:2,name:"onValue",type:"number",defaultValue:1},{start:3,name:"offValue",type:"number",defaultValue:0}],attrs:[{tfName:"axis",name:"axis",type:"number",notSupported:!0},{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"Ones",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"}],attrs:[{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"OnesLike",category:"creation",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"dtype",name:"dtype",type:"dtype"}]},{tfOpName:"RandomStandardNormal",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"}],attrs:[{tfName:"seed",name:"seed",type:"number",defaultValue:0},{tfName:"seed2",name:"seed2",type:"number",defaultValue:0,notSupported:!0},{tfName:"dtype",name:"dtype",type:"dtype"},{tfName:"T",name:"T",type:"number",notSupported:!0}]},{tfOpName:"RandomUniform",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"}],attrs:[{tfName:"minval",name:"minval",type:"number",defaultValue:0},{tfName:"maxval",name:"maxval",type:"number",defaultValue:1},{tfName:"dtype",name:"dtype",type:"dtype"},{tfName:"seed",name:"seed",type:"number",defaultValue:0},{tfName:"seed2",name:"seed2",type:"number",defaultValue:0,notSupported:!0},{tfName:"T",name:"T",type:"number",notSupported:!0}]},{tfOpName:"RandomUniformInt",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"}],attrs:[{tfName:"minval",name:"minval",type:"number"},{tfName:"maxval",name:"maxval",type:"number"},{tfName:"seed",name:"seed",type:"number",defaultValue:0},{tfName:"seed2",name:"seed2",type:"number",defaultValue:0,notSupported:!0}]},{tfOpName:"Range",category:"creation",inputs:[{start:0,name:"start",type:"number"},{start:1,name:"stop",type:"number"},{start:2,name:"step",type:"number",defaultValue:0}],attrs:[{tfName:"Tidx",name:"dtype",type:"dtype"}]},{tfOpName:"TruncatedNormal",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"}],attrs:[{tfName:"means",name:"mean",type:"number",defaultValue:0},{tfName:"stddev",name:"stdDev",type:"number",defaultValue:1},{tfName:"seed",name:"seed",type:"number"},{tfName:"seed2",name:"seed2",type:"number",defaultValue:0,notSupported:!0},{tfName:"dtype",name:"dtype",type:"dtype"},{tfName:"T",name:"T",type:"number",notSupported:!0}]},{tfOpName:"Zeros",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"}],attrs:[{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"ZerosLike",category:"creation",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"Multinomial",category:"creation",inputs:[{start:0,name:"logits",type:"tensor"},{start:1,name:"numSamples",type:"number"}],attrs:[{tfName:"seed",name:"seed",type:"number"},{tfName:"seed2",name:"seed2",type:"number"},{tfName:"T",name:"dtype",type:"dtype"},{tfName:"output_dtype",name:"output_dtype",type:"dtype"}]}],eo=Object.freeze(Object.defineProperty({__proto__:null,json:Mi},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const to=[{tfOpName:"NonMaxSuppressionV2",category:"dynamic",inputs:[{start:0,name:"boxes",type:"tensor"},{start:1,name:"scores",type:"tensor"},{start:2,name:"maxOutputSize",type:"number"},{start:3,name:"iouThreshold",type:"number"}]},{tfOpName:"NonMaxSuppressionV3",category:"dynamic",inputs:[{start:0,name:"boxes",type:"tensor"},{start:1,name:"scores",type:"tensor"},{start:2,name:"maxOutputSize",type:"number"},{start:3,name:"iouThreshold",type:"number"},{start:4,name:"scoreThreshold",type:"number"}]},{tfOpName:"NonMaxSuppressionV4",category:"dynamic",inputs:[{start:0,name:"boxes",type:"tensor"},{start:1,name:"scores",type:"tensor"},{start:2,name:"maxOutputSize",type:"number"},{start:3,name:"iouThreshold",type:"number"},{start:4,name:"scoreThreshold",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"T_threshold",name:"threshold",type:"dtype",notSupported:!0},{tfName:"pad_to_max_output_size",name:"padToMaxOutputSize",type:"bool"}]},{tfOpName:"NonMaxSuppressionV5",category:"dynamic",inputs:[{start:0,name:"boxes",type:"tensor"},{start:1,name:"scores",type:"tensor"},{start:2,name:"maxOutputSize",type:"number"},{start:3,name:"iouThreshold",type:"number"},{start:4,name:"scoreThreshold",type:"number"},{start:5,name:"softNmsSigma",type:"number"}]},{tfOpName:"Where",category:"dynamic",inputs:[{start:0,name:"condition",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"ListDiff",category:"dynamic",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"y",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]}],ao=Object.freeze(Object.defineProperty({__proto__:null,json:to},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const so=[{tfOpName:"LowerBound",category:"evaluation",inputs:[{start:0,name:"sortedSequence",type:"tensor"},{start:1,name:"values",type:"tensor"}]},{tfOpName:"TopKV2",category:"evaluation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"k",type:"number"}],attrs:[{tfName:"sorted",name:"sorted",type:"bool"}]},{tfOpName:"UpperBound",category:"evaluation",inputs:[{start:0,name:"sortedSequence",type:"tensor"},{start:1,name:"values",type:"tensor"}]},{tfOpName:"Unique",category:"evaluation",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"UniqueV2",category:"evaluation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number"}]}],ro=Object.freeze(Object.defineProperty({__proto__:null,json:so},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const no=[{tfOpName:"PlaceholderWithDefault",category:"graph",inputs:[{start:0,name:"default",type:"tensor"}],attrs:[{tfName:"shape",name:"shape",type:"shape"},{tfName:"dtype",name:"dtype",type:"dtype"}]},{tfOpName:"Placeholder",category:"graph",attrs:[{tfName:"shape",name:"shape",type:"shape"},{tfName:"dtype",name:"dtype",type:"dtype"}]},{tfOpName:"Const",category:"graph"},{tfOpName:"Identity",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"IdentityN",category:"graph",inputs:[{start:0,end:0,name:"x",type:"tensors"}]},{tfOpName:"Snapshot",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"Rank",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"Size",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"Shape",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"ShapeN",category:"graph",inputs:[{start:0,end:0,name:"x",type:"tensors"}]},{tfOpName:"Print",category:"graph",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"data",type:"tensors"}],attrs:[{tfName:"message",name:"message",type:"string"},{tfName:"first_n",name:"firstN",type:"number",notSupported:!0},{tfName:"summarize",name:"summarize",type:"number",defaultValue:3}]},{tfOpName:"NoOp",category:"graph",inputs:[]},{tfOpName:"StopGradient",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"FakeQuantWithMinMaxVars",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"min",name:"min",type:"number"},{tfName:"max",name:"max",type:"number"}]}],io=Object.freeze(Object.defineProperty({__proto__:null,json:no},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const oo=[{tfOpName:"HashTable",category:"hash_table",inputs:[],attrs:[{tfName:"shared_name",name:"sharedName",type:"string"},{tfName:"use_node_name_sharing",name:"useNodeNameSharing",type:"bool"},{tfName:"key_dtype",name:"keyDType",type:"dtype"},{tfName:"value_dtype",name:"valueDType",type:"dtype"}]},{tfOpName:"HashTableV2",category:"hash_table",inputs:[],attrs:[{tfName:"shared_name",name:"sharedName",type:"string"},{tfName:"use_node_name_sharing",name:"useNodeNameSharing",type:"bool"},{tfName:"key_dtype",name:"keyDType",type:"dtype"},{tfName:"value_dtype",name:"valueDType",type:"dtype"}]},{tfOpName:"LookupTableImport",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"},{start:1,name:"keys",type:"tensor"},{start:2,name:"values",type:"tensor"}],attrs:[{tfName:"Tin",name:"tIn",type:"dtype",notSupported:!0},{tfName:"Tout",name:"tOut",type:"dtype",notSupported:!0}]},{tfOpName:"LookupTableImportV2",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"},{start:1,name:"keys",type:"tensor"},{start:2,name:"values",type:"tensor"}],attrs:[{tfName:"Tin",name:"tIn",type:"dtype",notSupported:!0},{tfName:"Tout",name:"tOut",type:"dtype",notSupported:!0}]},{tfOpName:"LookupTableFind",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"},{start:1,name:"keys",type:"tensor"},{start:2,name:"defaultValue",type:"tensor"}],attrs:[{tfName:"Tin",name:"tIn",type:"dtype",notSupported:!0},{tfName:"Tout",name:"tOut",type:"dtype",notSupported:!0}]},{tfOpName:"LookupTableFindV2",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"},{start:1,name:"keys",type:"tensor"},{start:2,name:"defaultValue",type:"tensor"}],attrs:[{tfName:"Tin",name:"tIn",type:"dtype",notSupported:!0},{tfName:"Tout",name:"tOut",type:"dtype",notSupported:!0}]},{tfOpName:"LookupTableSize",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"}]},{tfOpName:"LookupTableSizeV2",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"}]},{tfOpName:"InitializeTable",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"},{start:1,name:"keys",type:"tensor"},{start:2,name:"values",type:"tensor"}]},{tfOpName:"InitializeTableV2",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"},{start:1,name:"keys",type:"tensor"},{start:2,name:"values",type:"tensor"}]}],uo=Object.freeze(Object.defineProperty({__proto__:null,json:oo},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const po=[{tfOpName:"ResizeBilinear",category:"image",inputs:[{start:0,name:"images",type:"tensor"},{start:1,name:"size",type:"number[]"}],attrs:[{tfName:"align_corners",name:"alignCorners",type:"bool"},{tfName:"half_pixel_centers",name:"halfPixelCenters",type:"bool"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"ResizeNearestNeighbor",category:"image",inputs:[{start:0,name:"images",type:"tensor"},{start:1,name:"size",type:"number[]"}],attrs:[{tfName:"align_corners",name:"alignCorners",type:"bool"},{tfName:"half_pixel_centers",name:"halfPixelCenters",type:"bool"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"CropAndResize",category:"image",inputs:[{start:0,name:"image",type:"tensor"},{start:1,name:"boxes",type:"tensor"},{start:2,name:"boxInd",type:"tensor"},{start:3,name:"cropSize",type:"number[]"}],attrs:[{tfName:"method",name:"method",type:"string"},{tfName:"extrapolation_value",name:"extrapolationValue",type:"number"}]},{tfOpName:"ImageProjectiveTransformV3",category:"image",inputs:[{start:0,name:"images",type:"tensor"},{start:1,name:"transforms",type:"tensor"},{start:2,name:"outputShape",type:"number[]"},{start:3,name:"fillValue",type:"number"}],attrs:[{tfName:"interpolation",name:"interpolation",type:"string"},{tfName:"fill_mode",name:"fillMode",type:"string"}]}],mo=Object.freeze(Object.defineProperty({__proto__:null,json:po},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const lo=[{tfOpName:"Equal",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"NotEqual",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Greater",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"GreaterEqual",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Less",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"LessEqual",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"LogicalAnd",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"LogicalNot",category:"logical",inputs:[{start:0,name:"a",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"LogicalOr",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Select",category:"logical",inputs:[{start:0,name:"condition",type:"tensor"},{start:1,name:"a",type:"tensor"},{start:2,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"SelectV2",category:"logical",inputs:[{start:0,name:"condition",type:"tensor"},{start:1,name:"a",type:"tensor"},{start:2,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"BitwiseAnd",category:"logical",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"y",type:"tensor"}]}],co=Object.freeze(Object.defineProperty({__proto__:null,json:lo},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const ho=[{tfOpName:"_FusedMatMul",category:"matrices",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"},{start:2,end:0,name:"args",type:"tensors"}],attrs:[{tfName:"num_args",name:"numArgs",type:"number"},{tfName:"fused_ops",name:"fusedOps",type:"string[]",defaultValue:[]},{tfName:"epsilon",name:"epsilon",type:"number",defaultValue:1e-4},{tfName:"transpose_a",name:"transposeA",type:"bool",defaultValue:!1},{tfName:"transpose_b",name:"transposeB",type:"bool",defaultValue:!1},{tfName:"leakyrelu_alpha",name:"leakyreluAlpha",type:"number",defaultValue:.2},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"MatMul",category:"matrices",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"transpose_a",name:"transposeA",type:"bool",defaultValue:!1},{tfName:"transpose_b",name:"transposeB",type:"bool",defaultValue:!1},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"BatchMatMul",category:"matrices",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"adj_x",name:"transposeA",type:"bool",defaultValue:!1},{tfName:"adj_y",name:"transposeB",type:"bool",defaultValue:!1},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"BatchMatMulV2",category:"matrices",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"adj_x",name:"transposeA",type:"bool",defaultValue:!1},{tfName:"adj_y",name:"transposeB",type:"bool",defaultValue:!1},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Transpose",category:"matrices",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"perm",type:"number[]"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Einsum",category:"matrices",inputs:[{start:0,end:0,name:"tensors",type:"tensors"}],attrs:[{tfName:"equation",name:"equation",type:"string"},{tfName:"N",name:"n",type:"number",defaultValue:2},{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"MatrixBandPart",category:"matrices",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"numLower",type:"tensor"},{start:1,name:"numUpper",type:"tensor"}]}],yo=Object.freeze(Object.defineProperty({__proto__:null,json:ho},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const fo=[{tfOpName:"EuclideanNorm",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool",defaultValue:!1}]},{tfOpName:"FusedBatchNorm",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"scale",type:"tensor"},{start:2,name:"offset",type:"tensor"},{start:3,name:"mean",type:"tensor"},{start:4,name:"variance",type:"tensor"}],attrs:[{tfName:"epsilon",name:"epsilon",type:"number",defaultValue:.001},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0}]},{tfOpName:"FusedBatchNormV2",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"scale",type:"tensor"},{start:2,name:"offset",type:"tensor"},{start:3,name:"mean",type:"tensor"},{start:4,name:"variance",type:"tensor"}],attrs:[{tfName:"epsilon",name:"epsilon",type:"number",defaultValue:.001},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0}]},{tfOpName:"FusedBatchNormV3",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"scale",type:"tensor"},{start:2,name:"offset",type:"tensor"},{start:3,name:"mean",type:"tensor"},{start:4,name:"variance",type:"tensor"}],attrs:[{tfName:"epsilon",name:"epsilon",type:"number",defaultValue:.001},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0}]},{tfOpName:"LRN",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"depth_radius",name:"radius",type:"number",defaultValue:5},{tfName:"bias",name:"bias",type:"number",defaultValue:1},{tfName:"alpha",name:"alpha",type:"number",defaultValue:1},{tfName:"beta",name:"beta",type:"number",defaultValue:.5}]},{tfOpName:"Softmax",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"LogSoftmax",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"}]}],go=Object.freeze(Object.defineProperty({__proto__:null,json:fo},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const No=[{tfOpName:"Bincount",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"size",type:"number"},{start:2,name:"weights",type:"tensor"}]},{tfOpName:"DenseBincount",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"size",type:"number"},{start:2,name:"weights",type:"tensor"}],attrs:[{tfName:"binary_output",name:"binaryOutput",type:"bool"}]},{tfOpName:"Max",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"}]},{tfOpName:"Mean",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"}]},{tfOpName:"Min",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"}]},{tfOpName:"Sum",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"}]},{tfOpName:"All",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"}]},{tfOpName:"Any",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"}]},{tfOpName:"ArgMax",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number"}]},{tfOpName:"ArgMin",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number"}]},{tfOpName:"Prod",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Cumprod",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number"}],attrs:[{tfName:"exclusive",name:"exclusive",type:"bool"},{tfName:"reverse",name:"reverse",type:"bool"}]},{tfOpName:"Cumsum",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number"}],attrs:[{tfName:"exclusive",name:"exclusive",type:"bool"},{tfName:"reverse",name:"reverse",type:"bool"}]}],bo=Object.freeze(Object.defineProperty({__proto__:null,json:No},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const To=[{tfOpName:"ConcatV2",category:"slice_join",inputs:[{start:0,end:-1,name:"tensors",type:"tensors"},{start:-1,name:"axis",type:"number"}],attrs:[{tfName:"N",name:"n",type:"number",defaultValue:2}]},{tfOpName:"Concat",category:"slice_join",inputs:[{start:1,end:0,name:"tensors",type:"tensors"},{start:0,name:"axis",type:"number"}],attrs:[{tfName:"N",name:"n",type:"number",defaultValue:2}]},{tfOpName:"GatherV2",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"indices",type:"tensor"},{start:2,name:"axis",type:"number",defaultValue:0}],attrs:[{tfName:"batch_dims",name:"batchDims",type:"number",defaultValue:0}]},{tfOpName:"Gather",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"indices",type:"tensor"}],attrs:[{tfName:"validate_indices",name:"validateIndices",type:"bool",notSupported:!0}]},{tfOpName:"Reverse",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"dims",type:"bool[]"}]},{tfOpName:"ReverseV2",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}]},{tfOpName:"Slice",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"begin",type:"number[]"},{start:2,name:"size",type:"number[]"}]},{tfOpName:"StridedSlice",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"begin",type:"number[]"},{start:2,name:"end",type:"number[]"},{start:3,name:"strides",type:"number[]"}],attrs:[{tfName:"begin_mask",name:"beginMask",type:"number",defaultValue:0},{tfName:"end_mask",name:"endMask",type:"number",defaultValue:0},{tfName:"new_axis_mask",name:"newAxisMask",type:"number",defaultValue:0},{tfName:"ellipsis_mask",name:"ellipsisMask",type:"number",defaultValue:0},{tfName:"shrink_axis_mask",name:"shrinkAxisMask",type:"number",defaultValue:0}]},{tfOpName:"Pack",category:"slice_join",inputs:[{start:0,end:0,name:"tensors",type:"tensors"}],attrs:[{tfName:"axis",name:"axis",type:"number",defaultValue:0}]},{tfOpName:"Unpack",category:"slice_join",inputs:[{start:0,name:"tensor",type:"tensor"}],attrs:[{tfName:"axis",name:"axis",type:"number",defaultValue:0},{tfName:"num",name:"num",type:"number",defaultValue:0,notSupported:!0}]},{tfOpName:"Tile",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"reps",type:"number[]"}]},{tfOpName:"Split",category:"slice_join",inputs:[{start:0,name:"axis",type:"number",defaultValue:0},{start:1,name:"x",type:"tensor"}],attrs:[{tfName:"num_split",name:"numOrSizeSplits",type:"number",defaultValue:1}]},{tfOpName:"SplitV",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"numOrSizeSplits",type:"number[]"},{start:2,name:"axis",type:"number",defaultValue:0}]},{tfOpName:"ScatterNd",category:"slice_join",inputs:[{start:0,name:"indices",type:"tensor"},{start:1,name:"values",type:"tensor"},{start:2,name:"shape",type:"number[]"}]},{tfOpName:"GatherNd",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"indices",type:"tensor"}]},{tfOpName:"SparseToDense",category:"slice_join",inputs:[{start:0,name:"sparseIndices",type:"tensor"},{start:1,name:"outputShape",type:"number[]"},{start:2,name:"sparseValues",type:"tensor"},{start:3,name:"defaultValue",type:"tensor"}],attrs:[{tfName:"validate_indices",name:"validateIndices",type:"bool",defaultValue:!1,notSupported:!0}]},{tfOpName:"TensorScatterUpdate",category:"slice_join",inputs:[{start:0,name:"tensor",type:"tensor"},{start:1,name:"indices",type:"tensor"},{start:2,name:"values",type:"tensor"}]}],So=Object.freeze(Object.defineProperty({__proto__:null,json:To},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const wo=[{tfOpName:"SparseFillEmptyRows",category:"sparse",inputs:[{start:0,name:"indices",type:"tensor"},{start:1,name:"values",type:"tensor"},{start:2,name:"denseShape",type:"tensor"},{start:3,name:"defaultValue",type:"tensor"}]},{tfOpName:"SparseReshape",category:"sparse",inputs:[{start:0,name:"inputIndices",type:"tensor"},{start:1,name:"inputShape",type:"tensor"},{start:2,name:"newShape",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"SparseSegmentMean",category:"sparse",inputs:[{start:0,name:"data",type:"tensor"},{start:1,name:"indices",type:"tensor"},{start:2,name:"segmentIds",type:"tensor"}]},{tfOpName:"SparseSegmentSum",category:"sparse",inputs:[{start:0,name:"data",type:"tensor"},{start:1,name:"indices",type:"tensor"},{start:2,name:"segmentIds",type:"tensor"}]}],vo=Object.freeze(Object.defineProperty({__proto__:null,json:wo},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Oo=[{tfOpName:"FFT",category:"spectral",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"IFFT",category:"spectral",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"RFFT",category:"spectral",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"fft_length",type:"number",notSupported:!0}]},{tfOpName:"IRFFT",category:"spectral",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"fft_length",type:"number",notSupported:!0}]}],_o=Object.freeze(Object.defineProperty({__proto__:null,json:Oo},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const ko=[{tfOpName:"StaticRegexReplace",category:"string",inputs:[{start:0,name:"input",type:"tensor"}],attrs:[{tfName:"pattern",name:"pattern",type:"string"},{tfName:"rewrite",name:"rewrite",type:"string"},{tfName:"replace_global",name:"replaceGlobal",type:"bool"}]},{tfOpName:"StringNGrams",category:"string",inputs:[{start:0,name:"data",type:"tensor"},{start:1,name:"dataSplits",type:"tensor"}],attrs:[{tfName:"separator",name:"separator",type:"string"},{tfName:"ngram_widths",name:"nGramWidths",type:"number[]"},{tfName:"left_pad",name:"leftPad",type:"string"},{tfName:"right_pad",name:"rightPad",type:"string"},{tfName:"pad_width",name:"padWidth",type:"number"},{tfName:"preserve_short_sequences",name:"preserveShortSequences",type:"bool"}],outputs:["ngrams","ngrams_splits"]},{tfOpName:"StringSplit",category:"string",inputs:[{start:0,name:"input",type:"tensor"},{start:1,name:"delimiter",type:"tensor"}],attrs:[{tfName:"skip_empty",name:"skipEmpty",type:"bool"}],outputs:["indices","values","shape"]},{tfOpName:"StringToHashBucketFast",category:"string",inputs:[{start:0,name:"input",type:"tensor"}],attrs:[{tfName:"num_buckets",name:"numBuckets",type:"number"}]}],Ao=Object.freeze(Object.defineProperty({__proto__:null,json:ko},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Io=[{tfOpName:"Cast",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"SrcT",name:"sdtype",type:"dtype",notSupported:!0},{tfName:"DstT",name:"dtype",type:"dtype"}]},{tfOpName:"ExpandDims",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number"}]},{tfOpName:"MirrorPad",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"padding",type:"number[]"}],attrs:[{tfName:"mode",name:"mode",type:"string"}]},{tfOpName:"Pad",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"padding",type:"number[]"}],attrs:[{tfName:"constant_value",name:"constantValue",type:"number",defaultValue:0}]},{tfOpName:"PadV2",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"padding",type:"number[]"},{start:2,name:"constantValue",type:"number",defaultValue:0}]},{tfOpName:"Reshape",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"shape",type:"number[]"}]},{tfOpName:"EnsureShape",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"shape",type:"number[]"}]},{tfOpName:"Squeeze",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"axis",tfDeprecatedName:"squeeze_dims",name:"axis",type:"number[]"}]},{tfOpName:"SpaceToBatchND",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"blockShape",type:"number[]"},{start:2,name:"paddings",type:"number[]"}]},{tfOpName:"BatchToSpaceND",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"blockShape",type:"number[]"},{start:2,name:"crops",type:"number[]"}]},{tfOpName:"DepthToSpace",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"block_size",name:"blockSize",type:"number"},{tfName:"data_format",name:"dataFormat",type:"string"}]},{tfOpName:"BroadcastTo",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"shape",type:"number[]"}],attrs:[]},{tfOpName:"BroadcastArgs",category:"transformation",inputs:[{start:0,name:"s0",type:"tensor"},{start:1,name:"s1",type:"tensor"}],attrs:[]}],Eo=Object.freeze(Object.defineProperty({__proto__:null,json:Io},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class Xe{static get Instance(){return this._instance||(this._instance=new this)}constructor(){const e=[Ki,Ji,Zi,Yi,eo,ao,ro,io,uo,mo,co,yo,go,bo,So,vo,_o,Ao,Eo],t=[].concat(...e.map(s=>s.json));this.opMappers=t.reduce((s,r)=>(s[r.tfOpName]=r,s),{})}transformGraph(e,t={}){const s=e.node,r=[],n=[],u=[],o=s.reduce((f,y)=>(f[y.name]=this.mapNode(y),y.op.startsWith("Placeholder")?r.push(f[y.name]):y.op==="Const"?n.push(f[y.name]):(y.input==null||y.input.length===0)&&u.push(f[y.name]),f),{});let p=[];const m=[];let l={},c={};t!=null&&(l=this.mapSignatureEntries(t.inputs),c=this.mapSignatureEntries(t.outputs));const d=Object.keys(o);d.forEach(f=>{const y=o[f];y.inputNames.forEach((b,S)=>{const[k,,T]=q(b),O=o[k];if(O.outputs!=null){const A=O.outputs.indexOf(T);if(A!==-1){const I=`${k}:${A}`;y.inputNames[S]=I}}y.inputs.push(O),O.children.push(y)})}),Object.keys(c).length===0?d.forEach(f=>{const y=o[f];y.children.length===0&&m.push(y)}):Object.keys(c).forEach(f=>{const[y]=q(f),b=o[y];b!=null&&(b.signatureKey=c[f],m.push(b))}),Object.keys(l).length>0?Object.keys(l).forEach(f=>{const[y]=q(f),b=o[y];b&&(b.signatureKey=l[f],p.push(b))}):p=r;let h={};e.library!=null&&e.library.function!=null&&(h=e.library.function.reduce((f,y)=>(f[y.signature.name]=this.mapFunction(y),f),{}));const g={nodes:o,inputs:p,outputs:m,weights:n,placeholders:r,signature:t,functions:h};return u.length>0&&(g.initNodes=u),g}mapSignatureEntries(e){return Object.keys(e||{}).reduce((t,s)=>(t[e[s].name]=s,t),{})}mapNode(e){const t=_t(e.op)||this.opMappers[e.op]||{};e.attr==null&&(e.attr={});const s={name:e.name,op:e.op,category:t.category,inputNames:(e.input||[]).map(r=>r.startsWith("^")?r.slice(1):r),inputs:[],children:[],inputParams:{},attrParams:{},rawAttrs:e.attr,outputs:t.outputs};return t.inputs!=null&&(s.inputParams=t.inputs.reduce((r,n)=>(r[n.name]={type:n.type,inputIndexStart:n.start,inputIndexEnd:n.end},r),{})),t.attrs!=null&&(s.attrParams=t.attrs.reduce((r,n)=>{const u=n.type;let o;switch(n.type){case"string":o=Ie(e.attr,n.tfName,n.defaultValue),o===void 0&&n.tfDeprecatedName&&(o=Ie(e.attr,n.tfDeprecatedName,n.defaultValue));break;case"string[]":o=Ce(e.attr,n.tfName,n.defaultValue),o===void 0&&n.tfDeprecatedName&&(o=Ce(e.attr,n.tfDeprecatedName,n.defaultValue));break;case"number":o=$e(e.attr,n.tfName,n.defaultValue||0),o===void 0&&n.tfDeprecatedName&&(o=$e(e.attr,n.tfDeprecatedName,n.defaultValue));break;case"number[]":o=Ve(e.attr,n.tfName,n.defaultValue),o===void 0&&n.tfDeprecatedName&&(o=Ve(e.attr,n.tfDeprecatedName,n.defaultValue));break;case"bool":o=Ee(e.attr,n.tfName,n.defaultValue),o===void 0&&n.tfDeprecatedName&&(o=Ee(e.attr,n.tfDeprecatedName,n.defaultValue));break;case"bool[]":o=xe(e.attr,n.tfName,n.defaultValue),o===void 0&&n.tfDeprecatedName&&(o=xe(e.attr,n.tfDeprecatedName,n.defaultValue));break;case"shape":o=Le(e.attr,n.tfName,n.defaultValue),o===void 0&&n.tfDeprecatedName&&(o=Le(e.attr,n.tfDeprecatedName,n.defaultValue));break;case"shape[]":o=Pe(e.attr,n.tfName,n.defaultValue),o===void 0&&n.tfDeprecatedName&&(o=Pe(e.attr,n.tfDeprecatedName,n.defaultValue));break;case"dtype":o=De(e.attr,n.tfName,n.defaultValue),o===void 0&&n.tfDeprecatedName&&(o=De(e.attr,n.tfDeprecatedName,n.defaultValue));break;case"dtype[]":o=ze(e.attr,n.tfName,n.defaultValue),o===void 0&&n.tfDeprecatedName&&(o=ze(e.attr,n.tfDeprecatedName,n.defaultValue));break;case"func":o=Ze(e.attr,n.tfName,n.defaultValue),o===void 0&&n.tfDeprecatedName&&(o=Ze(e.attr,n.tfDeprecatedName,n.defaultValue));break;case"tensor":case"tensors":break;default:throw new Error(`Unsupported param type: ${n.type} for op: ${e.op}`)}return r[n.name]={value:o,type:u},r},{})),s}mapFunction(e){const t=e.nodeDef,s=[],r=[];let n={};t!=null&&(n=t.reduce((c,d)=>(c[d.name]=this.mapNode(d),d.op==="Const"&&r.push(c[d.name]),c),{}));const u=[],o=[];e.signature.inputArg.forEach(c=>{const[d]=q(c.name),h={name:d,op:"Placeholder",inputs:[],inputNames:[],category:"graph",inputParams:{},attrParams:{dtype:{value:He(c.type),type:"dtype"}},children:[]};h.signatureKey=c.name,u.push(h),n[d]=h}),Object.keys(n).forEach(c=>{const d=n[c];d.inputNames.forEach((h,g)=>{const[f,,y]=q(h),b=n[f];if(b.outputs!=null){const S=b.outputs.indexOf(y);if(S!==-1){const k=`${f}:${S}`;d.inputNames[g]=k}}d.inputs.push(b),b.children.push(d)})});const m=e.ret;e.signature.outputArg.forEach(c=>{const[d,h]=q(m[c.name]),g=n[d];g!=null&&(g.defaultOutput=h,o.push(g))});const l=this.mapArgsToSignature(e);return{nodes:n,inputs:u,outputs:o,weights:r,placeholders:s,signature:l}}mapArgsToSignature(e){return{methodName:e.signature.name,inputs:e.signature.inputArg.reduce((t,s)=>(t[s.name]=this.mapArgToTensorInfo(s),t),{}),outputs:e.signature.outputArg.reduce((t,s)=>(t[s.name]=this.mapArgToTensorInfo(s,e.ret),t),{})}}mapArgToTensorInfo(e,t){let s=e.name;return t!=null&&(s=t[s]),{name:s,dtype:e.type}}}function $o(a){const e=_e().global;if(typeof e.atob<"u")return e.atob(a);if(typeof Buffer<"u")return new Buffer(a,"base64").toString();throw new Error("Unable to decode base64 in this environment. Missing built-in atob() or Buffer()")}function kt(a,e){const t=Array.isArray(a)?String.fromCharCode.apply(null,a):$o(a);return e?t:t.toLowerCase()}function Ie(a,e,t,s=!1){const r=a[e];return r!=null?kt(r.s,s):t}function Ee(a,e,t){const s=a[e];return s?s.b:t}function $e(a,e,t){const s=a[e]||{},r=s.i!=null?s.i:s.f!=null?s.f:t;return typeof r=="number"?r:parseInt(r,10)}function He(a){switch(typeof a=="string"&&(a=F[a]),a){case F.DT_FLOAT:case F.DT_HALF:return"float32";case F.DT_INT32:case F.DT_INT64:case F.DT_INT8:case F.DT_UINT8:return"int32";case F.DT_BOOL:return"bool";case F.DT_DOUBLE:return"float32";case F.DT_STRING:return"string";case F.DT_COMPLEX64:case F.DT_COMPLEX128:return"complex64";default:return null}}function Ze(a,e,t){const s=a[e];return s&&s.func?s.func.name:t}function De(a,e,t){const s=a[e];return s&&s.type?He(s.type):t}function ze(a,e,t){const s=a[e];return s&&s.list&&s.list.type?s.list.type.map(r=>He(r)):t}function At(a){if(!a.unknownRank)return a.dim!=null?a.dim.map(e=>typeof e.size=="number"?e.size:parseInt(e.size,10)):[]}function Le(a,e,t){const s=a[e];return s&&s.shape?At(s.shape):t}function Ve(a,e,t){const s=a[e];return s?((s.list.f&&s.list.f.length?s.list.f:s.list.i)||[]).map(r=>typeof r=="number"?r:parseInt(r,10)):t}function Ce(a,e,t,s=!1){const r=a[e];return r&&r.list&&r.list.s?r.list.s.map(n=>kt(n,s)):t}function Pe(a,e,t){const s=a[e];return s&&s.list&&s.list.shape?s.list.shape.map(r=>At(r)):t}function xe(a,e,t){const s=a[e];return s&&s.list&&s.list.b?s.list.b:t}/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class Do{constructor(e,t,s){this.node=e,this.tensorMap=t,this.context=s,this.inputs=[],this.attrs={},this.inputs=e.inputNames.map(r=>this.getInput(r)),e.rawAttrs!=null&&(this.attrs=Object.keys(e.rawAttrs).reduce((r,n)=>(r[n]=this.getAttr(n),r),{}))}getInput(e){return L(e,this.tensorMap,this.context)}getAttr(e,t){const s=this.node.rawAttrs[e];if(s.tensor!=null)return L(e,this.tensorMap,this.context);if(s.i!=null||s.f!=null)return $e(this.node.rawAttrs,e,t);if(s.s!=null)return Ie(this.node.rawAttrs,e,t);if(s.b!=null)return Ee(this.node.rawAttrs,e,t);if(s.shape!=null)return Le(this.node.rawAttrs,e,t);if(s.type!=null)return De(this.node.rawAttrs,e,t);if(s.list!=null){if(s.list.i!=null||s.list.f!=null)return Ve(this.node.rawAttrs,e,t);if(s.list.s!=null)return Ce(this.node.rawAttrs,e,t);if(s.list.shape!=null)return Pe(this.node.rawAttrs,e,t);if(s.list.b!=null)return xe(this.node.rawAttrs,e,t);if(s.list.type!=null)return ze(this.node.rawAttrs,e,t)}return t}}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const V=Object.freeze(Object.defineProperty({__proto__:null,OP_SCOPE_SUFFIX:za,abs:La,acos:Va,acosh:Ca,add:K,addN:gn,all:Pa,any:xa,argMax:Fa,argMin:ja,asin:Ra,asinh:Ba,atan:Ha,atan2:qa,atanh:Wa,avgPool:Ga,avgPool3d:Ka,basicLSTMCell:bn,batchNorm:Ua,batchNorm2d:Ja,batchNorm3d:Xa,batchNorm4d:Za,batchToSpaceND:Qa,bincount:Ya,bitwiseAnd:Sn,booleanMaskAsync:_i,broadcastArgs:vn,broadcastTo:Ma,buffer:it,cast:bt,ceil:es,clipByValue:ts,clone:Nt,complex:as,concat:ae,concat1d:ss,concat2d:Re,concat3d:rs,concat4d:ns,conv1d:is,conv2d:os,conv2dTranspose:us,conv3d:ps,conv3dTranspose:ms,cos:ls,cosh:cs,cosineWindow:ds,cumprod:hs,cumsum:ys,denseBincount:fs,depthToSpace:gs,depthwiseConv2d:ft,diag:_n,dilation2d:Ns,div:Q,divNoNan:bs,dot:Ts,dropout:Ss,einsum:ws,elu:vs,enclosingPowerOfTwo:Os,ensureShape:An,equal:_s,erf:ks,euclideanNorm:As,exp:Is,expandDims:Tt,expm1:Es,eye:$s,fft:Ds,fill:zs,floor:Ls,floorDiv:Vs,fused:ji,gather:ht,gatherND:Vi,greater:Cs,greaterEqual:Ps,ifft:xs,imag:Fs,image:ke,inTopKAsync:Pi,irfft:js,isFinite:Rs,isInf:Bs,isNaN:Hs,leakyRelu:qs,less:Ws,lessEqual:Gs,linalg:Ks,linspace:In,localResponseNormalization:Us,log:Js,log1p:Xs,logSigmoid:Zs,logSoftmax:Qs,logSumExp:Ys,logicalAnd:Ms,logicalNot:er,logicalOr:tr,logicalXor:ar,losses:sr,lowerBound:$n,matMul:Z,max:rr,maxPool:nr,maxPool3d:ir,maxPoolWithArgmax:zn,maximum:or,mean:ur,meshgrid:Ln,min:pr,minimum:mr,mirrorPad:lr,mod:cr,moments:dr,movingAverage:Ai,mul:R,multiRNNCell:Cn,multinomial:xn,neg:hr,norm:yr,notEqual:fr,oneHot:gr,ones:ne,onesLike:Nr,op:w,outerProduct:jn,pad:pe,pad1d:Bn,pad2d:qn,pad3d:Gn,pad4d:Un,pool:br,pow:yt,prelu:Tr,print:Sr,prod:wr,raggedGather:Xn,raggedRange:Qn,raggedTensorToTensor:Mn,rand:ti,randomGamma:si,randomNormal:ot,randomStandardNormal:ni,randomUniform:ut,randomUniformInt:oi,range:vr,real:Or,reciprocal:_r,relu:kr,relu6:Ar,reshape:_,reverse:me,reverse1d:pi,reverse2d:li,reverse3d:di,reverse4d:yi,rfft:Ir,round:Er,rsqrt:$r,scalar:U,scatterND:Ei,searchSorted:Be,selu:Dr,separableConv2d:zr,setdiff1dAsync:gi,sigmoid:ie,sign:Lr,signal:Vr,sin:Cr,sinh:Pr,slice:E,slice1d:xr,slice2d:Fr,slice3d:jr,slice4d:Rr,softmax:Br,softplus:Hr,spaceToBatchND:qr,sparse:Wr,sparseToDense:zi,spectral:Gr,split:Kr,sqrt:Ur,square:Jr,squaredDifference:Xr,squeeze:te,stack:ue,step:Zr,stridedSlice:Qr,string:Yr,sub:J,sum:Mr,tan:en,tanh:Oe,tensor:se,tensor1d:fe,tensor2d:Ae,tensor3d:tn,tensor4d:an,tensor5d:Ni,tensor6d:bi,tensorScatterUpdate:Si,tile:sn,topk:rn,transpose:nn,truncatedNormal:on,unique:un,unsortedSegmentSum:pn,unstack:le,upperBound:wi,variable:mn,where:ln,whereAsync:St,zeros:cn,zerosLike:dn},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const zo=(a,e,t,s=V)=>{switch(a.op){case"BiasAdd":case"AddV2":case"Add":return[s.add(i("a",a,e,t),i("b",a,e,t))];case"AddN":return[s.addN(i("tensors",a,e,t))];case"FloorMod":case"Mod":return[s.mod(i("a",a,e,t),i("b",a,e,t))];case"Mul":return[s.mul(i("a",a,e,t),i("b",a,e,t))];case"RealDiv":case"Div":return[s.div(i("a",a,e,t),i("b",a,e,t))];case"DivNoNan":return[s.divNoNan(i("a",a,e,t),i("b",a,e,t))];case"FloorDiv":return[s.floorDiv(i("a",a,e,t),i("b",a,e,t))];case"Sub":return[s.sub(i("a",a,e,t),i("b",a,e,t))];case"Minimum":return[s.minimum(i("a",a,e,t),i("b",a,e,t))];case"Maximum":return[s.maximum(i("a",a,e,t),i("b",a,e,t))];case"Pow":return[s.pow(i("a",a,e,t),i("b",a,e,t))];case"SquaredDifference":return[s.squaredDifference(i("a",a,e,t),i("b",a,e,t))];default:throw TypeError(`Node type ${a.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Lo=(a,e,t,s=V)=>{switch(a.op){case"Abs":case"ComplexAbs":return[s.abs(i("x",a,e,t))];case"Acos":return[s.acos(i("x",a,e,t))];case"Acosh":return[s.acosh(i("x",a,e,t))];case"Asin":return[s.asin(i("x",a,e,t))];case"Asinh":return[s.asinh(i("x",a,e,t))];case"Atan":return[s.atan(i("x",a,e,t))];case"Atan2":return[s.atan2(i("x",a,e,t),i("y",a,e,t))];case"Atanh":return[s.atanh(i("x",a,e,t))];case"Ceil":return[s.ceil(i("x",a,e,t))];case"Complex":return[s.complex(i("real",a,e,t),i("imag",a,e,t))];case"Cos":return[s.cos(i("x",a,e,t))];case"Cosh":return[s.cosh(i("x",a,e,t))];case"Elu":return[s.elu(i("x",a,e,t))];case"Erf":return[s.erf(i("x",a,e,t))];case"Exp":return[s.exp(i("x",a,e,t))];case"Expm1":return[s.expm1(i("x",a,e,t))];case"Floor":return[s.floor(i("x",a,e,t))];case"Log":return[s.log(i("x",a,e,t))];case"Log1p":return[s.log1p(i("x",a,e,t))];case"Imag":return[s.imag(i("x",a,e,t))];case"Neg":return[s.neg(i("x",a,e,t))];case"Reciprocal":return[s.reciprocal(i("x",a,e,t))];case"Real":return[s.real(i("x",a,e,t))];case"Relu":return[s.relu(i("x",a,e,t))];case"Round":return[s.round(i("x",a,e,t))];case"Selu":return[s.selu(i("x",a,e,t))];case"Sigmoid":return[s.sigmoid(i("x",a,e,t))];case"Sin":return[s.sin(i("x",a,e,t))];case"Sign":return[s.sign(i("x",a,e,t))];case"Sinh":return[s.sinh(i("x",a,e,t))];case"Softplus":return[s.softplus(i("x",a,e,t))];case"Sqrt":return[s.sqrt(i("x",a,e,t))];case"Square":return[s.square(i("x",a,e,t))];case"Tanh":return[s.tanh(i("x",a,e,t))];case"Tan":return[s.tan(i("x",a,e,t))];case"ClipByValue":return[s.clipByValue(i("x",a,e,t),i("clipValueMin",a,e,t),i("clipValueMax",a,e,t))];case"Relu6":return[s.relu6(i("x",a,e,t))];case"Rsqrt":return[s.rsqrt(L(a.inputNames[0],e,t))];case"LeakyRelu":return[s.leakyRelu(i("x",a,e,t),i("alpha",a,e,t))];case"Prelu":return[s.prelu(i("x",a,e,t),i("alpha",a,e,t))];case"IsNan":return[s.isNaN(L(a.inputNames[0],e,t))];case"IsInf":return[s.isInf(L(a.inputNames[0],e,t))];case"IsFinite":return[s.isFinite(L(a.inputNames[0],e,t))];default:throw TypeError(`Node type ${a.op} is not implemented`)}};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function j(a,e,t=""){if(!(typeof a=="number"||typeof e=="number")){v(a.length===e.length,()=>t+` Shapes ${a} and ${e} must match`);for(let s=0;s<a.length;s++){const r=a[s],n=e[s];v(r<0||n<0||r===n,()=>t+` Shapes ${a} and ${e} must match`)}}}function Qe(a){return!(typeof a=="number"||a.some(e=>e<0))}function re(a,e,t){let s=Fe(a,t);const r=!Qe(s);if(r&&e.length===0)throw new Error(`Tried to calculate elements of an empty list with non-fully-defined elementShape: ${s}`);if(r&&e.forEach(n=>{s=Fe(n.shape,s)}),!Qe(s))throw new Error(`Non-fully-defined elementShape: ${s}`);return s}function Fe(a,e){if(typeof a=="number")return e;if(typeof e=="number")return a;if(a.length!==e.length)throw new Error(`Incompatible ranks during merge: ${a} vs. ${e}`);const t=[];for(let s=0;s<a.length;++s){const r=a[s],n=e[s];if(r>=0&&n>=0&&r!==n)throw new Error(`Incompatible shape during merge: ${a} vs. ${e}`);t[s]=r>=0?r:n}return t}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class Vo{constructor(e,t,s,r,n,u,o){this.name=e,this.dtype=t,this.maxSize=s,this.elementShape=r,this.identicalElementShapes=n,this.dynamicSize=u,this.clearAfterRead=o,this.tensors=[],this.closed_=!1,this.idTensor=U(0),G(this.idTensor)}get id(){return this.idTensor.id}get closed(){return this.closed_}clearAndClose(e){this.tensors.forEach(t=>{(e==null||!e.has(t.tensor.id))&&t.tensor.dispose()}),this.tensors=[],this.closed_=!0,this.idTensor.dispose()}size(){return this.tensors.length}read(e){if(this.closed_)throw new Error(`TensorArray ${this.name} has already been closed.`);if(e<0||e>=this.size())throw new Error(`Tried to read from index ${e}, but array size is: ${this.size()}`);const t=this.tensors[e];if(t.cleared)throw new Error(`TensorArray ${this.name}: Could not read index ${e} twice because it was cleared after a previous read (perhaps try setting clear_after_read = false?).`);return this.clearAfterRead&&(t.cleared=!0),t.read=!0,t.tensor}readMany(e){return e.map(t=>this.read(t))}write(e,t){if(this.closed_)throw new Error(`TensorArray ${this.name} has already been closed.`);if(e<0||!this.dynamicSize&&e>=this.maxSize)throw new Error(`Tried to write to index ${e}, but array is not resizeable and size is: ${this.maxSize}`);const s=this.tensors[e]||{};if(t.dtype!==this.dtype)throw new Error(`TensorArray ${this.name}: Could not write to TensorArray index ${e},
          because the value dtype is ${t.dtype}, but TensorArray dtype is ${this.dtype}.`);if(this.size()===0&&(this.elementShape==null||this.elementShape.length===0)&&(this.elementShape=t.shape),j(this.elementShape,t.shape,`TensorArray ${this.name}: Could not write to TensorArray index ${e}.`),s.read)throw new Error(`TensorArray ${this.name}: Could not write to TensorArray index ${e}, because it has already been read.`);if(s.written)throw new Error(`TensorArray ${this.name}: Could not write to TensorArray index ${e}, because it has already been written.`);s.tensor=t,G(t),s.written=!0,this.tensors[e]=s}writeMany(e,t){if(e.length!==t.length)throw new Error(`TensorArray ${this.name}: could not write multiple tensors,because the index size: ${e.length} is not the same as tensors size: ${t.length}.`);e.forEach((s,r)=>this.write(s,t[r]))}gather(e,t){if(t&&t!==this.dtype)throw new Error(`TensorArray dtype is ${this.dtype} but gather requested dtype ${t}`);if(e)e=e.slice(0,this.size());else{e=[];for(let r=0;r<this.size();r++)e.push(r)}if(e.length===0)return se([],[0].concat(this.elementShape));const s=this.readMany(e);return j(this.elementShape,s[0].shape,"TensorArray shape mismatch: "),ue(s,0)}concat(e){if(e&&e!==this.dtype)throw new Error(`TensorArray dtype is ${this.dtype} but concat requested dtype ${e}`);if(this.size()===0)return se([],[0].concat(this.elementShape));const t=[];for(let r=0;r<this.size();r++)t.push(r);const s=this.readMany(t);return j(this.elementShape,s[0].shape,`TensorArray shape mismatch: tensor array shape (${this.elementShape}) vs first tensor shape (${s[0].shape})`),ae(s,0)}scatter(e,t){if(t.dtype!==this.dtype)throw new Error(`TensorArray dtype is ${this.dtype} but tensor has dtype ${t.dtype}`);if(e.length!==t.shape[0])throw new Error(`Expected len(indices) == tensor.shape[0], but saw: ${e.length} vs. ${t.shape[0]}`);const s=Math.max(...e);if(!this.dynamicSize&&s>=this.maxSize)throw new Error(`Max index must be < array size (${s}  vs. ${this.maxSize})`);this.writeMany(e,le(t,0))}split(e,t){if(t.dtype!==this.dtype)throw new Error(`TensorArray dtype is ${this.dtype} but tensor has dtype ${t.dtype}`);let s=0;const r=e.map(p=>(s+=p,s));if(s!==t.shape[0])throw new Error(`Expected sum of lengths to be equal to
          tensor.shape[0], but sum of lengths is
        ${s}, and tensor's shape is: ${t.shape}`);if(!this.dynamicSize&&e.length!==this.maxSize)throw new Error(`TensorArray's size is not equal to the size of lengths (${this.maxSize} vs. ${e.length}), and the TensorArray is not marked as dynamically resizeable`);const n=s===0?0:t.size/s,u=[];P(()=>{t=_(t,[1,s,n]);for(let p=0;p<e.length;++p){const l=[0,p===0?0:r[p-1],0],c=[1,e[p],n];u[p]=_(E(t,l,c),this.elementShape)}return u});const o=[];for(let p=0;p<e.length;p++)o[p]=p;this.writeMany(o,u)}}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class Y{get id(){return this.idTensor.id}constructor(e,t,s,r=-1){this.tensors=e,this.elementShape=t,this.elementDtype=s,e!=null&&e.forEach(n=>{if(s!==n.dtype)throw new Error(`Invalid data types; op elements ${s}, but list elements ${n.dtype}`);j(t,n.shape,"TensorList shape mismatch: "),G(n)}),this.idTensor=U(0),this.maxNumElements=r,G(this.idTensor)}copy(){return new Y([...this.tensors],this.elementShape,this.elementDtype)}clearAndClose(e){this.tensors.forEach(t=>{(e==null||!e.has(t.id))&&t.dispose()}),this.tensors.length=0,this.idTensor.dispose()}size(){return this.tensors.length}stack(e,t,s=-1){if(t!==this.elementDtype)throw new Error(`Invalid data types; op elements ${t}, but list elements ${this.elementDtype}`);if(s!==-1&&this.tensors.length!==s)throw new Error(`Operation expected a list with ${s} elements but got a list with ${this.tensors.length} elements.`);j(e,this.elementShape,"TensorList shape mismatch: ");const r=re(this.elementShape,this.tensors,e);return P(()=>{const n=this.tensors.map(u=>_(u,r));return ue(n,0)})}popBack(e,t){if(t!==this.elementDtype)throw new Error(`Invalid data types; op elements ${t}, but list elements ${this.elementDtype}`);if(this.size()===0)throw new Error("Trying to pop from an empty list.");const s=re(this.elementShape,this.tensors,e),r=this.tensors.pop();return r.kept=!1,j(r.shape,e,"TensorList shape mismatch: "),_(r,s)}pushBack(e){if(e.dtype!==this.elementDtype)throw new Error(`Invalid data types; op elements ${e.dtype}, but list elements ${this.elementDtype}`);if(j(e.shape,this.elementShape,"TensorList shape mismatch: "),this.maxNumElements===this.size())throw new Error("Trying to push element into a full list.");G(e),this.tensors.push(e)}resize(e){if(e<0)throw new Error(`TensorListResize expects size to be non-negative. Got: ${e}`);if(this.maxNumElements!==-1&&e>this.maxNumElements)throw new Error(`TensorListResize input size ${e} is greater maxNumElement ${this.maxNumElements}.`);const t=new Y([],this.elementShape,this.elementDtype,this.maxNumElements);t.tensors.length=e;for(let s=0;s<Math.min(this.tensors.length,e);++s)t.tensors[s]=this.tensors[s];return t}getItem(e,t,s){if(s!==this.elementDtype)throw new Error(`Invalid data types; op elements ${s}, but list elements ${this.elementDtype}`);if(e<0||e>this.tensors.length)throw new Error(`Trying to access element ${e} in a list with ${this.tensors.length} elements.`);if(this.tensors[e]==null)throw new Error(`element at index ${e} is null.`);j(this.tensors[e].shape,t,"TensorList shape mismatch: ");const r=re(this.elementShape,this.tensors,t);return _(this.tensors[e],r)}setItem(e,t){if(t.dtype!==this.elementDtype)throw new Error(`Invalid data types; op elements ${t.dtype}, but list elements ${this.elementDtype}`);if(e<0||this.maxNumElements!==-1&&e>=this.maxNumElements)throw new Error(`Trying to set element ${e} in a list with max ${this.maxNumElements} elements.`);j(this.elementShape,t.shape,"TensorList shape mismatch: "),G(t),this.tensors[e]!=null&&(this.tensors[e].kept=!1),this.tensors[e]=t}gather(e,t,s){if(t!==this.elementDtype)throw new Error(`Invalid data types; op elements ${t}, but list elements ${this.elementDtype}`);j(this.elementShape,s,"TensorList shape mismatch: "),e=e.slice(0,this.size());const r=re(this.elementShape,this.tensors,s);return e.length===0?se([],[0].concat(r)):P(()=>{const n=e.map(u=>_(this.tensors[u],r));return ue(n,0)})}concat(e,t){if(e&&e!==this.elementDtype)throw new Error(`TensorList dtype is ${this.elementDtype} but concat requested dtype ${e}`);j(this.elementShape,t,"TensorList shape mismatch: ");const s=re(this.elementShape,this.tensors,t);return this.size()===0?se([],[0].concat(s)):P(()=>{const r=this.tensors.map(n=>_(n,s));return ae(r,0)})}}function Co(a,e,t){const s=a.dtype;if(a.shape.length<1)throw new Error(`Tensor must be at least a vector, but saw shape: ${a.shape}`);if(a.dtype!==t)throw new Error(`Invalid data types; op elements ${a.dtype}, but list elements ${t}`);const r=a.shape.slice(1);j(r,e,"TensorList shape mismatch: ");const n=le(a);return new Y(n,e,s)}function Po(a,e,t,s){return new Y([],a,e,s)}function xo(a,e,t,s){if(e.length!==a.shape[0])throw new Error(`Expected len(indices) == tensor.shape[0], but saw: ${e.length} vs. ${a.shape[0]}`);const r=Math.max(...e);if(s!=null&&s!==-1&&r>=s)throw new Error(`Max index must be < array size (${r}  vs. ${s})`);const n=new Y([],t,a.dtype,s),u=le(a,0);return e.forEach((o,p)=>{n.setItem(o,u[p])}),n}function Fo(a,e,t){let s=0;const r=e.map(l=>(s+=l,s));if(s!==a.shape[0])throw new Error(`Expected sum of lengths to be equal to
          tensor.shape[0], but sum of lengths is
        ${s}, and tensor's shape is: ${a.shape}`);const n=a.shape.slice(1),u=Fe(n,t),o=s===0?0:a.size/s,p=P(()=>{const l=[];a=_(a,[1,s,o]);for(let c=0;c<e.length;++c){const h=[0,c===0?0:r[c-1],0],g=[1,e[c],o];l[c]=_(E(a,h,g),u)}return a.dispose(),l}),m=new Y([],t,a.dtype,e.length);for(let l=0;l<p.length;l++)m.setItem(l,p[l]);return m}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const jo=async(a,e,t)=>{switch(a.op){case"If":case"StatelessIf":{const s=i("thenBranch",a,e,t),r=i("elseBranch",a,e,t),n=i("cond",a,e,t),u=i("args",a,e,t);return(await n.data())[0]?t.functionMap[s].executeFunctionAsync(u,t.tensorArrayMap,t.tensorListMap):t.functionMap[r].executeFunctionAsync(u,t.tensorArrayMap,t.tensorListMap)}case"While":case"StatelessWhile":{const s=i("body",a,e,t),r=i("cond",a,e,t),n=i("args",a,e,t),u=await t.functionMap[r].executeFunctionAsync(n,t.tensorArrayMap,t.tensorListMap),o=n.map(l=>l.id);let p=await u[0].data();u.forEach(l=>{!l.kept&&o.indexOf(l.id)===-1&&l.dispose()});let m=n;for(;p[0];){const l=m;m=await t.functionMap[s].executeFunctionAsync(m,t.tensorArrayMap,t.tensorListMap);const c=m.map(h=>h.id);l.forEach(h=>{!h.kept&&o.indexOf(h.id)===-1&&c.indexOf(h.id)===-1&&h.dispose()});const d=await t.functionMap[r].executeFunctionAsync(m,t.tensorArrayMap,t.tensorListMap);p=await d[0].data(),d.forEach(h=>{!h.kept&&o.indexOf(h.id)===-1&&c.indexOf(h.id)===-1&&h.dispose()})}return m}case"LoopCond":{const s=i("pred",a,e,t);return[W(s)]}case"Switch":{const s=i("pred",a,e,t);let r=i("data",a,e,t);return r.kept||(r=W(r)),(await s.data())[0]?[void 0,r]:[r,void 0]}case"Merge":{const s=a.inputNames.find(r=>L(r,e,t)!==void 0);if(s){const r=L(s,e,t);return[W(r)]}return}case"Enter":{const s=i("frameName",a,e,t),r=i("tensor",a,e,t);return t.enterFrame(s),[W(r)]}case"Exit":{const s=i("tensor",a,e,t);return t.exitFrame(),[W(s)]}case"NextIteration":{const s=i("tensor",a,e,t);return t.nextIteration(),[W(s)]}case"TensorArrayV3":{const s=i("size",a,e,t),r=i("dtype",a,e,t),n=i("elementShape",a,e,t),u=i("dynamicSize",a,e,t),o=i("clearAfterRead",a,e,t),p=i("identicalElementShapes",a,e,t),m=i("name",a,e,t),l=new Vo(m,r,s,n,p,u,o);return t.addTensorArray(l),[l.idTensor,U(1)]}case"TensorArrayWriteV3":{const s=i("tensorArrayId",a,e,t),r=i("index",a,e,t),n=i("tensor",a,e,t),u=t.getTensorArray(s.id);return u.write(r,n),[u.idTensor]}case"TensorArrayReadV3":{const s=i("tensorArrayId",a,e,t),r=i("index",a,e,t);return[t.getTensorArray(s.id).read(r)]}case"TensorArrayGatherV3":{const s=i("tensorArrayId",a,e,t),r=i("indices",a,e,t),n=i("dtype",a,e,t);return[t.getTensorArray(s.id).gather(r,n)]}case"TensorArrayScatterV3":{const s=i("tensorArrayId",a,e,t),r=i("indices",a,e,t),n=i("tensor",a,e,t),u=t.getTensorArray(s.id);return u.scatter(r,n),[u.idTensor]}case"TensorArrayConcatV3":{const s=i("tensorArrayId",a,e,t),r=t.getTensorArray(s.id),n=i("dtype",a,e,t);return[r.concat(n)]}case"TensorArraySplitV3":{const s=i("tensorArrayId",a,e,t),r=i("tensor",a,e,t),n=i("lengths",a,e,t),u=t.getTensorArray(s.id);return u.split(n,r),[u.idTensor]}case"TensorArraySizeV3":{const s=i("tensorArrayId",a,e,t),r=t.getTensorArray(s.id);return[U(r.size(),"int32")]}case"TensorArrayCloseV3":{const s=i("tensorArrayId",a,e,t),r=t.getTensorArray(s.id);return r.clearAndClose(),[r.idTensor]}case"TensorListSetItem":{const s=i("tensorListId",a,e,t),r=i("index",a,e,t),n=i("tensor",a,e,t),u=t.getTensorList(s.id);return u.setItem(r,n),[u.idTensor]}case"TensorListGetItem":{const s=i("tensorListId",a,e,t),r=i("index",a,e,t),n=i("elementShape",a,e,t),u=i("elementDType",a,e,t);return[t.getTensorList(s.id).getItem(r,n,u)]}case"TensorListScatterV2":case"TensorListScatter":{const s=i("indices",a,e,t),r=i("tensor",a,e,t),n=i("elementShape",a,e,t),u=i("numElements",a,e,t),o=xo(r,s,n,u);return t.addTensorList(o),[o.idTensor]}case"TensorListReserve":case"EmptyTensorList":{const s=i("elementShape",a,e,t),r=i("elementDType",a,e,t);let n;a.op==="TensorListReserve"?n="numElements":n="maxNumElements";const u=i(n,a,e,t),o=a.op==="TensorListReserve"?-1:u,p=Po(s,r,u,o);return t.addTensorList(p),[p.idTensor]}case"TensorListGather":{const s=i("tensorListId",a,e,t),r=i("indices",a,e,t),n=i("elementShape",a,e,t),u=i("elementDType",a,e,t);return[t.getTensorList(s.id).gather(r,u,n)]}case"TensorListStack":{const s=i("tensorListId",a,e,t),r=i("elementShape",a,e,t),n=i("elementDType",a,e,t),u=i("numElements",a,e,t);return[t.getTensorList(s.id).stack(r,n,u)]}case"TensorListFromTensor":{const s=i("tensor",a,e,t),r=i("elementShape",a,e,t),n=i("elementDType",a,e,t),u=Co(s,r,n);return t.addTensorList(u),[u.idTensor]}case"TensorListConcat":case"TensorListConcatV2":{const s=i("tensorListId",a,e,t),r=t.getTensorList(s.id),n=i("dtype",a,e,t),u=i("elementShape",a,e,t);return[r.concat(n,u)]}case"TensorListPushBack":{const s=i("tensorListId",a,e,t),r=i("tensor",a,e,t),n=t.getTensorList(s.id);return n.pushBack(r),[n.idTensor]}case"TensorListPopBack":{const s=i("tensorListId",a,e,t),r=i("elementShape",a,e,t),n=i("elementDType",a,e,t);return[t.getTensorList(s.id).popBack(r,n)]}case"TensorListSplit":{const s=i("tensor",a,e,t),r=i("elementShape",a,e,t),n=i("lengths",a,e,t),u=Fo(s,n,r);return t.addTensorList(u),[u.idTensor]}case"TensorListLength":{const s=i("tensorListId",a,e,t),r=t.getTensorList(s.id);return[U(r.size(),"int32")]}case"TensorListResize":{const s=i("tensorListId",a,e,t),r=i("size",a,e,t),u=t.getTensorList(s.id).resize(r);return t.addTensorList(u),[u.idTensor]}default:throw TypeError(`Node type ${a.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Ye(a,e,t){const[s,r]=i("fusedOps",a,e,t),n=s==="biasadd",u=!n,o=r==="prelu",p=s==="fusedbatchnorm",m=i("numArgs",a,e,t);if(n){if(o&&m!==2)throw new Error("FusedConv2d and DepthwiseConv2d with BiasAdd and Prelu must have two extra arguments: bias and alpha.");if(!o&&n&&m!==1)throw new Error("FusedConv2d and DepthwiseConv2d with BiasAdd must have one extra argument: bias.")}if(p)throw new Error("FusedConv2d and DepthwiseConv2d with FusedBatchNorm is not supported");const l=i("strides",a,e,t),c=he(a,e,t),d=i("dataFormat",a,e,t).toUpperCase(),h=i("dilations",a,e,t);let[g,f]=i("args",a,e,t);u&&(f=g,g=void 0);const y=i("leakyreluAlpha",a,e,t);return{stride:l,pad:c,dataFormat:d,dilations:h,biasArg:g,preluArg:f,activationFunc:r,leakyreluAlpha:y}}const Ro=(a,e,t,s=V)=>{switch(a.op){case"Conv1D":{const r=i("stride",a,e,t),n=i("pad",a,e,t),u=i("dataFormat",a,e,t).toUpperCase(),o=i("dilation",a,e,t);return[s.conv1d(i("x",a,e,t),i("filter",a,e,t),r,n,u,o)]}case"Conv2D":{const r=i("strides",a,e,t),n=he(a,e,t),u=i("dataFormat",a,e,t).toUpperCase(),o=i("dilations",a,e,t);return[s.conv2d(i("x",a,e,t),i("filter",a,e,t),[r[1],r[2]],n,u,[o[1],o[2]])]}case"_FusedConv2D":{const{stride:r,pad:n,dataFormat:u,dilations:o,biasArg:p,preluArg:m,activationFunc:l,leakyreluAlpha:c}=Ye(a,e,t);return[s.fused.conv2d({x:i("x",a,e,t),filter:i("filter",a,e,t),strides:[r[1],r[2]],pad:n,dataFormat:u,dilations:[o[1],o[2]],bias:p,activation:l,preluActivationWeights:m,leakyreluAlpha:c})]}case"FusedDepthwiseConv2dNative":{const{stride:r,pad:n,dataFormat:u,dilations:o,biasArg:p,preluArg:m,activationFunc:l,leakyreluAlpha:c}=Ye(a,e,t);return[s.fused.depthwiseConv2d({x:i("x",a,e,t),filter:i("filter",a,e,t),strides:[r[1],r[2]],pad:n,dataFormat:u,dilations:[o[1],o[2]],bias:p,activation:l,preluActivationWeights:m,leakyreluAlpha:c})]}case"Conv2DBackpropInput":case"Conv2dTranspose":{const r=i("outputShape",a,e,t),n=i("strides",a,e,t),u=he(a,e,t);return[s.conv2dTranspose(i("x",a,e,t),i("filter",a,e,t),r,[n[1],n[2]],u)]}case"DepthwiseConv2dNative":case"DepthwiseConv2d":{const r=i("strides",a,e,t),n=he(a,e,t),u=i("dilations",a,e,t),o=i("dataFormat",a,e,t).toUpperCase();return[s.depthwiseConv2d(i("input",a,e,t),i("filter",a,e,t),[r[1],r[2]],n,o,[u[1],u[2]])]}case"Conv3D":{const r=i("strides",a,e,t),n=i("pad",a,e,t),u=i("dataFormat",a,e,t).toUpperCase(),o=i("dilations",a,e,t);return[s.conv3d(i("x",a,e,t),i("filter",a,e,t),[r[1],r[2],r[3]],n,u,[o[1],o[2],o[3]])]}case"AvgPool":{const r=i("strides",a,e,t),n=i("pad",a,e,t),u=i("kernelSize",a,e,t);return[s.avgPool(i("x",a,e,t),[u[1],u[2]],[r[1],r[2]],n)]}case"MaxPool":{const r=i("strides",a,e,t),n=i("pad",a,e,t),u=i("kernelSize",a,e,t);return[s.maxPool(i("x",a,e,t),[u[1],u[2]],[r[1],r[2]],n)]}case"MaxPoolWithArgmax":{const r=i("strides",a,e,t),n=i("pad",a,e,t),u=i("kernelSize",a,e,t),o=i("includeBatchInIndex",a,e,t),{result:p,indexes:m}=s.maxPoolWithArgmax(i("x",a,e,t),[u[1],u[2]],[r[1],r[2]],n,o);return[p,m]}case"AvgPool3D":{const r=i("strides",a,e,t),n=i("pad",a,e,t),u=i("kernelSize",a,e,t);return[s.avgPool3d(i("x",a,e,t),[u[1],u[2],u[3]],[r[1],r[2],r[3]],n)]}case"MaxPool3D":{const r=i("strides",a,e,t),n=i("pad",a,e,t),u=i("kernelSize",a,e,t);return[s.maxPool3d(i("x",a,e,t),[u[1],u[2],u[3]],[r[1],r[2],r[3]],n)]}case"Dilation2D":{const r=i("strides",a,e,t),n=i("pad",a,e,t),u=i("dilations",a,e,t),o=r[1],p=r[2],m=u[1],l=u[2];return[s.dilation2d(i("x",a,e,t),i("filter",a,e,t),[o,p],n,[m,l],"NHWC")]}default:throw TypeError(`Node type ${a.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Bo=(a,e,t,s=V)=>{switch(a.op){case"Fill":{const r=i("shape",a,e,t),n=i("dtype",a,e,t),u=i("value",a,e,t);return[s.fill(r,u,n)]}case"LinSpace":{const r=i("start",a,e,t),n=i("stop",a,e,t),u=i("num",a,e,t);return[s.linspace(r,n,u)]}case"Multinomial":{const r=i("logits",a,e,t),n=i("numSamples",a,e,t),u=i("seed",a,e,t);return[s.multinomial(r,n,u)]}case"OneHot":{const r=i("indices",a,e,t),n=i("depth",a,e,t),u=i("onValue",a,e,t),o=i("offValue",a,e,t),p=i("dtype",a,e,t);return[s.oneHot(r,n,u,o,p)]}case"Ones":return[s.ones(i("shape",a,e,t),i("dtype",a,e,t))];case"OnesLike":return[s.onesLike(i("x",a,e,t))];case"RandomStandardNormal":return[s.randomStandardNormal(i("shape",a,e,t),i("dtype",a,e,t),i("seed",a,e,t))];case"RandomUniform":return[s.randomUniform(i("shape",a,e,t),i("minval",a,e,t),i("maxval",a,e,t),i("dtype",a,e,t))];case"RandomUniformInt":return[s.randomUniformInt(i("shape",a,e,t),i("minval",a,e,t),i("maxval",a,e,t),i("seed",a,e,t))];case"Range":{const r=i("start",a,e,t),n=i("stop",a,e,t),u=i("step",a,e,t);return[s.range(r,n,u,i("dtype",a,e,t))]}case"TruncatedNormal":{const r=i("shape",a,e,t),n=i("mean",a,e,t),u=i("stdDev",a,e,t),o=i("seed",a,e,t);return[s.truncatedNormal(r,n,u,i("dtype",a,e,t),o)]}case"Zeros":return[s.zeros(i("shape",a,e,t),i("dtype",a,e,t))];case"ZerosLike":return[s.zerosLike(i("x",a,e,t))];default:throw TypeError(`Node type ${a.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ve(a,e,t){const s=i("boxes",a,e,t),r=i("scores",a,e,t),n=i("maxOutputSize",a,e,t),u=i("iouThreshold",a,e,t),o=i("scoreThreshold",a,e,t),p=i("softNmsSigma",a,e,t);return{boxes:s,scores:r,maxOutputSize:n,iouThreshold:u,scoreThreshold:o,softNmsSigma:p}}const Ho=async(a,e,t,s,r=V)=>{switch(a.op){case"NonMaxSuppressionV5":{const{boxes:n,scores:u,maxOutputSize:o,iouThreshold:p,scoreThreshold:m,softNmsSigma:l}=ve(a,e,t),c=await r.image.nonMaxSuppressionWithScoreAsync(n,u,o,p,m,l);return[c.selectedIndices,c.selectedScores]}case"NonMaxSuppressionV4":{const{boxes:n,scores:u,maxOutputSize:o,iouThreshold:p,scoreThreshold:m}=ve(a,e,t),l=i("padToMaxOutputSize",a,e,t),c=await r.image.nonMaxSuppressionPaddedAsync(n,u,o,p,m,l);return[c.selectedIndices,c.validOutputs]}case"NonMaxSuppressionV3":case"NonMaxSuppressionV2":{const{boxes:n,scores:u,maxOutputSize:o,iouThreshold:p,scoreThreshold:m}=ve(a,e,t);return[await r.image.nonMaxSuppressionAsync(n,u,o,p,m)]}case"Where":{const n=r.cast(i("condition",a,e,t),"bool"),u=[await r.whereAsync(n)];return n.dispose(),u}case"ListDiff":return r.setdiff1dAsync(i("x",a,e,t),i("y",a,e,t));default:throw TypeError(`Node type ${a.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const qo=(a,e,t,s=V)=>{switch(a.op){case"LowerBound":{const r=i("sortedSequence",a,e,t),n=i("values",a,e,t);return[s.lowerBound(r,n)]}case"TopKV2":{const r=i("x",a,e,t),n=i("k",a,e,t),u=i("sorted",a,e,t),o=s.topk(r,n,u);return[o.values,o.indices]}case"UpperBound":{const r=i("sortedSequence",a,e,t),n=i("values",a,e,t);return[s.upperBound(r,n)]}case"Unique":{const r=i("x",a,e,t),n=s.unique(r);return[n.values,n.indices]}case"UniqueV2":{const r=i("x",a,e,t),n=i("axis",a,e,t),u=s.unique(r,n);return[u.values,u.indices]}default:throw TypeError(`Node type ${a.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Wo=(a,e,t,s=V)=>{switch(a.op){case"Const":return e[a.name];case"PlaceholderWithDefault":const r=i("default",a,e,t);return[L(a.name,e,t)||r];case"Placeholder":return[L(a.name,e,t)];case"Identity":case"StopGradient":case"FakeQuantWithMinMaxVars":{const l=i("x",a,e,t);return[W(l)]}case"IdentityN":return i("x",a,e,t).map(l=>W(l));case"Snapshot":const n=i("x",a,e,t);return[W(n)];case"Shape":return[s.tensor1d(i("x",a,e,t).shape,"int32")];case"ShapeN":return i("x",a,e,t).map(l=>s.tensor1d(l.shape));case"Size":return[s.scalar(i("x",a,e,t).size,"int32")];case"Rank":return[s.scalar(i("x",a,e,t).rank,"int32")];case"NoOp":return[s.scalar(1)];case"Print":const u=i("x",a,e,t),o=i("data",a,e,t),p=i("message",a,e,t),m=i("summarize",a,e,t);console.warn("The graph has a tf.print() operation,usually used for debugging, which slows down performance."),console.log(p);for(let l=0;l<o.length;l++)console.log(Array.prototype.slice.call(o[l].dataSync()).slice(0,m));return[u];default:throw TypeError(`Node type ${a.op} is not implemented`)}};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class Go{get id(){return this.handle.id}constructor(e,t){this.keyDType=e,this.valueDType=t,this.handle=U(0),this.tensorMap=new Map,G(this.handle)}clearAndClose(){this.tensorMap.forEach(e=>e.dispose()),this.tensorMap.clear(),this.handle.dispose()}size(){return this.tensorMap.size}tensorSize(){return U(this.size(),"int32")}async import(e,t){this.checkKeyAndValueTensor(e,t);const s=await e.data();return this.tensorMap.forEach(r=>r.dispose()),this.tensorMap.clear(),P(()=>{const r=le(t),n=s.length,u=r.length;v(n===u,()=>`The number of elements doesn't match, keys has ${n} elements, the values has ${u} elements.`);for(let o=0;o<n;o++){const p=s[o],m=r[o];G(m),this.tensorMap.set(p,m)}return this.handle})}async find(e,t){this.checkKeyAndValueTensor(e,t);const s=await e.data();return P(()=>{const r=[];for(let n=0;n<s.length;n++){const u=s[n],o=this.findWithDefault(u,t);r.push(o)}return ue(r)})}findWithDefault(e,t){const s=this.tensorMap.get(e);return s??t}checkKeyAndValueTensor(e,t){if(e.dtype!==this.keyDType)throw new Error(`Expect key dtype ${this.keyDType}, but got ${e.dtype}`);if(t.dtype!==this.valueDType)throw new Error(`Expect value dtype ${this.valueDType}, but got ${t.dtype}`)}}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Ko=async(a,e,t,s)=>{switch(a.op){case"HashTable":case"HashTableV2":{const r=s.getHashTableHandleByName(a.name);if(r!=null)return[r];{const n=i("keyDType",a,e,t),u=i("valueDType",a,e,t),o=new Go(n,u);return s.addHashTable(a.name,o),[o.handle]}}case"InitializeTable":case"InitializeTableV2":case"LookupTableImport":case"LookupTableImportV2":{const r=i("tableHandle",a,e,t,s),n=i("keys",a,e,t),u=i("values",a,e,t);return[await s.getHashTableById(r.id).import(n,u)]}case"LookupTableFind":case"LookupTableFindV2":{const r=i("tableHandle",a,e,t,s),n=i("keys",a,e,t),u=i("defaultValue",a,e,t);return[await s.getHashTableById(r.id).find(n,u)]}case"LookupTableSize":case"LookupTableSizeV2":{const r=i("tableHandle",a,e,t,s);return[s.getHashTableById(r.id).tensorSize()]}default:throw TypeError(`Node type ${a.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Uo=(a,e,t,s=V)=>{switch(a.op){case"ResizeBilinear":{const r=i("images",a,e,t),n=i("size",a,e,t),u=i("alignCorners",a,e,t),o=i("halfPixelCenters",a,e,t);return[s.image.resizeBilinear(r,[n[0],n[1]],u,o)]}case"ResizeNearestNeighbor":{const r=i("images",a,e,t),n=i("size",a,e,t),u=i("alignCorners",a,e,t),o=i("halfPixelCenters",a,e,t);return[s.image.resizeNearestNeighbor(r,[n[0],n[1]],u,o)]}case"CropAndResize":{const r=i("image",a,e,t),n=i("boxes",a,e,t),u=i("boxInd",a,e,t),o=i("cropSize",a,e,t),p=i("method",a,e,t),m=i("extrapolationValue",a,e,t);return[s.image.cropAndResize(r,n,u,o,p,m)]}case"ImageProjectiveTransformV3":{const r=i("images",a,e,t),n=i("transforms",a,e,t),u=i("outputShape",a,e,t),o=i("fillValue",a,e,t),p=i("interpolation",a,e,t),m=i("fillMode",a,e,t);return[s.image.transform(r,n,p.toLowerCase(),m.toLowerCase(),o,u)]}default:throw TypeError(`Node type ${a.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Jo=(a,e,t,s=V)=>{switch(a.op){case"Equal":return[s.equal(i("a",a,e,t),i("b",a,e,t))];case"NotEqual":return[s.notEqual(i("a",a,e,t),i("b",a,e,t))];case"Greater":return[s.greater(i("a",a,e,t),i("b",a,e,t))];case"GreaterEqual":return[s.greaterEqual(i("a",a,e,t),i("b",a,e,t))];case"Less":return[s.less(i("a",a,e,t),i("b",a,e,t))];case"LessEqual":return[s.lessEqual(i("a",a,e,t),i("b",a,e,t))];case"LogicalAnd":return[s.logicalAnd(i("a",a,e,t),i("b",a,e,t))];case"LogicalNot":return[s.logicalNot(i("a",a,e,t))];case"LogicalOr":return[s.logicalOr(i("a",a,e,t),i("b",a,e,t))];case"Select":case"SelectV2":return[s.where(i("condition",a,e,t),i("a",a,e,t),i("b",a,e,t))];case"BitwiseAnd":return[s.bitwiseAnd(i("a",a,e,t),i("b",a,e,t))];default:throw TypeError(`Node type ${a.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Xo=(a,e,t,s=V)=>{switch(a.op){case"BatchMatMul":case"BatchMatMulV2":case"MatMul":return[s.matMul(i("a",a,e,t),i("b",a,e,t),i("transposeA",a,e,t),i("transposeB",a,e,t))];case"Einsum":return[s.einsum(i("equation",a,e,t),...i("tensors",a,e,t))];case"Transpose":return[s.transpose(i("x",a,e,t),i("perm",a,e,t))];case"_FusedMatMul":const[r,n]=i("fusedOps",a,e,t),u=r==="biasadd",o=n==="prelu",p=i("numArgs",a,e,t),m=i("leakyreluAlpha",a,e,t);if(u){if(o&&p!==2)throw new Error("Fused MatMul with BiasAdd and Prelu must have two extra arguments: bias and alpha.");if(!o&&p!==1)throw new Error("Fused MatMul with BiasAdd must have one extra argument: bias.")}const[l,c]=i("args",a,e,t);return[s.fused.matMul({a:i("a",a,e,t),b:i("b",a,e,t),transposeA:i("transposeA",a,e,t),transposeB:i("transposeB",a,e,t),bias:l,activation:n,preluActivationWeights:c,leakyreluAlpha:m})];case"MatrixBandPart":return[s.linalg.bandPart(i("a",a,e,t),i("numLower",a,e,t),i("numUpper",a,e,t))];default:throw TypeError(`Node type ${a.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Zo=(a,e,t,s=V)=>{switch(a.op){case"EuclideanNorm":return[s.euclideanNorm(i("x",a,e,t),i("axis",a,e,t),i("keepDims",a,e,t))];case"FusedBatchNorm":case"FusedBatchNormV2":return[s.batchNorm(i("x",a,e,t),i("mean",a,e,t),i("variance",a,e,t),i("offset",a,e,t),i("scale",a,e,t),i("epsilon",a,e,t))];case"FusedBatchNormV3":return[s.batchNorm(i("x",a,e,t),i("mean",a,e,t),i("variance",a,e,t),i("offset",a,e,t),i("scale",a,e,t),i("epsilon",a,e,t))];case"LRN":return[s.localResponseNormalization(i("x",a,e,t),i("radius",a,e,t),i("bias",a,e,t),i("alpha",a,e,t),i("beta",a,e,t))];case"Softmax":return[s.softmax(i("x",a,e,t))];case"LogSoftmax":return[s.logSoftmax(i("x",a,e,t))];default:throw TypeError(`Node type ${a.op} is not implemented`)}};/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Qo=(a,e,t,s=V)=>{switch(a.op){case"RaggedGather":{const{outputNestedSplits:r,outputDenseValues:n}=s.raggedGather(i("paramsNestedSplits",a,e,t),i("paramsDenseValues",a,e,t),i("indices",a,e,t),i("outputRaggedRank",a,e,t));return r.concat(n)}case"RaggedRange":{const{rtNestedSplits:r,rtDenseValues:n}=s.raggedRange(i("starts",a,e,t),i("limits",a,e,t),i("splits",a,e,t));return[r,n]}case"RaggedTensorToTensor":return[s.raggedTensorToTensor(i("shape",a,e,t),i("values",a,e,t),i("defaultValue",a,e,t),i("rowPartitionTensors",a,e,t),i("rowPartitionTypes",a,e,t))];default:throw TypeError(`Node type ${a.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Yo=(a,e,t,s=V)=>{switch(a.op){case"Max":{const o=i("axis",a,e,t),p=i("keepDims",a,e,t);return[s.max(i("x",a,e,t),o,p)]}case"Mean":{const o=i("axis",a,e,t),p=i("keepDims",a,e,t);return[s.mean(i("x",a,e,t),o,p)]}case"Min":{const o=i("axis",a,e,t),p=i("keepDims",a,e,t);return[s.min(i("x",a,e,t),o,p)]}case"Sum":{const o=i("axis",a,e,t),p=i("keepDims",a,e,t);return[s.sum(i("x",a,e,t),o,p)]}case"All":{const o=i("axis",a,e,t),p=i("keepDims",a,e,t);return[s.all(i("x",a,e,t),o,p)]}case"Any":{const o=i("axis",a,e,t),p=i("keepDims",a,e,t);return[s.any(i("x",a,e,t),o,p)]}case"ArgMax":{const o=i("axis",a,e,t);return[s.argMax(i("x",a,e,t),o)]}case"ArgMin":{const o=i("axis",a,e,t);return[s.argMin(i("x",a,e,t),o)]}case"Prod":{const o=i("axis",a,e,t),p=i("keepDims",a,e,t);return[s.prod(i("x",a,e,t),o,p)]}case"Cumprod":{const o=i("axis",a,e,t),p=i("exclusive",a,e,t),m=i("reverse",a,e,t);return[s.cumprod(i("x",a,e,t),o,p,m)]}case"Cumsum":{const o=i("axis",a,e,t),p=i("exclusive",a,e,t),m=i("reverse",a,e,t);return[s.cumsum(i("x",a,e,t),o,p,m)]}case"Bincount":const r=i("x",a,e,t),n=i("weights",a,e,t),u=i("size",a,e,t);return[s.bincount(r,n,u)];case"DenseBincount":{const o=i("x",a,e,t),p=i("weights",a,e,t),m=i("size",a,e,t),l=i("binaryOutput",a,e,t);return[s.denseBincount(o,p,m,l)]}default:throw TypeError(`Node type ${a.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Mo=(a,e,t,s=V)=>{switch(a.op){case"ConcatV2":case"Concat":{const r=i("n",a,e,t),n=i("axis",a,e,t);let u=i("tensors",a,e,t);return u=u.slice(0,r),[s.concat(u,n)]}case"Gather":{const r=i("x",a,e,t),n=i("indices",a,e,t);return[s.gather(r,s.cast(n,"int32"),0)]}case"GatherV2":{const r=i("axis",a,e,t),n=i("batchDims",a,e,t),u=i("x",a,e,t),o=i("indices",a,e,t);return[s.gather(u,s.cast(o,"int32"),r,n)]}case"Reverse":{const r=i("dims",a,e,t),n=[];for(let o=0;o<r.length;o++)r[o]&&n.push(o);const u=i("x",a,e,t);return[s.reverse(u,n)]}case"ReverseV2":{const r=i("axis",a,e,t),n=i("x",a,e,t);return[s.reverse(n,r)]}case"Slice":{const r=i("begin",a,e,t),n=i("size",a,e,t);return[s.slice(i("x",a,e,t),r,n)]}case"StridedSlice":{const r=i("begin",a,e,t),n=i("end",a,e,t),u=i("strides",a,e,t),o=i("beginMask",a,e,t),p=i("endMask",a,e,t),m=i("ellipsisMask",a,e,t),l=i("newAxisMask",a,e,t),c=i("shrinkAxisMask",a,e,t),d=i("x",a,e,t);return[s.stridedSlice(d,r,n,u,o,p,m,l,c)]}case"Pack":return P(()=>{const r=i("axis",a,e,t),n=i("tensors",a,e,t),u=n[0].shape,o=s.squeeze(n[0]).shape,p=n.map(m=>{const l=oe(m.shape,u);if(!l&&!oe(s.squeeze(m).shape,o))throw new Error("the input tensors shape does not match");return l?m:s.reshape(m,u)});return[s.stack(p,r)]});case"Unpack":{const r=i("axis",a,e,t),n=i("tensor",a,e,t);return s.unstack(n,r)}case"Tile":{const r=i("reps",a,e,t);return[s.tile(i("x",a,e,t),r)]}case"Split":case"SplitV":{const r=i("axis",a,e,t),n=i("numOrSizeSplits",a,e,t),u=i("x",a,e,t);return s.split(u,n,r)}case"ScatterNd":{const r=i("indices",a,e,t),n=i("values",a,e,t),u=i("shape",a,e,t);return[s.scatterND(r,n,u)]}case"GatherNd":{const r=i("x",a,e,t),n=i("indices",a,e,t);return[s.gatherND(r,n)]}case"SparseToDense":{const r=i("sparseIndices",a,e,t),n=i("outputShape",a,e,t),u=i("sparseValues",a,e,t),o=i("defaultValue",a,e,t);return[s.sparseToDense(r,u,n,u.dtype===o.dtype?o:s.cast(o,u.dtype))]}case"TensorScatterUpdate":{const r=i("indices",a,e,t),n=i("values",a,e,t),u=i("tensor",a,e,t);return[s.tensorScatterUpdate(u,r,n)]}default:throw TypeError(`Node type ${a.op} is not implemented`)}};/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const eu=(a,e,t,s=V)=>{switch(a.op){case"SparseFillEmptyRows":{const{outputIndices:r,outputValues:n,emptyRowIndicator:u,reverseIndexMap:o}=s.sparse.sparseFillEmptyRows(i("indices",a,e,t),i("values",a,e,t),i("denseShape",a,e,t),i("defaultValue",a,e,t));return[r,n,u,o]}case"SparseReshape":{const{outputIndices:r,outputShape:n}=s.sparse.sparseReshape(i("inputIndices",a,e,t),i("inputShape",a,e,t),i("newShape",a,e,t));return[r,n]}case"SparseSegmentMean":return[s.sparse.sparseSegmentMean(i("data",a,e,t),i("indices",a,e,t),i("segmentIds",a,e,t))];case"SparseSegmentSum":return[s.sparse.sparseSegmentSum(i("data",a,e,t),i("indices",a,e,t),i("segmentIds",a,e,t))];default:throw TypeError(`Node type ${a.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const tu=(a,e,t,s=V)=>{switch(a.op){case"FFT":return[s.fft(i("x",a,e,t))];case"IFFT":return[s.ifft(i("x",a,e,t))];case"RFFT":return[s.rfft(i("x",a,e,t))];case"IRFFT":return[s.irfft(i("x",a,e,t))];default:throw TypeError(`Node type ${a.op} is not implemented`)}};/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const au=(a,e,t,s=V)=>{switch(a.op){case"StaticRegexReplace":return[s.string.staticRegexReplace(i("input",a,e,t),i("pattern",a,e,t),i("rewrite",a,e,t),i("replaceGlobal",a,e,t))];case"StringNGrams":{const{nGrams:r,nGramsSplits:n}=s.string.stringNGrams(i("data",a,e,t),i("dataSplits",a,e,t),i("separator",a,e,t),i("nGramWidths",a,e,t),i("leftPad",a,e,t),i("rightPad",a,e,t),i("padWidth",a,e,t),i("preserveShortSequences",a,e,t));return[r,n]}case"StringSplit":{const{indices:r,values:n,shape:u}=s.string.stringSplit(i("input",a,e,t),i("delimiter",a,e,t),i("skipEmpty",a,e,t));return[r,n,u]}case"StringToHashBucketFast":return[s.string.stringToHashBucketFast(i("input",a,e,t),i("numBuckets",a,e,t))];default:throw TypeError(`Node type ${a.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const su=(a,e,t,s=V)=>{switch(a.op){case"Cast":return[s.cast(i("x",a,e,t),i("dtype",a,e,t))];case"ExpandDims":{const r=i("axis",a,e,t);return[s.expandDims(i("x",a,e,t),r)]}case"Squeeze":{const r=i("axis",a,e,t);return[s.squeeze(i("x",a,e,t),r)]}case"Reshape":return[s.reshape(i("x",a,e,t),i("shape",a,e,t))];case"EnsureShape":return[s.ensureShape(i("x",a,e,t),i("shape",a,e,t))];case"MirrorPad":return[s.mirrorPad(i("x",a,e,t),i("padding",a,e,t),i("mode",a,e,t))];case"PadV2":case"Pad":return[s.pad(i("x",a,e,t),i("padding",a,e,t),i("constantValue",a,e,t))];case"SpaceToBatchND":{const r=i("blockShape",a,e,t),n=i("paddings",a,e,t);return[s.spaceToBatchND(i("x",a,e,t),r,n)]}case"BatchToSpaceND":{const r=i("blockShape",a,e,t),n=i("crops",a,e,t);return[s.batchToSpaceND(i("x",a,e,t),r,n)]}case"DepthToSpace":{const r=i("blockSize",a,e,t),n=i("dataFormat",a,e,t).toUpperCase();return[s.depthToSpace(i("x",a,e,t),r,n)]}case"BroadcastTo":return[s.broadcastTo(i("x",a,e,t),i("shape",a,e,t))];case"BroadcastArgs":return[s.broadcastArgs(i("s0",a,e,t),i("s1",a,e,t))];default:throw TypeError(`Node type ${a.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Me(a,e,t,s,r=P){const n=((u,o,p)=>{switch(u.category){case"arithmetic":return r(()=>zo(u,o,p));case"basic_math":return r(()=>Lo(u,o,p));case"control":return jo(u,o,p);case"convolution":return r(()=>Ro(u,o,p));case"creation":return r(()=>Bo(u,o,p));case"dynamic":return Ho(u,o,p);case"evaluation":return r(()=>qo(u,o,p));case"image":return r(()=>Uo(u,o,p));case"graph":return r(()=>Wo(u,o,p));case"logical":return r(()=>Jo(u,o,p));case"matrices":return r(()=>Xo(u,o,p));case"normalization":return r(()=>Zo(u,o,p));case"ragged":return r(()=>Qo(u,o,p));case"reduction":return r(()=>Yo(u,o,p));case"slice_join":return r(()=>Mo(u,o,p));case"sparse":return r(()=>eu(u,o,p));case"spectral":return r(()=>tu(u,o,p));case"string":return r(()=>au(u,o,p));case"transformation":return r(()=>su(u,o,p));case"hash_table":return Ko(u,o,p,s);case"custom":const m=_t(u.op);if(m&&m.customExecutor)return m.customExecutor(new Do(u,o,p));throw TypeError(`Custom op ${u.op} is not registered.`);default:throw TypeError(`Unknown op '${u.op}'. File an issue at https://github.com/tensorflow/tfjs/issues so we can add it, or register a custom execution with tf.registerOp()`)}})(a,e,t);return ge(n)?n.then(u=>[].concat(u)):[].concat(n)}class et{constructor(e={},t={},s={},r={},n){this.weightMap=e,this.tensorArrayMap=t,this.tensorListMap=s,this.functionMap=r,this.parseNodeNameCache=n,this.rootContext={id:0,frameName:"",iterationId:0},this.contexts=[this.rootContext],this.lastId=0,this.generateCurrentContextIds()}newFrame(e,t){return{id:e,frameName:t,iterationId:0}}set currentContext(e){this.contexts!==e&&(this.contexts=e,this.generateCurrentContextIds())}get currentContext(){return this.contexts}get currentContextId(){return this._currentContextIds[0]}get currentContextIds(){return this._currentContextIds}generateCurrentContextIds(){const e=[];for(let t=0;t<this.contexts.length-1;t++){const s=this.contexts.slice(0,this.contexts.length-t);e.push(this.contextIdforContexts(s))}e.push(""),this._currentContextIds=e}contextIdforContexts(e){return e?e.map(t=>t.id===0&&t.iterationId===0?"":`${t.frameName}-${t.iterationId}`).join("/"):""}enterFrame(e){this.contexts&&(this.lastId++,this.contexts=this.contexts.slice(),this.contexts.push(this.newFrame(this.lastId,e)),this._currentContextIds.unshift(this.contextIdforContexts(this.contexts)))}exitFrame(){if(this.contexts&&this.contexts.length>1)this.contexts=this.contexts.slice(),this.contexts.splice(-1),this.currentContextIds.shift();else throw new Error("Cannot exit frame, the context is empty")}nextIteration(){if(this.contexts&&this.contexts.length>0){this.contexts=this.contexts.slice(),this.lastId++;const e=Object.assign({},this.contexts[this.contexts.length-1]);e.iterationId+=1,e.id=this.lastId,this.contexts.splice(-1,1,e),this._currentContextIds.splice(0,1,this.contextIdforContexts(this.contexts))}else throw new Error("Cannot increase frame iteration, the context is empty")}getWeight(e){return this.weightMap[e]}addTensorArray(e){this.tensorArrayMap[e.id]=e}getTensorArray(e){return this.tensorArrayMap[e]}addTensorList(e){this.tensorListMap[e.id]=e}getTensorList(e){return this.tensorListMap[e]}dispose(e){for(const t in this.tensorArrayMap)this.tensorArrayMap[t].clearAndClose(e);for(const t in this.tensorListMap)this.tensorListMap[t].clearAndClose(e)}}/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function tt(a,e,t,s){const r=new Set,n=[];let u=null,o=null;const p=new Set,m=new Set(Object.keys(a).map(d=>x(d)[0]));s=s||[];const l=new Set(s.map(d=>x(d.name)[0])),c=[...e];for(;c.length>0;){const d=c.pop();if((X(d)||lu(d)||cu(d))&&u==null&&(u=d,o=u.children.map(h=>h.name).filter(h=>r.has(h))),r.add(d.name),t[d.name]==null&&!m.has(d.name)&&!l.has(d.name)){if(d.inputs.length===0){n.push(d.name);continue}d.inputs.forEach(h=>{p.has(h.name)||(p.add(h.name),c.push(h))})}}return{inputs:a,outputs:e,usedNodes:r,missingInputs:n,dynamicNode:u,syncInputs:o}}function ru(a,e){const{usedNodes:t,inputs:s}=e,r=Object.keys(s).map(y=>x(y)[0]).map(y=>a.nodes[y]),n=a.initNodes||[],u=y=>t.has(typeof y=="string"?y:y.name);function o(y){return[...new Map(y.map(b=>[b.name,b])).values()]}const p=o([...r,...a.weights,...n]).filter(u),m=o([...p,...Object.values(a.nodes)]).filter(u),l=new Map(m.map(y=>[y.name,y])),c={};for(const y of m){c[y.name]=c[y.name]||0;for(const b of y.children)u(b)||(c[b.name]=Number.POSITIVE_INFINITY),c[b.name]=(c[b.name]||0)+1}const d=Object.entries(c).filter(([,y])=>y===0).map(([y])=>y),h=[...d];for(;d.length>0;){const y=d.pop(),b=l.get(y);for(const S of b.children.filter(u))--c[S.name]===0&&(h.push(S.name),d.push(S.name))}const g=h.map(y=>l.get(y)),f=nu(g,p);return iu(f,p),f}function nu(a,e){const t=new Map(a.map(u=>[u.name,u])),s=e.map(u=>u.name),r=new Set(s);for(;s.length>0;){const u=s.pop(),o=t.get(u);for(const p of o.children)!t.has(p.name)||r.has(p.name)||(r.add(p.name),s.push(p.name))}return a.filter(u=>r.has(u.name))}class de extends Error{constructor(e){super(`NodesExecutionOrderError: ${e}`)}}function iu(a,e){const t=new Map(a.map((o,p)=>[o.name,p])),s=new Set(e.map(o=>o.name)),r=o=>s.has(typeof o=="string"?o:o.name),n=new Set(a.map(o=>o.name)),u=o=>n.has(typeof o=="string"?o:o.name);for(const o of a){for(const p of o.children.filter(u)){if(!t.has(p.name))throw new de(`Child ${p.name} of node ${o.name} is unreachable.`);if(t.get(o.name)>t.get(p.name))throw new de(`Node ${o.name} is scheduled to run after its child ${p.name}.`)}if(!r(o))for(const p of o.inputs){if(!t.has(p.name))throw new de(`Input ${p.name} of node ${o.name} is unreachable.`);if(t.get(p.name)>t.get(o.name))throw new de(`Node ${o.name} is scheduled to run before its input ${p.name}.`)}}}function ou(a){const e=new Map(a.map((o,p)=>[o.name,p])),t=Number.MAX_SAFE_INTEGER,s=a.map((o,p)=>X(o)?t:p),r=o=>{const p=s[e.get(o.name)];return p??-1},n=a.map((o,p)=>o.children.map(r).reduce((m,l)=>Math.max(m,l),s[p])),u=new Map;for(let o=0;o<a.length;++o){const p=n[o];if(p===t)continue;const m=a[o],l=a[p];u.has(l.name)||u.set(l.name,[]),u.get(l.name).push(m)}return u}const uu=new Set(["Switch","Merge","Enter","Exit","NextIteration","StatelessIf","StatelessWhile","if","While"]),pu=new Set(["NonMaxSuppressionV2","NonMaxSuppressionV3","NonMaxSuppressionV5","Where"]),mu=new Set(["HashTable","HashTableV2","LookupTableImport","LookupTableImportV2","LookupTableFind","LookupTableFindV2","LookupTableSize","LookupTableSizeV2"]);function X(a){return uu.has(a.op)}function lu(a){return pu.has(a.op)}function cu(a){return mu.has(a.op)}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class be{get weightIds(){return this.parent?this.parent.weightIds:this._weightIds}get functionExecutorMap(){return this.parent?this.parent.functionExecutorMap:this._functionExecutorMap}get weightMap(){return this.parent?this.parent.weightMap:this._weightMap}set weightMap(e){const t=Object.keys(e).map(s=>e[s].map(r=>r.id));this._weightIds=[].concat(...t),this._weightMap=e}set resourceManager(e){this._resourceManager=e}get inputs(){return this._inputs.map(e=>({name:e.name,shape:e.attrParams.shape?e.attrParams.shape.value:void 0,dtype:e.attrParams.dtype?e.attrParams.dtype.value:void 0}))}get outputs(){return this._outputs.map(e=>({name:e.name,shape:e.attrParams.shape?e.attrParams.shape.value:void 0,dtype:e.attrParams.dtype?e.attrParams.dtype.value:void 0}))}get inputNodes(){return this._inputs.map(e=>e.signatureKey||e.name)}get outputNodes(){return this._outputs.map(e=>{const t=e.signatureKey||e.name;return e.defaultOutput?`${t}:${e.defaultOutput}`:t})}get functions(){return Object.keys(this._functions).reduce((e,t)=>(e[t]=this._functions[t].signature,e),{})}constructor(e,t){this.graph=e,this.parent=t,this.compiledMap=new Map,this.parseNodeNameCache=new Map,this._weightMap={},this.SEPARATOR=",",this._functions={},this._functionExecutorMap={},this.keepIntermediateTensors=!1,this._outputs=e.outputs,this._inputs=e.inputs,this._initNodes=e.initNodes,this._signature=e.signature,this._functions=e.functions,e.functions!=null&&Object.keys(e.functions).forEach(s=>{this._functionExecutorMap[s]=new be(e.functions[s],this)})}getCompilationKey(e,t){const s=e.map(n=>n.name).sort(),r=t.map(n=>n.name).sort();return s.join(this.SEPARATOR)+"--"+r.join(this.SEPARATOR)}compile(e,t){const s=tt(e,t,this.weightMap,this._initNodes),{missingInputs:r,dynamicNode:n,syncInputs:u}=s;if(n!=null)throw new Error(`This execution contains the node '${n.name}', which has the dynamic op '${n.op}'. Please use model.executeAsync() instead. Alternatively, to avoid the dynamic ops, specify the inputs [${u}]`);if(r.length>0){const m=t.map(c=>c.name),l=Object.keys(e);throw new Error(`Cannot compute the outputs [${m}] from the provided inputs [${l}]. Missing the following inputs: [${r}]`)}const o=ru(this.graph,s),p=ou(o);return{orderedNodes:o,nodeLiveUntilMap:p}}cloneAndKeepTensor(e){if(e==null)return null;const t=e.clone();return G(t),t}cloneTensorList(e){return e?e.map(s=>this.cloneAndKeepTensor(s)):null}cloneTensorMap(e){return Object.fromEntries(Object.entries(e).map(([t,s])=>[t,this.cloneTensorList(s)]))}execute(e,t){this.disposeIntermediateTensors(),e=this.mapInputs(e);const s=Object.keys(e).sort();this.checkInputs(e),this.checkInputShapeAndType(e),t=this.mapOutputs(t),this.checkOutputs(t);const r=s.map(d=>this.graph.nodes[x(d)[0]]),n=t.map(d=>x(d)[0]),u=new Set(n);let o=n.map(d=>this.graph.nodes[d]);o.length===0&&(o=this._outputs);const p=this.getCompilationKey(r,o);let m=this.compiledMap.get(p);m==null&&(m=this.compile(e,o),this.compiledMap.set(p,m));try{this.keepIntermediateTensors=_e().getBool("KEEP_INTERMEDIATE_TENSORS")}catch(d){this.keepIntermediateTensors=!1,console.warn(d.message)}const l={},c={};return P(()=>{const d=new et(this.weightMap,l,c,this.functionExecutorMap,this.parseNodeNameCache),h=Object.assign({},this.weightMap);this.keepIntermediateTensors&&(this.clonedTensorsMap=this.cloneTensorMap(this.weightMap)),Object.keys(e).forEach(b=>{const[S,k]=x(b,d),T=[];T[k]=e[b],h[S]=T,this.keepIntermediateTensors&&(this.clonedTensorsMap[S]=this.cloneTensorList(T))});const g=this.getFrozenTensorIds(h),{orderedNodes:f,nodeLiveUntilMap:y}=m;for(const b of f){if(h[b.name])continue;const S=Me(b,h,d,this._resourceManager);if(ge(S))throw new Error(`The execution of the op '${b.op}' returned a promise. Please use model.executeAsync() instead.`);h[b.name]=S,this.keepIntermediateTensors&&(this.clonedTensorsMap[b.name]=this.cloneTensorList(S)),this.checkTensorForDisposalWithNodeLiveUntilInfo(b,h,d,g,u,y.get(b.name))}return this.parent==null&&d.dispose(g),t.map(b=>L(b,h,d))})}getFrozenTensorIds(e){const t=[].concat.apply([],Object.keys(e).map(s=>e[s]).map(s=>s.map(r=>r.id)));return new Set(t)}checkTensorForDisposal(e,t,s,r,n,u,o){if(!(X(t)||u.has(e))){for(const p of s[e])p!=null&&(o[p.id]=(o[p.id]||0)+t.children.length);for(const p of t.inputs){if(X(p))continue;const m=Je(p.name,s,r);if(m!=null)for(const l of m){if(!l||l.kept||n.has(l.id))continue;const c=o[l.id];c===1?(l.dispose(),delete o[l.id]):c!=null&&o[l.id]--}}}}checkTensorForDisposalWithNodeLiveUntilInfo(e,t,s,r,n,u){function o(p){return X(p)||n.has(p.name)}if(!(X(e)||u==null))for(const p of u){if(o(p))continue;const m=Je(p.name,t,s);for(const l of m)!l||l.kept||r.has(l.id)||l.dispose()}}async executeAsync(e,t){return this._executeAsync(e,t)}disposeIntermediateTensors(){this.clonedTensorsMap&&(Object.values(this.clonedTensorsMap).forEach(e=>{for(const t of e)t&&!t.isDisposed&&t.dispose()}),this.clonedTensorsMap=null)}getIntermediateTensors(){return this.clonedTensorsMap}async _executeAsync(e,t,s=!1,r={},n={}){this.disposeIntermediateTensors(),s||(e=this.mapInputs(e),this.checkInputs(e),this.checkInputShapeAndType(e),t=this.mapOutputs(t),this.checkOutputs(t));try{this.keepIntermediateTensors=_e().getBool("KEEP_INTERMEDIATE_TENSORS")}catch(d){this.keepIntermediateTensors=!1,console.warn(d.message)}const u=new et(this.weightMap,r,n,this.functionExecutorMap,this.parseNodeNameCache);this.keepIntermediateTensors&&(this.clonedTensorsMap=this.cloneTensorMap(this.weightMap));const o=await this.executeWithControlFlow(e,u,t,s),p=t.map(d=>L(d,o,u)),m=p.map(d=>d.id),l=Object.keys(e).map(d=>e[d].id),c=new Set([...m,...l,...this.weightIds]);return Object.values(o).forEach(d=>{d.forEach(h=>{h&&!h.isDisposed&&!c.has(h.id)&&h.dispose()})}),this.parent==null&&u.dispose(c),p}async executeFunctionAsync(e,t,s){const r=e.reduce((n,u,o)=>(n[this.inputs[o].name]=u,n),{});return this._executeAsync(r,this.outputNodes,!0,t,s)}async executeWithControlFlow(e,t,s,r){const n=Object.keys(e),u=n.map(T=>this.graph.nodes[x(T)[0]]),o=s.map(T=>x(T)[0]),p=new Set(o);let m=o.map(T=>this.graph.nodes[T]);m.length===0&&(m=this._outputs);const{usedNodes:l,missingInputs:c,dynamicNode:d,syncInputs:h}=tt(e,m,this.weightMap,this._initNodes),g=[...u,...this.graph.weights,...this._initNodes||[]].map(T=>({node:T,contexts:t.currentContext})),f=Object.assign({},this.weightMap);Object.keys(e).forEach(T=>{const[O,A]=x(T),I=[];I[A]=e[T],f[O]=I});const y={},b=this.getFrozenTensorIds(f),S={};for(;g.length>0;){const T=this.processStack(u,g,t,f,S,b,p,y,l);await Promise.all(T)}d==null&&!r&&console.warn("This model execution did not contain any nodes with control flow or dynamic output shapes. You can use model.execute() instead.");const k=m.filter(T=>!X(T)&&!L(T.name,f,t)).map(T=>T.name);if(k.length>0){let T="";throw d!=null&&(T=`Alternatively, to avoid the dynamic ops, use model.execute() and specify the inputs [${h}]`),new Error(`Cannot compute the outputs [${k}] from the provided inputs [${n}]. Consider providing the following inputs: [${c}]. ${T}`)}return f}processStack(e,t,s,r,n,u,o,p,m){const l=[];for(;t.length>0;){const c=t.pop();s.currentContext=c.contexts;let d="";if(c.node.op==="Enter"&&i("isConstant",c.node,r,s)&&([d]=q(c.node.name,s)),r[c.node.name]==null){const h=Me(c.node,r,s,this._resourceManager);d||([d]=q(c.node.name,s));const g=s.currentContext;ge(h)?l.push(h.then(f=>(r[d]=f,this.keepIntermediateTensors&&(this.clonedTensorsMap[d]=this.cloneTensorList(f)),s.currentContext=g,this.checkTensorForDisposal(d,c.node,r,s,u,o,p),this.processChildNodes(c.node,t,s,r,n,m),f))):(r[d]=h,this.keepIntermediateTensors&&(this.clonedTensorsMap[d]=this.cloneTensorList(h)),this.checkTensorForDisposal(d,c.node,r,s,u,o,p),this.processChildNodes(c.node,t,s,r,n,m))}else this.processChildNodes(c.node,t,s,r,n,m)}return l}processChildNodes(e,t,s,r,n,u){e.children.forEach(o=>{const[p]=q(o.name,s);n[p]||!u.has(o.name)||(o.op==="Merge"?o.inputNames.some(m=>!!L(m,r,s))&&(n[p]=!0,t.push({contexts:s.currentContext,node:o})):o.inputNames.every(m=>!!L(m,r,s))&&(n[p]=!0,t.push({contexts:s.currentContext,node:o})))})}dispose(){Object.keys(this.weightMap).forEach(e=>this.weightMap[e].forEach(t=>t.dispose()))}checkInputShapeAndType(e){Object.keys(e).forEach(t=>{const s=e[t],[r]=x(t),n=this.graph.nodes[r];if(n.attrParams.shape&&n.attrParams.shape.value){const u=n.attrParams.shape.value,o=u.length===s.shape.length&&s.shape.every((p,m)=>u[m]===-1||u[m]===p);v(o,()=>`The shape of dict['${n.name}'] provided in model.execute(dict) must be [${u}], but was [${s.shape}]`)}n.attrParams.dtype&&n.attrParams.dtype.value&&v(s.dtype===n.attrParams.dtype.value,()=>`The dtype of dict['${n.name}'] provided in model.execute(dict) must be ${n.attrParams.dtype.value}, but was ${s.dtype}`)})}mapInputs(e){var t,s;const r={};for(const n in e){const u=(s=(t=this._signature)===null||t===void 0?void 0:t.inputs)===null||s===void 0?void 0:s[n];u!=null?r[u.name]=e[n]:r[n]=e[n]}return r}checkInputs(e){const t=Object.keys(e).filter(s=>{const[r]=x(s);return this.graph.nodes[r]==null});if(t.length>0)throw new Error(`The dict provided in model.execute(dict) has keys: [${t}] that are not part of graph`)}mapOutputs(e){return e.map(t=>{var s,r;const n=(r=(s=this._signature)===null||s===void 0?void 0:s.outputs)===null||r===void 0?void 0:r[t];return n!=null?n.name:t},{})}checkOutputs(e){e.forEach(t=>{const[s]=x(t);if(!this.graph.nodes[s])throw new Error(`The output '${t}' is not found in the graph`)})}}class du{constructor(e={},t={}){this.hashTableNameToHandle=e,this.hashTableMap=t}addHashTable(e,t){this.hashTableNameToHandle[e]=t.handle,this.hashTableMap[t.id]=t}getHashTableHandleByName(e){return this.hashTableNameToHandle[e]}getHashTableById(e){return this.hashTableMap[e]}dispose(){for(const e in this.hashTableMap)this.hashTableMap[e].clearAndClose(),delete this.hashTableMap[e];for(const e in this.hashTableNameToHandle)this.hashTableNameToHandle[e].dispose(),delete this.hashTableNameToHandle[e]}}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const hu="?tfjs-format=file",yu="model.json";class fu{get modelVersion(){return this.version}get inputNodes(){return this.executor.inputNodes}get outputNodes(){return this.executor.outputNodes}get inputs(){return this.executor.inputs}get outputs(){return this.executor.outputs}get weights(){return this.executor.weightMap}get metadata(){return this.artifacts.userDefinedMetadata}get modelSignature(){return this.signature}get modelStructuredOutputKeys(){return this.structuredOutputKeys}constructor(e,t={},s=Ot){this.modelUrl=e,this.loadOptions=t,this.version="n/a",this.io=s,t==null&&(this.loadOptions={}),this.resourceManager=new du}findIOHandler(){const e=this.modelUrl;if(e.load!=null)this.handler=e;else if(this.loadOptions.requestInit!=null)this.handler=this.io.browserHTTPRequest(e,this.loadOptions);else{const t=this.io.getLoadHandlers(e,this.loadOptions);if(t.length===0)t.push(this.io.browserHTTPRequest(e,this.loadOptions));else if(t.length>1)throw new Error(`Found more than one (${t.length}) load handlers for URL '${[e]}'`);this.handler=t[0]}}load(){if(this.findIOHandler(),this.handler.load==null)throw new Error("Cannot proceed with model loading because the IOHandler provided does not have the `load` method implemented.");const e=this.handler.load();return ge(e)?e.then(t=>t.getWeightStream==null?this.loadSync(t):this.loadStreaming(t)):this.loadSync(e)}loadSync(e){const t=this.io.decodeWeights(e.weightData,e.weightSpecs);return this.loadWithWeightMap(e,t)}async loadStreaming(e){if(e.getWeightStream==null)throw new Error("Model artifacts missing streamWeights function");const t=await gt(e.getWeightStream(),e.weightSpecs);return this.loadWithWeightMap(e,t)}loadWithWeightMap(e,t){this.artifacts=e;const s=this.artifacts.modelTopology;let r=this.artifacts.signature;if(this.artifacts.userDefinedMetadata!=null){const n=this.artifacts.userDefinedMetadata;n.signature!=null&&(r=n.signature),n.structuredOutputKeys!=null&&(this.structuredOutputKeys=n.structuredOutputKeys)}if(this.signature=r,this.version=`${s.versions.producer}.${s.versions.minConsumer}`,this.executor=new be(Xe.Instance.transformGraph(s,this.signature)),this.executor.weightMap=this.convertTensorMapToTensorsMap(t),this.executor.resourceManager=this.resourceManager,e.modelInitializer!=null&&e.modelInitializer.node!=null){const n=Xe.Instance.transformGraph(e.modelInitializer);this.initializer=new be(n),this.initializer.weightMap=this.executor.weightMap,this.initializer.resourceManager=this.resourceManager,this.initializerSignature=e.initializerSignature}return!0}async save(e,t){if(typeof e=="string"){const s=this.io.getSaveHandlers(e);if(s.length===0)throw new Error(`Cannot find any save handlers for URL '${e}'`);if(s.length>1)throw new Error(`Found more than one (${s.length}) save handlers for URL '${e}'`);e=s[0]}if(e.save==null)throw new Error("GraphModel.save() cannot proceed because the IOHandler provided does not have the `save` attribute defined.");return e.save(this.artifacts)}addStructuredOutputNames(e){if(this.structuredOutputKeys){const t=e instanceof H?[e]:e,s={};return t.forEach((r,n)=>s[this.structuredOutputKeys[n]]=r),s}return e}predict(e,t){const s=this.execute(e,this.outputNodes);return this.addStructuredOutputNames(s)}async predictAsync(e,t){const s=await this.executeAsync(e,this.outputNodes);return this.addStructuredOutputNames(s)}normalizeInputs(e){var t;if(!(e instanceof H)&&!Array.isArray(e)){const n=(t=this.signature)===null||t===void 0?void 0:t.inputs;if(n!=null)for(const u in n){const o=n[u];o.resourceId!=null&&(e[u]=this.resourceIdToCapturedInput[o.resourceId])}return e}e=Array.isArray(e)?e:[e];const s=Object.keys(this.resourceIdToCapturedInput).length;if(e.length+s!==this.inputNodes.length)throw new Error(`Input tensor count mismatch, the graph model has ${this.inputNodes.length-s} non-resource placeholders, while there are ${e.length} input tensors provided.`);let r=0;return this.inputNodes.reduce((n,u)=>{var o,p,m;const l=(m=(p=(o=this.signature)===null||o===void 0?void 0:o.inputs)===null||p===void 0?void 0:p[u])===null||m===void 0?void 0:m.resourceId;return l!=null?n[u]=this.resourceIdToCapturedInput[l]:n[u]=e[r++],n},{})}normalizeOutputs(e){return e=e||this.outputNodes,Array.isArray(e)?e:[e]}executeInitializerGraph(){return this.initializer==null?[]:this.initializerSignature==null?this.initializer.execute({},[]):this.initializer.execute({},Object.keys(this.initializerSignature.outputs))}async executeInitializerGraphAsync(){return this.initializer==null?[]:this.initializerSignature==null?this.initializer.executeAsync({},[]):this.initializer.executeAsync({},Object.keys(this.initializerSignature.outputs))}setResourceIdToCapturedInput(e){if(this.resourceIdToCapturedInput={},this.initializerSignature){const t=this.initializerSignature.outputs,s=Object.keys(t);for(let r=0;r<s.length;r++){const n=s[r],u=t[n];this.resourceIdToCapturedInput[u.resourceId]=e[r]}}}execute(e,t){this.resourceIdToCapturedInput==null&&this.setResourceIdToCapturedInput(this.executeInitializerGraph()),e=this.normalizeInputs(e),t=this.normalizeOutputs(t);const s=this.executor.execute(e,t);return s.length>1?s:s[0]}async executeAsync(e,t){this.resourceIdToCapturedInput==null&&this.setResourceIdToCapturedInput(await this.executeInitializerGraphAsync()),e=this.normalizeInputs(e),t=this.normalizeOutputs(t);const s=await this.executor.executeAsync(e,t);return s.length>1?s:s[0]}getIntermediateTensors(){return this.executor.getIntermediateTensors()}disposeIntermediateTensors(){this.executor.disposeIntermediateTensors()}convertTensorMapToTensorsMap(e){return Object.keys(e).reduce((t,s)=>(t[s]=[e[s]],t),{})}dispose(){this.executor.dispose(),this.initializer&&(this.initializer.dispose(),this.resourceIdToCapturedInput&&hn(this.resourceIdToCapturedInput)),this.resourceManager.dispose()}}async function at(a,e={},t=Ot){if(a==null)throw new Error("modelUrl in loadGraphModel() cannot be null. Please provide a url or an IOHandler that loads the model");e==null&&(e={}),e.fromTFHub&&typeof a=="string"&&(a=gu(a));const s=new fu(a,e,t);return await s.load(),s}function gu(a){return a.endsWith("/")||(a=a+"/"),`${a}${yu}${hu}`}/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 *//*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */function M(a,e,t,s){function r(n){return n instanceof t?n:new t(function(u){u(n)})}return new(t||(t=Promise))(function(n,u){function o(l){try{m(s.next(l))}catch(c){u(c)}}function p(l){try{m(s.throw(l))}catch(c){u(c)}}function m(l){l.done?n(l.value):r(l.value).then(o,p)}m((s=s.apply(a,[])).next())})}function ee(a,e){var t={label:0,sent:function(){if(n[0]&1)throw n[1];return n[1]},trys:[],ops:[]},s,r,n,u;return u={next:o(0),throw:o(1),return:o(2)},typeof Symbol=="function"&&(u[Symbol.iterator]=function(){return this}),u;function o(m){return function(l){return p([m,l])}}function p(m){if(s)throw new TypeError("Generator is already executing.");for(;t;)try{if(s=1,r&&(n=m[0]&2?r.return:m[0]?r.throw||((n=r.return)&&n.call(r),0):r.next)&&!(n=n.call(r,m[1])).done)return n;switch(r=0,n&&(m=[m[0]&2,n.value]),m[0]){case 0:case 1:n=m;break;case 4:return t.label++,{value:m[1],done:!1};case 5:t.label++,r=m[1],m=[0];continue;case 7:m=t.ops.pop(),t.trys.pop();continue;default:if(n=t.trys,!(n=n.length>0&&n[n.length-1])&&(m[0]===6||m[0]===2)){t=0;continue}if(m[0]===3&&(!n||m[1]>n[0]&&m[1]<n[3])){t.label=m[1];break}if(m[0]===6&&t.label<n[1]){t.label=n[1],n=m;break}if(n&&t.label<n[2]){t.label=n[2],t.ops.push(m);break}n[2]&&t.ops.pop(),t.trys.pop();continue}m=e.call(a,t)}catch(l){m=[6,l],r=0}finally{s=n=0}if(m[0]&5)throw m[1];return{value:m[0]?m[1]:void 0,done:!0}}}/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */var Nu=function(a){a.startEndTensor.dispose(),a.startPoint.dispose(),a.endPoint.dispose()},je=function(a){return{startEndTensor:a,startPoint:E(a,[0,0],[-1,2]),endPoint:E(a,[0,2],[-1,2])}},bu=function(a,e){var t=R(a.startPoint,e),s=R(a.endPoint,e),r=Re([t,s],1);return je(r)};/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */var Tu={strides:[8,16],anchors:[2,6]},st=6;function Su(a,e,t){for(var s=[],r=0;r<t.strides.length;r++)for(var n=t.strides[r],u=Math.floor((e+n-1)/n),o=Math.floor((a+n-1)/n),p=t.anchors[r],m=0;m<u;m++)for(var l=n*(m+.5),c=0;c<o;c++)for(var d=n*(c+.5),h=0;h<p;h++)s.push([d,l]);return s}function wu(a,e,t){var s=E(a,[0,1],[-1,2]),r=K(s,e),n=E(a,[0,3],[-1,2]),u=Q(n,t),o=Q(r,t),p=Q(u,2),m=J(o,p),l=K(o,p),c=R(m,t),d=R(l,t),h=1;return Re([c,d],h)}function vu(a){return a instanceof H?[a.shape[0],a.shape[1]]:[a.height,a.width]}function rt(a,e){var t,s,r;if(a.topLeft instanceof H&&a.bottomRight instanceof H){var n=P(function(){return[ae([E(J(e-1,a.topLeft),0,1),E(a.topLeft,1,1)]),ae([J(e-1,E(a.bottomRight,0,1)),E(a.bottomRight,1,1)])]}),u=n[0],o=n[1];t=u,s=o,a.landmarks!=null&&(r=P(function(){var f=J(fe([e-1,0]),a.landmarks),y=fe([1,-1]),b=R(f,y);return b}))}else{var p=a.topLeft,m=p[0],l=p[1],c=a.bottomRight,d=c[0],h=c[1];t=[e-1-m,l],s=[e-1-d,h],a.landmarks!=null&&(r=a.landmarks.map(function(f){return[e-1-f[0],f[1]]}))}var g={topLeft:t,bottomRight:s};return r!=null&&(g.landmarks=r),a.probability!=null&&(g.probability=a.probability instanceof H?a.probability.clone():a.probability),g}function nt(a,e){return P(function(){var t;return a.hasOwnProperty("box")?t=a.box:t=a,te(bu(t,e).startEndTensor)})}var Ou=function(){function a(e,t,s,r,n,u){this.blazeFaceModel=e,this.width=t,this.height=s,this.maxFaces=r,this.anchorsData=Su(t,s,Tu),this.anchors=Ae(this.anchorsData),this.inputSizeData=[t,s],this.inputSize=fe([t,s]),this.iouThreshold=n,this.scoreThreshold=u}return a.prototype.getBoundingBoxes=function(e,t,s){return s===void 0&&(s=!0),M(this,void 0,void 0,function(){var r,n,u,o,p,m,l,c,d,h,g,f,y,b,S=this;return ee(this,function(k){switch(k.label){case 0:return r=P(function(){var T=ke.resizeBilinear(e,[S.width,S.height]),O=R(J(Q(T,255),.5),2),A=S.blazeFaceModel.predict(O),I=te(A),C=wu(I,S.anchors,S.inputSize),$=E(I,[0,0],[-1,1]),z=te(ie($));return[I,C,z]}),n=r[0],u=r[1],o=r[2],p=console.warn,console.warn=function(){},m=ke.nonMaxSuppression(u,o,this.maxFaces,this.iouThreshold,this.scoreThreshold),console.warn=p,[4,m.array()];case 1:return l=k.sent(),m.dispose(),c=l.map(function(T){return E(u,[T,0],[1,-1])}),t?[3,3]:[4,Promise.all(c.map(function(T){return M(S,void 0,void 0,function(){var O;return ee(this,function(A){switch(A.label){case 0:return[4,T.array()];case 1:return O=A.sent(),T.dispose(),[2,O]}})})}))];case 2:c=k.sent(),k.label=3;case 3:for(d=e.shape[1],h=e.shape[2],t?g=Q([h,d],this.inputSize):g=[h/this.inputSizeData[0],d/this.inputSizeData[1]],f=[],y=function(T){var O=c[T],A=P(function(){var I=O instanceof H?je(O):je(Ae(O));if(!s)return I;var C=l[T],$;t?$=E(S.anchors,[C,0],[1,2]):$=S.anchorsData[C];var z=_(te(E(n,[C,st-1],[1,-1])),[st,-1]),B=E(o,[C],[1]);return{box:I,landmarks:z,probability:B,anchor:$}});f.push(A)},b=0;b<c.length;b++)y(b);return u.dispose(),o.dispose(),n.dispose(),[2,{boxes:f,scaleFactor:g}]}})})},a.prototype.estimateFaces=function(e,t,s,r){return t===void 0&&(t=!1),s===void 0&&(s=!1),r===void 0&&(r=!0),M(this,void 0,void 0,function(){var n,u,o,p,m,l,c=this;return ee(this,function(d){switch(d.label){case 0:return n=vu(e),u=n[1],o=P(function(){return e instanceof H||(e=yn(e)),Tt(bt(e,"float32"),0)}),[4,this.getBoundingBoxes(o,t,r)];case 1:return p=d.sent(),m=p.boxes,l=p.scaleFactor,o.dispose(),t?[2,m.map(function(h){var g=nt(h,l),f={topLeft:E(g,[0],[2]),bottomRight:E(g,[2],[2])};if(r){var y=h,b=y.landmarks,S=y.probability,k=y.anchor,T=R(K(b,k),l);f.landmarks=T,f.probability=S}return s&&(f=rt(f,u)),f})]:[2,Promise.all(m.map(function(h){return M(c,void 0,void 0,function(){var g,f,S,y,b,S,k,T,O,A,I,C,$=this;return ee(this,function(z){switch(z.label){case 0:return g=nt(h,l),r?[3,2]:[4,g.array()];case 1:return S=z.sent(),f={topLeft:S.slice(0,2),bottomRight:S.slice(2)},[3,4];case 2:return[4,Promise.all([h.landmarks,g,h.probability].map(function(B){return M($,void 0,void 0,function(){return ee(this,function(Se){return[2,B.array()]})})}))];case 3:y=z.sent(),b=y[0],S=y[1],k=y[2],T=h.anchor,O=l,A=O[0],I=O[1],C=b.map(function(B){return[(B[0]+T[0])*A,(B[1]+T[1])*I]}),f={topLeft:S.slice(0,2),bottomRight:S.slice(2),landmarks:C,probability:k},Nu(h.box),h.landmarks.dispose(),h.probability.dispose(),z.label=4;case 4:return g.dispose(),s&&(f=rt(f,u)),[2,f]}})})}))]}})})},a.prototype.dispose=function(){this.blazeFaceModel.dispose(),this.anchors.dispose(),this.inputSize.dispose()},a}();/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */var _u="https://tfhub.dev/tensorflow/tfjs-model/blazeface/1/default/1";function Au(a){var e=a===void 0?{}:a,t=e.maxFaces,s=t===void 0?10:t,r=e.inputWidth,n=r===void 0?128:r,u=e.inputHeight,o=u===void 0?128:u,p=e.iouThreshold,m=p===void 0?.3:p,l=e.scoreThreshold,c=l===void 0?.75:l,d=e.modelUrl;return M(this,void 0,void 0,function(){var h,g;return ee(this,function(f){switch(f.label){case 0:return d==null?[3,2]:[4,at(d)];case 1:return h=f.sent(),[3,4];case 2:return[4,at(_u,{fromTFHub:!0})];case 3:h=f.sent(),f.label=4;case 4:return g=new Ou(h,n,o,s,m,c),[2,g]}})})}export{Ou as BlazeFaceModel,Au as load};
