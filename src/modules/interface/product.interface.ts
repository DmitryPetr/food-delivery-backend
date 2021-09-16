export class ProductI {
  _id?: string;
  categoriesId: string;
  title: string;
  price: number;
  description: string;
  filePath?: string
}

export class ProductUploadImgI {
  filePath: string
}
