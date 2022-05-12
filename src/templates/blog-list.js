import React from 'react'
import { Link, graphql } from 'gatsby'

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogListTemplate = ({ data, location, pageContext }) => {
  const siteTitle = data.site.siteMetadata?.title || `Capitanfuturo`  
  const posts = data.allMarkdownRemark.nodes
    console.log(pageContext);
    console.log(location);
    console.log(data);

    const { currentPage, numPages } = pageContext
    const isFirst = currentPage === 1
    const isLast = currentPage === numPages
    const prevPage = currentPage - 1 === 1 ? "/" : "/" + (currentPage - 1).toString()
    const nextPage = "/" + (currentPage + 1).toString()

    if (posts.length === 0) {
      return (
        <Layout location={location} title={siteTitle}>
          <Seo title="All posts" />
          <Bio />
          <p>
            No blog posts found. Add markdown posts to "content/blog" (or the
            directory you specified for the "gatsby-source-filesystem" plugin in
            gatsby-config.js).
          </p>
        </Layout>
      )
    }

    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="All posts" />
        <Bio />
        <ol style={{ listStyle: `none` }}>
          {posts.map(post => {
            const title = post.frontmatter.title
            
  
            return (
              <li key={post.fields.slug}>
                <article
                  className="post-list-item"
                  itemScope
                  itemType="http://schema.org/Article"
                >
                  <header>
                    <h2>
                      <Link to={post.fields.slug} itemProp="url">
                        <span itemProp="headline">{title}</span>
                      </Link>
                    </h2>
                    <small>
                      {post.frontmatter.date}, Tags: {post.frontmatter.tags}
                    </small>
                  </header>
                  <section>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: post.excerpt,
                      }}
                      itemProp="description"
                    />
                  </section>
                </article>
              </li>
            )
          })}
        </ol>
        <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
          {!isFirst && (
          <Link to={prevPage} rel="prev">
            ← Previous Page
          </Link>
        )}
        </li>
        <li>
        {!isLast && (
          <Link to={nextPage} rel="next">
            Next Page →
          </Link>
        )}
          </li>
        </ul>
      </nav>
      </Layout>
    )
}

export default BlogListTemplate;

export const pageQuery = graphql`
  query blogPageQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      nodes {
        excerpt(pruneLength: 256)
        fields {
          slug
        }
        frontmatter {
          date(formatString: "DD MMMM, YYYY")
          title
          description
          tags
        }
      }
    }
  }
`;