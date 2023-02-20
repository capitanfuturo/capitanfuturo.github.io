const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);
const _ = require("lodash");

exports.createPages = async ({ graphql, actions, reporter }) => {
  // fetch data
  console.log("LOG: fetch data");
  const { data } = await graphql(
    `
      query Projects {
        posts: allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: ASC }
          filter: { frontmatter: { published: { eq: true } } }
          limit: 1000
        ) {
          nodes {
            id
            fields {
              slug
            }
            frontmatter {
              tags
            }
          }
        }
        tagsGroup: allMarkdownRemark(limit: 2000) {
          group(field: frontmatter___tags) {
            fieldValue
            totalCount
          }
        }
      }
    `
  );

  // check error
  console.log(`LOG: check error: ${JSON.stringify(data.errors)}`);
  if (data.errors) {
    reporter.panicOnBuild(`There was an error loading data`, result.errors);
    return;
  }

  // post list page
  console.log(`LOG: post list page`);
  const POST_PER_PAGE = 10;
  const posts = data.posts.nodes;
  const numPages = Math.ceil(posts.length / POST_PER_PAGE);
  Array.from({ length: numPages }).forEach((_, index) => {
    const urlPath = index === 0 ? `/` : `/${index + 1}`;
    const skip = index * POST_PER_PAGE;
    const currentPage = index + 1;
    const limit = POST_PER_PAGE;

    actions.createPage({
      path: urlPath,
      component: path.resolve(`./src/templates/blog-list.js`),
      context: {
        id: posts[index].id,
        limit: limit,
        skip: skip,
        numPages: numPages,
        currentPage: currentPage,
      },
    });
  });

  // post page
  console.log(`LOG: post page`);
  data.posts.nodes.forEach((node, index) => {
    const previousPostId = index === 0 ? null : posts[index - 1].id;
    const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id;
    actions.createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/blog-post.js`),
      context: {
        id: node.id,
        previousPostId,
        nextPostId,
      },
    });
  });

  // tag list page
  console.log(`LOG: tag list page`);
  data.tagsGroup.group.forEach((node) => {
    actions.createPage({
      path: `/tags/`,
      component: path.resolve("src/templates/tag-list.js"),
      context: {
        tag: node.fieldValue,
      },
    });
  });

  // tag specific list page
  console.log(`LOG: tag specific list page`);
  data.tagsGroup.group.forEach((node) => {
    actions.createPage({
      path: `/tags/${_.kebabCase(node.fieldValue)}/`,
      component: path.resolve("src/templates/tags.js"),
      context: {
        tag: node.fieldValue,
        totalCount: node.totalCount,
      },
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });

    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
    }

    type Fields {
      slug: String
    }
  `);
};
