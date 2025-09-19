import { LitElement, html, css } from "lit";
import { picsumService } from "../../services/picsum-service";

export class ImageList extends LitElement {
  static properties = {
    images: { type: Array },
  };

  static styles = css`
    ul {
      list-style: none;
      padding: 0;
    }

    li {
      display: inline-block;
      margin: 10px;
    }
  `;

  constructor() {
    super();
    this.images = [];
  }

  connectedCallback() {
    super.connectedCallback();
    const nrOfImages = 50;
    const page = 6;
    picsumService.getImages(nrOfImages, page).then((images) => {
      this.images = images;
      console.log(this.images);
    });
  }

  render() {
    return html`
      <h1>Image List</h1>
      <ul>
        ${this.images.map(
          (image) =>
            html`<li>
              <img src="${image.download_url}" alt="${image.author}" />
            </li>`,
        )}
      </ul>
    `;
  }
}

customElements.define("image-list", ImageList);
