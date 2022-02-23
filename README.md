# Evrenzo mailer.

HTML email template for Evrenzo.

### Building for Release

Before running this, make sure that all images are uploaded to a public S3 bucket, so they can be viewed inside a remote email client.

```shell
# Install dependencies
npm install

# Build HTML file, upload images to CDN, and replace relative img paths with absolute ones
npm run build
```

This will generate an index.html file inside the build directory.