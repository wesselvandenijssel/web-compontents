class PicsumService {
  constructor() {
    this.url = "https://picsum.photos/";
  }

  getImages(nrOfImages, page) {
    return fetch(`${this.url}v2/list?page=${page}&limit=${nrOfImages}`).then(
      (response) => response.json(),
    );
  }
}

const picsumService = new PicsumService();

export { picsumService };
