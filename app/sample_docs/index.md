# Sample Docs

This is a demonstration of the custom documentation roots feature in aide-frame.

## Features

- **Custom Routes**: Define your own documentation endpoints
- **Markdown Support**: Full markdown rendering
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
