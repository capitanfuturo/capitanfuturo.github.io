"use strict";(self.webpackChunkgatsby_starter_blog=self.webpackChunkgatsby_starter_blog||[]).push([[544],{5769:function(e,t,l){l.r(t);var n=l(7294),a=l(4854),r=l(8771),o=l(8678);t.default=e=>{var t;let{data:l,location:s,pageContext:i}=e;const c=(null===(t=l.site.siteMetadata)||void 0===t?void 0:t.title)||"Capitanfuturo",m=l.allMarkdownRemark.nodes,{currentPage:u,numPages:g}=i,p=1===u,d=u===g,E=u-1==1?"/":"/"+(u-1).toString(),f="/"+(u+1).toString();return console.log(`Page ${i.currentPage}/${i.numPages} (Previous page ${E} - Next page ${f})`),0===m.length?n.createElement(o.Z,{location:s,title:c},n.createElement(r.Z,null),n.createElement("p",null,'No blog posts found. Add markdown posts to "content/blog" (or the directory you specified for the "gatsby-source-filesystem" plugin in gatsby-config.js).')):n.createElement(o.Z,{location:s,title:c},n.createElement(r.Z,null),n.createElement("ol",{style:{listStyle:"none"}},m.map((e=>{const t=e.frontmatter.title;return n.createElement("li",{key:e.fields.slug},n.createElement("article",{className:"post-list-item",itemScope:!0,itemType:"http://schema.org/Article"},n.createElement("header",null,n.createElement("h2",null,n.createElement(a.Link,{to:e.fields.slug,itemProp:"url"},n.createElement("span",{itemProp:"headline"},t))),n.createElement("small",null,e.frontmatter.date,", Tags: ",e.frontmatter.tags)),n.createElement("section",null,n.createElement("p",{dangerouslySetInnerHTML:{__html:e.excerpt},itemProp:"description"}))))}))),n.createElement("nav",{className:"blog-post-nav"},n.createElement("ul",{style:{display:"flex",flexWrap:"wrap",justifyContent:"space-between",listStyle:"none",padding:0}},n.createElement("li",null,!p&&n.createElement(a.Link,{to:E,rel:"prev"},"← Previous Page")),n.createElement("li",null,!d&&n.createElement(a.Link,{to:f,rel:"next"},"Next Page →")))))}}}]);
//# sourceMappingURL=component---src-templates-blog-list-js-a9565ab7df09b0cbe9ad.js.map