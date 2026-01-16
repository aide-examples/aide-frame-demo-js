# Sample Docs

This is a demonstration of the custom documentation roots feature in aide-frame.

## Documents

- [Start Your Own App](start-your-own-app.md) - Create a new aide-frame application
- [Markdown Demo](markdown-demo.md) - Markdown and Mermaid features

## Features

- **Custom Routes**: Define your own documentation endpoints
- **Markdown Support**: Full markdown rendering with Mermaid diagrams
- **Sections**: Organize docs in subdirectories

## Usage

Custom roots are configured in the `HttpServer` configuration:

```javascript
customRoots: {
    sample_docs: {
        dirKey: 'SAMPLE_DOCS_DIR',
        title: 'Sample Docs',
        route: '/sample_docs',
        subdir: 'sample_docs',
    }
}
```

See the [main documentation](/about) for more details.
