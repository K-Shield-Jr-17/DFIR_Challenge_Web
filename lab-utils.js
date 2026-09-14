(function(root){
 'use strict';
 function normalize(value,caseSensitive){const text=String(value).trim().replace(/\r\n?/g,'\n');return caseSensitive?text:text.toLowerCase();}
 function grade(task,input){
  const answers=Array.isArray(task.answers)?task.answers.filter(a=>typeof a==='string'&&a.trim()):[];
  if(!answers.length)return 'unconfigured';
  if(!String(input).trim())return 'empty';
  return answers.some(answer=>normalize(answer,task.caseSensitive)===normalize(input,task.caseSensitive))?'correct':'incorrect';
 }
 function resourceUrl(value,base){
  if(typeof value!=='string'||!value.trim()||value.trim().startsWith('#'))return null;
  try{const url=new URL(value.trim(),base);return ['http:','https:'].includes(url.protocol)?url.href:null;}catch{return null;}
 }
 root.LabUtils={grade,resourceUrl};
})(typeof window==='undefined'?globalThis:window);
