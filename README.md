# Class validators utils

## AtLeastOneIsDefined Decorator

```ts
import "reflect-metadata";

import { plainToInstance } from "class-transformer";
import { validateSync } from "class-validator";
import { AtLeastOneIsDefined } from "./src/decorators/at-least-one-is-defined";

class Test {
  @AtLeastOneIsDefined<Test>(["prop1", "prop2"])
  prop1?: string;

  prop2?: string;

  name: string;
}

const plain = { name: "test" };
const instance = plainToInstance(Test, plain);
console.log(validateSync(instance)[0].constraints);
```

**_Output_**

```js
{
  AtleastOneIsDefinedConstraint: "At least one of the fields ['prop1', 'prop2'] must be defined in Test.";
}
```
