export interface ProductI {
  _id?: string;
  categoriesId: string;
  title: string;
  price: number;
  description: string;
  filePath?: string
}

export interface ProductUploadImgI {
  filePath: string
}
