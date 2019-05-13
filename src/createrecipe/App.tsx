import { produce } from "immer";
import React, { useState } from "react";
import { generate } from "shortid";

interface IngredientList {
  id: string;
  Ingredient: string;
  Measurement: string;

}

const App = () => {
  const [IngredientList, setIngredientList] = useState<IngredientList[]>([
    { id: "5", Ingredient: "Ingredient", Measurement: "Measurement" }
  ]);

  return (
    <div style={{ textAlign: "center" }}>
      <button
        onClick={() => {
          setIngredientList(currentIngredientList => [
            ...currentIngredientList,
            {
              id: generate(),
              Ingredient: "",
              Measurement: "",
            }
          ]);
        }}
      >
        add new ingredient
      </button>
      {IngredientList.map((ing, index) => {
        return (
          <div key={ing.id}>
            <input
              onChange={e => {
                const Ingredient = e.target.value;
                setIngredientList(currentIngredientList =>
                  produce(currentIngredientList, v => {
                    v[index].Ingredient = Ingredient;
                  })
                );
              }}
              value={ing.Ingredient}
              placeholder="Ingredient"
            />

            <input
              onChange={e => {
                const Measurement = e.target.value;
                setIngredientList(currentIngredientList =>
                  produce(currentIngredientList, v => {
                    v[index].Measurement = Measurement;
                  })
                );
              }}
              value={ing.Measurement}
              placeholder="Measurement"
            />
            <button
              onClick={() => {
                setIngredientList(currentIngredientList =>
                  currentIngredientList.filter(x => x.id !== ing.id)
                );
              }}
            >
              
            </button>
          </div>
        );
      })}
      <div>{JSON.stringify(IngredientList, null, 2)}</div>
    </div>
  );
};

export default App;