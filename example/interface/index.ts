interface point {
  x: number;
  y: number;
}

interface pointMax extends point {
  max: string;
}

interface point {
  title: string;
}

const printPoint = (pt: point) => {
    for(let [key, value] of Object.entries(pt)) {
        console.log(key + ':' + value)
    }
};

const printPointMax = (pt: pointMax) => {
  console.log(pt.max.toUpperCase());
};

printPoint({ x: 123, y: 4545, title: "qweoqeoqwoeoqoe" });

printPointMax({ x: 5, y: 6, max: "asdasda", title: "asda" });
