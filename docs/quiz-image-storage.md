# Quiz image storage

Quiz question images live in a private S3-compatible bucket. The backend accepts
up to five images of 5 MiB each, decodes PNG, JPEG, WebP or GIF with Sharp,
limits the decoded pixel count, and re-encodes the image without untrusted
metadata. It uses a random filename under `quiz-images/` and stores only a
`/uploads/<filename>` path with the question. `GET /uploads/<filename>` reads
the object through the backend and returns the verified image type with
`X-Content-Type-Options: nosniff` and a long-lived cache header. The bucket
does not need public access or browser CORS.

## Cloudflare R2 setup

1. Use the dedicated private bucket `webdev-coursework-quiz-images` in the
   webdev-coursework Cloudflare account. Keep public access disabled.
2. Create an R2 S3 API token with **Object Read & Write** access restricted to
   that bucket. Save the Access Key ID and Secret Access Key in the backend's
   Heroku Config Vars, never in Git or frontend variables.
3. Set `QUIZ_IMAGE_S3_BUCKET=webdev-coursework-quiz-images`,
   `QUIZ_IMAGE_S3_REGION=auto`,
   `QUIZ_IMAGE_S3_ENDPOINT=https://bd3d3ed400d1fdffb13624848f5ebb8b.r2.cloudflarestorage.com`,
   `QUIZ_IMAGE_S3_ACCESS_KEY_ID`, and `QUIZ_IMAGE_S3_SECRET_ACCESS_KEY`.
   Restart the backend after changing configuration.
4. Deploy the backend and frontend together. The frontend resolves `/uploads/`
   paths against its configured `VITE_API_URL`, and its image CSP allows the
   production API origin.
5. Verify an admin upload, `GET /uploads/<filename>`, and rendering on the
   frontend. An intentionally malformed image must return 400 and create no
   question.

When the bucket is unset, uploads with images fail with 503; questions without
images continue to work. No local-disk fallback is used on Heroku. Existing
`/uploads/undefined` records cannot be recovered and must be re-uploaded.

R2 objects are deleted on a failed upload or question save when the process can
observe the failure. A process crash or failed cleanup can leave an orphan;
periodically inspect `quiz-images/` for unreferenced objects before enabling
high-volume uploads.
