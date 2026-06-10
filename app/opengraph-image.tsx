import { renderShareImage, alt, size, contentType } from "./_og/share-image";

export const runtime = "edge";

export { alt, size, contentType };

export default async function Image() {
  return renderShareImage();
}
