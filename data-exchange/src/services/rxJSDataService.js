import { Observable } from "rxjs";

class RxJSDataService {
  #serviceData = [];
  serviceData$ = null;

  constructor() {
    this.serviceData$ = new Observable((subscriber) => {
      this.subscriber = subscriber;
    });
  }

  addData(item) {
    this.#serviceData = [...this.#serviceData, item];
    this.subscriber.next(this.#serviceData);
  }

  endDataStream() {
    this.subscriber.complete();
  }
}

const rxJSDataService = new RxJSDataService();

export { rxJSDataService };
