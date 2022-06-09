export class Book {
  type: string;
  Writer: string;
  Publisher: string;
  ISBN: string;
  Released: Date;
  NumberOfPages: number;
  OG_Price: number;
  status: {
    type: string,
    enum: ['AVAILABLE', 'BORROWED', 'SCRAPPED'],
    default: 'AVAILABLE'
  };
}
