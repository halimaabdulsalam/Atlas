export interface Country {
  names: {
    common: string;
    official: string;
  };
  flag: {
    url_png: string;
    url_svg: string;
    alt?: string;
  };
  capital?: string[];
  region: string;
  population: number;
}
