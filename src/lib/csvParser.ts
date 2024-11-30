import { CSVPin } from './types';

export const parseCSV = (csvContent: string): CSVPin[] => {
  const lines = csvContent.split('\n');
  const headers = lines[0].split(',').map(header => header.trim());
  
  return lines.slice(1)
    .filter(line => line.trim())
    .map(line => {
      const values = line.split(',').map(value => value.trim());
      const pin: CSVPin = {
        title: values[headers.indexOf('title')],
        description: values[headers.indexOf('description')],
        link: values[headers.indexOf('link')],
        imageUrl: values[headers.indexOf('imageUrl')]
      };
      return pin;
    });
};