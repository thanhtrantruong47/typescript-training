interface Ping {
  ping(name: string) : string
}

class Pong implements Ping {
  ping(s:string)  {
    return s.toUpperCase()
  }
}

const kk = new Pong();

console.log(kk.ping('this is ping'))

class Ball {
  k = 15;
}

class Point extends Ball {
  x: number;
  y: number;
  readonly myName = "thanh123";
  // Normal signature with defaults
  constructor(x = 0, y = 0) {
    super();
    this.x = x;
    this.y = y;
  }

  static printHello = () =>  {
    console.log("Hello")
  }

  printValue = () => {
    console.log(this.x);
    console.log(this.y);
  }
}

const c = new Point(5,10);

console.log(c.k)
Point.printHello()

// read-only can't set new value
// c.myName = "thanh1qwe23"

c.printValue()
