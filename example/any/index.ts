const data : {
    title : string;
    avatar : string[];
} = {
    title : "sadsasad",
    avatar : ["asdqewqe", "sadawqweq"],
};

const data1 : any = {
    title : "sadsasad",
    avatar : ["asdqewqe", "sadawqweq"],
};

console.log(data)
console.log(data1)

// TypeScript throws an error when you try to access an undefined property like house.
console.log(data.h1)

// log undefine in type any 
console.log(data1.title1)