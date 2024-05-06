interface Point1 {
  x: number;
  y: number;
}

interface PointMax extends Point1 {
  max: string;
}

interface Point1 {
  title: string;
}

const printPoint1 = (pt: Point1) => {
  for (let [key, value] of Object.entries(pt)) {
    console.log(key + ":" + value);
  }
};

const printPointMax1 = (pt: PointMax) => {
  console.log(pt.max.toUpperCase());
};

printPoint1({ x: 123, y: 4545, title: "qweoqeoqwoeoqoe" });

printPointMax1({ x: 5, y: 6, max: "asdasda", title: "asda" });
