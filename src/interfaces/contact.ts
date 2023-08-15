import type NumberInterface from "./numbers";

interface contact {
  id?: string;
  image: string;
  name: string;
  email: string;
  isFavorite: boolean;
  numbers: NumberInterface[];
}

export default contact;
