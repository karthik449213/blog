-- Sample blog posts for ModernBlog
INSERT INTO posts (title, content, tags) VALUES 
(
  'Getting Started with React and TypeScript', 
  '# Getting Started with React and TypeScript

React and TypeScript make a powerful combination for building modern web applications. In this guide, we''ll explore how to set up a new project and leverage TypeScript''s type safety features.

## Why TypeScript with React?

TypeScript brings several benefits to React development:

- **Type Safety**: Catch errors at compile time
- **Better IDE Support**: Enhanced autocomplete and refactoring
- **Documentation**: Types serve as inline documentation
- **Scalability**: Easier to maintain large codebases

## Setting Up Your Project

To create a new React TypeScript project, use Create React App:

```bash
npx create-react-app my-app --template typescript
cd my-app
npm start
```

## Component Types

Here''s how to type a simple React component:

```typescript
interface Props {
  name: string;
  age?: number;
}

const UserCard: React.FC<Props> = ({ name, age }) => {
  return (
    <div>
      <h2>{name}</h2>
      {age && <p>Age: {age}</p>}
    </div>
  );
};
```

## State and Hooks

TypeScript works seamlessly with React hooks:

```typescript
const [count, setCount] = useState<number>(0);
const [user, setUser] = useState<User | null>(null);
```

## Best Practices

- Use interfaces for props and state
- Leverage union types for component variants
- Use generic types for reusable components
- Enable strict mode in tsconfig.json

> Remember: TypeScript is a tool to help you write better code, not to make your life harder. Start simple and gradually add more complex types as needed.

TypeScript with React creates a robust foundation for building scalable applications. The initial setup investment pays dividends in reduced bugs and improved developer experience.',
  ARRAY['React', 'TypeScript', 'JavaScript', 'Tutorial']
),
(
  'Modern CSS Layout Techniques', 
  '# Modern CSS Layout Techniques

CSS has evolved significantly over the years, giving us powerful layout tools that make responsive design easier than ever. Let''s explore the modern approaches to CSS layout.

## CSS Grid: The Layout Revolution

CSS Grid is perfect for two-dimensional layouts:

```css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}
```

## Flexbox: One-Dimensional Perfection

Flexbox excels at distributing space along a single axis:

```css
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

## Container Queries

The future of responsive design:

```css
@container (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
}
```

## Key Benefits

- **Responsive by default**: Modern layouts adapt naturally
- **Less media queries**: Container queries and intrinsic sizing reduce breakpoint complexity
- **Better semantics**: Layouts that match content structure

## Practical Examples

### Card Layout
```css
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}
```

### Sidebar Layout
```css
.layout {
  display: grid;
  grid-template-columns: minmax(200px, 1fr) 3fr;
}
```

Modern CSS layout techniques give us unprecedented control over how our content flows and adapts. Embrace these tools to create more flexible, maintainable layouts.',
  ARRAY['CSS', 'Web Design', 'Frontend', 'Layout']
),
(
  'Node.js Best Practices for 2024', 
  '# Node.js Best Practices for 2024

Node.js continues to evolve, and staying current with best practices is crucial for building robust, scalable applications.

## Project Structure

Organize your code for maintainability:

```
src/
├── controllers/
├── services/
├── models/
├── middleware/
├── routes/
├── utils/
└── types/
```

## Error Handling

Implement comprehensive error handling:

```javascript
// Global error handler
app.use((err, req, res, next) => {
  logger.error(err.stack);
  
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: ''error'',
      message: err.message
    });
  } else {
    res.status(500).json({
      status: ''error'',
      message: ''Something went wrong''
    });
  }
});
```

## Security Essentials

- **Helmet**: Secure HTTP headers
- **Rate Limiting**: Prevent abuse
- **Input Validation**: Sanitize user input
- **Environment Variables**: Keep secrets safe

## Performance Optimization

### Caching Strategy
```javascript
const redis = require(''redis'');
const client = redis.createClient();

app.get(''/api/data'', async (req, res) => {
  const cached = await client.get(''data'');
  if (cached) {
    return res.json(JSON.parse(cached));
  }
  
  const data = await fetchData();
  await client.setex(''data'', 3600, JSON.stringify(data));
  res.json(data);
});
```

## Testing Strategy

- **Unit Tests**: Test individual functions
- **Integration Tests**: Test API endpoints
- **Load Tests**: Ensure performance under stress

## Deployment

Use modern deployment strategies:

- **Docker**: Containerize your applications
- **CI/CD**: Automate testing and deployment
- **Health Checks**: Monitor application status
- **Logging**: Comprehensive application logging

> Focus on writing clean, testable code that your future self will thank you for.

Following these practices will help you build Node.js applications that are secure, performant, and maintainable.',
  ARRAY['Node.js', 'Backend', 'JavaScript', 'Best Practices']
),
(
  'Database Design Fundamentals', 
  '# Database Design Fundamentals

Good database design is the foundation of any successful application. Let''s explore the key principles that will help you create efficient, scalable databases.

## Normalization Principles

### First Normal Form (1NF)
- Each column contains atomic values
- No repeating groups
- Each row is unique

### Second Normal Form (2NF)
- Must be in 1NF
- All non-key attributes depend on the entire primary key

### Third Normal Form (3NF)
- Must be in 2NF
- No transitive dependencies

## Entity Relationship Modeling

Start with identifying:
- **Entities**: Things or objects (User, Order, Product)
- **Attributes**: Properties of entities (name, email, price)
- **Relationships**: How entities connect (User places Order)

## Common Relationships

### One-to-Many
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  content TEXT,
  user_id INTEGER REFERENCES users(id)
);
```

### Many-to-Many
```sql
CREATE TABLE posts_tags (
  post_id INTEGER REFERENCES posts(id),
  tag_id INTEGER REFERENCES tags(id),
  PRIMARY KEY (post_id, tag_id)
);
```

## Indexing Strategy

- **Primary Keys**: Automatically indexed
- **Foreign Keys**: Usually need indexes
- **Search Columns**: Index frequently queried columns
- **Composite Indexes**: For multi-column queries

## Performance Considerations

- **Query Patterns**: Design for your most common queries
- **Data Types**: Choose appropriate types for storage efficiency
- **Partitioning**: Split large tables for better performance
- **Archiving**: Move old data to separate tables

## Best Practices

- Use consistent naming conventions
- Document your schema decisions
- Plan for data growth
- Consider backup and recovery strategies
- Test with realistic data volumes

> Remember: premature optimization is the root of all evil, but thoughtful design prevents major headaches later.

A well-designed database schema is like a solid foundation – it supports everything you build on top of it.',
  ARRAY['Database', 'SQL', 'Backend', 'Architecture']
),
(
  'The Future of Web Development', 
  '# The Future of Web Development

Web development is constantly evolving. Let''s explore the trends and technologies that are shaping the future of how we build for the web.

## Server-Side Renaissance

Server-side rendering is making a comeback:

- **Next.js**: React with SSR/SSG capabilities
- **SvelteKit**: Svelte''s full-stack framework
- **Remix**: Focus on web standards and performance

## Edge Computing

Computing at the edge for better performance:

- **Edge Functions**: Run code closer to users
- **CDN Integration**: Dynamic content at edge locations
- **Reduced Latency**: Faster response times globally

## WebAssembly (WASM)

Bringing high-performance computing to the web:

```rust
// Rust code compiled to WebAssembly
#[wasm_bindgen]
pub fn process_data(data: &[u8]) -> Vec<u8> {
    // High-performance data processing
    data.iter().map(|&x| x * 2).collect()
}
```

## Progressive Web Apps (PWAs)

Bridging web and native:

- **Service Workers**: Offline functionality
- **Web App Manifests**: Installation capabilities
- **Push Notifications**: Re-engagement features

## AI Integration

AI is becoming integral to web development:

- **Code Generation**: AI-assisted coding
- **Content Creation**: Automated content generation
- **User Experience**: Personalized interfaces
- **Testing**: Automated test generation

## Web Standards Evolution

New web standards are expanding capabilities:

- **Web Components**: Reusable, framework-agnostic components
- **CSS Container Queries**: Element-based responsive design
- **HTTP/3**: Faster, more reliable connections

## Development Tools

The tooling ecosystem continues to improve:

- **Vite**: Lightning-fast build tool
- **esbuild**: Extremely fast bundler
- **Deno**: Modern JavaScript runtime
- **Bun**: All-in-one JavaScript runtime and toolkit

## Sustainability Focus

Green web development is becoming important:

- **Performance Optimization**: Reduce energy consumption
- **Efficient Bundling**: Smaller bundle sizes
- **Caching Strategies**: Reduce server requests

## What This Means for Developers

- **Stay Curious**: Keep learning new technologies
- **Focus on Fundamentals**: Master core web technologies
- **User-Centric Thinking**: Always prioritize user experience
- **Performance First**: Build fast, accessible applications

> The future of web development is exciting, but the fundamentals of good software engineering remain constant: write clean code, test thoroughly, and always keep the user in mind.

The web platform continues to grow more powerful, giving us unprecedented capabilities to create amazing user experiences.',
  ARRAY['Web Development', 'Technology', 'Future', 'Trends']
);