export interface Ivegetable {
  isSub: boolean;
  name: string;
  dateDebSemisJour: Number;
  dateDebSemisMois: Number;
  dateFinSemisJour: Number;
  dateFinSemisMois: Number;
  tempMin: Number;
  tempMax: Number;
  image: string;
  soleil: 1 | 0 | -1;
}