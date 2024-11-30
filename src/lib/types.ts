export interface Pin {
  id?: string;
  title: string;
  description: string;
  link: string;
  imageUrl: string;
  boardId: string;
  scheduledTime?: number;
  status: 'scheduled' | 'published' | 'failed';
  accountId: string;
  userId: string;
}

export interface CSVPin {
  title: string;
  description: string;
  link: string;
  imageUrl: string;
}