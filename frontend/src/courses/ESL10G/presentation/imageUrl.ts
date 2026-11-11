export function versionedPresentationImageUrl(url: string): string {
  const version = __ESL10G_PRESENTATION_IMAGE_VERSIONS__[url];
  if (!version) {
    throw new Error(`Missing presentation image version: ${url}`);
  }
  return `${url}?v=${version}`;
}
