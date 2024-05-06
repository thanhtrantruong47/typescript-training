// awaited<type>

type A = Awaited<Promise<string>>;

type B = Awaited<Promise<Promise<number>>>;

type C5 = Awaited<boolean | Promise<number>>;

// Partial<Type>

interface Todo {
  title: string;
  description: string;
}

function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
  return { ...todo, ...fieldsToUpdate };
}

const todo1 = {
  title: "organize desk",
  description: "clear clutter",
};

const todo2 = updateTodo(todo1, {
  description: "throw out trash",
});

console.log(todo2);

// Required<Type>

interface Props {
  a?: number;
  b?: string;
}

const obj: Props = { a: 5 };

const obj2: Required<Props> = { a: 5, b: "10" };

// Pick<Type, Keys>

interface listTodo {
  title: string;
  des: string;
  completed: boolean;
}

type TodoPreview = Pick<listTodo, "title">;

const todo: TodoPreview = {
  title: "this title todo",
};

console.log(todo);
// omit<Type, Keys>

type TodoPreview1 = Omit<listTodo, "title">;

const todo11: TodoPreview1 = {
  completed: false,
  des: "this is omit",
  // title: 'asdasd' this error
};

console.log(todo11);

// Exclude<UnionType, ExcludedMembers>
type T01 = Exclude<"a" | "b" | "c" | "d", "a" | "b" | "d">;

type T1 = Exclude<"a" | "b" | "c", "a" | "b">;

// Extract<Type, Union>

type T0 = Extract<"a" | "b" | "c", "a" | "f" | "b" | "c">;

// NonNullable<Type>

type T12 = NonNullable<string | undefined | null | number>;
