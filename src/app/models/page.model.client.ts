export class Page {
  _id: string;
  name: string;
  websiteId: string;
  title: string;

  //constructor(_id: string, name: string, websiteId: string, description: string) {
  constructor(name: string, websiteId: string, description: string) {
    //this._id = _id;
    this.name = name;
    this.websiteId = websiteId;
    this.title = description;
  }
}
